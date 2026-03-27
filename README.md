# 🚀 Fake News Detection Web Application

[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com/)
[![scikit-learn](https://img.shields.io/badge/scikit--learn-1.3.0-orange.svg)](https://scikit-learn.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> An AI-powered web application that detects fake news using Machine Learning with 92% accuracy. Built with Flask backend, scikit-learn ML model, and modern responsive frontend.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation Guide](#installation-guide)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Model Details](#model-details)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

In today's digital age, misinformation spreads rapidly across social media and news platforms. This **Fake News Detection Web Application** leverages **Machine Learning** and **Natural Language Processing** to automatically classify news articles as **REAL** or **FAKE** with high accuracy.

The system uses:
- **TF-IDF Vectorization** for feature extraction
- **Logistic Regression** algorithm for classification
- **Flask REST API** for backend services
- **Modern responsive UI** with real-time feedback

## ✨ Features

### Core Features
- ✅ **Real-time News Classification** - Instantly detect fake news
- ✅ **Confidence Score** - See prediction confidence percentage
- ✅ **Suspicious Keyword Detection** - Identify clickbait and misinformation patterns
- ✅ **REST API** - Easy integration with other applications
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop

### Technical Features
- 🤖 **Machine Learning Model** - Logistic Regression with TF-IDF
- 🎨 **Dark Theme UI** - Professional gold-accented design
- ⚡ **Smooth Animations** - Loading spinners, transitions, hover effects
- 📊 **Confidence Visualization** - Animated progress bar
- 🔍 **Error Handling** - Comprehensive error messages
- ⌨️ **Keyboard Shortcuts** - Ctrl+Enter to analyze

### Advanced Features
- 🔗 **URL Input Support** - Paste article URLs
- 📝 **Character Counter** - Real-time input monitoring
- 🎯 **Sample Data Loader** - One-click test examples
- 📱 **Mobile Optimized** - Touch-friendly interface

## 🛠️ Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Frontend** | HTML5, CSS3, JavaScript | - |
| **Backend** | Python Flask | 2.3.3 |
| **ML Framework** | scikit-learn | 1.3.0 |
| **Vectorization** | TF-IDF | - |
| **Algorithm** | Logistic Regression | - |
| **Data Processing** | Pandas, NumPy | 2.0.3, 1.24.3 |
| **Model Persistence** | joblib | 1.3.2 |
| **NLP** | NLTK | 3.8.1 |

## 📥 Installation Guide

### Prerequisites
- **Python 3.11** or higher
- **pip** package manager
- **Git** (optional, for cloning)
- Modern web browser (Chrome, Firefox, Edge)

### Step 1: Clone the Repository

```bash
# Using Git
git clone https://github.com/yourusername/fake-news-detector.git
cd fake-news-detector

# Or download ZIP and extract
