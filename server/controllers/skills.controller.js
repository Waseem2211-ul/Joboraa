import { analyzeSkillGap } from '../services/ai.service.js';
import { updateUserProfile } from '../services/storage.service.js';

export const handleAnalyzeSkillGap = async (req, res) => {
  try {
    const { targetCareer } = req.body;
    const profile = req.body.profile || req.user?.profile || {
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Git'],
      targetRole: targetCareer || 'Frontend Developer'
    };

    const selectedRole = targetCareer || profile.targetRole || 'Frontend Developer';
    const result = await analyzeSkillGap(profile, selectedRole);

    if (req.user) {
      updateUserProfile(req.user.id, {
        targetCareer: selectedRole,
        skillGapAnalysis: result
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Skill gap error:', err);
    res.status(500).json({ error: err.message || 'Failed to analyze skill gaps' });
  }
};
