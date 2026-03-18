from fastapi import APIRouter, Query

router = APIRouter()

@router.get("/")
def get_trends(
    pincode: str = Query("500012"),
    radius_km: int = Query(5)
):
    """Hyper-local demand trends for a given pincode."""
    return {
        "pincode": pincode,
        "radius_km": radius_km,
        "trends": [
            {"area": "Begum Bazaar", "category": "Beverages", "change_pct": 45, "reason": "Summer heat wave", "is_hot": True, "top_products": ["Coca Cola", "Pepsi", "Maaza"]},
            {"area": "Begum Bazaar", "category": "Ice Cream", "change_pct": 67, "reason": "Trending this week", "is_hot": True, "top_products": ["Kwality Walls", "Amul Ice Cream"]},
            {"area": "Koti", "category": "Snacks", "change_pct": 34, "reason": "School reopening", "is_hot": True, "top_products": ["Lays", "Kurkure", "Haldiram"]},
            {"area": "Hyderabad", "category": "Monsoon Snacks", "change_pct": 52, "reason": "Pre-monsoon stocking", "is_hot": True, "top_products": ["Maggi", "Yippee", "Top Ramen"]},
            {"area": "Secunderabad", "category": "Dairy", "change_pct": 18, "reason": "Festival season", "is_hot": False, "top_products": ["Amul", "Mother Dairy"]},
        ]
    }
