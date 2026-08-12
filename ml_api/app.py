from flask import Flask, request, jsonify
import joblib
import pandas as pd
import os

app = Flask(__name__)

# ==========================================
# BASE DIRECTORY
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


# ==========================================
# LOAD ML FILES
# ==========================================

model = joblib.load(
    os.path.join(BASE_DIR, "model.pkl")
)

target_encoder = joblib.load(
    os.path.join(BASE_DIR, "target_encoder.pkl")
)

feature_columns = joblib.load(
    os.path.join(BASE_DIR, "feature_columns.pkl")
)


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "success": True,
        "message": "PackVote ML API is running 🚀"
    })


# ==========================================
# PREDICTION ROUTE
# ==========================================

@app.route("/predict", methods=["POST"])
def predict():

    try:
        data = request.json

        if not data:
            return jsonify({
                "success": False,
                "error": "No input data provided"
            }), 400

        # Convert input to DataFrame
        df = pd.DataFrame([data])

        # Same encoding used during training
        df = pd.get_dummies(df)

        # Match training columns
        df = df.reindex(
            columns=feature_columns,
            fill_value=0
        )

        # Predict probabilities
        probs = model.predict_proba(df)[0]

        # Top 3 predictions
        top3 = probs.argsort()[-3:][::-1]

        destinations = target_encoder.inverse_transform(top3)

        return jsonify({
            "success": True,
            "recommendations": list(destinations)
        })

    except Exception as err:

        print("❌ ML prediction error:", str(err))

        return jsonify({
            "success": False,
            "error": str(err)
        }), 500


# ==========================================
# LOCAL DEVELOPMENT
# ==========================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=8000,
        debug=False
    )