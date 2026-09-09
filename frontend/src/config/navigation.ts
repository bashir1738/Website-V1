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
    label: "Community",
    href: "/events",
    children: [
      {
        label: "Events",
        href: "/events",
        desc: "Meetups, workshops, hackathons, and demo days.",
      },
      {
        label: "Blog",
        href: "/blog",
        desc: "Stories, ideas, and updates from Blockfuse.",
      },
      {
        label: "Alumni",
        href: "/alumni",
        desc: "Graduates from Cohorts I and II, assessed and on record.",
      },
    ],
  },
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
