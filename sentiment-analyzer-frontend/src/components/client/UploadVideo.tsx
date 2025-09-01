"use client";

import { useState, useRef } from "react";
import type { Analysis } from "./Inference";
import VideoPlayer from "./VideoPlayer";

interface UploadVideoProps {
  apiKey: string;
  onAnalysis: (analysis: Analysis) => void;
}

export default function UploadVideo({ apiKey, onAnalysis }: UploadVideoProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "analyzing">("idle");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      // Create video URL for preview
      const url = URL.createObjectURL(selectedFile);
      setVideoUrl(url);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setStatus("uploading");
      setAnalysisProgress("Preparing video for analysis...");

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('video', file);
      
      setStatus("analyzing");
      setAnalysisProgress("Extracting video frames and analyzing visual content...");

      // Call local Python ML backend
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to analyze video');
      }

      setAnalysisProgress("Processing audio and extracting speech...");
      
      const analysis = await response.json();
      console.log("ML Analysis Result: ", analysis);
      
      setAnalysisProgress("Generating comprehensive analysis...");
      
      onAnalysis(analysis);
      setStatus("idle");
      setAnalysisProgress("");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("idle");
      setAnalysisProgress("");
      alert("Upload failed: " + (error as Error).message);
    }
  };

  const clearVideo = () => {
    setFile(null);
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
      setVideoUrl(null);
    }
    setStatus("idle");
    setAnalysisProgress("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Enhanced Video Player */}
      {videoUrl && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            🎥 Video Analysis Player
          </h3>
          
          <VideoPlayer
            videoUrl={videoUrl}
            isAnalyzing={status === "analyzing"}
            analysisProgress={analysisProgress}
            onVideoEnd={() => console.log("Video ended")}
          />
          
          {/* Video Info */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-700 dark:text-slate-300">File Name</div>
              <div className="text-slate-600 dark:text-slate-400 truncate">{file?.name}</div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-700 dark:text-slate-300">File Size</div>
              <div className="text-slate-600 dark:text-slate-400">
                {file?.size ? (file.size / (1024 * 1024)).toFixed(2) : 'N/A'} MB
              </div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-700 dark:text-slate-300">Type</div>
              <div className="text-slate-600 dark:text-slate-400">{file?.type}</div>
            </div>
            <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="font-medium text-slate-700 dark:text-slate-300">Status</div>
              <div className={`font-medium ${
                status === 'idle' ? 'text-green-600 dark:text-green-400' :
                status === 'uploading' ? 'text-yellow-600 dark:text-yellow-400' :
                'text-blue-600 dark:text-blue-400'
              }`}>
                {status === 'idle' ? 'Ready' : 
                 status === 'uploading' ? 'Uploading' : 'Analyzing'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Progress */}
      {status === "analyzing" && analysisProgress && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700/30">
          <div className="flex items-center space-x-3 mb-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              🔍 AI Analysis in Progress
            </h3>
          </div>
          <p className="text-blue-800 dark:text-blue-200 mb-4">{analysisProgress}</p>
          <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-2">
            This may take a few moments depending on video length and complexity...
          </p>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-purple-400 dark:hover:border-purple-500 transition-colors">
        <label className="block cursor-pointer">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={status !== "idle"}
          />
          <div className="text-center space-y-4">
            {!videoUrl ? (
              <>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">🎥</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {status === "uploading"
                    ? "Uploading..."
                    : status === "analyzing"
                    ? "Analyzing with ML..."
                    : "Upload a video"}
                </h3>
                <p className="text-center text-xs text-gray-500">
                  Get started with real ML-powered sentiment detection by uploading a video.
                </p>
              </>
            ) : (
              <>
                <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">✅</span>
                </div>
                <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
                  Video Ready for Analysis
                </h3>
                <p className="text-center text-xs text-gray-500">
                  Click "Analyze Video" to start ML-powered sentiment analysis
                </p>
              </>
            )}
          </div>
        </label>

        {/* Action Buttons */}
        {videoUrl && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleUpload}
              disabled={status !== "idle"}
              className={`px-8 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 ${
                status !== "idle"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              }`}
            >
              {status === "uploading" ? "Uploading..." : 
               status === "analyzing" ? "Analyzing..." : "🚀 Analyze Video"}
            </button>
            
            <button
              onClick={clearVideo}
              disabled={status !== "idle"}
              className={`px-6 py-3 rounded-full font-semibold border transition-all duration-300 ${
                status !== "idle"
                  ? "border-gray-300 text-gray-400 cursor-not-allowed"
                  : "border-slate-300 text-slate-600 hover:border-red-300 hover:text-red-600"
              }`}
            >
              🗑️ Clear Video
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
          📋 How it works:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">1.</span>
            <span className="text-slate-600 dark:text-slate-400">Upload your video file (MP4, AVI, MOV, etc.)</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">2.</span>
            <span className="text-slate-600 dark:text-slate-400">Watch your video while AI analyzes it in real-time</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-500 font-bold">3.</span>
            <span className="text-slate-600 dark:text-slate-400">Get comprehensive sentiment and emotion analysis</span>
          </div>
        </div>
      </div>
    </div>
  );
}
