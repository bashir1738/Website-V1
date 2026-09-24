import {
  MessageSquare,
  Users,
  Briefcase,
  Sparkles,
  HandCoins,
  Code2,
  GraduationCap,
  Mail,
  type LucideIcon,
} from "lucide-react";

/**
 * The eight admin inboxes, one route each under /admin/inbox/<key>.
 * Same source used by the sidebar nav and the inbox page tabs.
 */
export interface InboxTypeConfig {
  key: string;
  label: string;
  apiPath: string;
  icon: LucideIcon;
  href: string;
}

export const INBOX_TYPES: InboxTypeConfig[] = [
  { key: "contact", label: "Contacts", apiPath: "contact", icon: MessageSquare, href: "/admin/inbox/contact" },
  { key: "applications", label: "Applications", apiPath: "applications", icon: Users, href: "/admin/inbox/applications" },
  { key: "hiring-requests", label: "Hire requests", apiPath: "hiring-requests", icon: Briefcase, href: "/admin/inbox/hiring-requests" },
  { key: "prodfest-registrations", label: "ProdFest", apiPath: "prodfest-registrations", icon: Sparkles, href: "/admin/inbox/prodfest-registrations" },
  { key: "sponsorships", label: "Sponsorships", apiPath: "sponsorships", icon: HandCoins, href: "/admin/inbox/sponsorships" },
  { key: "opensource-applications", label: "Open source", apiPath: "opensource-applications", icon: Code2, href: "/admin/inbox/opensource-applications" },
  { key: "alumni-submissions", label: "Alumni profiles", apiPath: "alumni-submissions", icon: GraduationCap, href: "/admin/inbox/alumni-submissions" },
  { key: "newsletter", label: "Newsletter", apiPath: "newsletter", icon: Mail, href: "/admin/inbox/newsletter" },
];

export const DEFAULT_INBOX_KEY = INBOX_TYPES[0].key;

export function inboxHref(key: string): string {
  return `/admin/inbox/${key}`;
}

export function inboxByKey(key: string): InboxTypeConfig | undefined {
  return INBOX_TYPES.find((type) => type.key === key);
}