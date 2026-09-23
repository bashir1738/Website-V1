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
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About Blockfuse",
        href: "/about",
        desc: "Our story, mission, and approach to engineering education.",
      },
      {
        label: "Team",
        href: "/about/team",
        desc: "Meet the engineers and operators behind Blockfuse Labs.",
      },
    ],
  },
  { label: "Academy", href: "/training" },
  { label: "Engineering", href: "/engineering" },
  {
    label: "Community",
    href: "/community",
    children: [
      {
        label: "Community hub",
        href: "/community",
        desc: "Connect with engineers, builders, and the wider Blockfuse network.",
      },
      {
        label: "Events",
        href: "/community/events",
        desc: "Meetups, workshops, hackathons, and demo days.",
      },
      {
        label: "Blog",
        href: "/community/blog",
        desc: "Stories, ideas, and updates from Blockfuse.",
      },
      {
        label: "Alumni",
        href: "/community/alumni",
        desc: "Graduates from Cohorts I and II, assessed and on record.",
      },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  programs: [
    { label: "Academy", href: "/training" },
    { label: "Programs", href: "/training#programs" },
    { label: "Assessment", href: "/training#assessment" },
  ],
  organizations: [
    { label: "Hire engineers", href: "/engineering#hire" },
    { label: "Our work", href: "/engineering#build" },
    { label: "Sponsor a cohort", href: "/contact" },
  ],
  community: [
    { label: "Events", href: "/community/events" },
    { label: "Blog", href: "/community/blog" },
    { label: "Alumni", href: "/community/alumni" },
    { label: "ProdFest", href: "/prodfest" },
    { label: "Open Source", href: "/open-source" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/about/team" },
    { label: "Contact", href: "/contact" },
  ],
};
