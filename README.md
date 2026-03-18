# RetailIQ — Qwipo B2B Intelligence Platform

**HacXLerate 2025 Submission** | Qwipo Problem Statement  
Personalized Recommendations & Retailer Experience Optimization

**Live Demo:** https://retailnudge-ai.netlify.app

---

## Problem Statement

> "Retailers on Qwipo's B2B marketplace face challenges in product discovery and purchasing optimization. Current shopping patterns show repetitive buying and missed opportunities for relevant products, leading to poor business outcomes. The task is to build a solution that improves personalized recommendations and enhances the overall retailer experience on the platform."

### What is the problem?

Qwipo is a B2B marketplace where retailers (kirana stores, FMCG shops) buy wholesale products. The core problems:

| Problem | Real Impact |
|---------|------------|
| Repetitive buying | Retailers order the same products every time — missing new, profitable products |
| No product discovery | 1000+ products on platform but retailer only knows 20–30 |
| No demand awareness | Retailer has no visibility into what is trending in their locality |
| Missed revenue | Stocking wrong or fewer products leads to less daily sales |
| Generic experience | Same catalog shown to every retailer regardless of location, category, or history |

**Example:** A kirana store in Begum Bazaar orders biscuits and chips every week. They have no visibility that cold drinks are trending +45% in their area this summer, and 10 similar nearby stores are making an extra Rs.6,000/month from dairy products that this store does not stock.

---

## Our Solution: RetailIQ

A full-stack Retail Intelligence Co-pilot — not just a recommendation engine, but a complete business intelligence platform for every retailer on Qwipo.

### Core Features

| Feature | How it works | Business Value |
|---------|-------------|----------------|
| Personalized Recommendations | 3-model ML ensemble: purchase history + peer behavior + local trends | Retailer discovers the right products to stock |
| Smart Cart / Basket Completion | Association-rule mining detects missing products from the current cart | Increases order value per session |
| Business Health Score | Compares retailer's category coverage vs similar stores in the area | Shows exactly how much revenue is being missed |
| Hyper-Local Demand Trends | Pincode-level demand signals | Retailer stocks products before demand peaks |
| Analytics Dashboard | Purchase history, savings earned, top categories | Retailer understands their own buying patterns |

---

## Architecture

```
RetailIQ Platform
├── Frontend         React + Vite + Tailwind CSS + Recharts
├── Backend API      FastAPI (Python)
│   ├── /api/recommendations
│   ├── /api/trends
│   ├── /api/opportunities
│   └── /api/analytics
└── ML Engine
    ├── Collaborative Filtering      (50% weight)
    ├── Content-Based Filtering      (30% weight)
    ├── Hyper-Local Demand Scorer    (20% weight)
    ├── Basket Completion Model
    └── Opportunity Score Calculator
```

---

## ML Models

### 1. Collaborative Filtering (50% weight)
Finds retailers with similar purchase patterns and recommends what they bought.
- Builds a retailer-product sparse interaction matrix
- Computes cosine similarity between retailers
- Surfaces products bought by similar retailers but not yet by this retailer
- Falls back to content-based filtering for cold-start retailers

### 2. Content-Based Filtering (30% weight)
Recommends products similar to what the retailer already purchases.
- One-hot encodes product features: category, brand tier, margin percentage
- Builds a retailer taste profile from purchase history
- Returns unordered but highly relevant products

### 3. Hyper-Local Demand Scorer (20% weight)
Scores products based on real demand signals in the retailer's pincode.
- Pincode-level sales velocity multipliers
- Seasonal boost table (e.g., summer drives beverages, monsoon drives noodles)
- Adjusts final recommendation score based on geo and seasonal signals

### 4. Basket Completion Model
- Co-occurrence mining across all retailer baskets on the platform
- Example: retailer has biscuits and chips in cart → suggests cold drinks at 94% confidence
- Drives bundle savings and increases average order value

### 5. Opportunity Score Calculator
- Compares retailer's active category coverage against peer retailers in the area
- Calculates estimated monthly revenue gap per missing category
- Prioritizes gaps as high, medium, or low based on demand and potential value

---

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# Swagger docs at http://localhost:8000/docs
```

### ML Engine Test
```bash
cd backend
python ml/recommendation_engine.py
```

---

## Project Structure

```
retailiq/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Recommendations.jsx
│   │   │   ├── SmartCart.jsx
│   │   │   ├── Opportunities.jsx
│   │   │   ├── Trends.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── Catalog.jsx
│   │   └── data/mockData.js
│   └── package.json
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── recommendations.py
│   │   ├── trends.py
│   │   ├── opportunities.py
│   │   └── analytics.py
│   ├── ml/
│   │   └── recommendation_engine.py
│   └── requirements.txt
├── netlify.toml
└── README.md
```

---

## Projected Business Impact

| Metric | Before RetailIQ | After RetailIQ |
|--------|----------------|----------------|
| Average basket size | Rs. 8,200 | Rs. 11,400 (+39%) |
| Category coverage per retailer | 5.2 | 8.1 (+56%) |
| Repeat purchase rate | 67% | 84% |
| Missed revenue per retailer | Rs. 18,400/month | Under Rs. 5,000/month |
| Product discovery rate | ~15% of catalog | ~40% of catalog |

---

## Team

Built for HacXLerate 2025 — National Hackathon organized by byteXL in partnership with Qwipo.

| Contributor | Role | Responsibilities |
|-------------|------|-----------------|
| Akanksha | ML Lead + Frontend | Collaborative Filtering, Ensemble architecture, Dashboard, Recommendations page, Smart Cart UI |
| Akshaya | ML  | Content-Based Filtering, Basket Completion model, Opportunity Score calculator |
| Mounika | Frontend  | Opportunities page, Trends page, Recharts integration, UI components |
| Manasa | Frontend  | Analytics page, Catalog page, mockData, Sidebar and Topbar components |
| Vasundhara | Backend + Deployment | FastAPI backend, REST API routes, Hyper-Local Demand Scorer, Netlify deployment |

---

## License

MIT License — built for hackathon demonstration purposes.
