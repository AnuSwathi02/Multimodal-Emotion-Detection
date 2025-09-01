"use client";

import { useState, useEffect } from "react";
import { FiSave, FiRefreshCw, FiMoon, FiSun, FiMonitor, FiSmartphone, FiSettings, FiBarChart, FiCheck, FiX } from "react-icons/fi";

export default function Settings() {
  const [settings, setSettings] = useState({
    theme: 'dark',
    autoRefresh: true,
    refreshInterval: 30,
    maxLogEntries: 100,
    enableNotifications: true,
    analysisQuality: 'high',
    language: 'en'
  });

  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('appSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  // Apply theme changes to document
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Auto-save certain settings immediately
    if (['theme', 'autoRefresh', 'refreshInterval'].includes(key)) {
      const newSettings = { ...settings, [key]: value };
      localStorage.setItem('appSettings', JSON.stringify(newSettings));
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('appSettings', JSON.stringify(settings));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const resetSettings = () => {
    const defaultSettings = {
      theme: 'dark',
      autoRefresh: true,
      refreshInterval: 30,
      maxLogEntries: 100,
      enableNotifications: true,
      analysisQuality: 'high',
      language: 'en'
    };
    setSettings(defaultSettings);
    localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    
    // Apply theme immediately
    const root = document.documentElement;
    root.classList.add('dark');
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'video-sentiment-ai-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target?.result as string);
          setSettings(prev => ({ ...prev, ...imported }));
          localStorage.setItem('appSettings', JSON.stringify({ ...settings, ...imported }));
        } catch (error) {
          alert('Invalid settings file');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-500 to-gray-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <FiSettings className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold text-white">Application Settings</h2>
        </div>
      </div>

      {/* Success/Error Messages */}
      {showSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 p-4 mx-6 mt-4 rounded-lg flex items-center space-x-2">
          <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
          <span className="text-green-800 dark:text-green-200 font-medium">Settings saved successfully!</span>
        </div>
      )}
      
      {showError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 p-4 mx-6 mt-4 rounded-lg flex items-center space-x-2">
          <FiX className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-red-800 dark:text-red-200 font-medium">Failed to save settings. Please try again.</span>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Theme Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
            <FiMonitor className="w-5 h-5 text-blue-500" />
            <span>Appearance</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Theme
              </label>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleSettingChange('theme', 'light')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    settings.theme === 'light'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <FiSun className="w-4 h-4" />
                  <span>Light</span>
                </button>
                <button
                  onClick={() => handleSettingChange('theme', 'dark')}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-all duration-200 ${
                    settings.theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400'
                  }`}
                >
                  <FiMoon className="w-4 h-4" />
                  <span>Dark</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current theme: {settings.theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Device Mode
              </label>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400 transition-all duration-200">
                  <FiMonitor className="w-4 h-4" />
                  <span>Desktop</span>
                </button>
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:border-slate-400 transition-all duration-200">
                  <FiSmartphone className="w-4 h-4" />
                  <span>Mobile</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
            <FiRefreshCw className="w-5 h-5 text-green-500" />
            <span>Performance</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Auto-refresh
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.autoRefresh}
                  onChange={(e) => handleSettingChange('autoRefresh', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Enable automatic refresh
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Refresh Interval (seconds)
              </label>
              <input
                type="range"
                min="10"
                max="60"
                step="5"
                value={settings.refreshInterval}
                onChange={(e) => handleSettingChange('refreshInterval', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>10s</span>
                <span className="font-medium">{settings.refreshInterval}s</span>
                <span>60s</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center space-x-2">
            <FiBarChart className="w-5 h-5 text-purple-500" />
            <span>Analysis</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Analysis Quality
              </label>
              <select
                value={settings.analysisQuality}
                onChange={(e) => handleSettingChange('analysisQuality', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="low">Low (Fast)</option>
                <option value="medium">Medium (Balanced)</option>
                <option value="high">High (Accurate)</option>
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current: {settings.analysisQuality.charAt(0).toUpperCase() + settings.analysisQuality.slice(1)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Max Log Entries
              </label>
              <input
                type="number"
                min="50"
                max="1000"
                step="50"
                value={settings.maxLogEntries}
                onChange={(e) => handleSettingChange('maxLogEntries', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Notifications
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Enable Notifications
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Get notified when analysis is complete
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Language
          </h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Interface Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleSettingChange('language', e.target.value)}
              className="w-full md:w-48 px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </div>

        {/* Import/Export Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            Backup & Restore
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={exportSettings}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
            >
              Export Settings
            </button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importSettings}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="import-settings"
              />
              <label
                htmlFor="import-settings"
                className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200 text-center cursor-pointer"
              >
                Import Settings
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={saveSettings}
            disabled={isSaving}
            className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FiSave className={`w-4 h-4 ${isSaving ? 'animate-pulse' : ''}`} />
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
          
          <button
            onClick={resetSettings}
            className="flex-1 sm:flex-none px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <FiRefreshCw className="w-4 h-4" />
            <span>Reset to Default</span>
          </button>
        </div>
      </div>
    </div>
  );
}
