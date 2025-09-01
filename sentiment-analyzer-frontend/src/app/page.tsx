"use client";

import { useState } from "react";
import UploadVideo from "~/components/client/UploadVideo";
import { Inference } from "~/components/client/Inference";
import Navbar from "~/components/client/Navbar";
import LogViewer from "~/components/client/LogViewer";
import Settings from "~/components/client/Settings";
import ClientOnly from "~/components/client/ClientOnly";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalysis = (analysisData: any) => {
    setAnalysis(analysisData);
    setActiveTab('analysis'); // Automatically switch to analysis tab
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Video Sentiment AI
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                  Advanced Machine Learning-powered video analysis with real-time sentiment detection, 
                  emotion classification, and AI explainability
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  🚀 Get Started
                </div>
                <div className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-8 py-3 rounded-full font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300">
                  📚 Learn More
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎥</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Real-time Analysis
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Process videos instantly with our advanced ML pipeline
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  AI Explainability
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Understand how AI makes decisions with detailed insights
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Multi-modal Analysis
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Visual, audio, and speech analysis in one platform
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Detailed Logs
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Track every step of the analysis process
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  High Performance
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Optimized for speed and accuracy
                </p>
              </div>

              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  Beautiful UI
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Modern, responsive design for the best user experience
                </p>
              </div>
            </div>

            {/* Upload Section */}
            <div className="bg-gradient-to-r from-slate-50 to-purple-50 dark:from-slate-800 dark:to-purple-900/20 p-8 rounded-2xl border border-purple-200 dark:border-purple-700/30">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Ready to Analyze?
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Upload your first video and experience the power of AI
                </p>
              </div>
              <ClientOnly>
                <UploadVideo apiKey="demo-key" onAnalysis={handleAnalysis} />
              </ClientOnly>
            </div>
          </div>
        );

      case 'upload':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Upload Video for Analysis
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Select a video file to begin real-time ML analysis
              </p>
            </div>
            <ClientOnly>
              <UploadVideo apiKey="demo-key" onAnalysis={handleAnalysis} />
            </ClientOnly>
          </div>
        );

      case 'analysis':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Analysis Results
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Detailed insights from your video analysis
              </p>
            </div>
            {analysis ? (
              <ClientOnly>
                <Inference analysis={analysis} />
              </ClientOnly>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-500 dark:text-slate-400">
                  No analysis data available. Please upload a video first.
                </p>
              </div>
            )}
          </div>
        );

      case 'logs':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                ML Analysis Logs
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Monitor the analysis process in real-time
              </p>
            </div>
            <ClientOnly>
              <LogViewer />
            </ClientOnly>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Application Settings
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                Customize your experience and preferences
              </p>
            </div>
            <ClientOnly>
              <Settings />
            </ClientOnly>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <ClientOnly>
        <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      </ClientOnly>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
}