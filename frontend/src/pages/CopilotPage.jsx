import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  RefreshCw, 
  HelpCircle, 
  Compass, 
  Target, 
  Briefcase, 
  FileText 
} from 'lucide-react';
import { apiSendCopilotMessage } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';

const SUGGESTED_PROMPTS = [
  "Which career is best for me?",
  "Why is my resume score at 86?",
  "What skills should I learn next?",
  "Prepare me for a frontend interview.",
  "Which jobs match my profile best?"
];

export const CopilotPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello ${user?.name || 'there'}! I'm your **JOBORA Career Copilot**. I have synced with your resume diagnostic, skill gap roadmap, and target role (**${user?.profile?.targetRole || 'Frontend Developer'}**).

Ask me anything about tailoring your profile, acing technical interviews, or choosing high-trajectory career pivots.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query.trim() || loading) return;

    const userMsg = { role: 'user', content: query.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await apiSendCopilotMessage(updatedMessages);
      if (res && res.data && res.data.reply) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: res.data.reply,
          isDemo: res.data.isDemo
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "I am ready to help. Try asking about your resume score, target roles, or interview advice!"
        }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I ran into a temporary hiccup communicating with the intelligence service. You can continue asking questions!"
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 132px)', maxHeight: '900px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ padding: '8px', borderRadius: '10px', backgroundColor: 'rgba(56, 189, 248, 0.12)', color: '#38bdf8' }}>
            <Bot size={22} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Career Intelligence Copilot
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.825rem' }}>
              Context-aware career advisor powered by OpenRouter & JOBORA Engine
            </p>
          </div>
        </div>

        <DemoModeBadge />
      </div>

      {/* Chat Container */}
      <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
        {/* Messages Scroll Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: isUser ? '80%' : '88%'
                }}
              >
                {!isUser && (
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.3)'
                  }}>
                    <Sparkles size={16} color="#ffffff" />
                  </div>
                )}

                <div
                  style={{
                    padding: '16px 20px',
                    borderRadius: '14px',
                    backgroundColor: isUser ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: isUser ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid var(--border-subtle)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    lineHeight: 1.6,
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {msg.content}
                </div>

                {isUser && (
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    backgroundColor: '#1e293b',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={16} color="#38bdf8" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div style={{ display: 'flex', gap: '14px', alignSelf: 'flex-start', alignItems: 'center' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #38bdf8, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Sparkles size={16} color="#ffffff" />
              </div>
              <div style={{ padding: '12px 18px', borderRadius: '14px', backgroundColor: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                <RefreshCw size={14} className="animate-spin" />
                <span>Copilot is reasoning with your career profile...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pills */}
        <div style={{ padding: '10px 20px', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'rgba(6, 10, 19, 0.4)', display: 'flex', gap: '8px', overflowX: 'auto' }}>
          {SUGGESTED_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(prompt)}
              className="badge badge-cyan"
              style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease' }}
            >
              <Sparkles size={11} />
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '12px', backgroundColor: 'rgba(8, 12, 22, 0.6)' }}
        >
          <input
            type="text"
            className="form-input"
            placeholder="Ask Copilot about resume changes, interview questions, or skill priorities..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            style={{ borderRadius: '12px' }}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="btn btn-primary"
            style={{ padding: '0 20px', borderRadius: '12px' }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
