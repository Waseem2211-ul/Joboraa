import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const JOBS_FILE = path.join(__dirname, '..', 'data', 'jobs.json');

const ensureFile = (filePath, defaultData = '[]') => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultData, 'utf-8');
  }
};

export const getUsers = () => {
  ensureFile(USERS_FILE, '[]');
  try {
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading users file:', err);
    return [];
  }
};

export const saveUsers = (users) => {
  ensureFile(USERS_FILE, '[]');
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
};

export const findUserByEmail = (email) => {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id) => {
  const users = getUsers();
  return users.find((u) => u.id === id);
};

export const createUser = (userData) => {
  const users = getUsers();
  const newUser = {
    ...userData,
    createdAt: new Date().toISOString(),
    profile: userData.profile || {
      name: userData.name || 'Jobora Explorer',
      targetRole: 'Frontend Developer',
      careerInterests: ['Frontend Development', 'Full Stack', 'AI Engineering'],
      resumeText: '',
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'Responsive Design'],
      resumeScore: 84,
      experience: [],
      education: [],
      projects: [],
      targetCareer: 'Frontend Developer',
      interviewHistory: []
    }
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

export const updateUserProfile = (id, profileUpdates) => {
  const users = getUsers();
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index].profile = {
    ...users[index].profile,
    ...profileUpdates,
    updatedAt: new Date().toISOString()
  };
  saveUsers(users);
  return users[index].profile;
};

export const getJobs = () => {
  ensureFile(JOBS_FILE, '[]');
  try {
    const raw = fs.readFileSync(JOBS_FILE, 'utf-8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Error reading jobs file:', err);
    return [];
  }
};

export const saveJobs = (jobs) => {
  ensureFile(JOBS_FILE, '[]');
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jobs, null, 2), 'utf-8');
};
