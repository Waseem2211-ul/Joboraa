import { getJobs } from '../services/storage.service.js';
import { matchJobs } from '../services/ai.service.js';

export const handleGetJobs = async (req, res) => {
  try {
    const jobs = getJobs();
    res.json({ success: true, count: jobs.length, jobs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const handleMatchJobs = async (req, res) => {
  try {
    const jobs = getJobs();
    const profile = req.body.profile || req.user?.profile || {
      skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'REST API'],
      targetRole: 'Frontend Developer'
    };

    const matchResult = await matchJobs(profile, jobs);

    // Merge match score into each job item for intuitive frontend consumption
    const enrichedJobs = jobs.map((job) => {
      const match = matchResult.matches?.find((m) => m.jobId === job.id);
      return {
        ...job,
        matchPercentage: match?.matchPercentage || 75,
        matchReason: match?.matchReason || 'Strong general skill match',
        matchedSkills: match?.matchedSkills || [],
        missingSkills: match?.missingSkills || [],
        fitLevel: match?.fitLevel || 'Moderate Fit'
      };
    });

    enrichedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json({
      success: true,
      isDemo: matchResult.isDemo,
      jobs: enrichedJobs
    });
  } catch (err) {
    console.error('Job matching error:', err);
    res.status(500).json({ error: err.message || 'Failed to match jobs' });
  }
};
