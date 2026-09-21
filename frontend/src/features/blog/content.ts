export const blogCategories = ["All", "Engineering", "Applied AI", "Cohort notes", "Community"] as const;

export type BlogCategory = (typeof blogCategories)[number];

export interface Post {
  slug: string;
  category: Exclude<BlogCategory, "All">;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
}

export interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

export const posts: Post[] = [
  { slug: "what-it-means-to-assess-an-engineer", category: "Engineering", title: "What we mean when we say an engineer is assessed", excerpt: "Certificates record attendance. Our rubric records ability across coding, testing, system design, problem-solving, and communication.", date: "September 2, 2026", readTime: "12 min read", image: "/brand/heropic2.jpg", imageAlt: "Blockfuse engineer presenting work to a classroom" },
  { slug: "cohort-two-in-numbers", category: "Cohort notes", title: "Cohort II in numbers—and what the numbers changed", excerpt: "115 graduates, more than 500 contracts, and the parts of the curriculum we chose to cut.", date: "August 21, 2026", readTime: "6 min read", image: "/brand/path1.jpg", imageAlt: "Blockfuse Academy students working together" },
  { slug: "teaching-ai-without-shortcuts", category: "Applied AI", title: "Teaching AI-assisted development without teaching shortcuts", excerpt: "Students can ship faster with AI. Getting them to still understand, test, and defend the code is the real work.", date: "August 12, 2026", readTime: "9 min read", image: "/brand/path3.jpg", imageAlt: "Engineer working at a computer during a Blockfuse session" },
  { slug: "why-prodfest-happens-in-jos", category: "Community", title: "Why ProdFest happens in Jos", excerpt: "Talent is not the constraint here. Proximity to opportunity is—and a public demo room can begin to close that distance.", date: "July 30, 2026", readTime: "4 min read", image: "/brand/heropic.jpg", imageAlt: "Blockfuse community members gathered at an event" },
  { slug: "first-smart-contract-review", category: "Engineering", title: "A review checklist for your first smart contract", excerpt: "Eight mistakes that appear in nearly every first contract, and the questions reviewers should ask before deployment.", date: "July 18, 2026", readTime: "11 min read", image: "/brand/path2.jpg", imageAlt: "Developer reviewing code on a laptop" },
  { slug: "what-hiring-partners-ask", category: "Community", title: "What hiring partners actually ask us", excerpt: "Two years of questions from companies—and what they reveal about evidence, readiness, and the engineering market.", date: "July 4, 2026", readTime: "7 min read", image: "/brand/path1.jpg", imageAlt: "Blockfuse engineers in a collaborative learning session" },
  { slug: "open-source-with-students", category: "Engineering", title: "Running an open-source programme with students", excerpt: "Maintainer load, review standards, and a practical way to onboard contributors in cohorts without lowering the bar.", date: "June 19, 2026", readTime: "5 min read", image: "/brand/path3.jpg", imageAlt: "Blockfuse student focused on engineering work" },
];

export const articleBodies: Record<string, ArticleSection[]> = {
  "what-it-means-to-assess-an-engineer": [
    { heading: "Attendance is not evidence", paragraphs: ["Finishing a programme tells us that someone stayed the course. It does not tell an employer how that person reads an unfamiliar codebase, responds to a failing test, or explains a trade-off under pressure.", "Our assessments begin where certificates stop. Students are observed while planning, building, reviewing, and presenting real work—not only when submitting a final answer."] },
    { heading: "The rubric follows the work", paragraphs: ["We assess six connected abilities: implementation, testing, system design, problem-solving, communication, and responsible use of AI tools. No single score can hide a serious gap in one of them.", "Reviewers record the decisions an engineer made, the evidence behind those decisions, and how well the engineer responds when the first approach fails."] },
    { heading: "Assessment should create direction", paragraphs: ["A useful assessment does more than rank people. It gives each engineer a precise next step and gives hiring teams a clearer view of the conditions in which that engineer can contribute.", "The standard will keep evolving as the work changes. The principle will not: ability should be demonstrated, reviewed, and made legible."] },
  ],
  "cohort-two-in-numbers": [
    { heading: "The headline numbers", paragraphs: ["Cohort II graduated 115 engineers who collectively completed more than 500 scoped contracts, reviews, and production-style assignments. Those numbers matter because repetition builds judgment.", "They also revealed where volume was masking shallow understanding. We began tracking rework, review quality, and the ability to explain decisions—not simply completed tickets."] },
    { heading: "What we removed", paragraphs: ["We cut exercises that produced identical portfolio pieces and replaced them with open-ended briefs. We reduced lecture time where documentation and guided practice worked better.", "The result was less material on the timetable, but more time spent debugging, reviewing peers, and finishing work to a standard another engineer could maintain."] },
    { heading: "What comes next", paragraphs: ["The next cohort will see earlier team projects, tighter written feedback, and more deliberate practice with existing codebases. Growth is useful only when the learning remains visible inside the numbers."] },
  ],
  "teaching-ai-without-shortcuts": [
    { heading: "Speed changes the classroom", paragraphs: ["AI can turn a blank file into plausible code in seconds. That is useful, but plausibility is not understanding. The classroom has to move from rewarding output to examining decisions.", "Students are expected to trace generated code, test its assumptions, and explain what they would change before it enters a shared codebase."] },
    { heading: "Use the tool, keep the judgment", paragraphs: ["We teach prompting as one part of a wider engineering loop: frame the problem, gather context, generate options, verify behaviour, and document the result.", "When a student cannot explain a dependency, a security choice, or a failed edge case, the work is not complete—even if it runs."] },
    { heading: "The durable skill", paragraphs: ["Tools will change quickly. The durable advantage is the ability to ask better questions, recognise weak answers, and take responsibility for what ships. That is the standard AI-assisted development should strengthen."] },
  ],
  "why-prodfest-happens-in-jos": [
    { heading: "A room changes what is possible", paragraphs: ["Strong work can remain invisible when it is built far from the networks that fund, hire, and distribute it. ProdFest creates a room where builders can show the work directly.", "The event is not a talent show. It is a working demonstration: live products, difficult questions, honest feedback, and new relationships formed around evidence."] },
    { heading: "Why Jos", paragraphs: ["Jos is home to a growing technical community with the ambition to build globally and the patience to build locally. Hosting the festival here makes opportunity travel toward the people doing the work.", "It also gives younger builders a nearby picture of what a technical career can look like—something a remote success story cannot always provide."] },
    { heading: "Beyond one day", paragraphs: ["The value of ProdFest is measured after the room empties: collaborations started, interviews earned, projects improved, and founders who return with a sharper plan."] },
  ],
  "first-smart-contract-review": [
    { heading: "Start with the invariants", paragraphs: ["Before reviewing individual functions, write down what must always remain true. Who can move value? Which totals must balance? What can never happen twice?", "A contract that lacks explicit invariants is difficult to test and even harder to trust. Make those rules visible before discussing style."] },
    { heading: "Review the failure paths", paragraphs: ["First contracts are often written around the successful transaction. Reviewers should spend equal time on rejected calls, repeated calls, stale state, unexpected token behaviour, and permissions.", "Tests should prove both what the contract does and what it refuses to do. A revert without a meaningful reason is a debugging cost waiting to appear."] },
    { heading: "Keep the surface small", paragraphs: ["Every public function and external dependency expands the review surface. Remove what the contract does not need, name roles precisely, and document the assumptions that live outside the code."] },
  ],
  "what-hiring-partners-ask": [
    { heading: "Can they work inside an existing team?", paragraphs: ["Partners rarely ask only whether a candidate can code. They ask whether the person can read existing work, communicate uncertainty, accept review, and deliver without creating hidden maintenance costs.", "That is why our evidence includes team contributions and revision history, not only polished final projects."] },
    { heading: "How much support will they need?", paragraphs: ["Every engineer needs context. The useful question is whether support produces visible progress. We look for people who turn feedback into a better second attempt and know when to ask before a decision becomes expensive."] },
    { heading: "Proof makes matching better", paragraphs: ["A credible portfolio is not a gallery of screenshots. It shows constraints, decisions, tests, trade-offs, and the engineer's actual contribution. Better evidence helps companies set the right expectations and helps engineers enter roles where they can grow."] },
  ],
  "open-source-with-students": [
    { heading: "Treat contribution as production work", paragraphs: ["Open source gives students a real codebase, real users, and real consequences. It only works as a learning environment when maintainers protect the same standards they would expect from any contributor.", "Issues need context, acceptance criteria, and a clear review path. Ambiguity can be useful, but abandonment is not mentorship."] },
    { heading: "Batch the onboarding", paragraphs: ["Repeated one-to-one setup drains maintainers. We onboard contributors in small groups, document the common obstacles, and use shared review sessions to make feedback visible to everyone.", "A smaller set of well-scoped issues creates better learning than a large backlog that no beginner can confidently enter."] },
    { heading: "Protect maintainer attention", paragraphs: ["The programme must budget for review. Contribution counts mean little if pull requests sit untouched or merge without careful feedback. Sustainable open source education treats maintainer time as core infrastructure."] },
  ],
};
