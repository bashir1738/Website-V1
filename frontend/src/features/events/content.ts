export interface Fact {
  value: string;
  label: string;
}

export const prodfestFacts: Fact[] = [
  { value: "12", label: "products on stage" },
  { value: "400+", label: "attendees in 2025" },
  { value: "18", label: "partner organisations" },
];

export interface EventKind {
  id: string;
  cadence: string;
  title: string;
  description: string;
}

export const eventKinds: EventKind[] = [
  {
    id: "hackathons",
    cadence: "Quarterly",
    title: "Hackathons",
    description:
      "48-hour builds run with ecosystem partners, judged by working engineers.",
  },
  {
    id: "meetups",
    cadence: "Monthly",
    title: "Community meetups",
    description:
      "Open nights in Jos — talks, demos, and the room that keeps this going.",
  },
  {
    id: "workshops",
    cadence: "Fortnightly",
    title: "Workshops",
    description:
      "Short, hands-on sessions on one specific technique or tool.",
  },
  {
    id: "demo-days",
    cadence: "Per cohort",
    title: "Demo days",
    description:
      "Internal project reviews where teams defend their work before ProdFest.",
  },
  {
    id: "past-events",
    cadence: "Archive",
    title: "Past events",
    description:
      "Everything we've run since 2024, with recordings and project links.",
  },
];

export interface PastEvent {
  date: string;
  title: string;
  meta: string;
  kind: string;
}

export const pastEvents: PastEvent[] = [
  {
    date: "NOV 2025",
    title: "ProdFest 2025",
    meta: "12 teams · 400+ attendees",
    kind: "Flagship",
  },
  {
    date: "SEP 2025",
    title: "Base Builder Hackathon",
    meta: "9 teams · 48 hours",
    kind: "Hackathon",
  },
  {
    date: "JUL 2025",
    title: "Cohort II Demo Day",
    meta: "115 graduates assessed",
    kind: "Demo day",
  },
  {
    date: "MAY 2025",
    title: "Applied AI Workshop Series",
    meta: "6 sessions · 210 seats",
    kind: "Workshop",
  },
  {
    date: "FEB 2025",
    title: "Jos Tech Meetup #14",
    meta: "Open night · 120 attendees",
    kind: "Meetup",
  },
];
