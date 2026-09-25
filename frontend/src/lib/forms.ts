export type FormKey =
  | "program"
  | "hire"
  | "prodfest"
  | "sponsor"
  | "opensource"
  | "alumni"
  | "newsletter";

export type FieldKind = "text" | "select" | "textarea" | "file" | "chips" | "phone";

export interface FormField {
  label: string;
  /** API field name this maps to (see API.pdf). */
  name: string;
  kind?: FieldKind;
  /** Native input type when `kind` is omitted. */
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  /** Comma-separated accept list for file inputs, e.g. ".pdf,.doc,.docx". */
  accept?: string;
  /** CSS grid-column value; "1 / -1" spans the full width. */
  span?: string;
}

export interface FormSpec {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  note?: string;
  successTitle: string;
  successBody: string;
  /** API path this form posts to, e.g. "applications" for POST /api/applications. */
  endpoint: string;
  /** True when the form includes a file field and must submit as multipart/form-data. */
  multipart?: boolean;
  fields: FormField[];
}

export const forms: Record<FormKey, FormSpec> = {
  program: {
    eyebrow: "Next cohort: applications open",
    title: "Apply to a program",
    subtitle:
      "Admission is based on demonstrated ability and readiness. We take fewer people than apply.",
    cta: "Submit application",
    successTitle: "Application received",
    successBody:
      "Check your inbox. We've emailed you a link to complete the payment step and secure your seat.",
    endpoint: "applications",
    multipart: true,
    fields: [
      {
        label: "Full name",
        name: "name",
        type: "text",
        placeholder: "Amina Bello",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Phone / WhatsApp",
        name: "phone",
        kind: "phone",
        placeholder: "802 546 3838",
        required: true,
      },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Jos, Plateau State",
      },
      {
        label: "Track",
        name: "track",
        kind: "select",
        required: true,
        options: [
          "Basic Track",
          "Intermediate Track",
          "Advanced Track",
          "Professional Track",
          "Full-Program Bundle",
          "Blockchain Engineering Track",
        ],
      },
      {
        label: "Experience level",
        name: "experience_level",
        kind: "select",
        required: true,
        options: [
          "Complete beginner",
          "Some self-taught experience",
          "Built a few projects",
          "Working developer",
        ],
      },
      {
        label: "GitHub or portfolio (optional for Basic Track)",
        name: "github",
        type: "text",
        placeholder: "https://github.com/username",
      },
      {
        label: "How did you hear about us?",
        name: "referral",
        kind: "select",
        required: true,
        options: [
          "A Blockfuse Labs graduate",
          "Social media",
          "ProdFest",
          "University or school",
          "Someone referred me",
        ],
      },
      {
        label: "Why are you applying?",
        name: "motivation",
        kind: "textarea",
        placeholder: "What you want to build, and what you've already tried.",
        span: "1 / -1",
        required: true,
      },
      {
        label: "Resume",
        name: "resume",
        kind: "file",
        accept: ".pdf,.doc,.docx",
        placeholder: "PDF or DOCX, up to 1MB",
      },
    ],
  },

  hire: {
    eyebrow: "For companies",
    title: "Hire Blockfuse Labs engineers",
    subtitle:
      "Tell us the shape of the role. We'll come back with assessed candidates, not a list of CVs.",
    cta: "Request candidates",
    note: "We share assessment records with every introduction, so you can see the work before the call.",
    successTitle: "Request received",
    successBody:
      "Our talent team will come back within three working days with matched, assessed candidates.",
    endpoint: "hiring-requests",
    fields: [
      {
        label: "Company",
        name: "company",
        type: "text",
        placeholder: "Company name",
        required: true,
      },
      {
        label: "Your name",
        name: "name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Work email",
        name: "email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        label: "Roles you're hiring for",
        name: "roles",
        kind: "chips",
        required: true,
        options: [
          "Frontend",
          "Backend",
          "Smart contracts",
          "Applied AI",
          "Full-stack",
          "Data",
        ],
        span: "1 / -1",
      },
      {
        label: "Engagement type",
        name: "engagement_type",
        kind: "select",
        required: true,
        options: [
          "Full-time hire",
          "Contract engagement",
          "Embedded engineer",
          "Sponsored talent pipeline",
          "Not decided yet",
        ],
      },
      {
        label: "Seniority",
        name: "seniority",
        kind: "select",
        required: true,
        options: [
          "Junior, supervised",
          "Mid-level",
          "Senior",
          "A mix across the team",
        ],
      },
      {
        label: "How many engineers?",
        name: "count",
        kind: "select",
        options: ["1", "2 – 3", "4 – 6", "More than 6"],
      },
      {
        label: "When do you need them?",
        name: "timeline",
        kind: "select",
        options: [
          "Immediately",
          "Within a month",
          "This quarter",
          "Planning ahead",
        ],
      },
      {
        label: "What will they be working on?",
        name: "details",
        kind: "textarea",
        placeholder: "The product, the stack, and the problems the role owns.",
        span: "1 / -1",
        required: true,
      },
    ],
  },

  prodfest: {
    eyebrow: "ProdFest 2026",
    title: "Register interest for ProdFest",
    subtitle:
      "One day, one stage. Cohort teams ship in front of founders, investors, and ecosystem partners.",
    cta: "Register interest",
    note: "Registration opens formally in Q3. Everyone on this list gets first access to seats.",
    successTitle: "You're on the list",
    successBody:
      "We'll send the date, the venue, and your registration link before it goes public.",
    endpoint: "prodfest-registrations",
    fields: [
      {
        label: "Full name",
        name: "name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Attending as",
        name: "attending_as",
        kind: "select",
        required: true,
        options: [
          "Builder or founder",
          "Investor",
          "Hiring partner",
          "Mentor or judge",
          "Community attendee",
        ],
      },
      {
        label: "Organisation",
        name: "organisation",
        type: "text",
        placeholder: "Where you work",
      },
      {
        label: "Anything you want to get out of the day?",
        name: "goals",
        kind: "textarea",
        placeholder: "Optional.",
        span: "1 / -1",
      },
    ],
  },

  sponsor: {
    eyebrow: "Partnerships",
    title: "Partner with Blockfuse Labs",
    subtitle:
      "Sponsors fund cohort seats, ProdFest, and the open source programme.",
    cta: "Start the conversation",
    note: "We'll send the partnership deck with tiers, reach numbers, and past sponsor outcomes.",
    successTitle: "Thank you",
    successBody:
      "Your sponsor request is confirmed. Our partnerships lead will reach out with the deck and a time to talk.",
    endpoint: "sponsorships",
    fields: [
      {
        label: "Organisation",
        name: "organisation",
        type: "text",
        placeholder: "Company or foundation",
        required: true,
      },
      {
        label: "Contact name",
        name: "name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Work email",
        name: "email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        label: "Interested in",
        name: "interests",
        kind: "chips",
        required: true,
        options: [
          "ProdFest sponsorship",
          "Cohort scholarships",
          "Hackathon prize pool",
          "Open source grants",
          "Ecosystem residency",
        ],
        span: "1 / -1",
      },
      {
        label: "Indicative budget",
        name: "budget",
        kind: "select",
        required: true,
        options: [
          "Under $5k",
          "$5k – $15k",
          "$15k – $50k",
          "Above $50k",
          "In-kind support",
        ],
      },
      {
        label: "What would success look like?",
        name: "metrics",
        kind: "textarea",
        placeholder: "Goals, audience, and timing.",
        span: "1 / -1",
      },
    ],
  },

  opensource: {
    eyebrow: "Open source programme",
    title: "Join the open source programme",
    subtitle:
      "Contribute to repos maintained by Blockfuse Labs students and residents, with review from our engineers.",
    cta: "Request access",
    note: "Contributors are onboarded in fortnightly batches with a maintainer assigned to each.",
    successTitle: "You're in the queue",
    successBody:
      "We'll add you to the next onboarding batch and introduce you to a maintainer.",
    endpoint: "opensource-applications",
    fields: [
      {
        label: "Full name",
        name: "name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Repo you want to contribute to",
        name: "github",
        type: "text",
        placeholder: "blockfuse/contract-kit",
        required: true,
      },
      {
        label: "Areas of interest",
        name: "interests",
        kind: "chips",
        required: true,
        options: [
          "Solidity",
          "TypeScript",
          "Python",
          "Docs",
          "Testing",
          "Design",
        ],
        span: "1 / -1",
      },
      {
        label: "Hours per week",
        name: "hours",
        kind: "select",
        options: ["2–4 hours", "5–8 hours", "9–15 hours", "More than 15"],
      },
      {
        label: "What do you want to work on?",
        name: "focus",
        kind: "textarea",
        placeholder: "A repo, an issue, or a problem you care about.",
        span: "1 / -1",
      },
    ],
  },

  alumni: {
    eyebrow: "Alumni directory",
    title: "Add your profile",
    subtitle:
      "Graduates of Cohorts I–III can list themselves here. Every submission is checked against our assessment records before it goes live.",
    cta: "Submit for verification",
    note: "We verify your cohort and assessment record before publishing. Expect a decision within five working days.",
    successTitle: "Sent for verification",
    successBody:
      "We've received your profile. Once we've matched it against your assessment record, it will appear in the directory and we'll email you the link.",
    endpoint: "alumni-submissions",
    multipart: true,
    fields: [
      {
        label: "Full name",
        name: "name",
        type: "text",
        placeholder: "As it appears on your assessment record",
        required: true,
      },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Cohort",
        name: "cohort",
        kind: "select",
        options: ["Cohort I", "Cohort II", "Cohort III"],
        required: true,
      },
      {
        label: "Track",
        name: "track",
        kind: "select",
        options: [
          "Basic Track",
          "Intermediate Track",
          "Advanced Track",
          "Professional Track",
          "Full-Program Bundle",
          "Blockchain Engineering Track",
        ],
        required: true,
      },
      {
        label: "What you're doing now",
        name: "current_status",
        type: "text",
        placeholder: "Backend engineer, logistics platform",
        required: true,
        span: "1 / -1",
      },
      {
        label: "Location",
        name: "location",
        type: "text",
        placeholder: "Jos, Plateau State",
      },
      {
        label: "GitHub or portfolio",
        name: "github",
        type: "url",
        placeholder: "https://github.com/username",
      },
      {
        label: "LinkedIn",
        name: "linkedin",
        type: "url",
        placeholder: "https://linkedin.com/in/username",
      },
      {
        label: "Open to",
        name: "open_to",
        kind: "chips",
        options: [
          "Full-time roles",
          "Contract work",
          "Mentoring students",
          "Speaking at events",
          "Not looking right now",
        ],
        span: "1 / -1",
      },
      {
        label: "Profile photo",
        name: "photo",
        kind: "file",
        accept: "image/jpeg,image/png",
        placeholder: "JPG or PNG, up to 1MB",
      },
      {
        label: "Anything that helps us verify you",
        name: "verification_info",
        kind: "textarea",
        placeholder:
          "Your project from the cohort, who reviewed your work, or the demo you presented.",
        span: "1 / -1",
      },
    ],
  },

  newsletter: {
    eyebrow: "Dispatch",
    title: "Join the Blockfuse Labs dispatch",
    subtitle:
      "Cohort openings, ProdFest dates, and engineering write-ups. Roughly monthly.",
    cta: "Subscribe",
    note: "No sharing, no selling. Unsubscribe in one click.",
    successTitle: "Subscribed",
    successBody: "You'll get the next dispatch. Nothing else.",
    endpoint: "newsletter",
    fields: [
      { label: "Name", name: "name", type: "text", placeholder: "Full name" },
      {
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "What should we send you?",
        name: "topics",
        kind: "chips",
        required: true,
        options: [
          "Cohort openings",
          "Events",
          "Engineering notes",
          "Hiring updates",
        ],
        span: "1 / -1",
      },
    ],
  },
};
