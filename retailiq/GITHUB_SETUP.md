# 🚀 GitHub Push Instructions

Follow these steps to push RetailIQ to GitHub:

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `retailiq-qwipo`
3. Description: `AI-powered B2B retail intelligence platform for Qwipo`
4. Set to Public (for hackathon judges to view)
5. DO NOT initialize with README (we have one)
6. Click "Create repository"

## Step 2: Initialize Git & Push.

Open terminal in the `retailiq/` folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# First commit
git commit -m "🚀 Initial commit — RetailIQ Qwipo B2B Intelligence Platform

Features:
- Personalized recommendation engine (Collaborative + Content-Based + Hyper-Local)
- Smart cart with AI basket completion
- Business health score & revenue gap analysis
- Hyper-local demand trends by pincode
- Full analytics dashboard
- FastAPI backend + React frontend"

# Add your GitHub repo as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/retailiq-qwipo.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Add Topics (for discoverability)
On your GitHub repo page → Settings → Topics:
Add: `hackathon`, `recommendation-system`, `b2b`, `react`, `fastapi`, `machine-learning`, `qwipo`

## Step 4: Enable GitHub Pages (optional demo)
Settings → Pages → Source: Deploy from branch → main → /frontend/dist

---

## 🏃 Running Locally (for judges)

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Open: http://localhost:5173

### Backend  
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
API Docs: http://localhost:8000/docs

### ML Engine Test
```bash
cd backend
python ml/recommendation_engine.py
```
