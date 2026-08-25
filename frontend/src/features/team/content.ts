export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Sarah Bulus",
    role: "Founder & Programme Director",
    bio: "Runs admissions and sets the assessment standard every cohort is measured against.",
  },
  {
    name: "Ibrahim Lawal",
    role: "Head of Engineering",
    bio: "Leads the residency programme and reviews production work coming out of it.",
  },
  {
    name: "Chidi Okeke",
    role: "Lead Instructor, Blockchain",
    bio: "Smart contracts and protocol systems. Ten years shipping on-chain.",
  },
  {
    name: "Mariam Adamu",
    role: "Lead Instructor, Applied AI",
    bio: "Takes students from using AI tools to engineering reliable AI systems.",
  },
  {
    name: "David Terver",
    role: "Engineering Manager, Residency",
    bio: "Supervises resident engineers on client and open source work.",
  },
  {
    name: "Nneka Eze",
    role: "Head of Talent",
    bio: "Places assessed graduates with hiring partners across Africa and remote teams.",
  },
  {
    name: "Yakubu Musa",
    role: "Community Lead",
    bio: "Runs meetups, hackathons, and everything that happens around ProdFest.",
  },
  {
    name: "Esther Dung",
    role: "Operations Lead",
    bio: "Keeps cohorts, venues, and the assessment calendar running to schedule.",
  },
];
