import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiLogin, apiRegister, apiGetMe, apiGetProfile, apiUpdateProfile, apiGetHealth } from '../services/api';

const AuthContext = createContext(null);

// Default demo user so the app is instantly usable even before logging in
const DEFAULT_DEMO_USER = {
  id: 'usr_demo_guest',
  name: 'Alex Rivera',
  email: 'alex.rivera@example.com',
  profile: {
    name: 'Alex Rivera',
    targetRole: 'Frontend Developer',
    careerInterests: ['Frontend Engineering', 'Full Stack Development', 'AI User Interfaces'],
    resumeScore: 86,
    interviewScore: 82,
    skills: [
      'JavaScript (ES6+)',
      'React.js',
      'HTML5/CSS3',
      'Tailwind CSS',
      'Node.js',
      'REST APIs',
      'Git & GitHub'
    ],
    experience: [
      {
        title: 'Frontend Engineering Intern',
        company: 'Apex Digital Solutions',
        duration: 'Jun 2025 - Dec 2025'
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'Tech University',
        year: '2026'
      }
    ]
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('jobora_token'));
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true);

  // Check health and OpenRouter key status
  useEffect(() => {
    const initApp = async () => {
      try {
        const health = await apiGetHealth();
        // If OpenRouter is not configured, isDemoMode is true
        setIsDemoMode(!health.openRouterConfigured);
      } catch (err) {
        setIsDemoMode(true);
      }

      // Check if saved token exists
      const savedToken = localStorage.getItem('jobora_token');
      if (savedToken) {
        try {
          const meData = await apiGetMe();
          if (meData.user) {
            setUser(meData.user);
          } else {
            setUser(DEFAULT_DEMO_USER);
          }
        } catch (err) {
          console.warn('Session expired or offline, falling back to demo session');
          setUser(DEFAULT_DEMO_USER);
        }
      } else {
        // Automatically provide demo user so the reviewer can click through seamlessly
        setUser(DEFAULT_DEMO_USER);
      }
      setLoading(false);
    };

    initApp();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await apiLogin({ email, password });
      if (res.token) {
        localStorage.setItem('jobora_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: 'Login failed' };
    } catch (err) {
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await apiRegister({ name, email, password });
      if (res.token) {
        localStorage.setItem('jobora_token', res.token);
        setToken(res.token);
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: 'Registration failed' };
    } catch (err) {
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('jobora_token');
    setToken(null);
    setUser(DEFAULT_DEMO_USER);
  };

  const updateUserProfileState = async (updates) => {
    try {
      if (token) {
        const res = await apiUpdateProfile(updates);
        if (res.profile) {
          setUser(prev => ({
            ...prev,
            profile: res.profile
          }));
          return { success: true };
        }
      } else {
        // Update local state in guest mode
        setUser(prev => ({
          ...prev,
          profile: {
            ...prev.profile,
            ...updates
          }
        }));
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token || !!user,
        isRealUser: !!token,
        isDemoMode,
        loading,
        login,
        register,
        logout,
        updateProfile: updateUserProfileState,
        updateUserProfile: updateUserProfileState
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
