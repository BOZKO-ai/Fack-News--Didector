// ===== DOM Elements =====
const newsText = document.getElementById('newsText');
const newsUrl = document.getElementById('newsUrl');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const resultCard = document.getElementById('resultCard');
const errorToast = document.getElementById('errorToast');
const errorMsg = document.getElementById('errorMsg');
const charCount = document.getElementById('charCount');
const verdictIcon = document.getElementById('verdictIcon');
const verdictText = document.getElementById('verdictText');
const confidenceFill = document.getElementById('confidenceFill');
const confidencePercent = document.getElementById('confidencePercent');
const suspiciousList = document.getElementById('suspiciousList');

// ===== Configuration =====
const API_URL = 'http://127.0.0.1:5000/predict';
let timeoutId = null;

// ===== Initialize Particles Animation =====
function createParticles() {
    const particlesDiv = document.createElement('div');
    particlesDiv.className = 'particles';
    document.body.appendChild(particlesDiv);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 4 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.opacity = Math.random() * 0.5;
        particlesDiv.appendChild(particle);
    }
}

// ===== Character Counter =====
newsText.addEventListener('input', function() {
    const count = this.value.length;
    charCount.textContent = count;
    
    if (count > 0 && count < 10) {
        charCount.style.color = '#ffb347';
    } else if (count >= 10) {
        charCount.style.color = '#ffd700';
    } else {
        charCount.style.color = '#808080';
    }
});

// ===== URL Auto-fetch (Optional Feature) =====
newsUrl.addEventListener('blur', async function() {
    const url = this.value.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        try {
            showToast('Fetching content from URL...', 'info');
            // Note: In production, you'd need a backend endpoint to fetch URL content
            // This is a placeholder for the demo
            setTimeout(() => {
                if (newsText.value.trim() === '') {
                    newsText.value = 'Sample news content extracted from URL would appear here. In production, implement a backend endpoint to fetch and extract article text.';
                    charCount.textContent = newsText.value.length;
                }
            }, 500);
        } catch (error) {
            console.error('URL fetch error:', error);
        }
    }
});

// ===== Suspicious Keywords Detection =====
function detectSuspiciousKeywords(text) {
    const suspiciousPatterns = [
        { pattern: /SHOCKING|URGENT|BREAKING|ALERT|EXCLUSIVE/gi, keyword: 'EXCESSIVE CAPITALS' },
        { pattern: /!!!|!!|!!!|!!!!/g, keyword: 'Multiple exclamation marks' },
        { pattern: /you won't believe|miracle cure|secret revealed|doctors hate|one weird trick/gi, keyword: 'Clickbait phrase' },
        { pattern: /conspiracy|cover[- ]?up|they don't want you to know|mainstream media|fake news/gi, keyword: 'Conspiracy language' },
        { pattern: /100% guaranteed|free|limited time|act now|don't miss/gi, keyword: 'Urgency/Scarcity' },
        { pattern: /crypto|bitcoin|make money fast|rich quick/gi, keyword: 'Financial scam indicator' },
        { pattern: /vaccine|5g|microchip|illuminati|new world order/gi, keyword: 'Common misinformation topic' }
    ];
    
    const detected = [];
    const lowerText = text.toLowerCase();
    
    suspiciousPatterns.forEach(({ pattern, keyword }) => {
        if (pattern.test(text)) {
            detected.push(keyword);
        }
    });
    
    // Check for excessive capital letters (more than 30% of text in caps)
    const capsCount = (text.match(/[A-Z]/g) || []).length;
    const totalLetters = (text.match(/[A-Za-z]/g) || []).length;
    if (totalLetters > 0 && capsCount / totalLetters > 0.3) {
        detected.push('Excessive capitalization');
    }
    
    // Check for text length (very short articles are suspicious)
    if (text.length < 100 && text.length > 10) {
        detected.push('Very short article content');
    }
    
    return [...new Set(detected)]; // Remove duplicates
}

// ===== Show Error Toast =====
function showToast(message, type = 'error') {
    errorMsg.textContent = message;
    errorToast.classList.remove('hidden');
    
    if (type === 'error') {
        errorToast.style.background = 'linear-gradient(135deg, #ff4444, #cc0000)';
    } else if (type === 'info') {
        errorToast.style.background = 'linear-gradient(135deg, #ffd700, #ffb347)';
        errorToast.style.color = '#0a0a0a';
    }
    
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        errorToast.classList.add('hidden');
    }, 5000);
}

// ===== Validate Input =====
function validateInput(text) {
    if (!text || text.trim().length === 0) {
        showToast('Please enter news content to analyze', 'error');
        return false;
    }
    
    if (text.trim().length < 10) {
        showToast('Please enter at least 10 characters for meaningful analysis', 'error');
        return false;
    }
    
    return true;
}

// ===== Update Result Display =====
function updateResultDisplay(result, confidence, suspiciousKeywords) {
    const isReal = result === 'REAL';
    
    // Update verdict
    if (isReal) {
        verdictIcon.textContent = '✅';
        verdictText.textContent = 'REAL NEWS';
        verdictText.style.color = '#4caf50';
        resultCard.style.borderLeftColor = '#4caf50';
    } else {
        verdictIcon.textContent = '⚠️';
        verdictText.textContent = 'FAKE NEWS';
        verdictText.style.color = '#ff4444';
        resultCard.style.borderLeftColor = '#ff4444';
    }
    
    // Update confidence with animation
    const confidencePercentValue = Math.round(confidence * 100);
    confidenceFill.style.width = `${confidencePercentValue}%`;
    confidencePercent.textContent = `${confidencePercentValue}%`;
    
    // Update suspicious keywords
    suspiciousList.innerHTML = '';
    if (suspiciousKeywords && suspiciousKeywords.length > 0) {
        suspiciousKeywords.forEach(keyword => {
            const li = document.createElement('li');
            li.textContent = keyword;
            suspiciousList.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No obvious suspicious patterns detected';
        li.style.opacity = '0.7';
        suspiciousList.appendChild(li);
    }
    
    // Animate result card
    resultCard.classList.remove('hidden');
    resultCard.style.animation = 'none';
    resultCard.offsetHeight; // Trigger reflow
    resultCard.style.animation = 'slideInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
}

// ===== Call Prediction API =====
async function predictNews(text) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ text: text.trim() })
        });
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to connect to the AI model server. Please ensure the backend is running on http://127.0.0.1:5000');
    }
}

// ===== Main Analysis Function =====
async function analyzeNews() {
    const text = newsText.value;
    
    // Validate input
    if (!validateInput(text)) {
        return;
    }
    
    // Show loading spinner
    loadingOverlay.classList.remove('hidden');
    
    // Hide previous result
    resultCard.classList.add('hidden');
    
    try {
        // Detect suspicious keywords (frontend check)
        const suspiciousKeywords = detectSuspiciousKeywords(text);
        
        // Call backend API
        const prediction = await predictNews(text);
        
        // Update UI with results
        updateResultDisplay(prediction.result, prediction.confidence, suspiciousKeywords);
        
        // Log to console (for debugging)
        console.log('Prediction:', prediction);
        
    } catch (error) {
        console.error('Analysis Error:', error);
        showToast(error.message, 'error');
        resultCard.classList.add('hidden');
    } finally {
        // Hide loading spinner
        loadingOverlay.classList.add('hidden');
    }
}

// ===== Keyboard Shortcut (Ctrl+Enter) =====
newsText.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        analyzeNews();
    }
});

// ===== Button Click Handler =====
analyzeBtn.addEventListener('click', analyzeNews);

// ===== Sample News for Testing (Optional) =====
function loadSampleNews() {
    const sampleText = "BREAKING: SHOCKING discovery! Scientists reveal that drinking lemon water cures all diseases! You won't believe what happens next!!! This miracle cure has been hidden by the government for decades. Act now and get your free trial!";
    newsText.value = sampleText;
    charCount.textContent = sampleText.length;
}

// Add sample button if needed (optional feature)
const addSampleButton = () => {
    const sampleBtn = document.createElement('button');
    sampleBtn.textContent = '📋 Load Sample';
    sampleBtn.style.cssText = `
        background: rgba(255, 215, 0, 0.1);
        border: 1px solid rgba(255, 215, 0, 0.3);
        color: #ffd700;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        cursor: pointer;
        font-size: 0.85rem;
        margin-left: 1rem;
        transition: all 0.3s ease;
    `;
    sampleBtn.onmouseenter = () => {
        sampleBtn.style.background = 'rgba(255, 215, 0, 0.2)';
        sampleBtn.style.transform = 'translateY(-1px)';
    };
    sampleBtn.onmouseleave = () => {
        sampleBtn.style.background = 'rgba(255, 215, 0, 0.1)';
        sampleBtn.style.transform = 'translateY(0)';
    };
    sampleBtn.onclick = loadSampleNews;
    
    const actionArea = document.querySelector('.action-area');
    actionArea.appendChild(sampleBtn);
};

// ===== Initialize Application =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    addSampleButton();
    
    // Add focus animations
    const inputs = document.querySelectorAll('textarea, input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'scale(1.01)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'scale(1)';
        });
    });
    
    console.log('Fake News Detector initialized. Ready for analysis!');
});

// ===== Connection Check (Optional) =====
async function checkBackendConnection() {
    try {
        const response = await fetch(API_URL, {
            method: 'OPTIONS',
            mode: 'cors'
        });
        console.log('Backend connection successful');
    } catch (error) {
        console.warn('Backend not reachable. Please start the Flask server.');
        setTimeout(() => {
            showToast('⚠️ Backend server not detected. Please run: python backend/app.py', 'error');
        }, 1000);
    }
}

// Check connection after 2 seconds
setTimeout(checkBackendConnection, 2000);