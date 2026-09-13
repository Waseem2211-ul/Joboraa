import React from 'react';
import { Sparkles, Info } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DemoModeBadge = ({ forceShow = false }) => {
  const { isDemoMode } = useAuth();

  if (!isDemoMode && !forceShow) return null;

  return (
    <div 
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        background: 'rgba(245, 158, 11, 0.12)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        color: '#fbbf24',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px'
      }}
      title="Running in Demo / Fallback Mode (live API key optional)"
    >
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b', display: 'inline-block' }}></span>
      <Sparkles size={12} />
      <span>Demo Mode</span>
    </div>
  );
};
