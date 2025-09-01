"use client";

import { useEffect, useState } from "react";

interface HydrationSafeAppProps {
  children: React.ReactNode;
}

export default function HydrationSafeApp({ children }: HydrationSafeAppProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for hydration to complete
    setIsHydrated(true);
    
    // Additional cleanup for browser extensions
    const cleanupExtensions = () => {
      const body = document.body;
      if (body) {
        // Remove common extension attributes
        const extensionAttributes = [
          'data-new-gr-c-s-check-loaded',
          'data-gr-ext-installed',
          'data-gramm',
          'data-gramm_editor',
          'data-gramm_id',
          'data-gramm_part',
          'data-gramm_editor_part',
          'data-lp-mirror',
          'data-lp-mirror-id',
          'data-grammarly-shadow-root'
        ];
        
        extensionAttributes.forEach(attr => {
          if (body.hasAttribute(attr)) {
            body.removeAttribute(attr);
          }
        });
      }
    };

    // Clean up immediately
    cleanupExtensions();
    
    // Also clean up after a short delay to catch any late additions
    const timeoutId = setTimeout(cleanupExtensions, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Show a loading state until hydration is complete
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-slate-900 dark:via-purple-900/20 dark:to-blue-900/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto"></div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Loading Video Sentiment AI...
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Preparing your AI-powered video analysis experience
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
