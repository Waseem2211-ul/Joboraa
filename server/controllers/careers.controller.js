import { matchCareers } from '../services/ai.service.js';
import { updateUserProfile } from '../services/storage.service.js';

export const handleMatchCareers = async (req, res) => {
  try {
    const profile = req.body.profile || req.user?.profile || {
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git', 'Node.js'],
      targetRole: 'Frontend Developer'
    };

    const result = await matchCareers(profile);

    if (req.user && result.matches) {
      updateUserProfile(req.user.id, {
        careerMatches: result.matches
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Career match error:', err);
    res.status(500).json({ error: err.message || 'Failed to match careers' });
  }
};
