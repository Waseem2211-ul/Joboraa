import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Target, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  FolderGit2, 
  ArrowRight, 
  AlertCircle, 
  Layers, 
  BookOpen,
  Calendar,
  RefreshCw
} from 'lucide-react';
import { apiAnalyzeSkillGap } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ScoreGauge } from '../components/ScoreGauge';
import { DemoModeBadge } from '../components/DemoModeBadge';

const AVAILABLE_ROLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "UI/UX & Design Systems Engineer",
  "AI Application Developer",
  "Associate DevOps / Cloud Engineer",
  "Backend Software Engineer"
];

export const SkillGapPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRole = searchParams.get('target') || user?.profile?.targetRole || 'Frontend Developer';

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [loading, setLoading] = useState(true);
  const [gapData, setGapData] = useState(null);

  const fetchSkillGap = async (role) => {
    setLoading(true);
    try {
      const res = await apiAnalyzeSkillGap(role, user?.profile);
      if (res && res.data) {
        setGapData(res.data);
        updateUserProfile({ targetRole: role });
      }
    } catch (err) {
      console.warn('Skill gap fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkillGap(selectedRole);
  }, [selectedRole]);

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setSearchParams({ target: role });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header & Target Role Selector */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24' }}>
              <Target size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Skill Gap Diagnostic & Learning Sprint
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Identify specific missing competencies required to reach top-quartile candidate readiness.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <DemoModeBadge />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600 }}>Target Role:</label>
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="form-input"
              style={{ width: 'auto', padding: '8px 14px', borderRadius: '10px', fontSize: '0.85rem' }}
            >
              {AVAILABLE_ROLES.map((r) => (
                <option key={r} value={r} style={{ backgroundColor: '#090d18', color: '#fff' }}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="skeleton" style={{ height: '140px', width: '100%' }} />
          <div className="skeleton" style={{ height: '300px', width: '100%' }} />
        </div>
      ) : gapData ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
          {/* Readiness Summary Banner */}
          <div className="glass-card" style={{ padding: '26px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <ScoreGauge score={gapData.readinessScore || 78} size={98} strokeWidth={8} label="Readiness" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-warning">Target: {gapData.targetCareer}</span>
                    <span className="badge badge-cyan">{gapData.missingSkills?.length || 0} Priority Gaps</span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff' }}>
                    Candidate Readiness: {gapData.readinessScore}%
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '680px', marginTop: '4px', lineHeight: 1.5 }}>
                    {gapData.summary}
                  </p>
                </div>
              </div>

              <Link to={`/morph?role=${encodeURIComponent(gapData.targetCareer)}`} className="btn btn-primary btn-sm">
                <Sparkles size={14} />
                <span>Morph Resume For This Role</span>
              </Link>
            </div>
          </div>

          {/* Current Skills vs Required Skills */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Current */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '14px' }}>
                <CheckCircle2 size={18} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  Already Possessed ({gapData.currentSkills?.length || 0})
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {gapData.currentSkills?.map((s, i) => (
                  <span key={i} className="badge badge-success">
                    <CheckCircle2 size={12} /> {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Required */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '14px' }}>
                <BookOpen size={18} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  Total Role Repertoire ({gapData.requiredSkills?.length || 0})
                </h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {gapData.requiredSkills?.map((s, i) => (
                  <span key={i} className="badge badge-cyan">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Categorized Missing Skills with Actionable Projects */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '20px' }}>
              Missing Skills Prioritization & Hands-On Projects
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {gapData.missingSkills?.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '18px 20px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>{item.name}</span>
                      <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.775rem', color: 'var(--text-dim)' }}>
                        <Clock size={13} /> {item.estimatedWeeksToLearn} weeks
                      </span>
                      <span className={`badge ${
                        item.priority === 'High' ? 'badge-danger' : (item.priority === 'Medium' ? 'badge-warning' : 'badge-cyan')
                      }`}>
                        Priority: {item.priority}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <FolderGit2 size={16} color="#38bdf8" style={{ marginTop: '2px', flexShrink: 0 }} />
                    <span>
                      <strong style={{ color: '#38bdf8' }}>Recommended Project:</strong> {item.recommendedProject}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Milestones Roadmap */}
          {gapData.learningMilestones && (
            <div className="glass-card" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Calendar size={20} color="#818cf8" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>30-Day Sprint Roadmap</h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                {gapData.learningMilestones.map((m, idx) => (
                  <div key={idx} style={{ padding: '18px', borderRadius: '12px', backgroundColor: 'rgba(129, 140, 248, 0.06)', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase' }}>
                      {m.timeframe}
                    </span>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: '4px 0 6px' }}>
                      {m.milestone}
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                      {m.outcome}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
