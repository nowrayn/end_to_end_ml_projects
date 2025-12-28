import pandas as pd

def predict_survival(model, passenger):
    df = pd.DataFrame([passenger.dict()])
    prediction = model.predict(df)[0]
    probability = model.predict_proba(df)[0][1]

    return {
        "prediction": int(prediction),
        "survival_probability": round(float(probability), 3)
    }
