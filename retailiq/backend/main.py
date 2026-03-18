from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import recommendations, trends, opportunities, analytics

app = FastAPI(
    title="RetailIQ API",
    description="AI-powered B2B retail intelligence for Qwipo marketplace",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recommendations.router, prefix="/api/recommendations", tags=["Recommendations"])
app.include_router(trends.router, prefix="/api/trends", tags=["Trends"])
app.include_router(opportunities.router, prefix="/api/opportunities", tags=["Opportunities"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def root():
    return {"message": "RetailIQ API is running", "version": "1.0.0"}

@app.get("/health")
def health():
    return {"status": "healthy"}
