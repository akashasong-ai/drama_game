from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg
from .api import router

app = FastAPI(title="Drama Detectives API")

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include API routes
app.include_router(router, prefix="/api/v1")

@app.get("/healthz")
async def healthz():
    return {"status": "ok", "name": "Drama Detectives API", "version": "1.0.0"}
