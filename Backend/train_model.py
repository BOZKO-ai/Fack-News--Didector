import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib
import os
import re

print("=" * 50)
print("Fake News Detection Model Training")
print("=" * 50)

# Sample dataset
news_data = [
    ("The Federal Reserve announced today that interest rates will remain unchanged, citing stable economic growth.", "REAL"),
    ("NASA successfully launched the Artemis mission to the Moon, marking a new era of space exploration.", "REAL"),
    ("Scientists discover new species of deep-sea fish in the Pacific Ocean.", "REAL"),
    ("Global climate summit reaches agreement on reducing carbon emissions by 2030.", "REAL"),
    ("New study shows regular exercise improves mental health and cognitive function.", "REAL"),
    ("Tech company releases breakthrough battery technology that charges in under 5 minutes.", "REAL"),
    ("SHOCKING: Government secretly adds mind-control chemicals to drinking water! Scientists confirm!", "FAKE"),
    ("You won't believe what this celebrity did! The truth will shock you! Click here for exclusive photos!", "FAKE"),
    ("Miracle cure discovered: Drink this juice to reverse aging and cure cancer instantly!", "FAKE"),
    ("BREAKING: World leaders agree to create one world government, end all national sovereignty!!!", "FAKE"),
    ("CONSPIRACY: 5G towers are spreading COVID-19, doctors hate this simple truth!", "FAKE"),
    ("URGENT: Secret alien base discovered on Mars! NASA is hiding the truth!", "FAKE"),
]

def preprocess_text(text):
    """Clean and preprocess text"""
    if not isinstance(text, str):
        text = str(text)
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    text = ' '.join(text.split())
    return text

# Create dataframe
print("\n[1] Loading dataset...")
df = pd.DataFrame(news_data, columns=['text', 'label'])
print(f"    Total samples: {len(df)}")
print(f"    REAL: {len(df[df['label'] == 'REAL'])}")
print(f"    FAKE: {len(df[df['label'] == 'FAKE'])}")

# Preprocess
print("\n[2] Preprocessing text...")
df['cleaned_text'] = df['text'].apply(preprocess_text)

# Split data
print("\n[3] Splitting data...")
X_train, X_test, y_train, y_test = train_test_split(
    df['cleaned_text'], 
    df['label'], 
    test_size=0.2, 
    random_state=42
)
print(f"    Training samples: {len(X_train)}")
print(f"    Testing samples: {len(X_test)}")

# Create TF-IDF features
print("\n[4] Creating TF-IDF features...")
vectorizer = TfidfVectorizer(
    max_features=5000,
    stop_words='english',
    ngram_range=(1, 2)
)
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)
print(f"    Features: {X_train_tfidf.shape[1]}")

# Train model
print("\n[5] Training Logistic Regression model...")
model = LogisticRegression(
    C=1.0,
    max_iter=1000,
    random_state=42
)
model.fit(X_train_tfidf, y_train)

# Evaluate
print("\n[6] Evaluating model...")
y_pred = model.predict(X_test_tfidf)
accuracy = accuracy_score(y_test, y_pred)
print(f"    Accuracy: {accuracy:.4f}")

# Save model
print("\n[7] Saving model...")
os.makedirs('models', exist_ok=True)
joblib.dump(model, 'models/model.pkl')
joblib.dump(vectorizer, 'models/vectorizer.pkl')
print("    ✓ model.pkl saved")
print("    ✓ vectorizer.pkl saved")

print("\n" + "=" * 50)
print("TRAINING COMPLETED SUCCESSFULLY!")
print("=" * 50)