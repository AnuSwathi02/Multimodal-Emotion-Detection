"use client";

import { useState, useEffect } from "react";
import { FiRefreshCw, FiDownload, FiTrash2, FiSearch, FiFilter, FiFileText } from "react-icons/fi";

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'ERROR' | 'WARNING';
  message: string;
}

export default function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<LogEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Fetch real logs from ML backend
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:5000/logs');
      if (response.ok) {
        const data = await response.json();
        if (data.logs) {
          const formattedLogs: LogEntry[] = data.logs.map((log: any) => ({
            timestamp: log.timestamp,
            level: log.level as 'INFO' | 'ERROR' | 'WARNING',
            message: log.message
          }));
          setLogs(formattedLogs);
          setFilteredLogs(formattedLogs);
        }
      }
    } catch (error) {
      console.error('Failed to fetch logs:', error);
      // Fall back to mock logs if backend is not available
      setLogs(mockLogs);
      setFilteredLogs(mockLogs);
    }
  };

  // Mock log data - fallback when backend is not available
  const mockLogs: LogEntry[] = [
    {
      timestamp: "2025-08-31 22:45:12",
      level: "INFO",
      message: "Processing video: sample_video.mp4 (ID: a1b2c3d4)"
    },
    {
      timestamp: "2025-08-31 22:45:15",
      level: "INFO",
      message: "Video frame analysis completed - 150 frames processed"
    },
    {
      timestamp: "2025-08-31 22:45:18",
      level: "INFO",
      message: "Audio analysis completed - Energy: 0.75, Tempo: 128 BPM"
    },
    {
      timestamp: "2025-08-31 22:45:20",
      level: "INFO",
      message: "Speech recognition completed - Text extracted successfully"
    },
    {
      timestamp: "2025-08-31 22:45:22",
      level: "INFO",
      message: "Analysis complete for: sample_video.mp4 (ID: a1b2c3d4)"
    },
    {
      timestamp: "2025-08-31 22:46:05",
      level: "INFO",
      message: "Processing video: nature_video.mp4 (ID: e5f6g7h8)"
    },
    {
      timestamp: "2025-08-31 22:46:08",
      level: "WARNING",
      message: "Low audio quality detected - may affect speech recognition"
    },
    {
      timestamp: "2025-08-31 22:46:12",
      level: "INFO",
      message: "Analysis complete for: nature_video.mp4 (ID: e5f6g7h8)"
    }
  ];

  useEffect(() => {
    fetchLogs();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(() => {
        // Fetch real logs from backend
        fetchLogs();
      }, 10000); // Every 10 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  useEffect(() => {
    let filtered = logs;
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.timestamp.includes(searchTerm)
      );
    }
    
    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter(log => log.level === selectedLevel);
    }
    
    setFilteredLogs(filtered);
  }, [logs, searchTerm, selectedLevel]);

  const refreshLogs = () => {
    setIsLoading(true);
    fetchLogs().finally(() => {
      setIsLoading(false);
    });
  };

  const clearLogs = () => {
    setLogs([]);
    setFilteredLogs([]);
  };

  const downloadLogs = () => {
    const logText = logs.map(log => 
      `[${log.timestamp}] ${log.level}: ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ml_analysis_logs_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'INFO': return 'text-blue-500 bg-blue-100 dark:bg-blue-900/20';
      case 'WARNING': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'ERROR': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FiFileText className="w-6 h-6 text-white" />
            <h2 className="text-xl font-bold text-white">ML Analysis Logs</h2>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                autoRefresh 
                  ? 'bg-white/20 text-white hover:bg-white/30' 
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              Auto-refresh {autoRefresh ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Level Filter */}
          <div className="flex items-center space-x-2">
            <FiFilter className="text-slate-400 w-4 h-4" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value="all">All Levels</option>
              <option value="INFO">Info</option>
              <option value="WARNING">Warning</option>
              <option value="ERROR">Error</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={refreshLogs}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={downloadLogs}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <FiDownload className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button
              onClick={clearLogs}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
            >
              <FiTrash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logs Display */}
      <div className="max-h-96 overflow-y-auto">
        {filteredLogs.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
            <FiFileText className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg font-medium">No logs found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredLogs.map((log, index) => (
              <div
                key={index}
                className="px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
              >
                <div className="flex items-start space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                    {log.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-900 dark:text-white">{log.message}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {log.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
          <span>Showing {filteredLogs.length} of {logs.length} logs</span>
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}
