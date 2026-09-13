import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Briefcase, 
  Sparkles, 
  Palette, 
  Trash2, 
  Check, 
  AlertCircle,
  Save,
  RotateCcw
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';
import { apiResetProfile } from '../services/api';

export const SettingsPage = () => {
  const { user, isDemoMode, updateUserProfile, logout } = useAuth();
  
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [targetRole, setTargetRole] = useState(user?.profile?.targetRole || 'Frontend Developer');
  const [interests, setInterests] = useState(
    user?.profile?.careerInterests?.join(', ') || 'Frontend Development, Full Stack, AI Engineering'
  );
  const [saved, setSaved] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    const updatedInterests = interests.split(',').map(s => s.trim()).filter(Boolean);
    
    await updateUserProfile({
      name,
      targetRole,
      careerInterests: updatedInterests
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClearData = async () => {
    if (window.confirm('Reset local application state and cached diagnostics back to demo defaults?')) {
      try {
        await apiResetProfile();
        localStorage.removeItem('jobora_token');
        window.location.reload();
      } catch (err) {
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff' }}>
              <Settings size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Settings & Preferences
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Manage your career goals, AI provider preferences, and localized workspace data.
          </p>
        </div>

        <DemoModeBadge />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Section 1: Profile & Career Preferences */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <User size={20} color="#38bdf8" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Profile & Career Targets</h2>
          </div>

          <form onSubmit={handleSavePreferences} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Display Name
              </label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Primary Target Role
              </label>
              <input
                type="text"
                className="form-input"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                Career Interests (comma separated)
              </label>
              <input
                type="text"
                className="form-input"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
              {saved ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#10b981' }}>
                  <Check size={16} /> Preferences Saved
                </span>
              ) : <div />}

              <button type="submit" className="btn btn-primary btn-sm">
                <Save size={14} />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: AI Engine & Intelligence State */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <Sparkles size={20} color="#818cf8" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>AI Intelligence Architecture</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Active AI Engine</span>
                <span className="badge badge-purple">Centralized OpenRouter</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Calls are funneled through <code>server/services/ai.service.js</code> with seamless local fallback data.
              </p>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Fallback & Resilience</span>
                <span className="badge badge-success">Zero Crash Guarantee</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                If OPENROUTER_API_KEY is unset or encounters rate limits, realistic synthetic intelligence delivers uninterrupted analysis.
              </p>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Design Standard</span>
                <span className="badge badge-cyan">Dark Futuristic Glass</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                Tailored for modern AI startups: Plus Jakarta Sans, JetBrains Mono, and subtle glow accents.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Data Management */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Trash2 size={20} color="#f43f5e" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Data & Workspace Storage</h2>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
            JOBORA stores your parsed resumes, target roles, and interview records in lightweight local JSON persistence.
          </p>

          <button
            onClick={handleClearData}
            className="btn btn-danger btn-sm"
          >
            <RotateCcw size={14} />
            <span>Reset Local Application Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
