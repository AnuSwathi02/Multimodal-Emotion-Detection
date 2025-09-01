"use client";

import { useEffect, useState } from "react";

interface SafeBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function SafeBody({ children, className = "" }: SafeBodyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Clean up any browser extension attributes that might cause hydration issues
    const body = document.body;
    if (body) {
      // Remove common Grammarly and other extension attributes
      const attributesToRemove = [
        'data-new-gr-c-s-check-loaded',
        'data-gr-ext-installed',
        'data-gramm',
        'data-gramm_editor',
        'data-gramm_id',
        'data-gramm_part',
        'data-gramm_editor_part'
      ];
      
      attributesToRemove.forEach(attr => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    }
  }, []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return <div className={className}>{children}</div>;
}
