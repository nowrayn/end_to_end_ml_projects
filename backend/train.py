import pandas as pd
import joblib
import os
import joblib

from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.ensemble import RandomForestClassifier

df = pd.read_csv("titanic.csv")

X = df.drop("Survived", axis=1)
y = df["Survived"]

num_features = ["Age", "SibSp", "Parch", "Fare"]
cat_features = ["Pclass", "Sex", "Embarked"]

preprocessor = ColumnTransformer([
    ("num", StandardScaler(), num_features),
    ("cat", OneHotEncoder(handle_unknown="ignore"), cat_features)
])

pipeline = Pipeline([
    ("preprocessor", preprocessor),
    ("model", RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ))
])

pipeline.fit(X, y)

# create directory if it doesn't exist
# os.makedirs("backend/artifacts", exist_ok=True)
joblib.dump(pipeline, "artifacts/titanic_pipeline.pkl")
