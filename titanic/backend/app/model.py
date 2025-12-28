import os
import joblib

def load_model():
    BASE_DIR = os.path.dirname(__file__)
    model_path = os.path.join(BASE_DIR, "../artifacts/titanic_pipeline.pkl")
    return joblib.load(model_path)
