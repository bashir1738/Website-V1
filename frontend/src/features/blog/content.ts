export interface Post {
  meta: string;
  title: string;
  excerpt: string;
}

export const featuredPost: Post = {
  meta: "Engineering · 12 min read",
  title: "What we mean when we say an engineer is assessed",
  excerpt:
    "Certificates record attendance. We spent two cohorts building a rubric that records ability instead — across coding, AI-assisted development, testing, system design, problem-solving, and communication. Here is how it works, and what it costs to run honestly.",
};

export const sidePosts: Post[] = [
  {
    meta: "Cohort notes · 6 min",
    title: "Cohort II in numbers",
    excerpt:
      "115 graduates, 500+ contracts, and the parts of the curriculum we cut.",
  },
  {
    meta: "Applied AI · 9 min",
    title: "Teaching AI-assisted development without teaching shortcuts",
    excerpt:
      "Students ship faster with AI. Getting them to still understand the code is the work.",
  },
  {
    meta: "Community · 4 min",
    title: "Why ProdFest happens in Jos",
    excerpt: "Talent is not the constraint here. Proximity to opportunity is.",
  },
];

export const morePosts: Post[] = [
  {
    meta: "Blockchain · 11 min",
    title: "A review checklist for first smart contracts",
    excerpt:
      "The eight mistakes that appear in nearly every student's first contract.",
  },
  {
    meta: "Careers · 7 min",
    title: "What hiring partners actually ask us",
    excerpt:
      "Two years of questions from companies, and what they reveal about the market.",
  },
  {
    meta: "Open source · 5 min",
    title: "Running an open source programme with students",
    excerpt:
      "Maintainer load, review standards, and how we onboard contributors in batches.",
  },
];
