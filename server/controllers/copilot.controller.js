import { careerCopilot } from '../services/ai.service.js';

export const handleCopilotChat = async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const profileContext = req.user?.profile || {
      targetRole: 'Frontend Developer',
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'REST API'],
      resumeScore: 86
    };

    const result = await careerCopilot({ messages, profileContext });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    console.error('Copilot chat error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate copilot response' });
  }
};
