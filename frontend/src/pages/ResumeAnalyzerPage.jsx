import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Tag, 
  ArrowRight, 
  Briefcase, 
  GraduationCap, 
  Code2, 
  Copy, 
  Check,
  RefreshCw
} from 'lucide-react';
import { apiAnalyzeResume } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ScoreGauge } from '../components/ScoreGauge';
import { DemoModeBadge } from '../components/DemoModeBadge';

const SAMPLE_RESUME = `Alex Rivera
alex.rivera@example.com | github.com/alexrivera | Austin, TX

SUMMARY
Proactive Software Engineer specializing in modern frontend architectures with React, JavaScript (ES6+), and responsive CSS. Passionate about performant user interfaces, component-driven design systems, and seamless RESTful API integration.

TECHNICAL SKILLS
- Languages: JavaScript (ES6+), HTML5, CSS3, SQL
- Frameworks & Libraries: React.js, Tailwind CSS, Express.js, Node.js
- Tools: Git, GitHub, Vite, Postman, Figma, REST APIs

EXPERIENCE
Frontend Engineering Intern | Apex Digital Solutions | Jun 2025 - Dec 2025
- Engineered 14+ reusable React components adhering to modern responsive standards.
- Integrated 8 REST API endpoints with graceful error and loading states for customer dashboards.
- Participated in weekly agile sprints, code reviews, and cross-functional design handoffs.

PROJECTS
DevBoard Career Intelligence Platform | React, Tailwind CSS, Node.js
- Created a job application tracking portal with status boards, notes, and local storage persistence.
- Implemented responsive mobile navigation and search filtering across 100+ application records.

CloudMetrics Telemetry Dashboard | React, Chart.js, Express
- Built interactive telemetry charts visualizing server CPU and memory usage in real time.

EDUCATION
B.S. in Computer Science | Tech University | 2022 - 2026 (GPA: 3.8/4.0)`;

export const ResumeAnalyzerPage = () => {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'paste'
  const [file, setFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    setError('');
    setAnalyzing(true);

    try {
      let res;
      if (activeTab === 'upload' && file) {
        const formData = new FormData();
        formData.append('resumeFile', file);
        res = await apiAnalyzeResume(formData);
      } else {
        const textToAnalyze = resumeText.trim() || SAMPLE_RESUME;
        res = await apiAnalyzeResume({ resumeText: textToAnalyze });
      }

      if (res && res.data) {
        setAnalysisResult(res.data);
        // Sync score with context user
        if (res.data.resumeScore) {
          updateUserProfile({
            resumeScore: res.data.resumeScore,
            skills: res.data.skills || [],
            summary: res.data.summary || ''
          });
        }
      } else {
        setError('Received invalid response from analyzer service.');
      }
    } catch (err) {
      setError(err.message || 'Failed to analyze resume.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleLoadSample = () => {
    setActiveTab('paste');
    setResumeText(SAMPLE_RESUME);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' }}>
              <FileText size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Resume Analyzer & ATS Diagnostic
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Multi-pass ATS scoring, skill extraction, impact audit, and keyword gap detection.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DemoModeBadge />
          <button onClick={handleLoadSample} className="btn btn-secondary btn-sm">
            Load Sample Resume
          </button>
        </div>
      </div>

      {/* Upload / Input Card */}
      <div className="glass-card" style={{ padding: '28px' }}>
        {/* Mode Switcher */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '22px' }}>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`btn btn-sm ${activeTab === 'upload' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Upload size={15} />
            <span>Upload Document (PDF / DOCX / TXT)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('paste')}
            className={`btn btn-sm ${activeTab === 'paste' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <FileText size={15} />
            <span>Paste Resume Text</span>
          </button>
        </div>

        {activeTab === 'upload' ? (
          <div
            style={{
              border: '2px dashed rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              padding: '40px 24px',
              textAlign: 'center',
              backgroundColor: 'rgba(6, 10, 19, 0.5)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onClick={() => document.getElementById('resume-file-input').click()}
          >
            <input
              id="resume-file-input"
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(56, 189, 248, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#38bdf8' }}>
              <Upload size={26} />
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
              {file ? file.name : 'Click to select or drop your resume here'}
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
              Supports PDF, DOCX, and TXT files up to 10MB
            </p>
            {file && (
              <div style={{ marginTop: '12px' }}>
                <span className="badge badge-success">Selected: {(file.size / 1024).toFixed(1)} KB</span>
              </div>
            )}
          </div>
        ) : (
          <div>
            <textarea
              className="form-input"
              rows={9}
              placeholder="Paste your resume contents or employment summary here..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', resize: 'vertical' }}
            />
          </div>
        )}

        {error && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', fontSize: '0.85rem', marginTop: '16px' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="btn btn-primary btn-lg"
          >
            {analyzing ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>Running AI Diagnostic...</span>
              </>
            ) : (
              <>
                <Sparkles size={18} />
                <span>Analyze Resume Now</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Analysis Results Display */}
      {analysisResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Top Score Banner */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                <ScoreGauge score={analysisResult.resumeScore || 87} size={110} strokeWidth={9} label="ATS Score" />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-cyan">ATS Compatibility Grade: A</span>
                    {analysisResult.isDemo && <DemoModeBadge forceShow />}
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                    {analysisResult.resumeScore >= 80 ? 'High-Performance Profile' : 'Needs Optimization'}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '650px', marginTop: '4px', lineHeight: 1.5 }}>
                    {analysisResult.summary}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <a href="/morph" className="btn btn-primary btn-sm">
                  <Sparkles size={14} />
                  <span>Morph This Resume</span>
                </a>
              </div>
            </div>
          </div>

          {/* Grid: Strengths vs Weaknesses */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {/* Strengths */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '16px' }}>
                <CheckCircle2 size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Verified Strengths</h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
                {analysisResult.strengths?.map((str, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: '#10b981', marginTop: '3px' }}>•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', marginBottom: '16px' }}>
                <AlertTriangle size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>ATS Gaps & Weaknesses</h3>
              </div>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
                {analysisResult.weaknesses?.map((wk, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: '#f59e0b', marginTop: '3px' }}>•</span>
                    <span>{wk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Skills Identified & Missing Keywords */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                Extracted Skills ({analysisResult.skills?.length || 0})
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysisResult.skills?.map((skill, i) => (
                  <span key={i} className="badge badge-cyan">
                    <Tag size={12} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f43f5e', marginBottom: '14px' }}>
                Missing High-Impact ATS Keywords
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysisResult.missingKeywords?.map((kw, i) => (
                  <span key={i} className="badge badge-danger">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations & Suggested Roles */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                  Strategic Recommendations
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {analysisResult.recommendations?.map((rec, i) => (
                    <div key={i} style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <strong style={{ color: '#38bdf8' }}>Step {i + 1}:</strong> {rec}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff', marginBottom: '14px' }}>
                  Top Suggested Roles
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {analysisResult.suggestedRoles?.map((role, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff' }}>{role}</span>
                      <a href="/careers" style={{ fontSize: '0.8rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        Match <ArrowRight size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
