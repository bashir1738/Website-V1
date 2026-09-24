const Joi = require('joi');

const TRACKS = [
  'Basic Track',
  'Intermediate Track',
  'Advanced Track',
  'Professional Track',
  'Full-Program Bundle',
  'Blockchain Engineering Track',
];

const EXPERIENCE_LEVELS = [
  'Complete beginner',
  'Some self-taught experience',
  'Built a few projects',
  'Working developer',
];

const REFERRAL_SOURCES = [
  'A Blockfuse graduate',
  'Social media',
  'ProdFest',
  'University or school',
  'Someone referred me',
];

const COHORTS = ['Cohort I', 'Cohort II', 'Cohort III', 'Cohort IV'];

const ALUMNI_TRACKS = [
  'AI-Native Software Engineering',
  'Applied AI Engineering',
  'Blockchain Engineering',
];

const ATTENDING_AS = [
  'Builder or founder',
  'Investor',
  'Hiring partner',
  'Mentor or judge',
  'Community attendee',
];

const ENGAGEMENT_TYPES = [
  'Full-time hire',
  'Contract engagement',
  'Embedded engineer',
  'Sponsored talent pipeline',
  'Not decided yet',
];

const SENIORITY_LEVELS = [
  'Junior, supervised',
  'Mid-level',
  'Senior',
  'A mix across the team',
];

const ENGINEER_COUNTS = ['1', '2 – 3', '4 – 6', 'More than 6'];

const TIMELINE_OPTIONS = [
  'Immediately',
  'Within a month',
  'This quarter',
  'Planning ahead',
];

const ROLE_OPTIONS = [
  'Frontend',
  'Backend',
  'Smart contracts',
  'Applied AI',
  'Full-stack',
  'Data',
];

const SPONSOR_INTERESTS = [
  'ProdFest sponsorship',
  'Cohort scholarships',
  'Hackathon prize pool',
  'Open source grants',
  'Ecosystem residency',
];

const BUDGET_OPTIONS = [
  'Under $5k',
  '$5k – $15k',
  '$15k – $50k',
  'Above $50k',
  'In-kind support',
];

const OPENSOURCE_INTERESTS = [
  'Solidity',
  'TypeScript',
  'Python',
  'Docs',
  'Testing',
  'Design',
];

const HOURS_OPTIONS = ['2–4 hours', '5–8 hours', '9–15 hours', 'More than 15'];

const ALUMNI_OPEN_TO = [
  'Full-time roles',
  'Contract work',
  'Mentoring students',
  'Speaking at events',
  'Not looking right now',
];

const NEWSLETTER_TOPICS = [
  'Cohort openings',
  'Events',
  'Engineering notes',
  'Hiring updates',
];

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// ─────────────────────────────────────────────────────────────────────────────
// Shared text constraints. Applied to every form so behaviour is uniform:
//   • "letters" fields accept letters of any script plus spaces and the modest
//     punctuation people actually use ( . ' - & , ) — digits and code-like
//     symbols are rejected.
//   • Everything has a min/max length; a bare "m" is rejected everywhere.
//   • Phone fields reject letters outright.
//   • github/linkedin fields must be the right kind of link for the field.
// ─────────────────────────────────────────────────────────────────────────────
const NAME_MAX = 100;
const ORG_MAX = 200;
const REPO_RE = /^[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+$/;
// 2–100: names (letters + spaces + . ' -).
const NAME_RE = /^[\p{L}][\p{L}\s.'-]{1,99}$/u;
// 2–200: companies, organisations, locations (letters + spaces + & . ' -).
const ORG_RE = /^[\p{L}][\p{L}\s.'&-]{1,199}$/u;
// 2–200: "what you're doing now" (letters + spaces + , & . ' -).
const STATUS_RE = /^[\p{L}][\p{L}\s,'&-]{1,199}$/u;
// 2–100: contact topics (letters+digits — "ProdFest 2026" is legitimate).
const TOPIC_RE = /^[\p{L}\p{N}][\p{L}\p{N}\s.,'&-]{1,99}$/u;
// Phone: optional leading +, a digit, then digits/spaces/()-/- — 7–20 chars.
const PHONE_RE = /^\+?[0-9][0-9\s\-().]{5,18}$/;
// GitHub profile link, e.g. https://github.com/username (www. optional).
const GITHUB_URL_RE = /^https?:\/\/(?:www\.)?github\.com\/[A-Za-z0-9][A-Za-z0-9._-]*\/?$/i;
// LinkedIn profile link, e.g. https://linkedin.com/in/username (www. optional).
const LINKEDIN_URL_RE = /^https?:\/\/(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9][A-Za-z0-9-]*\/?$/i;

const letters = (label, re, min, max, msg, optional = false) => {
  let schema = Joi.string()
    .min(min)
    .max(max)
    .trim()
    .pattern(re)
    .messages({ 'string.pattern.base': msg });
  if (optional) schema = schema.allow('', null);
  return schema;
};

const nameField = (label = 'Name', optional = false) =>
  letters(label, NAME_RE, 2, NAME_MAX, `${label} can only contain letters, spaces, and . ' -`, optional);

const orgField = (label = 'Organisation', optional = false) =>
  letters(label, ORG_RE, 2, ORG_MAX, `${label} can only contain letters, spaces, and & . ' -`, optional);

// Any https/html link for a field labelled "GitHub or portfolio" or the like.
const linkField = (label) =>
  Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .max(500)
    .trim()
    .messages({
      'string.uri': `${label} must be a full link starting with https://`,
      'string.max': `${label} must be 500 characters or fewer`,
    })
    .allow('', null);

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required().max(254),
  password: Joi.string().min(6).max(128).required(),
});

const blogSchema = Joi.object({
  title: Joi.string().min(3).max(200).trim().required(),
  slug: Joi.string().min(3).max(200).pattern(slugPattern).trim().lowercase().required()
    .messages({ 'string.pattern.base': 'Slug must contain only lowercase letters, numbers, and hyphens' }),
  content: Joi.string().min(10).max(50000).required(),
  author: Joi.string().min(2).max(100).trim().required(),
  published_at: Joi.date().iso().allow(null, ''),
});

const eventSchema = Joi.object({
  title: Joi.string().min(3).max(200).trim().required(),
  slug: Joi.string().min(3).max(200).pattern(slugPattern).trim().lowercase().required()
    .messages({ 'string.pattern.base': 'Slug must contain only lowercase letters, numbers, and hyphens' }),
  description: Joi.string().min(10).max(10000).required(),
  date: Joi.date().iso().required(),
  location: Joi.string().max(200).trim().allow(null, ''),
  link: Joi.string().uri({ scheme: ['http', 'https'] }).max(500).trim().allow(null, ''),
});

const contactSchema = Joi.object({
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  topic: letters('Topic', TOPIC_RE, 2, 100, 'Topic can only contain letters, numbers, spaces, and . , & \' -'),
  message: Joi.string().min(10).max(5000).required(),
});

const applicationSchema = Joi.object({
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  phone: Joi.string()
    .pattern(PHONE_RE)
    .trim()
    .required()
    .messages({ 'string.pattern.base': 'Phone can only contain digits, spaces, and ( ) - +' }),
  location: orgField('Location', true),
  track: Joi.string().valid(...TRACKS).allow(null, ''),
  experience_level: Joi.string().valid(...EXPERIENCE_LEVELS).allow(null, ''),
  github: linkField('GitHub or portfolio'),
  referral: Joi.string().valid(...REFERRAL_SOURCES).allow(null, ''),
  motivation: Joi.string().min(10).max(5000).required(),
});

const hireSchema = Joi.object({
  company: orgField('Company'),
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  roles: Joi.array().items(Joi.string().valid(...ROLE_OPTIONS)).min(1).max(6).allow(null).single(),
  engagement_type: Joi.string().valid(...ENGAGEMENT_TYPES).allow(null, ''),
  seniority: Joi.string().valid(...SENIORITY_LEVELS).allow(null, ''),
  count: Joi.string().valid(...ENGINEER_COUNTS).allow(null, ''),
  timeline: Joi.string().valid(...TIMELINE_OPTIONS).allow(null, ''),
  details: Joi.string().min(10).max(5000).required(),
});

const prodfestSchema = Joi.object({
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  attending_as: Joi.string().valid(...ATTENDING_AS).allow(null, ''),
  organisation: orgField('Organisation', true),
  goals: Joi.string().max(5000).allow(null, ''),
});

const sponsorSchema = Joi.object({
  organisation: orgField('Organisation'),
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  interests: Joi.array().items(Joi.string().valid(...SPONSOR_INTERESTS)).min(1).max(5).allow(null).single(),
  budget: Joi.string().valid(...BUDGET_OPTIONS).allow(null, ''),
  metrics: Joi.string().max(5000).allow(null, ''),
});

const opensourceSchema = Joi.object({
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  github: Joi.string()
    .min(3)
    .max(200)
    .trim()
    .required()
    .pattern(REPO_RE)
    .messages({ 'string.pattern.base': 'GitHub repo must be in owner/repo format (e.g. blockfuse/contract-kit)' }),
  interests: Joi.array().items(Joi.string().valid(...OPENSOURCE_INTERESTS)).min(1).max(6).allow(null).single(),
  hours: Joi.string().valid(...HOURS_OPTIONS).allow(null, ''),
  focus: Joi.string().max(5000).allow(null, ''),
});

const alumniSchema = Joi.object({
  name: nameField('Name'),
  email: Joi.string().email().trim().lowercase().required().max(254),
  cohort: Joi.string().valid(...COHORTS).required(),
  track: Joi.string().valid(...ALUMNI_TRACKS).required(),
  current_status: letters('What you\u2019re doing now', STATUS_RE, 2, 200, 'This can only contain letters, commas, spaces, and & . \' -'),
  location: orgField('Location', true),
  github: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .max(500)
    .trim()
    .pattern(GITHUB_URL_RE)
    .messages({
      'string.uri': 'GitHub must be a full link starting with https://',
      'string.max': 'GitHub link must be 500 characters or fewer',
      'string.pattern.base': 'GitHub link must be a profile like https://github.com/username',
    })
    .allow('', null),
  linkedin: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .max(500)
    .trim()
    .pattern(LINKEDIN_URL_RE)
    .messages({
      'string.uri': 'LinkedIn must be a full link starting with https://',
      'string.max': 'LinkedIn link must be 500 characters or fewer',
      'string.pattern.base': 'LinkedIn link must be a profile like https://linkedin.com/in/username',
    })
    .allow('', null),
  open_to: Joi.array().items(Joi.string().valid(...ALUMNI_OPEN_TO)).min(1).max(5).allow(null).single(),
  verification_info: Joi.string().max(5000).allow(null, ''),
});

const newsletterSchema = Joi.object({
  name: nameField('Name', true),
  email: Joi.string().email().trim().lowercase().required().max(254),
  topics: Joi.array().items(Joi.string().valid(...NEWSLETTER_TOPICS)).min(1).max(4).allow(null).single(),
});

module.exports = {
  loginSchema,
  blogSchema,
  eventSchema,
  contactSchema,
  applicationSchema,
  hireSchema,
  prodfestSchema,
  sponsorSchema,
  opensourceSchema,
  alumniSchema,
  newsletterSchema,
};
