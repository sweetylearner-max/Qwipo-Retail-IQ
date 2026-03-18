from fastapi import APIRouter, Query
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Mock response — wire to ML engine in production
MOCK_RECOMMENDATIONS = [
    {
        "product_id": "P0001",
        "name": "Lays Classic Salted 26g (Pack of 48)",
        "brand": "PepsiCo",
        "category": "Snacks",
        "price": 624,
        "mrp": 720,
        "discount_pct": 13,
        "ai_score": 97,
        "reason": "High demand in Begum Bazaar this week",
        "trend_pct": 34,
        "tags": ["Trending", "Best Seller"]
    },
    {
        "product_id": "P0002",
        "name": "Parle-G Glucose Biscuits 800g (Pack of 24)",
        "brand": "Parle",
        "category": "Biscuits",
        "price": 1152,
        "mrp": 1320,
        "discount_pct": 12,
        "ai_score": 94,
        "reason": "Retailers like you buy this every 2 weeks",
        "trend_pct": 12,
        "tags": ["Reorder Due", "High Margin"]
    },
    {
        "product_id": "P0003",
        "name": "Amul Taaza Toned Milk 500ml (Pack of 30)",
        "brand": "Amul",
        "category": "Dairy",
        "price": 810,
        "mrp": 900,
        "discount_pct": 10,
        "ai_score": 91,
        "reason": "Top selling in your area — not in your cart",
        "trend_pct": 8,
        "tags": ["Missing Product", "Area Trend"]
    },
    {
        "product_id": "P0004",
        "name": "Maggi 2-Minute Noodles 70g (Pack of 48)",
        "brand": "Nestle",
        "category": "Instant Food",
        "price": 1440,
        "mrp": 1680,
        "discount_pct": 14,
        "ai_score": 89,
        "reason": "Monsoon demand spike predicted",
        "trend_pct": 22,
        "tags": ["Seasonal", "AI Predicted"]
    },
    {
        "product_id": "P0005",
        "name": "Coca Cola 600ml (Pack of 24)",
        "brand": "Coca Cola",
        "category": "Beverages",
        "price": 888,
        "mrp": 1056,
        "discount_pct": 15,
        "ai_score": 86,
        "reason": "Summer season alert — stock up now",
        "trend_pct": 45,
        "tags": ["Seasonal", "High Demand"]
    },
    {
        "product_id": "P0006",
        "name": "Colgate Strong Teeth 500g (Pack of 12)",
        "brand": "Colgate",
        "category": "Personal Care",
        "price": 1080,
        "mrp": 1260,
        "discount_pct": 14,
        "ai_score": 83,
        "reason": "You ordered this 45 days ago — restock time",
        "trend_pct": 5,
        "tags": ["Reorder Due"]
    },
]


@router.get("/")
def get_recommendations(
    retailer_id: str = Query("R1042", description="Retailer ID"),
    pincode: str = Query("500012", description="Retailer pincode"),
    top_k: int = Query(6, ge=1, le=20, description="Number of recommendations")
):
    """
    Get AI-powered personalized product recommendations for a retailer.

    In production this calls RetailIQEngine.recommend(retailer_id, pincode, top_k=top_k)
    """
    return {
        "retailer_id": retailer_id,
        "pincode": pincode,
        "model_version": "ensemble_v1",
        "recommendations": MOCK_RECOMMENDATIONS[:top_k],
        "meta": {
            "cf_weight": 0.50,
            "cb_weight": 0.30,
            "local_weight": 0.20,
            "similar_retailers_analysed": 847
        }
    }


@router.get("/basket-complete")
def basket_completion(
    retailer_id: str = Query("R1042"),
    cart_items: str = Query("P0001,P0002,P0003", description="Comma-separated product IDs in cart")
):
    """
    Given current cart, suggest basket-completion products using
    association-rule mining on peer retailer purchase patterns.
    """
    cart = cart_items.split(",")
    return {
        "cart": cart,
        "suggestions": [
            {"product_id": "P0005", "name": "Pepsi 600ml x24", "confidence": 0.94, "price": 888},
            {"product_id": "P0007", "name": "Lay's Cream & Onion", "confidence": 0.87, "price": 624},
            {"product_id": "P0008", "name": "Kurkure Masala Munch", "confidence": 0.82, "price": 396},
        ],
        "bundle_savings": 234
    }
