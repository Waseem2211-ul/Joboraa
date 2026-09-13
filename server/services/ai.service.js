import dotenv from 'dotenv';
dotenv.config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL = process.env.AI_MODEL || 'google/gemini-2.5-flash';

/**
 * Call OpenRouter API with fallback handling
 */
export const callOpenRouter = async ({ systemPrompt, userPrompt, temperature = 0.4, jsonMode = true }) => {
  if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY.trim() === '') {
    return { success: false, reason: 'NO_KEY' };
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY.trim()}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://jobora.ai',
        'X-Title': 'JOBORA Career Intelligence'
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: temperature,
        response_format: jsonMode ? { type: 'json_object' } : undefined
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('OpenRouter API request returned error status:', response.status, errorText);
      return { success: false, reason: `HTTP_${response.status}` };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      return { success: false, reason: 'EMPTY_CONTENT' };
    }

    if (jsonMode) {
      try {
        // Clean JSON markdown codeblocks if present
        let cleaned = content.trim();
        if (cleaned.startsWith('```json')) {
          cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
        } else if (cleaned.startsWith('```')) {
          cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
        }
        const parsed = JSON.parse(cleaned);
        return { success: true, data: parsed, isDemo: false };
      } catch (err) {
        console.warn('Failed to parse AI JSON response:', err);
        return { success: false, reason: 'INVALID_JSON', raw: content };
      }
    }

    return { success: true, data: content, isDemo: false };
  } catch (error) {
    console.warn('OpenRouter API call failed:', error.message);
    return { success: false, reason: error.message };
  }
};

/**
 * 1. Resume Analyzer
 */
export const analyzeResume = async (resumeText) => {
  const systemPrompt = `You are JOBORA's elite ATS and Career Intelligence AI. 
Analyze the provided resume text and return a strict JSON object with this exact schema:
{
  "resumeScore": number (0-100),
  "summary": string,
  "skills": string[],
  "strengths": string[],
  "weaknesses": string[],
  "experience": [{"title": string, "company": string, "duration": string, "highlights": string[]}],
  "education": [{"degree": string, "institution": string, "year": string}],
  "projects": [{"name": string, "tech": string[], "description": string}],
  "missingKeywords": string[],
  "recommendations": string[],
  "suggestedRoles": string[]
}`;

  const userPrompt = `Resume Content:\n\n${resumeText || 'No resume content provided. Analyze a default entry-level tech candidate.'}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data) {
    return { ...aiResult.data, isDemo: false };
  }

  // Realistic Fallback / Demo Data
  return {
    isDemo: true,
    resumeScore: 86,
    summary: "Aspiring Software Engineer with a solid foundation in modern web technologies, component-driven UI architecture, and RESTful API integrations. Demonstrates hands-on project delivery and disciplined problem-solving.",
    skills: [
      "JavaScript (ES6+)",
      "React.js",
      "HTML5 / Modern CSS",
      "Tailwind CSS",
      "Node.js",
      "RESTful APIs",
      "Git & GitHub",
      "State Management",
      "SQL Fundamentals"
    ],
    strengths: [
      "Strong hands-on mastery of modern front-end fundamentals and component lifecycles.",
      "Clear articulation of practical web applications with deployed live demos.",
      "Clean adherence to semantic markup, responsive design principles, and version control."
    ],
    weaknesses: [
      "Lacks quantified impact metrics (e.g., '% performance improvement', 'X active users served').",
      "Limited demonstration of automated testing (Jest, React Testing Library, Cypress).",
      "Could broaden exposure to typed systems like TypeScript and CI/CD pipelines."
    ],
    experience: [
      {
        title: "Frontend Engineering Intern",
        company: "Apex Digital Solutions",
        duration: "Jun 2025 - Dec 2025",
        highlights: [
          "Engineered 12+ responsive UI components using React, reducing design turnaround by 25%.",
          "Integrated 8 REST endpoints with graceful loading and error states for consumer dashboards.",
          "Collaborated in Agile sprints with daily standups and peer code reviews."
        ]
      }
    ],
    education: [
      {
        degree: "B.S. in Computer Science or Software Engineering",
        institution: "State University of Technology",
        year: "2022 - 2026"
      }
    ],
    projects: [
      {
        name: "DevBoard Career Tracker",
        tech: ["React", "Tailwind CSS", "Node.js", "Express"],
        description: "Full-stack job application tracker with status boards, reminder notifications, and analytics."
      },
      {
        name: "CloudMetrics Dashboard",
        tech: ["React", "Chart.js", "REST API"],
        description: "Real-time telemetry and resource usage monitoring dashboard with responsive data grids."
      }
    ],
    missingKeywords: [
      "TypeScript",
      "Jest / Unit Testing",
      "CI/CD Workflows",
      "Next.js / SSR",
      "Docker Containerization",
      "Accessibility (WCAG)",
      "Web Vitals Optimization"
    ],
    recommendations: [
      "Migrate at least one flagship repository to TypeScript to boost ATS relevance for mid-tier openings.",
      "Incorporate metric-driven bullet points emphasizing measurable user or performance outcomes.",
      "Add unit tests for critical components to highlight production engineering rigor.",
      "Include keywords for modern state management and asynchronous data caching (TanStack Query)."
    ],
    suggestedRoles: [
      "Frontend Developer",
      "Full Stack Developer",
      "UI/UX Engineer",
      "React Application Developer",
      "Junior Web Engineer"
    ]
  };
};

/**
 * 2. Career Matching
 */
export const matchCareers = async (profile) => {
  const systemPrompt = `You are JOBORA's Career Strategy Engine. Match the user profile to top 5 promising career roles.
Return a strict JSON object:
{
  "matches": [
    {
      "role": string,
      "matchPercentage": number (50-98),
      "whyMatch": string,
      "currentSkills": string[],
      "missingSkills": string[],
      "salaryRange": string,
      "growthOutlook": string,
      "recommendedAction": string
    }
  ]
}`;

  const userPrompt = `User Profile:\n${JSON.stringify(profile, null, 2)}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data?.matches) {
    return { matches: aiResult.data.matches, isDemo: false };
  }

  // Realistic Fallback / Demo Matches
  return {
    isDemo: true,
    matches: [
      {
        role: "Frontend Developer",
        matchPercentage: 94,
        whyMatch: "Your foundation in React, JavaScript, modern CSS, and component architectures directly aligns with high-demand frontend engineering requisitions.",
        currentSkills: ["React", "JavaScript", "HTML/CSS", "Git", "REST APIs", "Tailwind"],
        missingSkills: ["TypeScript", "Next.js", "Automated Testing (Jest/Cypress)", "State Management (Redux/Zustand)"],
        salaryRange: "$85,000 - $125,000",
        growthOutlook: "Very High (+23% annual demand)",
        recommendedAction: "Build a full-fledged TypeScript + React app with unit tests and deploy it on Vercel."
      },
      {
        role: "Full Stack Developer",
        matchPercentage: 88,
        whyMatch: "You have strong frontend capabilities and demonstrated knowledge of Node.js backend integration and database basics.",
        currentSkills: ["JavaScript", "React", "Node.js", "Express", "REST APIs", "SQL Basics"],
        missingSkills: ["PostgreSQL/Prisma", "Docker", "Authentication (JWT/OAuth)", "Cloud Deployment (AWS/GCP)"],
        salaryRange: "$95,000 - $135,000",
        growthOutlook: "High (+20% annual demand)",
        recommendedAction: "Build an end-to-end full stack SaaS with authenticated CRUD routes and a relational DB."
      },
      {
        role: "UI/UX & Design Systems Engineer",
        matchPercentage: 83,
        whyMatch: "Your appreciation for responsive design, component libraries, and clean user experience makes you ideal for bridging Figma and code.",
        currentSkills: ["CSS3/Flex/Grid", "Tailwind CSS", "React Component UI", "Responsive Layouts"],
        missingSkills: ["Figma Design Systems", "Storybook", "Accessibility (WCAG 2.1)", "Framer Motion"],
        salaryRange: "$80,000 - $115,000",
        growthOutlook: "Stable (+16% annual demand)",
        recommendedAction: "Publish an accessible UI component library documented using Storybook."
      },
      {
        role: "AI Application Developer",
        matchPercentage: 79,
        whyMatch: "Growing demand for engineers who connect frontend web clients to LLM APIs, prompt engineering pipelines, and streaming interfaces.",
        currentSkills: ["JavaScript", "API Integration", "React", "Async Architecture"],
        missingSkills: ["Python Basics", "LangChain / LlamaIndex", "Vector DBs", "Prompt Engineering"],
        salaryRange: "$105,000 - $145,000",
        growthOutlook: "Explosive (+45% annual demand)",
        recommendedAction: "Build a generative AI assistant or automated agent with vector memory retrieval."
      },
      {
        role: "Associate DevOps / Cloud Engineer",
        matchPercentage: 71,
        whyMatch: "Your foundational knowledge of Git, Linux basics, and developer tooling provides an entry path into CI/CD and deployment automation.",
        currentSkills: ["Git", "Command Line", "Basic Scripting"],
        missingSkills: ["Docker Containerization", "GitHub Actions CI/CD", "AWS Fundamentals", "Terraform"],
        salaryRange: "$90,000 - $120,000",
        growthOutlook: "High (+22% annual demand)",
        recommendedAction: "Containerize existing web apps with Docker and create automated GitHub Actions CI pipelines."
      }
    ]
  };
};

/**
 * 3. Skill Gap Analysis
 */
export const analyzeSkillGap = async (profile, targetCareer = 'Frontend Developer') => {
  const systemPrompt = `You are JOBORA's Skill Diagnostic AI.
Given the candidate's profile and their chosen target career, analyze skill gaps.
Return a strict JSON object:
{
  "targetCareer": string,
  "readinessScore": number (0-100),
  "summary": string,
  "currentSkills": string[],
  "requiredSkills": string[],
  "missingSkills": [
    {
      "name": string,
      "category": "Core Technical" | "Frameworks & Tooling" | "Architecture & Quality" | "Soft Skills",
      "priority": "High" | "Medium" | "Low",
      "estimatedWeeksToLearn": number,
      "recommendedProject": string
    }
  ],
  "learningMilestones": [
    {
      "milestone": string,
      "timeframe": string,
      "outcome": string
    }
  ]
}`;

  const userPrompt = `Target Career: ${targetCareer}\nCandidate Profile:\n${JSON.stringify(profile, null, 2)}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data?.missingSkills) {
    return { ...aiResult.data, isDemo: false };
  }

  // Realistic Fallback / Demo Data
  return {
    isDemo: true,
    targetCareer: targetCareer || "Frontend Developer",
    readinessScore: 78,
    summary: `You possess roughly 78% of the core competencies for an entry-to-mid ${targetCareer || "Frontend Developer"} position. Addressing key tooling and testing gaps will elevate you into top-quartile candidacy.`,
    currentSkills: [
      "JavaScript (ES6+)",
      "React.js & Hooks",
      "HTML5 & Semantic Markup",
      "CSS3 & Flexbox/Grid",
      "Tailwind CSS",
      "Git & GitHub Version Control",
      "RESTful API Consumption"
    ],
    requiredSkills: [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js / Server Components",
      "State Management (Zustand/Redux)",
      "Automated Testing (Jest / Vitest / RTL)",
      "CSS Architecture & Tailwind",
      "Web Performance & Core Web Vitals",
      "REST & GraphQL Integration",
      "CI/CD & Git Workflows"
    ],
    missingSkills: [
      {
        name: "TypeScript",
        category: "Core Technical",
        priority: "High",
        estimatedWeeksToLearn: 2,
        recommendedProject: "Refactor your core React project to strict TypeScript with custom interfaces and generic props."
      },
      {
        name: "Next.js & SSR",
        category: "Frameworks & Tooling",
        priority: "High",
        estimatedWeeksToLearn: 2,
        recommendedProject: "Build an SEO-optimized blog or e-commerce storefront utilizing Server Components and dynamic routing."
      },
      {
        name: "Automated Testing (Vitest & RTL)",
        category: "Architecture & Quality",
        priority: "Medium",
        estimatedWeeksToLearn: 1,
        recommendedProject: "Write unit tests for complex user form validations and custom hooks."
      },
      {
        name: "Web Performance & Core Web Vitals",
        category: "Architecture & Quality",
        priority: "Medium",
        estimatedWeeksToLearn: 1,
        recommendedProject: "Audit and optimize image loading, code-splitting, and memoization in an existing app."
      },
      {
        name: "System Design for Frontend",
        category: "Core Technical",
        priority: "Low",
        estimatedWeeksToLearn: 2,
        recommendedProject: "Design the client-side architecture for a real-time collaborative workspace."
      }
    ],
    learningMilestones: [
      {
        milestone: "TypeScript Fluency",
        timeframe: "Weeks 1 - 2",
        outcome: "Type safety across React components, state, and API payload contracts."
      },
      {
        milestone: "Fullstack React with Next.js",
        timeframe: "Weeks 3 - 4",
        outcome: "Production deployment with Server-Side Rendering and fast edge performance."
      },
      {
        milestone: "Test-Driven Confidence",
        timeframe: "Weeks 5 - 6",
        outcome: "Passing test suite covering 80%+ critical client-side paths."
      }
    ]
  };
};

/**
 * 4. Resume Morph
 */
export const morphResume = async (resumeText, targetRole = 'Frontend Developer', jobRequirements = '') => {
  const systemPrompt = `You are JOBORA's Resume Optimization & Morph Engine.
Transform and optimize an existing resume to target a specific role and job requirements without inventing fake degrees.
Return a strict JSON object:
{
  "targetRole": string,
  "atsScoreBefore": number,
  "atsScoreAfter": number,
  "improvedSummary": string,
  "recommendedSkills": string[],
  "improvedExperience": [
    {
      "role": string,
      "company": string,
      "originalBullet": string,
      "morphedBullet": string,
      "whyBetter": string
    }
  ],
  "improvedProjects": [
    {
      "name": string,
      "originalDescription": string,
      "morphedDescription": string,
      "keywordsAdded": string[]
    }
  ],
  "keywordOptimizations": [
    {
      "keyword": string,
      "context": string,
      "importance": "High" | "Medium"
    }
  ],
  "actionVerbImprovements": string[]
}`;

  const userPrompt = `Target Role: ${targetRole}
Job Requirements: ${jobRequirements || 'Modern production engineering standards, high ATS alignment, quantifiable outcomes'}
Original Resume Content:\n${resumeText || 'Junior developer with experience building web apps with React and JavaScript.'}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data?.improvedSummary) {
    return { ...aiResult.data, isDemo: false };
  }

  // Realistic Fallback / Demo Data
  return {
    isDemo: true,
    targetRole: targetRole || "Senior Frontend Engineer",
    atsScoreBefore: 68,
    atsScoreAfter: 93,
    improvedSummary: `Target-aligned ${targetRole || "Frontend Engineer"} with proven expertise in architecting performant, accessible React/TypeScript applications. Experienced in state-driven UI engineering, modern build tooling, and API integrations that enhanced platform engagement and reduced layout render latencies by 35%.`,
    recommendedSkills: [
      "TypeScript",
      "React 19 / Next.js",
      "State Management (Zustand/Redux Toolkit)",
      "Tailwind CSS & Design Systems",
      "RESTful & GraphQL APIs",
      "Vitest / Jest / Testing Library",
      "CI/CD (GitHub Actions)",
      "Web Vitals Optimization"
    ],
    improvedExperience: [
      {
        role: "Web Development Intern",
        company: "Apex Digital Solutions",
        originalBullet: "Worked on UI components using React and helped fix bugs.",
        morphedBullet: "Spearheaded development of 14+ reusable React components adhering to WCAG 2.1 accessibility, reducing page layout shift (CLS) by 40% and cutting design-to-code sprint handoffs by 3 days.",
        whyBetter: "Replaces passive verbs with strong action verbs and incorporates measurable performance metrics and accessibility standards."
      },
      {
        role: "Web Development Intern",
        company: "Apex Digital Solutions",
        originalBullet: "Connected backend APIs to display data in the dashboard.",
        morphedBullet: "Engineered robust asynchronous data-fetching layers for 8+ REST endpoints with optimistic updates and caching, decreasing user-perceived dashboard load times by 450ms.",
        whyBetter: "Highlights deep architectural knowledge of client-side caching and user perceived performance."
      }
    ],
    improvedProjects: [
      {
        name: "DevBoard Career Intelligence Platform",
        originalDescription: "Built a job tracker app with React and Node.js.",
        morphedDescription: "Architected a responsive career management platform utilizing React, TypeScript, and Express; integrated token-based JWT authentication, real-time status pipelines, and localized persistence handling 500+ active mock applicant workflows.",
        keywordsAdded: ["TypeScript", "JWT Authentication", "Asynchronous Pipelines", "Scalability"]
      }
    ],
    keywordOptimizations: [
      {
        keyword: "TypeScript Type Safety",
        context: "Crucial for passing enterprise ATS filters prioritizing maintainable codebases.",
        importance: "High"
      },
      {
        keyword: "Core Web Vitals & Performance",
        context: "Demonstrates production engineering mindset rather than just basic hobbyist UI.",
        importance: "High"
      },
      {
        keyword: "Automated Testing / Vitest",
        context: "Distinguishes junior coders from reliable production contributors.",
        importance: "Medium"
      }
    ],
    actionVerbImprovements: [
      "Engineered (instead of 'Built')",
      "Spearheaded (instead of 'Worked on')",
      "Architected (instead of 'Created')",
      "Accelerated (instead of 'Sped up')"
    ]
  };
};

/**
 * 5. Job Matcher
 */
export const matchJobs = async (profile, jobsList) => {
  const systemPrompt = `You are JOBORA's Job Requisition Matching Engine.
Evaluate the user profile against the provided job openings. Compute match scores (0-100) and identify matching and missing skills.
Return a strict JSON object:
{
  "matches": [
    {
      "jobId": string,
      "matchPercentage": number,
      "matchReason": string,
      "matchedSkills": string[],
      "missingSkills": string[],
      "fitLevel": "Strong Fit" | "Moderate Fit" | "Stretch Opportunity"
    }
  ]
}`;

  const userPrompt = `Candidate Profile:\n${JSON.stringify(profile, null, 2)}\n\nJobs Available:\n${JSON.stringify(jobsList, null, 2)}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data?.matches) {
    return { matches: aiResult.data.matches, isDemo: false };
  }

  // Fallback programmatic matcher based on skills
  const candidateSkills = (profile?.skills || [
    "JavaScript", "React", "HTML", "CSS", "Git", "REST API", "Tailwind CSS", "Node.js"
  ]).map(s => s.toLowerCase());

  const computedMatches = jobsList.map(job => {
    const required = job.requiredSkills || [];
    const matched = required.filter(skill => 
      candidateSkills.some(cs => cs.includes(skill.toLowerCase()) || skill.toLowerCase().includes(cs))
    );
    const missing = required.filter(skill => !matched.includes(skill));

    const ratio = required.length > 0 ? (matched.length / required.length) : 0.8;
    const matchPercentage = Math.min(96, Math.max(55, Math.round(ratio * 100)));

    let fitLevel = "Moderate Fit";
    if (matchPercentage >= 85) fitLevel = "Strong Fit";
    else if (matchPercentage < 70) fitLevel = "Stretch Opportunity";

    return {
      jobId: job.id,
      matchPercentage,
      matchReason: `Matches ${matched.length} of ${required.length} critical requirements including ${matched.slice(0, 2).join(', ') || 'foundational tools'}.`,
      matchedSkills: matched,
      missingSkills: missing,
      fitLevel
    };
  });

  computedMatches.sort((a, b) => b.matchPercentage - a.matchPercentage);
  return { matches: computedMatches, isDemo: true };
};

/**
 * 6. AI Interview: Generate Question
 */
export const generateInterviewQuestion = async (targetRole = 'Frontend Developer', difficulty = 'Medium', previousQuestions = []) => {
  const systemPrompt = `You are JOBORA's AI Technical Interviewer.
Generate a realistic, thoughtful interview question for a candidate interviewing for: ${targetRole} at ${difficulty} difficulty level.
Return a strict JSON object:
{
  "questionId": string,
  "category": "Technical Concept" | "System Architecture" | "Coding Scenario" | "Behavioral / Problem Solving",
  "question": string,
  "context": string,
  "hints": string[],
  "evaluationCriteria": string[]
}`;

  const userPrompt = `Role: ${targetRole}
Difficulty: ${difficulty}
Previous questions asked in this session to avoid repeating:
${JSON.stringify(previousQuestions)}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data?.question) {
    return { ...aiResult.data, isDemo: false };
  }

  // High-quality categorized fallback question bank
  const defaultBank = [
    {
      questionId: "q-" + Date.now(),
      category: "Technical Concept",
      question: "Can you explain how the React Virtual DOM works, and what causes an unnecessary re-render in a React functional component? How would you identify and optimize it?",
      context: "Tests core understanding of React reconciliation, the diffing algorithm, and memoization strategies.",
      hints: [
        "Mention reconciliation and the diffing algorithm.",
        "Discuss props/state reference equality and anonymous callback functions.",
        "Talk about React.memo, useMemo, and useCallback."
      ],
      evaluationCriteria: [
        "Accuracy of Virtual DOM explanation",
        "Understanding of shallow vs deep reference equality",
        "Pragmatic awareness of when NOT to over-memoize"
      ]
    },
    {
      questionId: "q-" + (Date.now() + 1),
      category: "Coding Scenario",
      question: "Imagine you have an e-commerce catalog page that fetches 1,000 product cards over a slow network. What frontend techniques would you use to keep the page snappy and responsive?",
      context: "Assesses web performance, pagination/virtualization, asset optimization, and user experience.",
      hints: [
        "Consider windowing/virtualization (e.g. react-window).",
        "Discuss infinite scrolling vs cursor pagination.",
        "Touch on image lazy-loading, skeleton placeholders, and debouncing filters."
      ],
      evaluationCriteria: [
        "Knowledge of DOM node limits",
        "Network payload reduction tactics",
        "Perceived latency vs actual latency solutions"
      ]
    },
    {
      questionId: "q-" + (Date.now() + 2),
      category: "Behavioral / Problem Solving",
      question: "Describe a time when you encountered a subtle bug in your code or during a project deployment that took considerable effort to locate. Walk me through your debugging methodology.",
      context: "Evaluates composure under pressure, systematic troubleshooting, and engineering discipline.",
      hints: [
        "Use the STAR method (Situation, Task, Action, Result).",
        "Highlight tools used (DevTools, breakpoints, network tab, logs).",
        "Reflect on how you prevented the regression."
      ],
      evaluationCriteria: [
        "Structured problem-solving process",
        "Humility and willingness to inspect assumptions",
        "Implementation of preventive tests or guards"
      ]
    }
  ];

  const index = previousQuestions.length % defaultBank.length;
  return { ...defaultBank[index], isDemo: true };
};

/**
 * 7. AI Interview: Evaluate Answer
 */
export const evaluateInterviewAnswer = async ({ question, answer, role = 'Frontend Developer', difficulty = 'Medium' }) => {
  const systemPrompt = `You are JOBORA's Expert Interview Evaluator.
Evaluate the candidate's answer with honest, constructive, and actionable feedback.
Return a strict JSON object:
{
  "overallScore": number (0-100),
  "technicalKnowledgeScore": number (0-100),
  "communicationScore": number (0-100),
  "relevanceScore": number (0-100),
  "summaryVerdict": string,
  "strengths": string[],
  "weaknesses": string[],
  "improvedAnswer": string,
  "actionableTip": string
}`;

  const userPrompt = `Target Role: ${role} (${difficulty} Level)
Question Asked:
${question}

Candidate's Answer:
${answer || 'No answer submitted or very brief response.'}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: true });
  if (aiResult.success && aiResult.data?.overallScore !== undefined) {
    return { ...aiResult.data, isDemo: false };
  }

  // Realistic Fallback Evaluator
  const wordCount = (answer || '').trim().split(/\s+/).filter(Boolean).length;
  let score = 75;
  if (wordCount < 15) score = 55;
  else if (wordCount > 60) score = 88;
  else score = 78;

  return {
    isDemo: true,
    overallScore: score,
    technicalKnowledgeScore: Math.min(95, score + 4),
    communicationScore: Math.min(95, score - 2),
    relevanceScore: Math.min(95, score + 2),
    summaryVerdict: wordCount > 40
      ? "Solid, competent answer. You touched on the core principles and demonstrated practical familiarity with the subject matter."
      : "Good starting direction, but your response could benefit from greater technical depth and specific real-world examples.",
    strengths: [
      "Directly tackled the core question without straying off-topic.",
      "Used accurate industry terminology and clear structural phrasing.",
      "Showcased practical empathy for real-world user or runtime constraints."
    ],
    weaknesses: [
      "Could incorporate concrete technical examples (e.g. referencing specific API methods or hooks).",
      "Would be even more compelling by mentioning edge cases or trade-offs (e.g. memory overhead vs compute)."
    ],
    improvedAnswer: `To make this answer exceptional in an interview: Start with a 1-sentence high-level summary, explain the underlying mechanism (e.g. how React's diffing checks object references), provide a concrete code pattern you've used (such as useCallback or virtualization), and conclude with the trade-off you evaluated.`,
    actionableTip: "Always follow the Rule of 3 in technical responses: 1) What it is, 2) Why it matters, 3) How you applied it with measurable results."
  };
};

/**
 * 8. Career Copilot
 */
export const careerCopilot = async ({ messages, profileContext }) => {
  const systemPrompt = `You are JOBORA Copilot — the user's dedicated AI Career Strategist & Career Intelligence Copilot.
You have comprehensive visibility into their career profile, target goals, resume highlights, and skill competencies.
Be insightful, encouraging, deeply tactical, and practical. Provide high-impact advice formatted in clean markdown (bullet points, bold highlights, code snippets if relevant).
Always tailor your advice to their actual target career and skills.`;

  const lastUserMessage = messages[messages.length - 1]?.content || 'Hello';
  const userPrompt = `User Profile Context:
${JSON.stringify(profileContext, null, 2)}

Conversation History:
${JSON.stringify(messages.slice(-6), null, 2)}

User's Latest Query:
${lastUserMessage}`;

  const aiResult = await callOpenRouter({ systemPrompt, userPrompt, jsonMode: false });
  if (aiResult.success && aiResult.data) {
    return { reply: aiResult.data, isDemo: false };
  }

  // Realistic Fallback / Context-aware Copilot Responses
  const query = lastUserMessage.toLowerCase();
  let reply = "";

  if (query.includes("career") || query.includes("best for me") || query.includes("path")) {
    reply = `Based on your profile, your highest matching path is **Frontend Developer (94% match)**, closely followed by **Full Stack Developer (88%)**.

### Why this fits you best:
* **Immediate Leverage**: Your skills in **React, JavaScript, and Modern CSS** give you immediate traction for junior-to-mid frontend roles.
* **Highest ROI Upgrades**: By adding **TypeScript** and **Next.js**, you will unlock 2.5x more recruiter inbound requests.
* **Recommended Next Step**: Head to the **Resume Morph** tab to tailor your project descriptions specifically toward modern Frontend specifications.`;
  } else if (query.includes("resume") || query.includes("score") || query.includes("ats")) {
    reply = `Your current resume score is **86/100**, which places you in the top 25th percentile of entry-level candidates.

### 3 Quick Fixes to Reach 95+:
1. **Add Quantifiable Metrics**: Replace generic phrases like *"worked on UI components"* with *"Engineered 14 responsive React components, reducing layout shift by 35%"*.
2. **Inject Missing Keywords**: Modern ATS scanners look for *TypeScript, Vitest / Jest, CI/CD, and Server-Side Rendering*.
3. **Targeted Formatting**: Use the **Resume Morph** tool to automatically align your bullets with top job postings.`;
  } else if (query.includes("skill") || query.includes("learn") || query.includes("missing")) {
    reply = `Here is your high-impact 30-day skill learning sprint:

| Week | Priority Skill | Recommended Action |
| :--- | :--- | :--- |
| **Week 1-2** | **TypeScript** | Convert an existing React project to strict TypeScript with proper interfaces. |
| **Week 3** | **Next.js 14+** | Build a fast, SEO-friendly web app using App Router and Server Components. |
| **Week 4** | **Testing (Vitest)** | Write 5 unit tests for core state logic and async custom hooks. |

Check your **Skill Gap** page for a detailed breakdown by category!`;
  } else if (query.includes("interview") || query.includes("prepare")) {
    reply = `Here is how to ace your upcoming interviews:

### Top 3 Topics to Master:
1. **React Rendering Lifecycle**: Know the exact difference between re-rendering vs re-mounting, and how keys work in lists.
2. **Asynchronous JS & Event Loop**: Microtasks (Promises) vs Macrotasks (setTimeout), and error handling with try/catch.
3. **System Design (Frontend)**: Be ready to explain how you'd structure state, caching, and virtualization for an infinite scroll feed.

💡 **Ready to practice?** Head over to our **AI Interview** module to simulate real questions and get instant scoring!`;
  } else {
    reply = `Welcome! I'm your **JOBORA Career Copilot**. I analyze your resume, skills, and target roles to provide personalized career intelligence.

Here are a few things we can do together right now:
* 🎯 **"Which career is best for me?"** — Analyze your current strengths vs industry demand.
* 📄 **"How can I boost my resume score?"** — Identify ATS keyword gaps and metric improvements.
* 🛠️ **"What skills should I learn this month?"** — Get a personalized 30-day learning roadmap.
* 💼 **"Which jobs match my profile?"** — Review your highest probability job opportunities.

What would you like to focus on today?`;
  }

  return { reply, isDemo: true };
};
