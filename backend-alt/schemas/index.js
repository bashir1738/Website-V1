const Joi = require('joi');

const TRACKS = [
  'AI-Native Software Engineering',
  'Applied AI Engineering',
  'Blockchain Engineering',
  'Not sure yet',
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

const COHORTS = ['Cohort I', 'Cohort II'];

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
const phonePattern = /^\+?[0-9\s\-().]{7,20}$/;
const urlPattern = /^https?:\/\/.+/;

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
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  topic: Joi.string().min(2).max(100).trim().required(),
  message: Joi.string().min(10).max(5000).required(),
});

const applicationSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  phone: Joi.string().pattern(phonePattern).trim().required().max(30)
    .messages({ 'string.pattern.base': 'Phone must be a valid phone number (e.g. +234 800 000 0000)' }),
  location: Joi.string().max(200).trim().allow(null, ''),
  track: Joi.string().valid(...TRACKS).allow(null, ''),
  experience_level: Joi.string().valid(...EXPERIENCE_LEVELS).allow(null, ''),
  github: Joi.string().uri({ scheme: ['http', 'https'] }).max(500).trim().allow(null, ''),
  referral: Joi.string().valid(...REFERRAL_SOURCES).allow(null, ''),
  motivation: Joi.string().min(10).max(5000).required(),
});

const hireSchema = Joi.object({
  company: Joi.string().min(2).max(200).trim().required(),
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  roles: Joi.array().items(Joi.string().valid(...ROLE_OPTIONS)).min(1).max(6).allow(null),
  engagement_type: Joi.string().valid(...ENGAGEMENT_TYPES).allow(null, ''),
  seniority: Joi.string().valid(...SENIORITY_LEVELS).allow(null, ''),
  count: Joi.string().valid(...ENGINEER_COUNTS).allow(null, ''),
  timeline: Joi.string().valid(...TIMELINE_OPTIONS).allow(null, ''),
  details: Joi.string().min(10).max(5000).required(),
});

const prodfestSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  attending_as: Joi.string().valid(...ATTENDING_AS).allow(null, ''),
  organisation: Joi.string().max(200).trim().allow(null, ''),
  goals: Joi.string().max(5000).allow(null, ''),
});

const sponsorSchema = Joi.object({
  organisation: Joi.string().min(2).max(200).trim().required(),
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  interests: Joi.array().items(Joi.string().valid(...SPONSOR_INTERESTS)).min(1).max(5).allow(null),
  budget: Joi.string().valid(...BUDGET_OPTIONS).allow(null, ''),
  metrics: Joi.string().max(5000).allow(null, ''),
});

const opensourceSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  github: Joi.string().min(3).max(200).trim().required()
    .pattern(/^[a-zA-Z0-9-]+\/[a-zA-Z0-9._-]+$/)
    .messages({ 'string.pattern.base': 'GitHub must be in owner/repo format (e.g. blockfuse/contract-kit)' }),
  interests: Joi.array().items(Joi.string().valid(...OPENSOURCE_INTERESTS)).min(1).max(6).allow(null),
  hours: Joi.string().valid(...HOURS_OPTIONS).allow(null, ''),
  focus: Joi.string().max(5000).allow(null, ''),
});

const alumniSchema = Joi.object({
  name: Joi.string().min(2).max(100).trim().required(),
  email: Joi.string().email().trim().lowercase().required().max(254),
  cohort: Joi.string().valid(...COHORTS).required(),
  track: Joi.string().valid(...ALUMNI_TRACKS).required(),
  current_status: Joi.string().min(2).max(200).trim().required(),
  location: Joi.string().max(200).trim().allow(null, ''),
  github: Joi.string().uri({ scheme: ['http', 'https'] }).max(500).trim().allow(null, ''),
  linkedin: Joi.string().uri({ scheme: ['http', 'https'] }).max(500).trim().allow(null, ''),
  open_to: Joi.array().items(Joi.string().valid(...ALUMNI_OPEN_TO)).min(1).max(5).allow(null),
  verification_info: Joi.string().max(5000).allow(null, ''),
});

const newsletterSchema = Joi.object({
  name: Joi.string().max(100).trim().allow(null, ''),
  email: Joi.string().email().trim().lowercase().required().max(254),
  topics: Joi.array().items(Joi.string().valid(...NEWSLETTER_TOPICS)).min(1).max(4).allow(null),
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
