import { updateUserProfile, findUserById } from '../services/storage.service.js';

export const handleGetProfile = async (req, res) => {
  try {
    if (!req.user) {
      // Return guest/demo profile
      return res.json({
        success: true,
        isGuest: true,
        profile: {
          name: 'Alex Rivera',
          email: 'alex.rivera@example.com',
          targetRole: 'Frontend Developer',
          careerInterests: ['Frontend Development', 'Full Stack', 'AI Engineering'],
          skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'REST API'],
          resumeScore: 86,
          interviewScore: 82,
          experience: [
            {
              title: "Frontend Engineering Intern",
              company: "Apex Digital Solutions",
              duration: "Jun 2025 - Dec 2025"
            }
          ]
        }
      });
    }

    res.json({
      success: true,
      isGuest: false,
      profile: req.user.profile
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleUpdateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required to update profile' });
    }

    const updatedProfile = updateUserProfile(req.user.id, req.body);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleResetProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.json({ success: true, message: 'Local storage reset' });
    }

    const defaultProfile = {
      name: req.user.name,
      targetRole: 'Frontend Developer',
      careerInterests: ['Frontend Development', 'Full Stack'],
      resumeText: '',
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
      resumeScore: 84,
      interviewHistory: []
    };

    const reset = updateUserProfile(req.user.id, defaultProfile);
    res.json({
      success: true,
      message: 'Profile reset to default state',
      profile: reset
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
