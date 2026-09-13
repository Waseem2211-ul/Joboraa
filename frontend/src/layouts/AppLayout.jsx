import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Compass, 
  Target, 
  Sparkles, 
  Briefcase, 
  Mic, 
  Bot, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  Bell, 
  Search,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DemoModeBadge } from '../components/DemoModeBadge';

export const AppLayout = () => {
  const { user, logout, isRealUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/resume', label: 'Resume Analyzer', icon: FileText, badge: 'ATS 86' },
    { path: '/careers', label: 'Career Match', icon: Compass, badge: '5 Matches' },
    { path: '/skills', label: 'Skill Gap', icon: Target },
    { path: '/morph', label: 'Resume Morph', icon: Sparkles, highlight: true },
    { path: '/jobs', label: 'Job Matcher', icon: Briefcase },
    { path: '/interview', label: 'AI Interview', icon: Mic },
    { path: '/copilot', label: 'Career Copilot', icon: Bot, highlight: true },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/jobs?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)', position: 'relative' }}>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
            display: 'block'
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: '270px',
          backgroundColor: '#090d18',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          transition: 'transform 0.3s ease',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          '@media (min-width: 1024px)': { transform: 'translateX(0)' }
        }}
        className="sidebar-container"
      >
        {/* Logo area */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 16px rgba(56, 189, 248, 0.4)'
            }}>
              <Sparkles size={20} color="#ffffff" />
            </div>
            <div>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                JOB<span style={{ color: '#38bdf8' }}>ORA</span>
              </span>
              <span style={{ display: 'block', fontSize: '0.65rem', color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '-2px' }}>
                AI Career Intelligence
              </span>
            </div>
          </NavLink>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="btn btn-ghost btn-sm close-sidebar-btn"
            style={{ padding: '6px', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <nav style={{ flex: 1, padding: '18px 12px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 12px 10px' }}>
            Career Command
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                    border: isActive ? '1px solid rgba(56, 189, 248, 0.28)' : '1px solid transparent',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.color = '#ffffff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} color={isActive ? '#38bdf8' : (item.highlight ? '#818cf8' : 'currentColor')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 7px',
                      borderRadius: '12px',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38bdf8',
                      fontWeight: 600
                    }}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        {/* Sidebar Footer: User Card */}
        <div style={{ padding: '16px', borderTop: '1px solid var(--border-subtle)', backgroundColor: 'rgba(6, 10, 18, 0.5)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1e293b, #334155)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#38bdf8'
              }}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.name || 'Explorer'}
                </div>
                <div style={{ fontSize: '0.725rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user?.profile?.targetRole || 'Frontend Developer'}
                </div>
              </div>
            </div>
            <button
              onClick={logout}
              title={isRealUser ? 'Log Out' : 'Reset Session'}
              className="btn btn-ghost btn-sm"
              style={{ padding: '6px', color: 'var(--text-dim)' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Layout Body */}
      <div 
        style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          minWidth: 0,
          marginLeft: '270px'
        }} 
        className="main-content-wrapper"
      >
        {/* Top bar */}
        <header
          style={{
            height: '68px',
            backgroundColor: 'rgba(9, 13, 24, 0.85)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border-subtle)',
            position: 'sticky',
            top: 0,
            zIndex: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 28px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="btn btn-ghost btn-sm mobile-menu-btn"
              style={{ padding: '8px', color: 'var(--text-muted)' }}
            >
              <Menu size={22} />
            </button>

            {/* Quick search */}
            <form onSubmit={handleSearchSubmit} style={{ position: 'relative', width: '280px' }} className="top-search-form">
              <Search size={16} color="var(--text-dim)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder="Search jobs, skills, roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '20px',
                  padding: '7px 14px 7px 36px',
                  fontSize: '0.85rem',
                  color: 'var(--text-main)',
                  outline: 'none',
                  transition: 'all 0.2s'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
                }}
              />
            </form>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Demo mode badge */}
            <DemoModeBadge />

            {/* Notifications toggle */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="btn btn-ghost btn-sm"
                style={{ padding: '8px', position: 'relative', color: 'var(--text-muted)' }}
              >
                <Bell size={19} />
                <span style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#38bdf8',
                  boxShadow: '0 0 6px #38bdf8'
                }} />
              </button>

              {notificationsOpen && (
                <div
                  className="glass-card"
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '44px',
                    width: '320px',
                    padding: '16px',
                    zIndex: 50,
                    borderRadius: '14px',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#ffffff' }}>Notifications</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>2 Unread</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#38bdf8', marginBottom: '2px' }}>Resume Morph Ready</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Targeted bullet points updated for Frontend Developer.</p>
                    </div>
                    <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                      <p style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>New High Match Job</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Pulse Technologies posted Frontend Engineer (94% Match).</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Target Role Pill */}
            <NavLink
              to="/settings"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.825rem',
                color: 'var(--text-muted)'
              }}
            >
              <UserCheck size={14} color="#10b981" />
              <span>{user?.name || 'Explorer'}</span>
              <ChevronRight size={14} color="var(--text-dim)" />
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '32px 28px', maxWidth: '1440px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .sidebar-container {
            transform: translateX(-100%) !important;
          }
          .sidebar-container.open {
            transform: translateX(0) !important;
          }
          .main-content-wrapper {
            margin-left: 0 !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
          .close-sidebar-btn {
            display: inline-flex !important;
          }
        }
        @media (min-width: 1025px) {
          .mobile-menu-btn {
            display: none !important;
          }
          .close-sidebar-btn {
            display: none !important;
          }
        }
        @media (max-width: 640px) {
          .top-search-form {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
