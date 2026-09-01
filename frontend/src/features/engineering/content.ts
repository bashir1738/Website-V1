export const engineeringServices = [
  {
    title: "Technical advisory",
    time: "Usually days or weeks, not months",
    copy: "An experienced engineer in the room when the decision is expensive. Architecture reviews, choosing a stack, planning an AI adoption that survives contact with production, technical due diligence, and shaping the engineering team you are about to hire.",
  },
  {
    title: "Discovery sprint",
    time: "Typically two to four weeks",
    copy: "You know the business problem but not the shape of the solution. We turn it into requirements, an architecture, a working prototype, a budget, and a delivery plan you can hand to any team, ours or your own.",
  },
  {
    title: "Build and delivery",
    time: "Typically two to six months",
    copy: "A senior-led team designs and ships it: AI features, web and mobile products, smart contracts and integrations, APIs and infrastructure. You get working software, the code and infrastructure in your own accounts, documentation, and a handover written on the assumption that we are leaving.",
  },
  {
    title: "Ongoing engineering",
    time: "Monthly, minimum three months",
    copy: "Something is live and nobody is looking after it properly. A named team, an agreed monthly capacity, maintenance and improvement, and reporting you can actually read.",
  },
];

export interface DeliveryPrinciple {
  eyebrow: string;
  title: string;
  copy: string;
  fine: string;
}

/** How an engagement is staffed, owned, and handed back. */
export const deliveryPrinciples: DeliveryPrinciple[] = [
  {
    eyebrow: "Senior accountability",
    title: "Senior-led with supervised residency",
    copy: "Every engagement is led by a senior engineer who owns the technical decisions, the quality, and your relationship with us. Residents from the Academy work underneath that leadership on real tasks, reviewed, supervised, and never billed as senior time.",
    fine: "It is how engineers here get genuinely good, and it is reflected in what we charge.",
  },
  {
    eyebrow: "IP & discretion",
    title: "Your IP remains strictly yours",
    copy: "Your code, your infrastructure, your IP, and your roadmap are yours. We ask before we put your name on anything, and a good deal of the work we do is never mentioned at all.",
    fine: "Delivered into your accounts with documentation written for clean handover.",
  },
  {
    eyebrow: "Focus & standards",
    title: "We take few of these",
    copy: "Every project needs the right senior lead, a clear problem, and a realistic path to delivery. We take on a small number of engagements and staff them properly rather than many and thinly. If the fit is wrong we will say so early.",
    fine: "If what you need is more engineers inside your own team, hiring from the network is the better route.",
  },
];

export interface HiringModel {
  title: string;
  copy: string;
  fine: string;
  ctaText: string;
  href: string;
}

/** The four ways an organisation engages Blockfuse engineers. */
export const hiringModels: HiringModel[] = [
  {
    title: "Direct hiring",
    copy: "Tell us about the role, required skills, experience level, working arrangement, and hiring timeline. We shortlist suitable engineers, provide their verified profiles and portfolios, and support the interview process. You employ the successful candidate directly.",
    fine: "A placement fee applies only when you make a successful hire.",
    ctaText: "Hire an engineer",
    href: "/contact?intent=direct-hire",
  },
  {
    title: "Embedded engineers",
    copy: "Engage a Blockfuse engineer on contract without immediately adding a permanent employee. The engineer joins your team, follows your technical direction, and works within your existing processes while Blockfuse manages the engagement.",
    fine: "You manage the product. We support the engineer.",
    ctaText: "Discuss an embedded engagement",
    href: "/contact?intent=embedded",
  },
  {
    title: "Sponsored talent pipelines",
    copy: "Sponsor a cohort designed around the technologies and capabilities your company or ecosystem needs. Blockfuse manages recruitment, selection, training, projects, assessment, and outcome reporting.",
    fine: "Your organisation receives early access to engineers who meet the standard.",
    ctaText: "Sponsor seats or a cohort",
    href: "/contact?intent=sponsor",
  },
  {
    title: "Team training",
    copy: "Develop the engineers you already have with custom programs built around your team's objectives, skill level, and stack.",
    fine: "AI-assisted development, reliable LLM applications, cloud and backend, smart contract security, modern testing.",
    ctaText: "Train your team",
    href: "/contact?intent=team-training",
  },
];
