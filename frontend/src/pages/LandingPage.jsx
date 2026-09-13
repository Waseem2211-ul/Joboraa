import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  FileCheck, 
  Compass, 
  Target, 
  Layers, 
  Briefcase, 
  Mic, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  ShieldCheck,
  Zap,
  Code2,
  BrainCircuit
} from 'lucide-react';
import { ScoreGauge } from '../components/ScoreGauge';
import { DemoModeBadge } from '../components/DemoModeBadge';

export const LandingPage = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-main)', overflowX: 'hidden' }}>
      {/* Navigation */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'rgba(6, 9, 17, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '16px 28px'
      }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
            }}>
              <Sparkles size={18} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#ffffff' }}>
              JOB<span style={{ color: '#38bdf8' }}>ORA</span>
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="landing-nav-links">
            <a href="#how-it-works" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>How it Works</a>
            <a href="#features" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Features</a>
            <a href="#preview" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', transition: 'color 0.2s' }}>Intelligence</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DemoModeBadge />
            <Link to="/login" className="btn btn-ghost btn-sm" style={{ color: 'var(--text-muted)' }}>
              Sign In
            </Link>
            <Link to="/resume" className="btn btn-primary btn-sm">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section style={{ padding: '80px 24px 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 80%)',
          filter: 'blur(60px)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1080px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '30px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', marginBottom: '24px' }}>
            <Sparkles size={15} color="#38bdf8" />
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: '#38bdf8', letterSpacing: '0.02em' }}>
              Next-Gen AI Career Diagnostic Engine
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '24px' }}>
            Your Career. <br />
            <span className="gradient-text">Intelligently Matched.</span>
          </h1>

          <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '780px', margin: '0 auto 36px', lineHeight: 1.6 }}>
            Turn your resume into career intelligence with AI-powered analysis, career matching, skill-gap detection, resume optimization and interview preparation.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <Link to="/resume" className="btn btn-primary btn-lg">
              <span>Analyze My Resume</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/dashboard" className="btn btn-secondary btn-lg">
              <span>Explore JOBORA</span>
            </Link>
          </div>

          {/* Value props badges */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '28px', flexWrap: 'wrap', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#10b981" /> No Credit Card Required
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#10b981" /> PDF, DOCX, TXT Support
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CheckCircle2 size={16} color="#10b981" /> Instant ATS Feedback
            </div>
          </div>
        </div>

        {/* Interactive Dashboard Sneak Peek */}
        <div style={{ maxWidth: '1100px', margin: '54px auto 0', position: 'relative' }}>
          <div className="glass-card" style={{ padding: '24px', borderRadius: '20px', border: '1px solid rgba(56, 189, 248, 0.25)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(56, 189, 248, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '18px', borderBottom: '1px solid var(--border-subtle)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f43f5e' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>jobora.ai/intelligence/live-preview</span>
              </div>
              <span className="badge badge-cyan">AI Model: Gemini 2.5 Flash</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
              {/* Card 1 */}
              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Resume Score</span>
                  <ScoreGauge score={87} size={64} strokeWidth={6} label="" />
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#10b981' }}>Top 15% ATS Match</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>Ready for Tier-1 Tech Inbounds</p>
              </div>

              {/* Card 2 */}
              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Top Career Match</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#38bdf8', marginTop: '6px' }}>Frontend Developer</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <div style={{ flex: 1, height: '6px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: '94%', height: '100%', backgroundColor: '#38bdf8' }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ffffff' }}>94%</span>
                </div>
              </div>

              {/* Card 3 */}
              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Missing Skill Gap</span>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fbbf24', marginTop: '6px' }}>TypeScript & Testing</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px' }}>Est. 2 weeks to unlock Senior band</p>
              </div>

              {/* Card 4 */}
              <div style={{ padding: '18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>AI Interview Readiness</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#818cf8', marginTop: '6px' }}>82 / 100</div>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px' }}>Passed System Design scenario</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. How JOBORA Works */}
      <section id="how-it-works" style={{ padding: '80px 24px', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'rgba(8, 12, 22, 0.4)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              How <span className="gradient-text">JOBORA</span> Works
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              An autonomous four-stage career intelligence pipeline tailored for students, grads, and career switchers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', position: 'relative' }}>
            {/* Step 1 */}
            <div className="glass-card" style={{ padding: '28px 22px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(56, 189, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#38bdf8', marginBottom: '18px' }}>
                <FileCheck size={22} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stage 01</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '6px 0 10px', color: '#ffffff' }}>Resume Diagnostic</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Upload your PDF, DOCX, or text resume. Our ATS scanner dissects strengths, weaknesses, and missing keywords.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card" style={{ padding: '28px 22px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(129, 140, 248, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#818cf8', marginBottom: '18px' }}>
                <Compass size={22} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stage 02</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '6px 0 10px', color: '#ffffff' }}>Career Intelligence</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Identify 5+ viable career paths ranked by percentage match, salary bands, and market growth trajectory.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card" style={{ padding: '28px 22px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24', marginBottom: '18px' }}>
                <Target size={22} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stage 03</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '6px 0 10px', color: '#ffffff' }}>Skill Gap & Morph</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Pinpoint exact skills you lack and morph your resume bullet points into impact-driven, metric-rich language.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card" style={{ padding: '28px 22px' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399', marginBottom: '18px' }}>
                <Mic size={22} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Stage 04</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '6px 0 10px', color: '#ffffff' }}>Jobs & AI Mock Prep</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Match open requisitions and rehearse with role-specific AI interview simulations with scoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Features */}
      <section id="features" style={{ padding: '80px 24px', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              Everything You Need To <span className="gradient-text">Break In</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
              A unified suite replacing six disconnected subscriptions with one AI career platform.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Feature 1 */}
            <div className="glass-card interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                  <FileCheck size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>ATS Resume Analyzer</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Multi-factor Scoring</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Extracts your exact skills, calculates an industry ATS score, flags missing keywords, and highlights weak bullet points that cause auto-rejections.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-card interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(129, 140, 248, 0.1)', color: '#818cf8' }}>
                  <Compass size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>AI Career Matcher</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Precision Fit Algorithm</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Compares your portfolio, projects, and coursework against market trends to recommend your highest ROI career paths with market growth data.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}>
                  <Target size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Skill Gap Diagnostic</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Categorized Roadmaps</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Visualizes what you know versus what job postings demand. Breaks down missing skills into priority tags, estimated weeks, and project ideas.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-card interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>Resume Morph</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Role-Targeted Rewriting</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Rewrites mundane job descriptions into impact-first bullets with quantified metrics, action verbs, and relevant tech keywords.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="glass-card interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}>
                  <Mic size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>AI Interview Simulation</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Instant Objective Scoring</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Face dynamic, role-aligned technical and behavioral questions. Receive immediate grading on knowledge, communication, and relevance.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="glass-card interactive" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8' }}>
                  <Bot size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#ffffff' }}>24/7 Career Copilot</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Context-Aware AI Mentor</span>
                </div>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                A conversational advisor that remembers your resume, target roles, and interview scores to answer any career dilemma in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Previews Section (Resume, Career Match, Interview) */}
      <section id="preview" style={{ padding: '80px 24px', backgroundColor: 'rgba(8, 12, 22, 0.5)', borderTop: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="badge badge-purple" style={{ marginBottom: '12px' }}>AI Career Intelligence Preview</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800 }}>See JOBORA In Action</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {/* Morph Comparison Preview */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Resume Morph Before / After</span>
                <span className="badge badge-cyan">+25% ATS Score</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.2)', marginBottom: '12px' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase' }}>Original Bullet</span>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  "Built UI components using React and helped fix layout bugs."
                </p>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase' }}>JOBORA Morphed</span>
                <p style={{ fontSize: '0.8rem', color: '#ffffff', marginTop: '4px', lineHeight: 1.5 }}>
                  "Engineered 14+ reusable React components with WCAG 2.1 accessibility, reducing layout shift (CLS) by 40% and shortening design handoffs by 3 days."
                </p>
              </div>
            </div>

            {/* AI Mock Interview Preview */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>Real-Time Interview Feedback</span>
                <span className="badge badge-success">Overall: 88/100</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', marginBottom: '14px' }}>
                <span style={{ fontSize: '0.725rem', color: 'var(--text-dim)' }}>Question (Frontend • React Reconciliation)</span>
                <p style={{ fontSize: '0.825rem', color: '#ffffff', marginTop: '4px' }}>
                  "How does the React Virtual DOM work and what causes unnecessary re-renders?"
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-cyan">Technical: 92%</span>
                <span className="badge badge-purple">Clarity: 86%</span>
                <span className="badge badge-success">Relevance: 88%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section style={{ padding: '90px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
          padding: '60px 32px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.15) 100%)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(56, 189, 248, 0.1)'
        }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Unlock Your Career Intelligence Today
          </h2>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 32px' }}>
            Join thousands of students and career switchers getting hired faster with precision AI matching.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/resume" className="btn btn-primary btn-lg">
              <span>Start Free Analysis</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              <span>Create Free Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: '40px 24px', backgroundColor: '#05070e' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={14} color="#ffffff" />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>JOBORA</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginLeft: '8px' }}>© 2026. Your Career. Intelligently Matched.</span>
          </div>

          <div style={{ display: 'flex', gap: '24px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Link to="/resume">Resume Analyzer</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/morph">Resume Morph</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/interview">AI Interview</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
