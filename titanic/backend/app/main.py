from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import Passenger
from app.model import load_model
from app.predict import predict_survival

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()

@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/predict")
def predict(data: Passenger):
    return predict_survival(model, data)


try:
    model = load_model()
except Exception as e:
    import sys
    print("Model loading failed:", e, file=sys.stderr)
    raise e
