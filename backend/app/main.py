# main.py
from fastapi.middleware.cors import CORSMiddleware
from app import app  # import your existing FastAPI app

# Allow frontend requests from localhost:5173 (Vite dev server)


# After app = FastAPI()
origins = [
    "http://localhost:5173",  # your React dev server
    "http://127.0.0.1:5173",  # optional
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,       # can be ["*"] for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],           # Allow all headers
)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

