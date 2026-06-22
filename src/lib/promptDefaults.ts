export const DEFAULT_RESUME_TAILOR_PROMPT = `I am pivoting my career from 5 years of remote operations, logistics, and claims management into my first IT Support/Help Desk role. Tailor my base resume to fit the specific job description provided.

Strict rules:
1. Keep it human, professional, and grounded. Avoid robotic or inflated AI wording.
2. Do not stretch the truth, fabricate metrics, or invent enterprise IT experience.
3. Frame remote operations, logistics, claims, SLA management, client de-escalation, and field troubleshooting as transferable strengths.
4. Highlight the self-hosted enterprise service desk lab, Active Directory/RBAC, GPO failure simulations, Splunk, Google Cybersecurity Certificate, and CompTIA A+ in progress when relevant.
5. Rearrange and rewrite only around the real base resume and the target job description.
6. Keep contact details exact and keep raw URLs visible.`;

export const DEFAULT_CRITIQUE_PROMPT = `Provide a direct but professional critique of the base resume against the selected job description.

Point out:
1. Where the resume sounds too junior or too generic.
2. Where job-description requirements are missing or weak.
3. Where transferable skills should be reframed.
4. Whether relocation, onsite work, or schedule requirements need to be flagged.
5. What should be improved before submitting the application.

Keep the critique useful, honest, and specific without being insulting.`;

export const DEFAULT_KEYWORD_SEARCH_PROMPT = `Act as a practical recruiter and career search coach. The user may describe the type of work they want in plain language instead of knowing exact job titles.

Return useful alternate job titles, core search keywords, boolean search strings, and a short search strategy tip. Focus on realistic entry-level and early-career IT support/help desk paths unless the user asks for something else.`;
