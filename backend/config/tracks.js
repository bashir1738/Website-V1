/**
 * Canonical academy track definitions.
 *
 * This is the single source of truth for the 6 offered programs — used by the
 * seeder to populate the `tracks` table and by the payment controller to
 * compute authoritative due amounts (never trusted from the client).
 *
 * Amounts are in naira. Blockchain Engineering is the only installment track:
 * 2 × 50%, with installment 2 due after week 8 of the program.
 */
const TRACKS = [
  {
    key: 'basic',
    name: 'Basic Track',
    price: 100000,
    duration: null,
    description:
      'HTML, CSS, basic JavaScript, Git/GitHub, bash, and Linux basics — the foundations every engineer builds on.',
    curriculum: [
      'HTML',
      'CSS',
      'Basic JavaScript',
      'Git / GitHub',
      'bash',
      'Linux basics',
    ],
    total_installments: 1,
  },
  {
    key: 'intermediate',
    name: 'Intermediate Track',
    price: 100000,
    duration: null,
    description:
      'Tailwind, intermediate JavaScript, React, basic Node.js, introductory Python, and agentic engineering.',
    curriculum: [
      'Tailwind',
      'Intermediate JavaScript',
      'React',
      'Basic Node.js',
      'Intro Python',
      'Agentic engineering',
    ],
    total_installments: 1,
  },
  {
    key: 'advanced',
    name: 'Advanced Track',
    price: 100000,
    duration: null,
    description:
      'TypeScript, advanced Node.js, Postgres/MongoDB/Redis, Next.js, Docker, testing, DevOps, and AI agents in Python.',
    curriculum: [
      'TypeScript',
      'Advanced Node.js',
      'Postgres / MongoDB / Redis',
      'Next.js',
      'Docker',
      'Testing',
      'DevOps',
      'AI agents in Python',
    ],
    total_installments: 1,
  },
  {
    key: 'professional',
    name: 'Professional Track',
    price: 100000,
    duration: null,
    description:
      'Go, system design, interview prep, proposals, negotiation, a capstone project, and internship placement.',
    curriculum: [
      'Go',
      'System design',
      'Interview prep',
      'Proposals',
      'Negotiation',
      'Capstone',
      'Internship placement',
    ],
    total_installments: 1,
  },
  {
    key: 'full-program',
    name: 'Full-Program Bundle',
    price: 250000,
    duration: null,
    description:
      'All four core tracks in one bundle — save ₦150,000 versus enrolling in the Basic, Intermediate, Advanced, and Professional tracks separately.',
    curriculum: ['Basic Track', 'Intermediate Track', 'Advanced Track', 'Professional Track'],
    total_installments: 1,
  },
  {
    key: 'blockchain',
    name: 'Blockchain Engineering Track',
    price: 250000,
    duration: '6 months',
    description:
      'Six-month blockchain engineering program. Payable in two installments: 50% before the program starts and 50% after week 8.',
    curriculum: [
      'Blockchain fundamentals',
      'Smart contract development',
      'Protocol and wallet integration',
      'dApp development',
      'Security and deployment',
    ],
    total_installments: 2,
  },
];

/** 50% due up front for the only installment-based track. */
const INSTALLMENT_RATIO = 0.5;

/** Weeks into the program after which installment 2 becomes due. */
const INSTALLMENT_2_DUE_AFTER_WEEKS = 8;

const byKey = (key) => TRACKS.find((track) => track.key === key) || null;

module.exports = {
  TRACKS,
  INSTALLMENT_RATIO,
  INSTALLMENT_2_DUE_AFTER_WEEKS,
  byKey,
};