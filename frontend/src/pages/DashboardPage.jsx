import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Compass, 
  Target, 
  Mic, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Briefcase,
  Zap,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ScoreGauge } from '../components/ScoreGauge';
import { DemoModeBadge } from '../components/DemoModeBadge';

export const DashboardPage = () => {
  const { user } = useAuth();
  const userName = user?.name || 'Explorer';
  const profile = user?.profile || {};

  const resumeScore = profile.resumeScore || 86;
  const targetRole = profile.targetRole || 'Frontend Developer';
  const skills = profile.skills || ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind', 'Git'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Banner & Greeting */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Good morning, <span className="gradient-text">{userName}</span>
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Your career command center is synced. Target Role: <strong style={{ color: '#38bdf8' }}>{targetRole}</strong>
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DemoModeBadge />
          <Link to="/morph" className="btn btn-primary btn-sm">
            <Sparkles size={16} />
            <span>Resume Morph</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        {/* Metric 1: Resume Score */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Resume Score</span>
            <span className="badge badge-cyan">ATS Ready</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '10px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>{resumeScore}</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>/100</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.775rem', color: '#10b981' }}>
            <TrendingUp size={14} />
            <span>Top 15% in peer cohort</span>
          </div>
        </div>

        {/* Metric 2: Top Career Match */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Career Match</span>
            <span className="badge badge-purple">94% Fit</span>
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginTop: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            Frontend Developer
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            5 High-Match Roles active
          </div>
        </div>

        {/* Metric 3: Skills Identified */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Skills Identified</span>
            <span className="badge badge-success">{skills.length} Mastered</span>
          </div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)', marginTop: '10px' }}>
            {skills.length}
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            3 Critical skills to bridge
          </div>
        </div>

        {/* Metric 4: Interview Readiness */}
        <div className="glass-card" style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>Job Readiness</span>
            <span className="badge badge-warning">Tier 1</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '10px' }}>
            <span style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>84</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>%</span>
          </div>
          <div style={{ fontSize: '0.775rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            Interview Mock: 82/100
          </div>
        </div>
      </div>

      {/* Main 2-Column Command Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Section 1: Resume Intelligence */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#38bdf8" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Resume Intelligence</h2>
            </div>
            <Link to="/resume" className="btn btn-ghost btn-sm" style={{ color: '#38bdf8' }}>
              <span>Deep Analyze</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <ScoreGauge score={resumeScore} size={92} strokeWidth={8} label="ATS Score" />
            <div style={{ flex: 1, minWidth: '180px' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                Strong Technical Foundation
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Your resume parses cleanly across major ATS systems. Target improvements around metric quantification to break into the 95+ tier.
              </p>
            </div>
          </div>

          {/* Strengths & Weaknesses quick preview */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.06)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', fontWeight: 600, color: '#34d399', marginBottom: '4px' }}>
                <CheckCircle2 size={16} /> Top Strength
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Demonstrated modern component architectures and hands-on React / REST API integrations.
              </p>
            </div>

            <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.06)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.825rem', fontWeight: 600, color: '#fbbf24', marginBottom: '4px' }}>
                <AlertTriangle size={16} /> Primary Growth Area
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Missing automated testing keywords (Vitest/Jest) and quantifiable business impact metrics.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Top Career Matches */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Compass size={20} color="#818cf8" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Top Career Matches</h2>
            </div>
            <Link to="/careers" className="btn btn-ghost btn-sm" style={{ color: '#818cf8' }}>
              <span>View All (5)</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {/* Career 1 */}
            <div style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>Frontend Developer</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>$85k - $125k • +23% Annual Growth</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#38bdf8', fontFamily: 'var(--font-mono)' }}>94%</div>
                <span className="badge badge-cyan" style={{ fontSize: '0.65rem' }}>Primary Fit</span>
              </div>
            </div>

            {/* Career 2 */}
            <div style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>Full Stack Developer</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>$95k - $135k • +20% Growth</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#818cf8', fontFamily: 'var(--font-mono)' }}>88%</div>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>High Fit</span>
              </div>
            </div>

            {/* Career 3 */}
            <div style={{ padding: '14px 16px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>UI/UX & Design Engineer</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>$80k - $115k • Stable Growth</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-mono)' }}>82%</div>
                <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>Solid Match</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Skill Gap Snapshot */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Target size={20} color="#fbbf24" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>Skill Gap Diagnostic</h2>
            </div>
            <Link to="/skills" className="btn btn-ghost btn-sm" style={{ color: '#fbbf24' }}>
              <span>Roadmap</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Skills Mastered ({skills.length})
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {skills.map((s, idx) => (
                <span key={idx} className="badge badge-success">
                  <CheckCircle2 size={12} /> {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.775rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '8px' }}>
              High-Priority Gaps for {targetRole}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              <span className="badge badge-danger">TypeScript (Priority: High)</span>
              <span className="badge badge-warning">Next.js & SSR</span>
              <span className="badge badge-warning">Testing (Vitest)</span>
            </div>
          </div>
        </div>

        {/* Section 4: AI Interview Readiness */}
        <div className="glass-card" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mic size={20} color="#a855f7" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>AI Mock Interview</h2>
            </div>
            <Link to="/interview" className="btn btn-primary btn-sm">
              <Zap size={14} />
              <span>Practice Now</span>
            </Link>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.25)', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#c084fc', textTransform: 'uppercase', fontWeight: 700 }}>Last Session Score</span>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>82 / 100</div>
              </div>
              <span className="badge badge-purple">Passed</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Scenario: React Reconciliation & DOM Tree Diffing. Feedback: Strong technical knowledge, improve edge case explanations.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: 'var(--text-dim)' }}>
            <span>Recommended: 3 practice questions/week</span>
            <Link to="/interview" style={{ color: '#38bdf8', fontWeight: 600 }}>Start Session →</Link>
          </div>
        </div>
      </div>

      {/* Section 5: Recommended Next Actions */}
      <div className="glass-card" style={{ padding: '26px' }}>
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
          Recommended Next Actions
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <Link to="/morph" className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.2s' }}>
            <div>
              <span style={{ fontSize: '0.725rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase' }}>1. Optimize</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>Morph resume for {targetRole}</div>
            </div>
            <ChevronRight size={18} color="var(--text-dim)" />
          </Link>

          <Link to="/skills" className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.2s' }}>
            <div>
              <span style={{ fontSize: '0.725rem', color: '#fbbf24', fontWeight: 700, textTransform: 'uppercase' }}>2. Bridge Gap</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>Follow TypeScript Sprint</div>
            </div>
            <ChevronRight size={18} color="var(--text-dim)" />
          </Link>

          <Link to="/interview" className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.2s' }}>
            <div>
              <span style={{ fontSize: '0.725rem', color: '#a855f7', fontWeight: 700, textTransform: 'uppercase' }}>3. Rehearse</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>Practice System Design Mock</div>
            </div>
            <ChevronRight size={18} color="var(--text-dim)" />
          </Link>

          <Link to="/jobs" className="glass-panel" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', transition: 'border-color 0.2s' }}>
            <div>
              <span style={{ fontSize: '0.725rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>4. Apply</span>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginTop: '2px' }}>Review 7 Matching Openings</div>
            </div>
            <ChevronRight size={18} color="var(--text-dim)" />
          </Link>
        </div>
      </div>
    </div>
  );
};
