export interface NavChild {
  label: string;
  href: string;
  desc: string;
  flag?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Academy", href: "/training" },
  { label: "Engineering", href: "/engineering" },
  {
    label: "Events",
    href: "/events",
    children: [
      {
        label: "ProdFest",
        href: "/prodfest",
        flag: true,
        desc: "Annual demo festival — the flagship.",
      },
      {
        label: "Hackathons",
        href: "/events#hackathons",
        desc: "48-hour builds with ecosystem partners.",
      },
      {
        label: "Meetups",
        href: "/events#meetups",
        desc: "Monthly community nights in Jos.",
      },
      {
        label: "Workshops",
        href: "/events#workshops",
        desc: "Short, hands-on technical sessions.",
      },
      {
        label: "Demo days",
        href: "/events#demo-days",
        desc: "End-of-cohort project reviews.",
      },
      {
        label: "Past events",
        href: "/events#past-events",
        desc: "The archive, 2024 onward.",
      },
    ],
  },
  {
    label: "Community",
    href: "/team",
    children: [
      { label: "Team", href: "/team", desc: "The people who review the work." },
      {
        label: "Alumni",
        href: "/alumni",
        desc: "Graduates from Cohorts I and II.",
      },
      {
        label: "Open Source",
        href: "/open-source",
        desc: "Repos maintained by our students.",
      },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  programs: [
    { label: "AI-Native Software Engineering", href: "/training" },
    { label: "Applied AI Engineering", href: "/training" },
    { label: "Blockchain Engineering", href: "/training" },
    { label: "Team Training", href: "/training" },
  ],
  organizations: [
    { label: "Hire Blockfuse engineers", href: "/engineering#hire" },
    { label: "Engage embedded engineers", href: "/engineering#hire" },
    { label: "Sponsor a cohort", href: "/engineering#hire" },
    { label: "Train your team", href: "/training" },
    { label: "Become a partner", href: "/contact" },
  ],
  community: [
    { label: "Events", href: "/events" },
    { label: "ProdFest", href: "/prodfest" },
    { label: "Team", href: "/team" },
    { label: "Alumni", href: "/alumni" },
    { label: "Open Source", href: "/open-source" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Our story", href: "/about" },
    { label: "Impact", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
};
