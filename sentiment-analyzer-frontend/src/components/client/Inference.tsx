"use client";

import { useState } from "react";

const EMOTION_EMOJI: Record<string, string> = {
  anger: "😡",
  disgust: "🤢",
  fear: "😨",
  joy: "😄",
  neutral: "😐",
  sadness: "😢",
  surprise: "😲",
};

const SENTIMENT_EMOJI: Record<string, string> = {
  negative: "😡",
  neutral: "😐",
  positive: "😄",
};

interface InferenceProps {
  analysis: any;
}

export type Analysis = {
  video_id: string;
  analysis: {
    utterances: Array<{
      start_time: number;
      end_time: number;
      text: string;
      text_source: string;
      emotions: Array<{ 
        label: string; 
        confidence: number;
        source: string;
        id?: string;
      }>;
      sentiments: Array<{ 
        label: string; 
        confidence: number;
        id?: string;
      }>;
    }>;
  };
  video_analysis: any;
  audio_analysis: any;
  speech_analysis: any;
  processing_time: string;
  model_used: string;
  analysis_summary: string;
  explainability: any;
  unique_features: any;
};

export function Inference({ analysis }: InferenceProps) {
  const getAverageScores = () => {
    if (!analysis?.analysis?.utterances?.length) return null;

    // Aggregate all the scores
    const emotionScores: Record<string, number[]> = {};
    const sentimentScores: Record<string, number[]> = {};

    analysis.analysis.utterances.forEach((utterance: any) => {
      utterance.emotions?.forEach((emotion: any) => {
        if (!emotionScores[emotion.label]) emotionScores[emotion.label] = [];
        emotionScores[emotion.label]!.push(emotion.confidence);
      });
      utterance.sentiments?.forEach((sentiment: any) => {
        if (!sentimentScores[sentiment.label])
          sentimentScores[sentiment.label] = [];
        sentimentScores[sentiment.label]!.push(sentiment.confidence);
      });
    });

    // Calculate the average
    const avgEmotions = Object.entries(emotionScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    const avgSentiments = Object.entries(sentimentScores).map(
      ([label, scores]) => ({
        label,
        confidence: scores.reduce((a, b) => a + b, 0) / scores.length,
      }),
    );

    // Sort by confidence, get the top score
    const topEmotion = avgEmotions.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];
    const topSentiment = avgSentiments.sort(
      (a, b) => b.confidence - a.confidence,
    )[0];

    return { topEmotion, topSentiment };
  };

  const averages = getAverageScores();

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Video Analysis Results</h2>
        <p className="text-slate-600 dark:text-slate-400">Comprehensive ML-powered insights</p>
      </div>

      {/* Video ID and Processing Info */}
      {analysis?.video_id && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-slate-700 dark:text-slate-300">Video ID:</span>
              <span className="ml-2 text-slate-600 dark:text-slate-400 font-mono">{analysis.video_id}</span>
            </div>
            {analysis.model_used && (
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-300">Model:</span>
                <span className="ml-2 text-slate-600 dark:text-slate-400">{analysis.model_used}</span>
              </div>
            )}
            {analysis.processing_time && (
              <div>
                <span className="font-medium text-slate-700 dark:text-slate-300">Processed:</span>
                <span className="ml-2 text-slate-600 dark:text-slate-400">
                  {new Date(analysis.processing_time).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overall Analysis */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Overall Analysis</h3>
        {averages ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <span className="text-4xl block mb-2">
                {EMOTION_EMOJI[averages?.topEmotion?.label!] || "😐"}
              </span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                {averages.topEmotion?.label || "Unknown"}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 block">
                {Math.round((averages.topEmotion?.confidence || 0) * 100)}% confidence
              </span>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
              <span className="text-4xl block mb-2">
                {SENTIMENT_EMOJI[averages?.topSentiment?.label!] || "😐"}
              </span>
              <span className="text-lg font-semibold text-slate-900 dark:text-white">
                {averages.topSentiment?.label || "Unknown"}
              </span>
              <span className="text-sm text-slate-600 dark:text-slate-400 block">
                {Math.round((averages.topSentiment?.confidence || 0) * 100)}% confidence
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No analysis data available
          </div>
        )}
      </div>

      {/* Analysis Summary */}
      {analysis?.analysis_summary && (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Analysis Summary</h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            {analysis.analysis_summary}
          </p>
        </div>
      )}

      {/* Analysis of Utterances */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Detailed Analysis</h3>
        {analysis?.analysis?.utterances ? (
          <div className="space-y-4">
            {analysis.analysis.utterances.map((utterance: any, i: number) => (
              <div
                key={
                  utterance.start_time.toString() +
                  utterance.end_time.toString()
                }
                className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4"
              >
                {/* Text Source and Time */}
                <div className="mb-3">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Text Source:</span>
                  <span className="ml-2 text-sm text-slate-700 dark:text-slate-300 capitalize">
                    {utterance.text_source?.replace('_', ' ') || 'analysis'}
                  </span>
                  <span className="ml-4 text-sm text-slate-500 dark:text-slate-400">
                    ({Number(utterance.start_time).toFixed(1)}s - {Number(utterance.end_time).toFixed(1)}s)
                  </span>
                </div>
                
                {/* Text Content */}
                <p className="text-slate-800 dark:text-slate-200 mb-4 italic bg-white dark:bg-slate-800 p-3 rounded border-l-4 border-purple-500">
                  "{utterance.text}"
                </p>

                {/* Emotions and Sentiments with Reasoning */}
                <div className="space-y-4">
                  {/* Emotions */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Emotions Detected:</h4>
                    <div className="space-y-3">
                      {utterance.emotions?.map((emo: any, i: number) => (
                        <div key={emo.id || i} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">
                              {EMOTION_EMOJI[emo.label] || "😐"}
                            </span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {emo.label}
                            </span>
                            <div className="flex-1">
                              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                                <div
                                  style={{ width: `${emo.confidence * 100}%` }}
                                  className="h-2 rounded-full bg-purple-500"
                                ></div>
                              </div>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 w-12 text-right">
                              {Math.round(emo.confidence * 100)}%
                            </span>
                          </div>
                          {emo.reasoning && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-2 rounded border-l-2 border-purple-400">
                              <strong>Why this emotion?</strong> {emo.reasoning}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sentiments */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Sentiments Detected:</h4>
                    <div className="space-y-3">
                      {utterance.sentiments?.map((sentiment: any, i: number) => (
                        <div key={sentiment.id || i} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-3 border border-slate-200 dark:border-slate-600">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">
                              {SENTIMENT_EMOJI[sentiment.label] || "😐"}
                            </span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                              {sentiment.label}
                            </span>
                            <div className="flex-1">
                              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-600">
                                <div
                                  style={{ width: `${sentiment.confidence * 100}%` }}
                                  className="h-2 rounded-full bg-blue-500"
                                ></div>
                              </div>
                            </div>
                            <span className="text-xs text-slate-500 dark:text-slate-400 w-12 text-right">
                              {Math.round(sentiment.confidence * 100)}%
                            </span>
                          </div>
                          {sentiment.reasoning && (
                            <div className="text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 p-2 rounded border-l-2 border-blue-400">
                              <strong>Why this sentiment?</strong> {sentiment.reasoning}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">
            No analysis data available
          </div>
        )}
      </div>

      {/* Technical Details */}
      {analysis?.video_analysis || analysis?.audio_analysis ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Technical Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Analysis */}
            {analysis.video_analysis && (
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Video Features</h4>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <div>Brightness: {analysis.video_analysis?.brightness?.toFixed(2) || 'N/A'}</div>
                  <div>Contrast: {analysis.video_analysis?.contrast?.toFixed(2) || 'N/A'}</div>
                  <div>Blur Score: {analysis.video_analysis?.blur_score?.toFixed(2) || 'N/A'}</div>
                  <div>Movement: {analysis.video_analysis?.movement_score?.toFixed(2) || 'N/A'}</div>
                </div>
              </div>
            )}

            {/* Audio Analysis */}
            {analysis.audio_analysis && (
              <div>
                <h4 className="font-medium text-slate-700 dark:text-slate-300 mb-2">Audio Features</h4>
                <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                  <div>Duration: {analysis.audio_analysis?.duration?.toFixed(1) || 'N/A'}s</div>
                  <div>Energy: {analysis.audio_analysis?.energy?.toFixed(2) || 'N/A'}</div>
                  <div>Tempo: {analysis.audio_analysis?.tempo?.toFixed(1) || 'N/A'} BPM</div>
                  <div>Harmonic Ratio: {analysis.audio_analysis?.harmonic_ratio?.toFixed(2) || 'N/A'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* AI Justification & Explainability */}
      {analysis?.explainability && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700/30">
          <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
            🧠 AI Decision Justification
          </h3>
          
          {/* Confidence Scores */}
          <div className="mb-6">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Model Confidence Levels</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(analysis.explainability.confidence_scores || {}).map(([key, value]) => (
                <div key={key} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-purple-200 dark:border-purple-600">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {Math.round((value as number) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-purple-200 dark:bg-purple-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(value as number) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Model Explanations */}
          <div className="mb-6">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">How AI Makes Decisions</h4>
            <div className="space-y-3">
              {Object.entries(analysis.explainability.model_explanations || {}).map(([key, explanation]) => (
                <div key={key} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-purple-600">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm font-bold">
                        {key === 'visual' ? '👁️' : 
                         key === 'audio' ? '🔊' : 
                         key === 'speech' ? '💬' : 
                         key === 'emotion' ? '😊' : '🧠'}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-purple-700 dark:text-purple-300 capitalize mb-1">
                        {key.replace('_', ' ')} Analysis
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {explanation as string}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Importance */}
          <div className="mb-6">
            <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-3">Feature Importance Ranking</h4>
            <div className="space-y-2">
              {Object.entries(analysis.explainability.feature_importance || {}).map(([feature, importance], index) => (
                <div key={feature} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300 capitalize">
                    {feature.replace('_', ' ')}
                  </span>
                  <div className="flex-1">
                    <div className="h-2 bg-purple-200 dark:bg-purple-700 rounded-full">
                      <div 
                        className="h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${(index + 1) * 20}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                    {Math.round((index + 1) * 20)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis Reliability */}
          {analysis.explainability.analysis_reliability && (
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-purple-200 dark:border-purple-600">
              <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">Analysis Reliability</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {analysis.explainability.analysis_reliability}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Sentiment Classification Reasoning */}
      {analysis?.analysis?.utterances && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-700/30">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
            🔍 Sentiment Classification Reasoning
          </h3>
          
          <div className="space-y-4">
            {analysis.analysis.utterances.map((utterance: any, i: number) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-green-200 dark:border-green-600">
                <h4 className="font-medium text-green-700 dark:text-green-300 mb-3">
                  Analysis for: "{utterance.text?.substring(0, 50)}..."
                </h4>
                
                {/* Sentiment Reasoning */}
                <div className="mb-4">
                  <h5 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Why this sentiment?</h5>
                  <div className="space-y-2">
                    {utterance.sentiments?.map((sentiment: any, j: number) => (
                      <div key={j} className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-green-700 dark:text-green-300">
                            {sentiment.label}
                          </span>
                          <span className="text-sm text-green-600 dark:text-green-400">
                            {Math.round(sentiment.confidence * 100)}% confidence
                          </span>
                        </div>
                        <div className="text-sm text-green-600 dark:text-green-400">
                          <strong>Reasoning:</strong> This sentiment was detected based on 
                          {sentiment.source === 'primary_analysis' ? ' the primary text analysis using advanced NLP models' :
                           sentiment.source === 'contextual_analysis' ? ' contextual video and audio features' :
                           ' multiple analysis factors'}. 
                          The confidence level indicates how strongly the AI believes this classification.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Emotion Reasoning */}
                <div>
                  <h5 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Why these emotions?</h5>
                  <div className="space-y-2">
                    {utterance.emotions?.map((emotion: any, j: number) => (
                      <div key={j} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-3 border-l-4 border-emerald-500">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-emerald-700 dark:text-emerald-300">
                            {emotion.label}
                          </span>
                          <span className="text-sm text-emerald-600 dark:text-emerald-400">
                            {Math.round(emotion.confidence * 100)}% confidence
                          </span>
                        </div>
                        <div className="text-sm text-emerald-600 dark:text-emerald-400">
                          <strong>Detection Method:</strong> This emotion was identified through 
                          {emotion.source === 'primary_classifier' ? ' the primary emotion classification model' :
                           emotion.source === 'visual_analysis' ? ' analysis of visual cues and facial expressions' :
                           emotion.source === 'motion_analysis' ? ' movement and activity pattern analysis' :
                           emotion.source === 'audio_analysis' ? ' audio tone and energy analysis' :
                           ' multiple analysis techniques'}. 
                          The confidence reflects the model's certainty in this classification.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Model Information */}
      {analysis?.model_used && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700/30">
          <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-4">
            🤖 AI Model Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600">
              <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Model Used</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {analysis.model_used}
              </p>
            </div>
            
            {analysis.processing_time && (
              <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600">
                <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Processing Time</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(analysis.processing_time).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Model Capabilities */}
          <div className="mt-4 bg-white dark:bg-slate-800 rounded-lg p-4 border border-indigo-200 dark:border-indigo-600">
            <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">Model Capabilities</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-400">Video Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-400">Audio Processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-400">Speech Recognition</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-slate-600 dark:text-slate-400">Emotion Detection</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
