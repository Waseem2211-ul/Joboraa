import { generateInterviewQuestion, evaluateInterviewAnswer } from '../services/ai.service.js';
import { updateUserProfile } from '../services/storage.service.js';

export const handleGenerateQuestion = async (req, res) => {
  try {
    const { targetRole, difficulty, previousQuestions } = req.body;
    const role = targetRole || req.user?.profile?.targetRole || 'Frontend Developer';
    const diff = difficulty || 'Medium';

    const question = await generateInterviewQuestion(role, diff, previousQuestions || []);

    res.json({
      success: true,
      data: question
    });
  } catch (err) {
    console.error('Interview question generation error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate interview question' });
  }
};

export const handleEvaluateAnswer = async (req, res) => {
  try {
    const { question, answer, targetRole, difficulty } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required' });
    }

    const evaluation = await evaluateInterviewAnswer({
      question,
      answer,
      role: targetRole || 'Frontend Developer',
      difficulty: difficulty || 'Medium'
    });

    if (req.user) {
      const history = req.user.profile?.interviewHistory || [];
      history.unshift({
        date: new Date().toISOString(),
        role: targetRole || 'Frontend Developer',
        question: question.substring(0, 100) + '...',
        score: evaluation.overallScore,
        verdict: evaluation.summaryVerdict
      });

      updateUserProfile(req.user.id, {
        interviewHistory: history.slice(0, 15),
        lastInterviewScore: evaluation.overallScore
      });
    }

    res.json({
      success: true,
      data: evaluation
    });
  } catch (err) {
    console.error('Interview evaluation error:', err);
    res.status(500).json({ error: err.message || 'Failed to evaluate answer' });
  }
};
