const API_BASE = '/api';

/**
 * Universal fetch wrapper that attaches JWT token and handles demo mode & errors
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jobora_token');
  const headers = { ...options.headers };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is NOT FormData, set application/json
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error ${response.status}`);
    }

    return data;
  } catch (error) {
    console.warn(`API Error on [${endpoint}]:`, error.message);
    throw error;
  }
};

// Auth
export const apiRegister = (userData) => 
  apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) });

export const apiLogin = (credentials) => 
  apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });

export const apiGetMe = () => 
  apiRequest('/auth/me');

// Resume
export const apiAnalyzeResume = (payload) => {
  if (payload instanceof FormData) {
    return apiRequest('/resume/analyze', { method: 'POST', body: payload });
  }
  return apiRequest('/resume/analyze', { method: 'POST', body: JSON.stringify(payload) });
};

// Careers
export const apiMatchCareers = (profile) => 
  apiRequest('/careers/match', { method: 'POST', body: JSON.stringify({ profile }) });

// Skills
export const apiAnalyzeSkillGap = (targetCareer, profile) => 
  apiRequest('/skills/analyze', { method: 'POST', body: JSON.stringify({ targetCareer, profile }) });

// Morph
export const apiMorphResume = (data) => 
  apiRequest('/morph', { method: 'POST', body: JSON.stringify(data) });

// Jobs
export const apiGetJobs = () => 
  apiRequest('/jobs');

export const apiMatchJobs = (profile) => 
  apiRequest('/jobs/match', { method: 'POST', body: JSON.stringify({ profile }) });

// Interview
export const apiGetInterviewQuestion = (params) => 
  apiRequest('/interview/question', { method: 'POST', body: JSON.stringify(params) });

export const apiEvaluateInterviewAnswer = (payload) => 
  apiRequest('/interview/evaluate', { method: 'POST', body: JSON.stringify(payload) });

// Copilot
export const apiSendCopilotMessage = (messages) => 
  apiRequest('/copilot', { method: 'POST', body: JSON.stringify({ messages }) });

// Profile
export const apiGetProfile = () => 
  apiRequest('/profile');

export const apiUpdateProfile = (profileData) => 
  apiRequest('/profile', { method: 'PUT', body: JSON.stringify(profileData) });

export const apiResetProfile = () => 
  apiRequest('/profile/reset', { method: 'POST' });

// Health
export const apiGetHealth = () => 
  apiRequest('/health');
