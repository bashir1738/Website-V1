export type FormKey =
  | "program"
  | "hire"
  | "prodfest"
  | "sponsor"
  | "opensource"
  | "alumni"
  | "newsletter";

export type FieldKind = "text" | "select" | "textarea" | "file" | "chips";

export interface FormField {
  label: string;
  kind?: FieldKind;
  /** Native input type when `kind` is omitted. */
  type?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  /** CSS grid-column value; "1 / -1" spans the full width. */
  span?: string;
}

export interface FormSpec {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  note: string;
  successTitle: string;
  successBody: string;
  fields: FormField[];
}

export const forms: Record<FormKey, FormSpec> = {
  program: {
    eyebrow: "Cohort III — applications open",
    title: "Apply to a program",
    subtitle:
      "Admission is based on demonstrated ability and readiness. We take fewer people than apply.",
    cta: "Submit application",
    note: "You'll hear back within 10 working days. Shortlisted applicants get a technical screen.",
    successTitle: "Application received",
    successBody:
      "We've logged your application for Cohort III. Watch your inbox for the technical screen invite.",
    fields: [
      {
        label: "Full name",
        type: "text",
        placeholder: "Amina Bello",
        required: true,
      },
      {
        label: "Email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Phone / WhatsApp",
        type: "tel",
        placeholder: "+234 800 000 0000",
        required: true,
      },
      { label: "Location", type: "text", placeholder: "Jos, Plateau State" },
      {
        label: "Track",
        kind: "select",
        options: [
          "AI-Native Software Engineering",
          "Applied AI Engineering",
          "Blockchain Engineering",
          "Not sure yet",
        ],
      },
      {
        label: "Experience level",
        kind: "select",
        options: [
          "Complete beginner",
          "Some self-taught experience",
          "Built a few projects",
          "Working developer",
        ],
      },
      {
        label: "GitHub or portfolio",
        type: "url",
        placeholder: "github.com/username",
      },
      {
        label: "How did you hear about us?",
        kind: "select",
        options: [
          "A Blockfuse graduate",
          "Social media",
          "ProdFest",
          "University or school",
          "Someone referred me",
        ],
      },
      {
        label: "Why are you applying?",
        kind: "textarea",
        placeholder: "What you want to build, and what you've already tried.",
        span: "1 / -1",
        required: true,
      },
      { label: "Resume", kind: "file", placeholder: "PDF or DOCX, up to 5MB" },
    ],
  },

  hire: {
    eyebrow: "For companies",
    title: "Hire Blockfuse engineers",
    subtitle:
      "Tell us the shape of the role. We'll come back with assessed candidates, not a list of CVs.",
    cta: "Request candidates",
    note: "We share assessment records with every introduction, so you can see the work before the call.",
    successTitle: "Request received",
    successBody:
      "Our talent team will come back within three working days with matched, assessed candidates.",
    fields: [
      {
        label: "Company",
        type: "text",
        placeholder: "Company name",
        required: true,
      },
      {
        label: "Your name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Work email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        label: "Roles you're hiring for",
        kind: "chips",
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
        kind: "select",
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
        kind: "select",
        options: [
          "Junior, supervised",
          "Mid-level",
          "Senior",
          "A mix across the team",
        ],
      },
      {
        label: "How many engineers?",
        kind: "select",
        options: ["1", "2 – 3", "4 – 6", "More than 6"],
      },
      {
        label: "When do you need them?",
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
    fields: [
      {
        label: "Full name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Attending as",
        kind: "select",
        options: [
          "Builder or founder",
          "Investor",
          "Hiring partner",
          "Mentor or judge",
          "Community attendee",
        ],
      },
      { label: "Organisation", type: "text", placeholder: "Where you work" },
      {
        label: "Anything you want to get out of the day?",
        kind: "textarea",
        placeholder: "Optional.",
        span: "1 / -1",
      },
    ],
  },

  sponsor: {
    eyebrow: "Partnerships",
    title: "Partner with Blockfuse",
    subtitle:
      "Sponsors fund cohort seats, ProdFest, and the open source programme.",
    cta: "Start the conversation",
    note: "We'll send the partnership deck with tiers, reach numbers, and past sponsor outcomes.",
    successTitle: "Thank you",
    successBody:
      "Our partnerships lead will reach out with the deck and a time to talk.",
    fields: [
      {
        label: "Organisation",
        type: "text",
        placeholder: "Company or foundation",
        required: true,
      },
      {
        label: "Contact name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Work email",
        type: "email",
        placeholder: "you@company.com",
        required: true,
      },
      {
        label: "Interested in",
        kind: "chips",
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
        kind: "select",
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
      "Contribute to repos maintained by Blockfuse students and residents, with review from our engineers.",
    cta: "Request access",
    note: "Contributors are onboarded in fortnightly batches with a maintainer assigned to each.",
    successTitle: "You're in the queue",
    successBody:
      "We'll add you to the next onboarding batch and introduce you to a maintainer.",
    fields: [
      {
        label: "Full name",
        type: "text",
        placeholder: "Full name",
        required: true,
      },
      {
        label: "Email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "GitHub handle",
        type: "text",
        placeholder: "github.com/username",
        required: true,
      },
      {
        label: "Areas of interest",
        kind: "chips",
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
        kind: "select",
        options: ["2–4 hours", "5–8 hours", "9–15 hours", "More than 15"],
      },
      {
        label: "What do you want to work on?",
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
      "Graduates of Cohorts I and II can list themselves here. Every submission is checked against our assessment records before it goes live.",
    cta: "Submit for verification",
    note: "We verify your cohort and assessment record before publishing. Expect a decision within five working days.",
    successTitle: "Sent for verification",
    successBody:
      "We've received your profile. Once we've matched it against your assessment record, it will appear in the directory and we'll email you the link.",
    fields: [
      {
        label: "Full name",
        type: "text",
        placeholder: "As it appears on your assessment record",
        required: true,
      },
      {
        label: "Email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "Cohort",
        kind: "select",
        options: ["Cohort I", "Cohort II"],
        required: true,
      },
      {
        label: "Track",
        kind: "select",
        options: [
          "AI-Native Software Engineering",
          "Applied AI Engineering",
          "Blockchain Engineering",
        ],
        required: true,
      },
      {
        label: "What you're doing now",
        type: "text",
        placeholder: "Backend engineer, logistics platform",
        required: true,
        span: "1 / -1",
      },
      { label: "Location", type: "text", placeholder: "Jos, Plateau State" },
      {
        label: "GitHub or portfolio",
        type: "url",
        placeholder: "github.com/username",
      },
      {
        label: "LinkedIn",
        type: "url",
        placeholder: "linkedin.com/in/username",
      },
      {
        label: "Open to",
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
      { label: "Profile photo", kind: "file", placeholder: "JPG or PNG, up to 2MB" },
      {
        label: "Anything that helps us verify you",
        kind: "textarea",
        placeholder:
          "Your project from the cohort, who reviewed your work, or the demo you presented.",
        span: "1 / -1",
      },
    ],
  },

  newsletter: {
    eyebrow: "Dispatch",
    title: "Join the Blockfuse dispatch",
    subtitle:
      "Cohort openings, ProdFest dates, and engineering write-ups. Roughly monthly.",
    cta: "Subscribe",
    note: "No sharing, no selling. Unsubscribe in one click.",
    successTitle: "Subscribed",
    successBody: "You'll get the next dispatch. Nothing else.",
    fields: [
      { label: "Name", type: "text", placeholder: "Full name" },
      {
        label: "Email",
        type: "email",
        placeholder: "you@email.com",
        required: true,
      },
      {
        label: "What should we send you?",
        kind: "chips",
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
