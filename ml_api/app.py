from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)

model = joblib.load("model.pkl")
encoders = joblib.load("encoders.pkl")
target = joblib.load("target.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    df = pd.DataFrame([data])

    # encode
    for col in df.columns:
       if col in encoders:
        try:
            df[col] = encoders[col].transform(df[col])
        except:
            df[col] = 0   # fallback

    probs = model.predict_proba(df)[0]

    # top 3
    top3 = probs.argsort()[-3:][::-1]
    destinations = target.inverse_transform(top3)

    return jsonify({
        "recommendations": list(destinations)
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)