import { morphResume } from '../services/ai.service.js';
import { updateUserProfile } from '../services/storage.service.js';

export const handleMorphResume = async (req, res) => {
  try {
    const { resumeText, targetRole, jobRequirements } = req.body;
    const textToMorph = resumeText || req.user?.profile?.resumeText || "Software developer with React and JavaScript experience.";
    const selectedRole = targetRole || req.user?.profile?.targetRole || "Senior Frontend Engineer";

    const result = await morphResume(textToMorph, selectedRole, jobRequirements);

    if (req.user) {
      updateUserProfile(req.user.id, {
        lastMorphedResume: result
      });
    }

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Resume morph error:', err);
    res.status(500).json({ error: err.message || 'Failed to morph resume' });
  }
};
