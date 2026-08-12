# PackVote

PackVote is a full-stack group travel recommendation platform that helps groups find a common travel destination based on everyone's preferences.

PackVote uses a tuned **Gradient Boosting Classifier** built with `scikit-learn` to predict individual destination preferences.

- **23 destination classes**
- **10 user preference features**
- **~72% test accuracy**
- Benchmarked against:
  - XGBoost
  - Random Forest
  - SVM
  - Logistic Regression
  - Decision Tree

For each user, the model generates the **Top-3 destination predictions**. These predictions are then combined using a **majority-voting mechanism** to determine the group's consensus destination.

The trained model and preprocessing artifacts are served through a **Flask REST API** and integrated with the React frontend through the Node.js/Express backend.

## Links

- **Live Demo:** https://packvote-project.onrender.com
- **GitHub:** https://github.com/kashish100-max/PackVote_Project.git


## Features

- Create and join trips using a unique trip code
- Collect individual travel preferences
- ML-based destination recommendations
- Top-3 majority voting for group consensus
- Recommendation percentages
- AI-generated personalized itineraries using Gemini
- AI travel chatbot
- MongoDB Atlas database
- Responsive React frontend

## How It Works

```text
Users
  ↓
Travel Preferences
  ↓
ML Model
  ↓
Individual Top-3 Recommendations
  ↓
Majority Voting
  ↓
Group Best Match
  ↓
Gemini AI
  ↓
Personalized Itinerary
```

## Tech Stack

### Frontend
- React
- Vite
- Tailwind CSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Axios

### Machine Learning
- Python
- Flask
- scikit-learn
- Pandas
- NumPy
- Joblib
- Gradient Boosting Classifier

### AI
- Google Gemini API


## Project Structure

```text
PackVote_Project/
│
├── Backend/
│   ├── models/
│   │   ├── Preference.js
│   │   └── Trip.js
│   │
│   ├── routes/
│   │   ├── preferences.js
│   │   ├── trips.js
│   │   └── chat.js
│   │
│   ├── services/
│   │   └── itineraryService.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── ml_api/
│   ├── app.py
│   ├── model.pkl
│   ├── target_encoder.pkl
│   ├── feature_columns.pkl
│   └── requirements.txt
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── public/
│
├── package.json
├── package-lock.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## Author

**Kashish Sharma**