import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { CareerMatchingPage } from './pages/CareerMatchingPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { ResumeMorphPage } from './pages/ResumeMorphPage';
import { JobMatcherPage } from './pages/JobMatcherPage';
import { InterviewPage } from './pages/InterviewPage';
import { CopilotPage } from './pages/CopilotPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Auth Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Application Shell */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/resume" element={<ResumeAnalyzerPage />} />
            <Route path="/careers" element={<CareerMatchingPage />} />
            <Route path="/skills" element={<SkillGapPage />} />
            <Route path="/morph" element={<ResumeMorphPage />} />
            <Route path="/jobs" element={<JobMatcherPage />} />
            <Route path="/interview" element={<InterviewPage />} />
            <Route path="/copilot" element={<CopilotPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
