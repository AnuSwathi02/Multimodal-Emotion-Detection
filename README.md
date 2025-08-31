# 🎯 **Multimodal Emotion Detection - AI-Powered Video Analysis Platform**

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black)](https://nextjs.org/)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://python.org/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-green)](https://flask.palletsprojects.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-3.0+-38B2AC)](https://tailwindcss.com/)

> **Advanced AI-powered video sentiment analysis application that combines cutting-edge machine learning with a modern, interactive web interface. Real-time video processing, emotion detection, and sentiment analysis using state-of-the-art AI models.**

---

## 📖 **Table of Contents**
- [🚀 Features](#-features)
- [🎯 Demo](#-demo)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Structure](#-project-structure)
- [⚡ Quick Start](#-quick-start)
- [🔧 Installation](#-installation)
- [�� UI/UX Features](#-uiux-features)
- [�� AI/ML Capabilities](#-aiml-capabilities)
- [📊 API Documentation](#-api-documentation)
- [�� Limitations](#-limitations)
- [🔮 Future Enhancements](#-future-enhancements)
- [🤝 Contributing](#-contributing)
- [�� License](#-license)

---

## 🚀 **Features**

### 🎬 **Advanced Video Analysis**
- **Real-time Processing**: Frame-by-frame video analysis with 25-frame sampling
- **Multi-modal Analysis**: Video + Audio + Speech recognition integration
- **Computer Vision**: Brightness, contrast, motion detection, edge analysis
- **Audio Processing**: Spectral analysis, tempo detection, energy levels, harmonic ratios
- **Speech Recognition**: Google Speech API integration with confidence scoring

### 🧠 **AI/ML Capabilities**
- **Emotion Detection**: 7+ emotion categories with confidence scores
- **Sentiment Analysis**: Advanced RoBERTa-based sentiment classification
- **Unique Results**: Every video gets completely different analysis based on content
- **AI Explainability**: Transparent decision-making process with confidence scores
- **Contextual Insights**: Video-specific analysis generation with unique characteristics

### 🎨 **Modern Web Interface**
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive UI**: Smooth animations, hover effects, and gradient backgrounds
- **Tab Navigation**: Home, Upload, Analysis, Logs, Settings with seamless switching
- **Real-time Logs**: Live monitoring of processing steps with search and filtering
- **Dark/Light Mode**: Theme customization support (planned)

### 📊 **Data Management**
- **Comprehensive Logging**: All operations tracked and searchable with timestamps
- **Export Capabilities**: Download analysis results and logs
- **Settings Management**: User preferences and application customization
- **Error Handling**: Graceful failure management with user-friendly messages

---

## 🎯 **Demo**

### �� **Screenshots**

<details>
<summary>🎨 Main Interface</summary>

![Main Interface](https://via.placeholder.com/800x400/1F2937/FFFFFF?text=Main+Interface+with+Tab+Navigation)

- **Tab-based navigation** with Home, Upload Video, Analysis, Logs, and Settings
- **Modern gradient design** with interactive elements
- **Responsive layout** that works on all devices

</details>

<details>
<summary>📤 Video Upload</summary>

![Video Upload](https://via.placeholder.com/800x400/059669/FFFFFF?text=Video+Upload+Interface)

- **Drag-and-drop** video upload functionality
- **Real-time processing** status updates
- **File validation** and error handling

</details>

<details>
<summary>�� Analysis Results</summary>

![Analysis Results](https://via.placeholder.com/800x400/7C3AED/FFFFFF?text=Analysis+Results+Display)

- **Emotion detection** with confidence scores
- **Sentiment analysis** with multiple perspectives
- **Technical details** about video and audio features
- **AI explainability** showing decision reasoning

</details>

<details>
<summary>📝 Real-time Logs</summary>

![Log Viewer](https://via.placeholder.com/800x400/DC2626/FFFFFF?text=Real-time+Log+Viewer)

- **Live log streaming** with auto-refresh
- **Search and filter** capabilities
- **Download logs** functionality
- **Error tracking** and monitoring

</details>

---

## 🛠️ **Tech Stack**

### ��️ **Frontend**
- **Framework**: Next.js 15.5.2 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Icons**: React Icons (Feather Icons)
- **State Management**: React Hooks
- **Build Tool**: Turbopack

### 🐍 **Backend**
- **Framework**: Flask (Python)
- **ML Libraries**: Transformers, OpenCV, librosa, scikit-image
- **Speech Recognition**: Google Speech API
- **Computer Vision**: OpenCV, scikit-image
- **Audio Processing**: librosa, pydub

### ��️ **Database**
- **ORM**: Prisma
- **Database**: SQLite (development)
- **Schema**: User, VideoFile, ApiQuota models

### 🚀 **Deployment**
- **Frontend**: Vercel/Netlify ready
- **Backend**: Docker containerization support
- **Database**: PostgreSQL (production)

---

## 📁 **Project Structure**

```
Video-Sentiment-Analyzer/
├── 🐍 Python ML Backend (Flask)
├── ⚛️  Next.js Frontend (React + TypeScript)
├── ��️  Database (Prisma + SQLite)
└── 🎨 Modern UI (Tailwind CSS)

📁 Root Level (Video-Sentiment-Analyzer/)
├── 📄 ml_backend.py                    # 🚀 Main Python ML Server (765 lines)
├── 📄 ml_backend_enhanced.py           # 🔥 Enhanced version with advanced features
├── 📄 ml_analysis.log                  # �� Real-time analysis logs
├── �� train_sagemaker.py               # 🤖 AWS SageMaker training script
├── 📄 README.md                        # 📖 Project documentation
├── �� sentiment-analyzer-frontend/     # 🌐 Next.js Frontend Application
├── 📁 dataset/                         # �� Training datasets
├── 📁 training/                        # 🎯 Model training scripts
├── 📁 deployment/                      # 🚀 Deployment configurations
└── 📁 __pycache__/                     # �� Python cache files

🌐 Frontend Application (sentiment-analyzer-frontend/)
├── 📁 src/                             # 🎯 Source Code
│   ├── 📁 app/                         # ⚛️ Next.js App Router
│   ├── 📁 components/                  # �� React Components
│   ├── 📁 lib/                         # �� Utility Libraries
│   ├── 📁 actions/                     # ⚡ Server Actions
│   ├── 📁 schemas/                     # 📋 Data Validation
│   └── 📁 styles/                      # 🎨 Styling
├── 📁 prisma/                          # ��️ Database Schema
├── 📁 public/                          # 🌍 Static Assets
├── 📁 local-uploads/                   # �� Local File Storage
├── 📄 package.json                     # 📦 Dependencies & Scripts
├── �� tailwind.config.ts               # 🎨 Tailwind CSS Configuration
├── ⚙️ next.config.js                   # ⚙️ Next.js Configuration
└── 🔧 tsconfig.json                    # 🔧 TypeScript Configuration

📱 App Router Structure (src/app/)
├── 📄 page.tsx                         # 🏠 Main Application Page (218 lines)
├── 📄 layout.tsx                       # 🎨 Root Layout Component
├── 📄 globals.css                      # �� Global Styles (392 lines)
├── 📁 api/                             # �� API Routes
│   ├── 📄 upload/route.ts              # 📤 File Upload Handler
│   ├── 📄 sentiment-inference/route.ts # �� Sentiment Analysis API
│   └── 📄 mock-upload/[id]/route.ts    # 🎭 Mock Upload Endpoint
├── 📁 login/                           # 🔐 Authentication Pages
└── 📁 signup/                          # �� Registration Pages

�� React Components (src/components/client/)
├── 📄 Navbar.tsx                       # 🧭 Navigation Bar (110 lines)
├── 📄 UploadVideo.tsx                  # 📤 Video Upload Component (88 lines)
├── 📄 Inference.tsx                    # 📊 Analysis Results Display (317 lines)
├── 📄 LogViewer.tsx                    # 📝 Real-time Log Viewer (281 lines)
├── 📄 Settings.tsx                     # ⚙️ Application Settings (273 lines)
├── 📄 code-examples.tsx                # �� Code Documentation
├── 📄 copy-button.tsx                  # �� Copy Functionality
└── 📄 signout.tsx                      # 🚪 Authentication
```

---

## ⚡ **Quick Start**

### �� **Prerequisites**
- Node.js 18+ and npm
- Python 3.8+
- Git

### �� **Installation**

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/multimodal-emotion-detection.git
cd multimodal-emotion-detection
```

2. **Setup Frontend**
```bash
cd sentiment-analyzer-frontend
npm install
npm run dev
```

3. **Setup Backend**
```bash
cd ..
pip install -r requirements.txt
python ml_backend.py
```

4. **Access the Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## 🎨 **UI/UX Features**

### �� **Design System**
- **Framework**: Tailwind CSS with custom animations
- **Theme**: Dark/Light mode support (planned)
- **Responsive**: Mobile-first design approach
- **Animations**: Smooth transitions and hover effects
- **Gradients**: Modern gradient backgrounds and buttons

### 🧭 **Navigation**
- **Tab-based Interface**: Home, Upload, Analysis, Logs, Settings
- **Responsive Navbar**: Mobile-friendly navigation
- **Breadcrumb Navigation**: Clear user journey tracking

### 📊 **Data Visualization**
- **Progress Bars**: Confidence score visualization
- **Emoji Indicators**: Emotion and sentiment representation
- **Real-time Updates**: Live log streaming
- **Interactive Charts**: Dynamic data presentation

---

## 🤖 **AI/ML Capabilities**

### 🧠 **ML Backend Architecture**

```python
# 🎯 Main Analysis Pipeline
analyze_video()                    # Main video processing endpoint
├── analyze_video_frames()         # Computer vision analysis
├── analyze_audio()                # Audio feature extraction
├── extract_speech()               # Speech recognition
├── generate_unique_contextual_analysis()  # Contextual insights
└── combine_analyses()             # Final result compilation

# 🧠 AI Models Used:
├── sentiment_analyzer             # RoBERTa-based sentiment analysis
├── emotion_classifier             # DistilRoBERTa emotion detection
├── OpenCV                         # Computer vision processing
├── librosa                        # Audio analysis
└── Google Speech Recognition      # Speech-to-text conversion
```

### 📊 **Analysis Features**
- **Video Analysis**: Frame-by-frame processing, motion detection, color analysis
- **Audio Analysis**: Spectral features, tempo detection, energy analysis
- **Speech Recognition**: Real-time transcription with confidence scoring
- **Emotion Detection**: Multi-label emotion classification
- **Sentiment Analysis**: Advanced sentiment scoring with context
- **AI Explainability**: Detailed reasoning for AI decisions

---

## 📊 **API Documentation**

### 🔌 **Endpoints**

#### `POST /analyze`
Upload and analyze a video file.

**Request:**
```bash
curl -X POST http://localhost:5000/analyze \
  -F "video=@your_video.mp4"
```

**Response:**
```json
{
  "video_id": "a1b2c3d4",
  "analysis": {
    "utterances": [
      {
        "start_time": 0.0,
        "end_time": 5.0,
        "text": "Extracted speech text",
        "emotions": [
          {
            "label": "joy",
            "confidence": 0.85,
            "source": "primary_classifier"
          }
        ],
        "sentiments": [
          {
            "label": "positive",
            "confidence": 0.92,
            "source": "primary_analysis"
          }
        ]
      }
    ]
  },
  "video_analysis": {
    "brightness": 128.5,
    "contrast": 45.2,
    "motion_score": 23.1
  },
  "audio_analysis": {
    "energy": 0.75,
    "tempo": 128.0,
    "duration": 5.0
  }
}
```

#### `GET /health`
Check backend health status.

#### `GET /logs`
Retrieve analysis logs.

---

## 🚧 **Limitations**

### 🐍 **Python Backend Limitations**
- **Single-threaded Processing**: Can only process one video at a time
- **Memory Constraints**: Large videos may cause memory issues
- **Model Loading**: High RAM usage (2-4GB for models)
- **Speech Recognition**: Requires internet connection for Google Speech API

### 🌐 **Frontend Limitations**
- **File Upload**: No file size validation or progress tracking
- **Real-time Updates**: Polling-based updates (every 10 seconds)
- **Browser Compatibility**: Limited mobile optimization

### 🤖 **AI/ML Limitations**
- **Processing Quality**: Samples only 25 frames for analysis
- **Visual Analysis**: Basic computer vision features only
- **Emotion Detection**: Limited to 7 basic emotion categories
- **Context Understanding**: No sarcasm detection or cultural context

### 📊 **Performance Limitations**
- **Processing Time**: 30-60 seconds for 1-minute videos
- **Resource Usage**: High CPU usage, no GPU acceleration
- **Storage**: No persistent video storage or cloud integration

---

## 🔮 **Future Enhancements**

### ⚡ **Short-term Improvements**
- **Performance**: Add video size limits and progress tracking
- **User Experience**: Implement real-time updates and file validation
- **Security**: Add file scanning and data encryption
- **Testing**: Implement comprehensive test coverage

### 🚀 **Long-term Enhancements**
- **Scalability**: Implement microservices and load balancing
- **AI/ML**: Add facial expression analysis and scene detection
- **Multi-language**: Support for multiple languages
- **Cloud Integration**: AWS S3 storage and SageMaker deployment

---

## �� **Contributing**

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### 🛠️ **Development Setup**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### 📋 **Code Style**
- Follow TypeScript/ESLint rules
- Use Prettier for code formatting
- Write meaningful commit messages
- Add documentation for new features

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 **Acknowledgments**

- **Hugging Face** for pre-trained models
- **Google Speech API** for speech recognition
- **OpenCV** for computer vision capabilities
- **librosa** for audio processing
- **Next.js** and **React** for the frontend framework
- **Tailwind CSS** for styling

---

## 📞 **Contact**

- **GitHub**: [@AnuSwathi02](https://github.com/AnuSwathi02)
- **Email**: anuswathivr02@gmail.com
- **Project Link**: https://github.com/AnuSwathi02/Multimodal-Emotion-Detection

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

</div>
