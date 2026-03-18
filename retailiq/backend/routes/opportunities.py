from fastapi import APIRouter, Query

router = APIRouter()

@router.get("/")
def get_opportunities(retailer_id: str = Query("R1042")):
    """Business health score and revenue gap analysis."""
    return {
        "retailer_id": retailer_id,
        "health_score": 72,
        "potential_score": 91,
        "missed_monthly_revenue": 18400,
        "gaps": [
            {"category": "Dairy Products", "monthly_gap": 6200, "reason": "Not stocking Amul & Mother Dairy", "priority": "high"},
            {"category": "Packaged Water", "monthly_gap": 4800, "reason": "No water brands in inventory", "priority": "high"},
            {"category": "Noodles & Pasta", "monthly_gap": 3900, "reason": "Only 1 brand vs avg 3 in area", "priority": "medium"},
            {"category": "Chocolate & Candy", "monthly_gap": 2100, "reason": "Low variety — area demand is high", "priority": "medium"},
            {"category": "Health Drinks", "monthly_gap": 1400, "reason": "Growing segment in pincode", "priority": "low"},
        ]
    }
