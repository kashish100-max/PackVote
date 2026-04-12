from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

# ===============================
# LOAD FILES (UPDATED)
# ===============================
model = joblib.load("model.pkl")
target_encoder = joblib.load("target_encoder.pkl")
feature_columns = joblib.load("feature_columns.pkl")

# ===============================
# ROUTE
# ===============================
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    # convert to dataframe
    df = pd.DataFrame([data])

    # ===============================
    # APPLY SAME ONE-HOT ENCODING
    # ===============================
    df = pd.get_dummies(df)

    # ===============================
    # MATCH TRAINING COLUMNS
    # ===============================
    df = df.reindex(columns=feature_columns, fill_value=0)

    # ===============================
    # PREDICT
    # ===============================
    probs = model.predict_proba(df)[0]

    # top 3 predictions
    top3 = probs.argsort()[-3:][::-1]
    destinations = target_encoder.inverse_transform(top3)

    return jsonify({
        "recommendations": list(destinations)
    })

# ===============================
# RUN APP
# ===============================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)