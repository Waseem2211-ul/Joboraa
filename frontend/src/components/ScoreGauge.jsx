import React from 'react';

export const ScoreGauge = ({ score = 85, size = 110, strokeWidth = 9, label = 'Score' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const validScore = Math.min(100, Math.max(0, score || 0));
  const offset = circumference - (validScore / 100) * circumference;

  let strokeColor = '#38bdf8'; // Cyan
  if (validScore >= 85) strokeColor = '#10b981'; // Green
  else if (validScore >= 70) strokeColor = '#38bdf8'; // Cyan
  else if (validScore >= 50) strokeColor = '#f59e0b'; // Amber
  else strokeColor = '#f43f5e'; // Danger

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease',
              filter: `drop-shadow(0 0 8px ${strokeColor}40)`
            }}
          />
        </svg>
        <div style={{ position: 'absolute', textAlign: 'center' }}>
          <span style={{ fontSize: size > 90 ? '1.75rem' : '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
            {validScore}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', marginTop: '-4px' }}>%</span>
        </div>
      </div>
      {label && (
        <span style={{ marginTop: '8px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </span>
      )}
    </div>
  );
};
