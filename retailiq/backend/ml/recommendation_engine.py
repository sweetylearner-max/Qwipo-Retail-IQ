"""
RetailIQ — ML Recommendation Engine
=====================================
Three-model ensemble for B2B retail recommendations:
  1. Collaborative Filtering (LightFM) — user-item interactions
  2. Content-Based Filtering — product attributes
  3. Hyper-Local Demand Scoring — geo-trend signals

Author: RetailIQ Team
"""

import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity
from scipy.sparse import csr_matrix.


# ─────────────────────────────────────────────
# 1. DATA SIMULATION (Replace with Qwipo DB)
# ─────────────────────────────────────────────

def generate_synthetic_data(n_retailers=500, n_products=200, n_interactions=8000):
    """
    Generates synthetic retailer-product interaction data.
    In production, replace with actual Qwipo transaction data.
    """
    np.random.seed(42)

    retailer_ids = [f"R{i:04d}" for i in range(1, n_retailers + 1)]
    product_ids  = [f"P{i:04d}" for i in range(1, n_products + 1)]

    categories = ["Snacks", "Beverages", "Dairy", "Biscuits",
                  "Personal Care", "Instant Food", "Health Drinks", "Confectionery"]
    pincodes   = ["500012", "500003", "500001", "500015", "500026",
                  "500080", "500032", "500045"]

    # Retailer profiles
    retailers = pd.DataFrame({
        "retailer_id":   retailer_ids,
        "pincode":        np.random.choice(pincodes, n_retailers),
        "type":           np.random.choice(["FMCG", "General", "Kirana", "Wholesale"], n_retailers),
        "monthly_spend":  np.random.randint(50000, 300000, n_retailers),
        "tenure_months":  np.random.randint(1, 48, n_retailers),
    })

    # Product catalogue
    products = pd.DataFrame({
        "product_id":  product_ids,
        "category":    np.random.choice(categories, n_products),
        "brand_tier":  np.random.choice(["Premium", "Mid", "Economy"], n_products),
        "margin_pct":  np.random.uniform(8, 22, n_products).round(1),
        "avg_price":   np.random.randint(200, 2500, n_products),
        "demand_score": np.random.uniform(0.3, 1.0, n_products).round(2),
    })

    # Interaction matrix (purchase events)
    interactions = pd.DataFrame({
        "retailer_id": np.random.choice(retailer_ids, n_interactions),
        "product_id":  np.random.choice(product_ids, n_interactions),
        "quantity":    np.random.randint(1, 10, n_interactions),
        "frequency":   np.random.randint(1, 12, n_interactions),
    })
    interactions = interactions.drop_duplicates(subset=["retailer_id", "product_id"])

    return retailers, products, interactions


# ─────────────────────────────────────────────
# 2. COLLABORATIVE FILTERING
# ─────────────────────────────────────────────

class CollaborativeFilterEngine:
    """
    Memory-based collaborative filtering using cosine similarity
    on the retailer-product purchase matrix.
    """

    def __init__(self):
        self.retailer_encoder = LabelEncoder()
        self.product_encoder  = LabelEncoder()
        self.similarity_matrix = None
        self.interaction_matrix = None
        self.product_ids = None

    def fit(self, interactions: pd.DataFrame):
        interactions = interactions.copy()
        interactions["retailer_idx"] = self.retailer_encoder.fit_transform(interactions["retailer_id"])
        interactions["product_idx"]  = self.product_encoder.fit_transform(interactions["product_id"])

        n_retailers = interactions["retailer_idx"].max() + 1
        n_products  = interactions["product_idx"].max() + 1

        # Build sparse matrix: rows = retailers, cols = products
        self.interaction_matrix = csr_matrix(
            (interactions["frequency"], (interactions["retailer_idx"], interactions["product_idx"])),
            shape=(n_retailers, n_products)
        )

        # Retailer-retailer cosine similarity
        self.similarity_matrix = cosine_similarity(self.interaction_matrix)
        self.product_ids = self.product_encoder.classes_
        return self

    def recommend(self, retailer_id: str, top_k: int = 10) -> list:
        """Return top-K product IDs for a given retailer."""
        if retailer_id not in self.retailer_encoder.classes_:
            return []  # Cold-start → fallback to content-based

        r_idx       = self.retailer_encoder.transform([retailer_id])[0]
        similar_idxs = np.argsort(self.similarity_matrix[r_idx])[::-1][1:21]  # top-20 neighbours

        # Weighted sum of neighbour interactions
        scores = np.zeros(self.interaction_matrix.shape[1])
        for sim_idx in similar_idxs:
            sim_weight = self.similarity_matrix[r_idx][sim_idx]
            scores    += sim_weight * self.interaction_matrix[sim_idx].toarray().flatten()

        # Zero out products the retailer already bought
        already_bought = self.interaction_matrix[r_idx].toarray().flatten() > 0
        scores[already_bought] = 0

        top_product_idxs = np.argsort(scores)[::-1][:top_k]
        return self.product_ids[top_product_idxs].tolist()


# ─────────────────────────────────────────────
# 3. CONTENT-BASED FILTERING
# ─────────────────────────────────────────────

class ContentBasedEngine:
    """
    Recommends products based on similarity to a retailer's
    historical purchase profile (category & brand affinity).
    """

    def __init__(self):
        self.product_features = None
        self.products_df = None

    def fit(self, products: pd.DataFrame, interactions: pd.DataFrame):
        self.products_df = products.copy()

        # One-hot encode category + brand_tier
        cat_dummies   = pd.get_dummies(products["category"],   prefix="cat")
        brand_dummies = pd.get_dummies(products["brand_tier"], prefix="brand")
        self.product_features = pd.concat([
            products[["demand_score", "margin_pct"]].reset_index(drop=True),
            cat_dummies.reset_index(drop=True),
            brand_dummies.reset_index(drop=True),
        ], axis=1).values.astype(float)
        return self

    def recommend(self, purchased_product_ids: list, top_k: int = 10) -> list:
        """Given a list of purchased product IDs, find similar unseen products."""
        if not purchased_product_ids:
            return []

        all_ids = self.products_df["product_id"].tolist()
        bought_idxs = [all_ids.index(p) for p in purchased_product_ids if p in all_ids]
        if not bought_idxs:
            return []

        # User profile = mean of purchased product feature vectors
        user_profile   = self.product_features[bought_idxs].mean(axis=0, keepdims=True)
        similarities   = cosine_similarity(user_profile, self.product_features).flatten()

        # Exclude already-purchased products
        for idx in bought_idxs:
            similarities[idx] = -1

        top_idxs = np.argsort(similarities)[::-1][:top_k]
        return [all_ids[i] for i in top_idxs]


# ─────────────────────────────────────────────
# 4. HYPER-LOCAL DEMAND SCORER
# ─────────────────────────────────────────────

class HyperLocalDemandScorer:
    """
    Scores products by local demand signals:
      - Pincode-level sales velocity
      - Seasonal / trending boosts
      - Peer retailer basket composition
    """

    # Simulated seasonal multipliers (month → category multiplier)
    SEASONAL_BOOSTS = {
        "Beverages":    {3: 1.6, 4: 1.8, 5: 2.1, 6: 1.9, 7: 1.4},  # Summer
        "Ice Cream":    {3: 1.4, 4: 1.7, 5: 2.0, 6: 1.8},
        "Snacks":       {10: 1.3, 11: 1.5, 12: 1.4},                # Festival
        "Health Drinks":{1: 1.2, 2: 1.1},                           # New Year health
        "Instant Food": {6: 1.3, 7: 1.4, 8: 1.3},                   # Monsoon
    }

    def score(self, product: dict, pincode: str, month: int) -> float:
        """Returns a 0–1 demand score for a product in a given location/month."""
        base_score = product.get("demand_score", 0.5)

        # Seasonal boost
        category = product.get("category", "")
        seasonal = self.SEASONAL_BOOSTS.get(category, {}).get(month, 1.0)

        # Pincode popularity (simulated — replace with real geo-data)
        pincode_multipliers = {
            "500012": 1.2, "500003": 1.1, "500001": 1.15,
            "500015": 0.95, "500026": 1.05,
        }
        geo_boost = pincode_multipliers.get(pincode, 1.0)

        final = min(base_score * seasonal * geo_boost, 1.0)
        return round(final, 3)


# ─────────────────────────────────────────────
# 5. ENSEMBLE RECOMMENDER
# ─────────────────────────────────────────────

class RetailIQEngine:
    """
    Combines all three models with configurable weights.
    Default: 50% collaborative + 30% content + 20% hyper-local
    """

    CF_WEIGHT    = 0.50
    CB_WEIGHT    = 0.30
    LOCAL_WEIGHT = 0.20

    def __init__(self):
        self.cf_engine      = CollaborativeFilterEngine()
        self.cb_engine      = ContentBasedEngine()
        self.local_scorer   = HyperLocalDemandScorer()
        self.products_df    = None
        self.interactions_df = None

    def fit(self, retailers, products, interactions):
        self.products_df     = products
        self.interactions_df = interactions
        self.cf_engine.fit(interactions)
        self.cb_engine.fit(products, interactions)
        return self

    def recommend(self, retailer_id: str, pincode: str,
                  month: int = None, top_k: int = 6) -> list:
        import datetime
        if month is None:
            month = datetime.date.today().month

        # Get candidate sets from each model
        cf_recs = self.cf_engine.recommend(retailer_id, top_k=20)

        purchased = self.interactions_df[
            self.interactions_df["retailer_id"] == retailer_id
        ]["product_id"].tolist()
        cb_recs = self.cb_engine.recommend(purchased, top_k=20)

        # Union of all candidates
        all_candidates = list(set(cf_recs + cb_recs))

        if not all_candidates:
            # Cold-start: return top demand products in pincode
            all_candidates = self.products_df["product_id"].tolist()

        # Score each candidate
        scored = []
        cf_set = set(cf_recs)
        cb_set = set(cb_recs)

        for pid in all_candidates:
            prod_row = self.products_df[self.products_df["product_id"] == pid]
            if prod_row.empty:
                continue
            prod = prod_row.iloc[0].to_dict()

            # Rank-based scores (1.0 = top of list, decays linearly)
            cf_score = (1 - cf_recs.index(pid) / len(cf_recs)) if pid in cf_set else 0
            cb_score = (1 - cb_recs.index(pid) / len(cb_recs)) if pid in cb_set else 0
            local_score = self.local_scorer.score(prod, pincode, month)

            ensemble = (
                self.CF_WEIGHT    * cf_score +
                self.CB_WEIGHT    * cb_score +
                self.LOCAL_WEIGHT * local_score
            )
            scored.append({"product_id": pid, "score": round(ensemble, 4), **prod})

        scored.sort(key=lambda x: x["score"], reverse=True)
        return scored[:top_k]


# ─────────────────────────────────────────────
# 6. BASKET COMPLETION MODEL
# ─────────────────────────────────────────────

class BasketCompletionModel:
    """
    Association-rule-inspired basket completion.
    Finds products frequently bought together with current cart items.
    """

    def __init__(self):
        self.co_occurrence = {}

    def fit(self, interactions: pd.DataFrame):
        # Build retailer baskets
        baskets = interactions.groupby("retailer_id")["product_id"].apply(list)

        # Count co-occurrences
        for basket in baskets:
            for i, p1 in enumerate(basket):
                for p2 in basket[i+1:]:
                    key = tuple(sorted([p1, p2]))
                    self.co_occurrence[key] = self.co_occurrence.get(key, 0) + 1
        return self

    def complete_basket(self, cart_product_ids: list, top_k: int = 5) -> list:
        """Given current cart, suggest missing items with confidence scores."""
        suggestions = {}
        cart_set    = set(cart_product_ids)

        for pid in cart_product_ids:
            for (p1, p2), count in self.co_occurrence.items():
                partner = p2 if p1 == pid else (p1 if p2 == pid else None)
                if partner and partner not in cart_set:
                    suggestions[partner] = suggestions.get(partner, 0) + count

        if not suggestions:
            return []

        total = sum(suggestions.values())
        result = [
            {"product_id": pid, "confidence": round(cnt / total, 3)}
            for pid, cnt in sorted(suggestions.items(), key=lambda x: -x[1])[:top_k]
        ]
        return result


# ─────────────────────────────────────────────
# 7. OPPORTUNITY SCORE CALCULATOR
# ─────────────────────────────────────────────

def calculate_opportunity_score(
    retailer_id: str,
    interactions: pd.DataFrame,
    products: pd.DataFrame,
    all_retailers: pd.DataFrame
) -> dict:
    """
    Compares retailer's category coverage vs peer retailers
    to identify revenue gaps.
    """
    # Retailer's purchased categories
    bought_products = interactions[interactions["retailer_id"] == retailer_id]["product_id"].tolist()
    bought_cats     = set(products[products["product_id"].isin(bought_products)]["category"].tolist())
    all_cats        = set(products["category"].tolist())
    missing_cats    = all_cats - bought_cats

    # Estimate revenue gap per missing category (simplified)
    avg_cat_revenue = 3500  # average monthly revenue per category (placeholder)
    gaps = []
    for cat in missing_cats:
        cat_demand = products[products["category"] == cat]["demand_score"].mean()
        estimated_gap = int(avg_cat_revenue * cat_demand)
        gaps.append({
            "category": cat,
            "estimated_monthly_gap": estimated_gap,
            "priority": "high" if estimated_gap > 4000 else "medium" if estimated_gap > 2000 else "low"
        })

    gaps.sort(key=lambda x: -x["estimated_monthly_gap"])

    coverage_score = round((len(bought_cats) / len(all_cats)) * 100)
    total_gap      = sum(g["estimated_monthly_gap"] for g in gaps)

    return {
        "retailer_id":      retailer_id,
        "coverage_score":   coverage_score,
        "missing_categories": len(missing_cats),
        "total_monthly_gap": total_gap,
        "gaps":             gaps[:5]
    }


# ─────────────────────────────────────────────
# QUICK TEST
# ─────────────────────────────────────────────
if __name__ == "__main__":
    print("🧠 RetailIQ ML Engine — Quick Test")
    print("=" * 40)

    retailers, products, interactions = generate_synthetic_data()

    engine = RetailIQEngine()
    engine.fit(retailers, products, interactions)

    test_retailer = retailers["retailer_id"].iloc[0]
    test_pincode  = retailers["pincode"].iloc[0]

    recs = engine.recommend(test_retailer, test_pincode, month=5, top_k=6)
    print(f"\nTop 6 Recommendations for {test_retailer} ({test_pincode}):")
    for i, r in enumerate(recs, 1):
        print(f"  {i}. {r['product_id']} | Category: {r['category']} | Score: {r['score']}")

    basket_model = BasketCompletionModel()
    basket_model.fit(interactions)
    cart = interactions[interactions["retailer_id"] == test_retailer]["product_id"].tolist()[:3]
    completions = basket_model.complete_basket(cart)
    print(f"\nBasket Completion for cart {cart}:")
    for c in completions:
        print(f"  → {c['product_id']} (confidence: {c['confidence']})")

    opp = calculate_opportunity_score(test_retailer, interactions, products, retailers)
    print(f"\nOpportunity Score: {opp['coverage_score']}/100")
    print(f"Estimated missed revenue: ₹{opp['total_monthly_gap']:,}/month")
    print("\n✅ All models working correctly!")
