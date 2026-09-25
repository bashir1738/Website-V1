/**
 * Tracks shown on the /apply landing page. `id` matches the training page's
 * detailedPrograms entries so curriculum links resolve.
 *
 * NOTE: the fee shown here is for display only — the authoritative price and
 * installment split always come from the server at payment time.
 */
export interface ApplyTrack {
  id: string;
  title: string;
  duration: string;
  price: string;
  installments?: string;
  blurb: string;
  highlight?: boolean;
}

export const applyTracks: ApplyTrack[] = [
  {
    id: "basic",
    title: "Basic Track",
    duration: "4–6 weeks",
    price: "₦100,000",
    blurb:
      "Your first working foundation: programming fundamentals, the web, and the tools professional engineers use every day.",
  },
  {
    id: "intermediate",
    title: "Intermediate Track",
    duration: "6–8 weeks",
    price: "₦100,000",
    blurb:
      "Build proper software beyond the basics with JavaScript, a modern frontend, and your first backend.",
  },
  {
    id: "advanced",
    title: "Advanced Track",
    duration: "8–10 weeks",
    price: "₦100,000",
    blurb:
      "Full-stack engineering done properly: structured backends, production frontends, and engineering habits that scale.",
  },
  {
    id: "professional",
    title: "Professional Track",
    duration: "10–12 weeks",
    price: "₦100,000",
    blurb:
      "Production-standard distributed systems, cloud, security, and AI-assisted delivery for working developers levelling up.",
  },
  {
    id: "full-program",
    title: "Full-Program Bundle",
    duration: "14–16 weeks",
    price: "₦250,000",
    blurb:
      "Basic → Professional in one continuous program with a guided capstone and assessment at every stage.",
    highlight: true,
  },
  {
    id: "blockchain",
    title: "Blockchain Engineering Track",
    duration: "24 weeks",
    price: "₦250,000",
    installments: "2 × ₦125,000",
    blurb:
      "Deliver smart contracts, security, and decentralized applications you can defend in review through paid cohorts.",
    highlight: true,
  },
];