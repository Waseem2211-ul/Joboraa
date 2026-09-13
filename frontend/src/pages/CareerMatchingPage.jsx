import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Sparkles, 
  Search, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Filter,
  RefreshCw,
  Target
} from 'lucide-react';
import { apiMatchCareers } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';
import { ScoreGauge } from '../components/ScoreGauge';
import { Link } from 'react-router-dom';

export const CareerMatchingPage = () => {
  const { user } = useAuth();
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterMatchLevel, setFilterMatchLevel] = useState('all'); // 'all' | 'high' | 'medium'

  const loadMatches = async () => {
    setLoading(true);
    try {
      const res = await apiMatchCareers(user?.profile);
      if (res && res.data && res.data.matches) {
        setCareers(res.data.matches);
      }
    } catch (err) {
      console.warn('Failed to load career matches:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  const filteredCareers = careers.filter((career) => {
    const matchesSearch = career.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      career.whyMatch.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (filterMatchLevel === 'high') return career.matchPercentage >= 85;
    if (filterMatchLevel === 'medium') return career.matchPercentage < 85;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(129, 140, 248, 0.12)', color: '#818cf8' }}>
              <Compass size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Career Intelligence & Role Matching
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Multi-dimensional alignment based on your verified skills, projects, and market demand.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DemoModeBadge />
          <button onClick={loadMatches} className="btn btn-secondary btn-sm" disabled={loading}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Recalculate Fit</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '240px' }}>
          <Search size={18} color="var(--text-dim)" />
          <input
            type="text"
            placeholder="Filter roles or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              width: '100%'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Fit Filter:</span>
          <button
            onClick={() => setFilterMatchLevel('all')}
            className={`btn btn-sm ${filterMatchLevel === 'all' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All ({careers.length})
          </button>
          <button
            onClick={() => setFilterMatchLevel('high')}
            className={`btn btn-sm ${filterMatchLevel === 'high' ? 'btn-primary' : 'btn-secondary'}`}
          >
            85%+ Match
          </button>
          <button
            onClick={() => setFilterMatchLevel('medium')}
            className={`btn btn-sm ${filterMatchLevel === 'medium' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Stretch Fits
          </button>
        </div>
      </div>

      {/* Career Cards List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton" style={{ height: '180px', width: '100%' }} />
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filteredCareers.map((career, index) => (
            <div key={index} className="glass-card interactive" style={{ padding: '26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '18px' }}>
                <div style={{ flex: 1, minWidth: '260px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>{career.role}</h2>
                    <span className={`badge ${career.matchPercentage >= 85 ? 'badge-cyan' : 'badge-purple'}`}>
                      Rank #{index + 1}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginTop: '8px', fontSize: '0.825rem', color: 'var(--text-dim)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: 600 }}>
                      <DollarSign size={14} /> {career.salaryRange}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#818cf8', fontWeight: 600 }}>
                      <TrendingUp size={14} /> {career.growthOutlook}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <ScoreGauge score={career.matchPercentage} size={76} strokeWidth={7} label="Fit" />
                  <Link
                    to={`/skills?target=${encodeURIComponent(career.role)}`}
                    className="btn btn-primary btn-sm"
                  >
                    <Target size={14} />
                    <span>Skill Gap</span>
                  </Link>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>Why you're a match:</span>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: 1.5 }}>
                  {career.whyMatch}
                </p>
              </div>

              {/* Skills breakdown */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>Current Skills Aligned:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {career.currentSkills?.map((cs, i) => (
                      <span key={i} className="badge badge-success">
                        <CheckCircle2 size={12} /> {cs}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase' }}>Missing Skills to Bridge:</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                    {career.missingSkills?.map((ms, i) => (
                      <span key={i} className="badge badge-warning">
                        + {ms}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Action */}
              <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.06)', border: '1px solid rgba(56, 189, 248, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <strong style={{ color: '#38bdf8' }}>Recommended Action:</strong> {career.recommendedAction}
                </div>
                <Link to={`/morph?role=${encodeURIComponent(career.role)}`} style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Morph for this role <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
