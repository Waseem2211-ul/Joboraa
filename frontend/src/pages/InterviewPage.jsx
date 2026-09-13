import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Sparkles, 
  Send, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight, 
  Award, 
  BookOpen,
  RotateCcw,
  Zap
} from 'lucide-react';
import { apiGetInterviewQuestion, apiEvaluateInterviewAnswer } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';
import { ScoreGauge } from '../components/ScoreGauge';

const ROLES = [
  'Frontend Developer',
  'Full Stack Developer',
  'UI/UX Engineer',
  'AI Application Developer',
  'Backend Software Engineer'
];

const DIFFICULTIES = ['Junior / Entry-Level', 'Mid-Level', 'Senior'];

export const InterviewPage = () => {
  const { user } = useAuth();
  const [selectedRole, setSelectedRole] = useState(user?.profile?.targetRole || 'Frontend Developer');
  const [difficulty, setDifficulty] = useState('Mid-Level');

  // Question & Session state
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [sessionScores, setSessionScores] = useState([]);

  // Fetch initial question
  const fetchNewQuestion = async () => {
    setLoadingQuestion(true);
    setEvaluation(null);
    setUserAnswer('');
    setShowHints(false);

    try {
      const res = await apiGetInterviewQuestion({
        targetRole: selectedRole,
        difficulty,
        previousQuestions: previousQuestions.map(q => q.question)
      });

      if (res && res.data) {
        setCurrentQuestion(res.data);
        setPreviousQuestions(prev => [...prev, res.data]);
      }
    } catch (err) {
      console.warn('Failed to fetch interview question:', err);
    } finally {
      setLoadingQuestion(false);
    }
  };

  useEffect(() => {
    fetchNewQuestion();
  }, [selectedRole, difficulty]);

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!userAnswer.trim() || evaluating) return;

    setEvaluating(true);
    try {
      const res = await apiEvaluateInterviewAnswer({
        question: currentQuestion.question,
        answer: userAnswer,
        targetRole: selectedRole,
        difficulty
      });

      if (res && res.data) {
        setEvaluation(res.data);
        setSessionScores(prev => [...prev, res.data.overallScore]);
      }
    } catch (err) {
      console.warn('Evaluation failed:', err);
    } finally {
      setEvaluating(false);
    }
  };

  const averageSessionScore = sessionScores.length > 0
    ? Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: '#c084fc' }}>
              <Mic size={22} />
            </div>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              AI Technical Interview Simulator
            </h1>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginTop: '6px' }}>
            Realistic scenario drills with instant multi-parameter scoring and model answer critiques.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <DemoModeBadge />
          {sessionScores.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', backgroundColor: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', fontSize: '0.825rem', fontWeight: 700 }}>
              <Award size={15} />
              <span>Session Average: {averageSessionScore}/100</span>
            </div>
          )}
        </div>
      </div>

      {/* Role & Difficulty Selectors */}
      <div className="glass-card" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-dim)', fontWeight: 600 }}>Target Role:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="form-input"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              {ROLES.map((r) => (
                <option key={r} value={r} style={{ backgroundColor: '#090d18' }}>{r}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-dim)', fontWeight: 600 }}>Difficulty:</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-input"
              style={{ width: 'auto', padding: '6px 12px', fontSize: '0.85rem' }}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d} style={{ backgroundColor: '#090d18' }}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={fetchNewQuestion}
          disabled={loadingQuestion}
          className="btn btn-secondary btn-sm"
        >
          <RefreshCw size={14} className={loadingQuestion ? 'animate-spin' : ''} />
          <span>Skip / New Question</span>
        </button>
      </div>

      {/* Main Question & Answer Arena */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        {/* Left: Active Question */}
        <div className="glass-card" style={{ padding: '26px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <span className="badge badge-purple">
              {currentQuestion?.category || 'Technical Assessment'}
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Question #{previousQuestions.length}
            </span>
          </div>

          {loadingQuestion ? (
            <div className="skeleton" style={{ height: '120px', width: '100%', borderRadius: '10px' }} />
          ) : (
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.5, marginBottom: '12px' }}>
                {currentQuestion?.question}
              </h2>
              {currentQuestion?.context && (
                <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {currentQuestion.context}
                </p>
              )}
            </div>
          )}

          {/* Hints Accordion */}
          {currentQuestion?.hints && currentQuestion.hints.length > 0 && (
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
              <button
                type="button"
                onClick={() => setShowHints(!showHints)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '6px 10px', fontSize: '0.8rem', color: '#fbbf24' }}
              >
                <HelpCircle size={14} />
                <span>{showHints ? 'Hide Hints' : 'Reveal Interview Hints'}</span>
              </button>

              {showHints && (
                <div style={{ marginTop: '10px', padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.25)', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                  <ul style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {currentQuestion.hints.map((hint, i) => (
                      <li key={i}>{hint}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Candidate Answer Form */}
        <div className="glass-card" style={{ padding: '26px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>Your Response</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
              {userAnswer.trim().split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <form onSubmit={handleSubmitAnswer} style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '14px' }}>
            <textarea
              className="form-input"
              rows={8}
              placeholder="Type your structured technical answer here. Explain the core mechanism, provide a concrete example, and address trade-offs..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={evaluating}
              style={{ flex: 1, resize: 'vertical', fontSize: '0.875rem' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                type="button"
                onClick={() => setUserAnswer("In React, the Virtual DOM is an in-memory representation of the real DOM. When component state changes, React creates a new virtual tree and runs reconciliation using the diffing algorithm to calculate minimal updates. Unnecessary re-renders occur when a parent re-renders and passes new object/function references down as props. We optimize this with React.memo, useCallback for event handlers, and useMemo for costly computations.")}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}
              >
                Insert Sample Answer
              </button>

              <button
                type="submit"
                disabled={evaluating || !userAnswer.trim()}
                className="btn btn-primary"
              >
                {evaluating ? (
                  <>
                    <RefreshCw size={16} className="animate-spin" />
                    <span>Grading Answer...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit for Evaluation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* AI Evaluation Breakdown Section */}
      {evaluation && (
        <div className="glass-card" style={{ padding: '28px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
              <ScoreGauge score={evaluation.overallScore} size={100} strokeWidth={8} label="Verdict Score" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className={`badge ${
                    evaluation.overallScore >= 80 ? 'badge-success' : 'badge-warning'
                  }`}>
                    {evaluation.overallScore >= 80 ? 'Pass / Strong Candidacy' : 'Needs Technical Precision'}
                  </span>
                  {evaluation.isDemo && <DemoModeBadge forceShow />}
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                  Evaluation Summary
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', maxWidth: '650px', marginTop: '4px', lineHeight: 1.5 }}>
                  {evaluation.summaryVerdict}
                </p>
              </div>
            </div>

            <button onClick={fetchNewQuestion} className="btn btn-primary btn-sm">
              <span>Next Question</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* 3 Pillar Score Meters */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Technical Knowledge</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#38bdf8', marginTop: '4px' }}>
                {evaluation.technicalKnowledgeScore}%
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(129, 140, 248, 0.05)', border: '1px solid rgba(129, 140, 248, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Communication & Clarity</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#818cf8', marginTop: '4px' }}>
                {evaluation.communicationScore}%
              </div>
            </div>

            <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Relevance & Accuracy</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
                {evaluation.relevanceScore}%
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '20px' }}>
            <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', marginBottom: '10px' }}>
                <CheckCircle2 size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Strengths Demonstrated</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {evaluation.strengths?.map((str, i) => (
                  <li key={i}>• {str}</li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fbbf24', marginBottom: '10px' }}>
                <AlertTriangle size={18} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Constructive Growth Points</span>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                {evaluation.weaknesses?.map((wk, i) => (
                  <li key={i}>• {wk}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Model Answer & Actionable Tip */}
          <div style={{ padding: '18px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase' }}>
              Recommended Benchmark Answer Strategy
            </span>
            <p style={{ fontSize: '0.85rem', color: '#ffffff', lineHeight: 1.6 }}>
              {evaluation.improvedAnswer}
            </p>
            {evaluation.actionableTip && (
              <div style={{ marginTop: '6px', fontSize: '0.8rem', color: 'var(--text-dim)', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <strong style={{ color: '#fbbf24' }}>Interviewer Pro-Tip:</strong> {evaluation.actionableTip}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
