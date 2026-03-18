# 🧠 RetailIQ — Qwipo B2B Intelligence Platform

> **HacXLerate 2025 Submission** | Qwipo Problem Statement
> *Personalized Recommendations & Retailer Experience Optimization*

---

## 🎯 Problem Statement

Retailers on Qwipo's B2B marketplace face challenges in:
- **Product Discovery** — repetitive buying, missing relevant products
- **Purchasing Optimization** — poor business outcomes from suboptimal stocking
- **Demand Awareness** — no visibility into local trends or peer behaviour

## 💡 Our Solution: RetailIQ

A full-stack **Retail Intelligence Co-pilot** that gives every retailer:

| Feature | What it does |
|---------|-------------|
| 🎯 **Personalized Recommendations** | Ensemble ML (CF + Content-Based + Hyper-Local) |
| 🛒 **Smart Cart / Basket Completion** | Association-rule mining on peer purchase patterns |
| 📊 **Business Health Score** | Revenue gap analysis vs similar retailers in area |
| 🔥 **Hyper-Local Trends** | Real-time demand signals by pincode |
| 📈 **Analytics Dashboard** | Purchase history, savings, category breakdown |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│               RetailIQ Platform              │
├──────────────┬──────────────────────────────┤
│   Frontend   │         Backend API           │
│  React + Vite│        FastAPI (Python)        │
├──────────────┴──────────────────────────────┤
│              ML Engine (3 Models)            │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐  │
│  │Collab.   │ │Content   │ │Hyper-Local  │  │
│  │Filtering │ │Based     │ │Demand Score │  │
│  │(50%)     │ │(30%)     │ │(20%)        │  │
│  └──────────┘ └──────────┘ └─────────────┘  │
└─────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens at http://localhost:5173
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
# API docs at http://localhost:8000/docs
```

### Run ML Engine (standalone test)
```bash
cd backend
python ml/recommendation_engine.py
```

---

## 📁 Project Structure

```
retailiq/
├── frontend/                  # React + Vite frontend
│   ├── src/
│   │   ├── components/        # Sidebar, Topbar
│   │   ├── pages/             # Dashboard, Recommendations, SmartCart,
│   │   │                      # Opportunities, Trends, Analytics, Catalog
│   │   └── data/mockData.js   # Demo data (replace with API calls)
│   └── package.json
│
├── backend/                   # FastAPI backend
│   ├── main.py .               # App entry point + CORS
│   ├── routes/                # API route handlers
│   │   ├── recommendations.py
│   │   ├── trends.py
│   │   ├── opportunities.py
│   │   └── analytics.py
│   ├── ml/
│   │   └── recommendation_engine.py   # Core ML models
│   └── requirements.txt
│
└── README.md
```

---

## 🧠 ML Models Detail

### 1. Collaborative Filtering
- Memory-based cosine similarity on retailer-product matrix
- Finds "retailers like you" and surfaces their top products
- Handles cold-start by falling back to content-based

### 2. Content-Based Filtering
- One-hot encoded product features (category, brand tier)
- Builds retailer taste profile from purchase history
- Recommends similar but unordered products

### 3. Hyper-Local Demand Scorer
- Pincode-level sales velocity multipliers
- Seasonal boost table (summer → beverages, monsoon → noodles, etc.)
- Peer basket composition signals

### 4. Basket Completion (Bonus)
- Co-occurrence counting across all retailer baskets
- Returns missing items with confidence scores
- Enables "bundle savings" upsell

---

## 📊 Business Impact (Projected)

| Metric | Before RetailIQ | After RetailIQ |
|--------|----------------|----------------|
| Avg basket size | ₹8,200 | ₹11,400 (+39%) |
| Category coverage | 5.2 | 8.1 (+56%) |
| Repeat purchase rate | 67% | 84% |
| Missed revenue / retailer | ₹18,400/mo | < ₹5,000/mo |

---

## 👥 Team

Built for **HacXLerate 2025** — organized by byteXL in partnership with Qwipo.

---

## 📜 License

MIT License — built for hackathon demonstration purposes.
