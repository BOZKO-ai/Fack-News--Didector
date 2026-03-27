from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

app = Flask(__name__)
CORS(app)

print("Loading model...")
model = joblib.load('models/model.pkl')
vectorizer = joblib.load('models/vectorizer.pkl')
print("Model loaded!")

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    return text

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    text = data.get('text', '')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    cleaned = preprocess_text(text)
    vec = vectorizer.transform([cleaned])
    pred = model.predict(vec)[0]
    
    proba = model.predict_proba(vec)[0]
    if pred == 'REAL':
        confidence = proba[0]
    else:
        confidence = proba[1]
    
    return jsonify({
        'result': pred,
        'confidence': float(confidence)
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)