from fastapi import APIRouter, Query

router = APIRouter()

@router.get("/")
def get_analytics(retailer_id: str = Query("R1042")):
    """Purchase analytics and savings summary."""
    return {
        "retailer_id": retailer_id,
        "summary": {
            "total_orders_6m": 1119,
            "total_spend_6m": 761000,
            "total_savings_6m": 90100,
            "avg_discount_pct": 12,
            "unique_products": 186
        },
        "monthly": [
            {"month": "Aug", "spent": 98000,  "items": 142, "savings": 11200},
            {"month": "Sep", "spent": 112000, "items": 167, "savings": 13400},
            {"month": "Oct", "spent": 134000, "items": 198, "savings": 15800},
            {"month": "Nov", "spent": 119000, "items": 175, "savings": 14100},
            {"month": "Dec", "spent": 156000, "items": 228, "savings": 18700},
            {"month": "Jan", "spent": 142000, "items": 209, "savings": 16900},
        ],
        "top_categories": [
            {"name": "Snacks", "pct": 32},
            {"name": "Beverages", "pct": 24},
            {"name": "Personal Care", "pct": 18},
            {"name": "Dairy", "pct": 14},
            {"name": "Others", "pct": 12},
        ]
    }
