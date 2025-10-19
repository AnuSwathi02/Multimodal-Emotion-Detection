# 🎬 Video Sentiment Analyzer

## 📌 Overview

The **Video Sentiment Analyzer** processes video inputs to output sentiment and emotion predictions. It employs a multimodal deep learning model that extracts and combines features from audio, text, and visual data.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
python setup.py
```

### Option 2: Manual Setup

#### 1. Install Python Dependencies
```bash
pip install -r requirements.txt
```

#### 2. Install Frontend Dependencies
```bash
cd sentiment-analyzer-frontend
npm install
cd ..
```

#### 3. Start the Application

**Option A: Simple Startup Script**
```bash
python start_local.py
```

**Option B: Windows Batch File**
```bash
start_local.bat
```

**Option C: Manual Startup**
```bash
# Terminal 1 - Start ML Backend
python ml_backend_enhanced.py

# Terminal 2 - Start Frontend
cd sentiment-analyzer-frontend
npm run dev
```

#### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 🧠 Model Architecture

The architecture separates video inputs into three modalities:

* **Audio**: Extracted using FFmpeg and processed through a simple neural network.
* **Text**: Transcribed from audio and analyzed using a BERT-based model.
* **Visual**: Frames extracted from videos and processed using a ResNet model.

The features from these modalities are concatenated and passed through fully connected layers to predict sentiment and emotion labels.

## 🗂 Dataset: MELD (Multimodal EmotionLines Dataset)

The project utilizes the [MELD dataset](https://affective-meld.github.io/), an extension of the EmotionLines dataset. MELD contains over 13,000 utterances from 1,433 dialogues sourced from the TV series *Friends*. Each utterance is annotated with one of seven emotions: Anger, Disgust, Sadness, Joy, Neutral, Surprise, and Fear, as well as sentiment labels: positive, negative, or neutral.

## 🛠️ Technologies Used

* **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
* **Backend**: Flask 3.0, Python 3.8+
* **ML Framework**: PyTorch 2.5, Transformers 4.47
* **Computer Vision**: OpenCV 4.10, scikit-image 0.22
* **Audio Processing**: librosa 0.10, pydub 0.25, SpeechRecognition 3.10
* **Cloud**: AWS SageMaker, S3, EC2

## 📁 Project Structure

```
Predictive Project/
├── requirements.txt              # Python dependencies
├── setup.py                     # Automated setup script
├── ml_backend_enhanced.py       # ML backend (main)
├── start_local.py               # Local startup script
├── start_local.bat              # Windows startup script
├── sentiment-analyzer-frontend/ # Next.js frontend application
├── training/                    # Model training scripts
├── deployment/                  # AWS deployment files
└── dataset/                     # MELD dataset
```

## ✨ Features

- **Real-time Video Analysis**: Upload videos and get instant emotion/sentiment analysis
- **Multimodal Processing**: Combines audio, visual, and textual cues
- **AI Explainability**: Understand how the AI makes decisions
- **Multiple Emotions**: Rich emotional analysis with confidence scores
- **Interactive UI**: Modern, responsive web interface
- **Comprehensive Logging**: All analysis logged for debugging and research

## 🔧 API Endpoints

- `POST /analyze` - Upload and analyze video files
- `GET /health` - Health check endpoint
- `GET /logs` - View analysis logs
- `GET /` - API information

## 📊 Model Training & Deployment

* **Training**: The multimodal model is trained on AWS SageMaker, utilizing the MELD dataset.
* **Deployment**: The trained model is deployed and integrated into the Flask application for real-time inference.
* **Logging**: Training metrics and logs are monitored using TensorBoard.

## 🎯 Usage

1. **Start the application** using one of the startup methods above
2. **Open your browser** and go to http://localhost:3000
3. **Upload a video** using the drag-and-drop interface
4. **View results** including emotions, sentiments, and explanations
5. **Check logs** for detailed analysis information

## 📝 Requirements

- Python 3.8+
- Node.js 16+
- Modern web browser
- FFmpeg (for audio processing)

## 🤝 Contributing

This project is designed for research and educational purposes. Feel free to explore the code and adapt it for your needs.

## 📄 License

This project is for educational and research purposes.
