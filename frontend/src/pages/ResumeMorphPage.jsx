import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Copy, 
  Check, 
  ArrowRight, 
  RefreshCw, 
  Sliders, 
  TrendingUp, 
  CheckCircle2, 
  RotateCcw,
  Zap,
  Tag,
  AlertCircle
} from 'lucide-react';
import { apiMorphResume } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';

const DEFAULT_ORIGINAL_RESUME = `Alex Rivera
alex.rivera@example.com | Austin, TX

SUMMARY
Software engineer with experience building web applications using React, JavaScript, and HTML/CSS.

EXPERIENCE
Apex Digital Solutions — Web Development Intern (Jun 2025 - Dec 2025)
- Worked on UI components using React and helped fix bugs.
- Connected backend APIs to display data in the dashboard.
- Assisted team members during sprint meetings and reviewed code.

PROJECTS
DevBoard App (React, Node.js)
- Built a job tracker app with React and Node.js.
- Added status columns and a search bar.`;

export const ResumeMorphPage = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || user?.profile?.targetRole || 'Frontend Developer';

  const [targetRole, setTargetRole] = useState(initialRole);
  const [jobRequirements, setJobRequirements] = useState('High ATS relevance, quantifiable impact, component reusability, modern TypeScript/React standards');
  const [originalResume, setOriginalResume] = useState(DEFAULT_ORIGINAL_RESUME);
  const [morphedData, setMorphedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedSection, setCopiedSection] = useState('');
  const [error, setError] = useState('');

  const handleMorph = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await apiMorphResume({
        resumeText: originalResume,
        targetRole,
        jobRequirements
      });

      if (res && res.data) {
        setMorphedData(res.data);
      } else {
        setError('Failed to morph resume data.');
      }
    } catch (err) {
      setError(err.message || 'Error executing Resume Morph.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, sectionName) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(''), 2500);
  };

  const handleReset = () => {
    setOriginalResume(DEFAULT_ORIGINAL_RESUME);
    setMorphedData(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
              <Sparkles size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Resume Morph & Role Re-Targeting
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Transform passive bullets into metric-backed, ATS-optimized achievements targeted at specific openings.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DemoModeBadge />
          {morphedData && (
            <button onClick={handleReset} className="btn btn-secondary btn-sm">
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Target Role & Controls Form */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Target Role Specification
            </label>
            <input
              type="text"
              className="form-input"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
              Key Requisition Requirements / Keywords
            </label>
            <input
              type="text"
              className="form-input"
              value={jobRequirements}
              onChange={(e) => setJobRequirements(e.target.value)}
              placeholder="e.g. React 19, TypeScript, WCAG, Web Vitals"
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
          <button
            onClick={handleMorph}
            disabled={loading}
            className="btn btn-primary btn-lg"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Morphing Content...</span>
              </>
            ) : (
              <>
                <Zap size={18} />
                <span>Morph Resume for {targetRole}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', fontSize: '0.85rem' }}>
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Comparison Layout: Original vs AI-Improved */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Original Resume Side */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Original Resume</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Editable source content</span>
            </div>
            <span className="badge badge-warning">Before: 68 ATS</span>
          </div>

          <textarea
            className="form-input"
            rows={20}
            value={originalResume}
            onChange={(e) => setOriginalResume(e.target.value)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.825rem',
              lineHeight: 1.6,
              flex: 1,
              resize: 'vertical'
            }}
          />
        </div>

        {/* AI Morphed Side */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>AI-Morphed Resume</h3>
                <Sparkles size={16} color="#38bdf8" />
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Targeted to {targetRole}</span>
            </div>
            <span className="badge badge-success">After: 93 ATS (+25 Boost)</span>
          </div>

          {!morphedData ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', textAlign: 'center', color: 'var(--text-dim)' }}>
              <Sparkles size={36} color="rgba(56, 189, 248, 0.3)" style={{ marginBottom: '14px' }} />
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-muted)' }}>Ready to Optimize</div>
              <p style={{ fontSize: '0.825rem', maxWidth: '320px', marginTop: '6px' }}>
                Click "Morph Resume" above to generate role-targeted impact bullets and high-value ATS keyword integrations.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
              {/* Morphed Summary */}
              <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>Improved Executive Summary</span>
                  <button
                    onClick={() => handleCopy(morphedData.improvedSummary, 'summary')}
                    className="btn btn-ghost btn-sm"
                    style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                  >
                    {copiedSection === 'summary' ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                    <span>{copiedSection === 'summary' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.6 }}>
                  {morphedData.improvedSummary}
                </p>
              </div>

              {/* Morphed Experience Bullets */}
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                  Morphed Experience Bullet Comparisons
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  {morphedData.improvedExperience?.map((exp, i) => (
                    <div key={i} style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ fontSize: '0.75rem', color: '#f43f5e', textDecoration: 'line-through', marginBottom: '6px' }}>
                        {exp.originalBullet}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#ffffff', fontWeight: 500, lineHeight: 1.5, marginBottom: '8px' }}>
                        {exp.morphedBullet}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.725rem', color: '#10b981' }}>
                          💡 {exp.whyBetter}
                        </span>
                        <button
                          onClick={() => handleCopy(exp.morphedBullet, `bullet-${i}`)}
                          className="btn btn-ghost btn-sm"
                          style={{ padding: '2px 8px', fontSize: '0.725rem' }}
                        >
                          {copiedSection === `bullet-${i}` ? <Check size={11} color="#10b981" /> : <Copy size={11} />}
                          <span>{copiedSection === `bullet-${i}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action Verbs */}
              {morphedData.actionVerbImprovements && (
                <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(129, 140, 248, 0.06)', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>
                    Action Verb Substitutions
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {morphedData.actionVerbImprovements.map((verb, idx) => (
                      <span key={idx} className="badge badge-purple">
                        {verb}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
