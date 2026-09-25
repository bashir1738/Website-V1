export interface AcademyPillar {
  title: string;
  copy: string;
  subCopy?: string;
}

export const academyPillars: AcademyPillar[] = [
  {
    title: "Learn from engineers who build",
    copy: "Your instructors and reviewers are working engineers. The same senior engineers lead our client engagements, so what you are taught reflects what is actually being built and shipped.",
    subCopy: "They review your work the way it gets reviewed on a professional team: directly, and without flattery.",
  },
  {
    title: "Build real, working projects",
    copy: "You will not spend the entire program following tutorials. You will design, build, test, deploy, and explain software that other people can use.",
    subCopy: "Blockfuse Labs students have already written more than 500 smart contracts and shipped 12 dApps through cohort projects.",
  },
  {
    title: "Receive honest, useful feedback",
    copy: "You will always know where you stand. We identify weaknesses early, help you address them, and show you what the next level requires. If you are behind, you will hear it while there is still time to fix it.",
  },
  {
    title: "Develop AI-native engineering skills",
    copy: "You will learn to use AI to research, build, test, debug, and document software more effectively, without becoming dependent on it or surrendering your engineering judgment.",
  },
  {
    title: "Graduate with evidence",
    copy: "Your portfolio, technical projects, code reviews, and production-readiness assessment provide evidence that employers can evaluate.",
  },
  {
    title: "Access meaningful opportunities",
    copy: "Graduates who meet the standard may receive introductions to employers, ecosystem partners, mentors, and technical communities within the Blockfuse Labs network.",
    subCopy: "Placement is not automatic, but helping capable graduates become visible to the right organisations is an important part of our work. For those building something of their own, what we have is the network: partners, mentors, ecosystems, and a stage at ProdFest.",
  },
  {
    title: "Join a community that continues after graduation",
    copy: "Blockfuse Labs alumni return as mentors, collaborators, referral partners, founders, and instructors. Graduation does not end your relationship with the community.",
  },
];

export interface DetailedProgram {
  id: string;
  title: string;
  description: string;
  topics: string[];
  outcome: string;
  ctaText: string;
}

export const detailedPrograms: DetailedProgram[] = [
  {
    id: "basic",
    title: "Basic Track",
    description:
      "Your first working foundation: core programming, the web, and the tools professional engineers use every day. Fee: ₦100,000.",
    topics: [
      "Programming fundamentals & problem solving",
      "HTML, CSS and JavaScript",
      "Git & GitHub workflows",
      "Developer tools (terminal, VS Code)",
      "Building your first web pages",
      "How the internet and browsers work",
    ],
    outcome:
      "You finish able to build and host a real site, use Git daily, and step into the Intermediate Track with confidence.",
    ctaText: "Apply for the Basic Track",
  },
  {
    id: "intermediate",
    title: "Intermediate Track",
    description:
      "For people who know the basics and want to build proper software: JavaScript, modern frontend, and your first backend. Fee: ₦100,000.",
    topics: [
      "JavaScript & TypeScript fundamentals",
      "Modern frontend with React",
      "APIs and HTTP",
      "Node.js & databases",
      "Testing what you build",
      "Consuming third-party services",
    ],
    outcome:
      "You finish able to build and deploy a full frontend that talks to a real backend, the shape of most professional web apps.",
    ctaText: "Apply for the Intermediate Track",
  },
  {
    id: "advanced",
    title: "Advanced Track",
    description:
      "Full-stack engineering done properly: structured backends, production frontends, and the engineering habits that scale. Fee: ₦100,000.",
    topics: [
      "Full-stack architecture (Next.js, Node)",
      "Relational databases & data modelling",
      "Authentication & authorisation",
      "Deployment & CI/CD",
      "Code review & working in a team",
      "Performance and observability",
    ],
    outcome:
      "You finish able to ship a secure, tested full-stack product and work inside a professional engineering team.",
    ctaText: "Apply for the Advanced Track",
  },
  {
    id: "professional",
    title: "Professional Track",
    description:
      "Built for working developers levelling up: distributed systems, cloud, security, and AI-assisted delivery at production standards. Fee: ₦100,000.",
    topics: [
      "Microservices & distributed systems",
      "Cloud infrastructure (AWS, containers)",
      "Advanced testing & reliability",
      "Security engineering",
      "AI-assisted development workflows",
      "Leading technical work & reviews",
    ],
    outcome:
      "You finish able to design resilient systems, operate them in the cloud, and earn the production-readiness assessment.",
    ctaText: "Apply for the Professional Track",
  },
  {
    id: "full-program",
    title: "Full-Program Bundle",
    description:
      "The complete journey: Basic, Intermediate, Advanced and Professional in one continuous program, built for a serious career jump. Fee: ₦250,000.",
    topics: [
      "All four track curriculums, sequenced",
      "A guided capstone for each stage",
      "Mentor sessions throughout",
      "Portfolio & technical review",
      "Production-readiness assessment",
      "Career and placement support",
    ],
    outcome:
      "One continuous arc from first lines of code to production-ready engineering, assessed at every transition.",
    ctaText: "Apply for the Full-Program Bundle",
  },
  {
    id: "blockchain",
    title: "Blockchain Engineering Track",
    description:
      "The program Blockfuse Labs became known for: smart contracts, security, and decentralized applications you can defend in review. Fee: ₦250,000, spread as two installments of ₦125,000.",
    topics: [
      "Blockchain & distributed-systems fundamentals",
      "Smart contract development (Solidity)",
      "Testing and security practices",
      "Protocol and wallet integration",
      "Decentralised application development",
      "Deployment and monitoring",
      "Building projects that survive technical review",
    ],
    outcome:
      "You finish able to write, test, secure, and deploy real contracts and dApps, the work that makes up a web3 engineer's day.",
    ctaText: "Apply for the Blockchain Engineering Track",
  },
];

export interface PathStage {
  stage: string;
  description: string;
}

export const academyPathStages: PathStage[] = [
  {
    stage: "Academy Learner",
    description: "Actively participating in a Blockfuse Labs training program.",
  },
  {
    stage: "Academy Graduate",
    description:
      "Completed the program requirements and submitted the required projects.",
  },
  {
    stage: "Blockfuse Labs Verified Engineer",
    description: "Passed the Blockfuse Labs production-readiness assessment.",
  },
  {
    stage: "Engineering Resident",
    description:
      "Gaining supervised, practical engineering experience under the review of our senior engineers.",
  },
  {
    stage: "Blockfuse Labs Talent Network",
    description:
      "Approved for introductions to suitable employers, contract opportunities, and ecosystem partners.",
  },
];

export interface AssessmentMatrixItem {
  area: string;
  whatWeAssess: string;
}

export const assessmentMatrix: AssessmentMatrixItem[] = [
  {
    area: "Coding fundamentals",
    whatWeAssess:
      "Correctness, readability, maintainability, and understanding of the language",
  },
  {
    area: "AI-assisted development",
    whatWeAssess:
      "Using AI productively while recognising and correcting unreliable output",
  },
  {
    area: "Problem-solving",
    whatWeAssess:
      "Breaking down unfamiliar problems and making progress independently",
  },
  {
    area: "Testing and debugging",
    whatWeAssess: "Proving that software works and diagnosing why it does not",
  },
  {
    area: "Git and collaboration",
    whatWeAssess: "Contributing safely and effectively to a shared codebase",
  },
  {
    area: "System design",
    whatWeAssess:
      "Designing software that remains maintainable as requirements change",
  },
  {
    area: "Communication",
    whatWeAssess:
      "Writing clear updates, documenting decisions, and asking useful questions",
  },
  {
    area: "Product judgment",
    whatWeAssess:
      "Understanding the user, the problem, and the purpose of the software",
  },
];

export const academyExpectations = [
  "Attend and participate consistently",
  "Complete work on time",
  "Ask for help before you become stuck",
  "Accept technical feedback professionally",
  "Support other members of your cohort",
  "Take responsibility for the quality of your work",
  "Keep improving after the program ends",
];

export const fundingChannels = [
  "Individual tuition",
  "Company-sponsored training",
  "Ecosystem-sponsored cohorts",
  "Partner-funded scholarships",
];

export interface GraduateTestimonial {
  quote: string;
  author: string;
  image?: string;
  role?: string;
  cohort?: string;
}

export const graduateTestimonials: GraduateTestimonial[] = [
  {
    author: "Luckify",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1731314243/testimony/o2lsuc71lbotpudzjabs.jpg",
    quote: "BlockfuseLabs is the best",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Kingsley Gbutemu Kefas",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1731394621/testimony/abshxxnsutgjn9qncbhg.jpg",
    quote: "Learning at Blockfuse Labs has been a transformative experience. The hands-on projects gave me confidence in real-world blockchain applications. The mentors at Blockfuse Labs are industry experts who provided invaluable support and insights every step of the way. Blockfuse Labs has been the perfect launchpad for my Web3 journey, and I couldn't be more grateful!",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Filibus Yilrit Dimka",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1731488326/testimony/gwplgxpw61ufexjebgoh.jpg",
    quote: "Learning at Blockfuse Lab has been an incredibly enriching experience. As a beginner in blockchain technology, the structured curriculum and hands-on approach have provided me with a solid foundation in the Web3 ecosystem.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Emmanuel Doji",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1731490624/testimony/e4cus5x1khtmaeesbyzo.jpg",
    quote: "My experience at Blockfuse Labs has transformed the way I approach development. The knowledge I've gained here has been invaluable, making the learning journey both challenging and rewarding. I highly recommend Blockfuse Labs to anyone looking to transition into web2 or web3 development.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Jethro Lopwus",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1731497558/testimony/plydq1iqaxferxtjxuik.jpg",
    quote: "BlockfuseLabs is a game changer for me, Thank God I made the choice to be at this Great Learning Zenvironment. Learn! Innovate!! Disrup!!!",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Shaaibu Suleiman",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1731499628/testimony/mcyfrywr7axlibupetwc.jpg",
    quote: "Blockfuse Labs has taught me far more than just building. It’s shown me the value of teamwork, collaboration, and creative problem-solving within a truly supportive community. The energy at Blockfuse Labs is contagious, constantly driving us to push our limits. The results speak for themselves, with each project and skill learned being a testament to the incredible environment they’ve cultivated.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Valentine Kefas Kasuwa",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732201811/testimony/nxc3w0czbvw11tgbx9lk.jpg",
    quote: "My experience at Blockfuse labs, for the past months I learn a lot, because for someone like me who never code before, is really a privilege to be at Blockfuse labs to learn and interact with great minds. And we have great tutors who want to see us progressing.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Samuel Nanbam Luka",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732201867/testimony/togkosxpdjl2gi3gudmi.jpg",
    quote: "My experience at Blockfuse labs, for the past months I learn a lot, because for someone like me who never code before, is really a privilege to be at Blockfuse labs to learn and interact with great minds. And we have great tutors who want to see us progressing.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Clement Raymond",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732201896/testimony/y8e3ygxaccdbenvxzg4w.jpg",
    quote: "Blockfuse Labs not only taught me how to code, but also how to think critically and problem-solve like a true programmer. The lessons are interactive and provide opportunities for hands-on learning, which really helped me understand the theory in practice. The small class sizes allowed for more personalized attention from the instructors, and the community of fellow students made the learning process even more enjoyable.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Ch3fdev",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732201932/testimony/fqgtdhynl12dqlbellim.jpg",
    quote: "It's been an awesome time. Though I am not where I want to be but, I am very much better than what I used to be. Blockfuse Labs has given me the hope I had lost some years back. I am already seeing myself as a web3 dev, though JavaScript is still giving me a tough time. I am no longer settling for less, I will give it all it takes.\nThank you @teamBlockfuseLabs.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Marcus David Gyang",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732201958/testimony/iahtrtej4xhiyelecwyv.jpg",
    quote: "My experience at Blockfuse labs has been a life changing experience, nothing short of Amazing. From the quality of knowledge being taught, to participating in real life projects and having the opportunity to learn from the best mentors and other brilliant minds in the community,Blockfuse Labs has really impacted my life and career as a developer (for good).",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Timothy Ogory",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732201976/testimony/vvthsjqtyfsljfrc6v4g.jpg",
    quote: "First let me start by saying how grateful I am to blocfuse labs. Before blocfuse labs I have little or no knowledge on web2 and the tech world. But since I enrolled into their web2 to web3 boot camp it has been helpful. They gave us access to good instructors and mentors, on hand lessons and practice, tech meetups. Blocfuse made me feel like I am a senior developer even though I am still on my learning path.this is how good they made me to be. With blocfuse I wrote my first hello world. Now saying to the world \"hello world blocfuse is here!\"",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  },
  {
    author: "Sendi John",
    image: "https://res.cloudinary.com/dcl3ecscw/image/upload/v1732202104/testimony/xquau8f81hlwpojnpqdx.jpg",
    quote: "I am thoroughly impressed with BlockfuseLabs commitment to teaching and strengthening my coding skills! The past months has been an incredible journey for me at blockfuse, filled with engaging workshops(hands on code), insightful training sessions, and great mentorship.",
    role: "Blockfuse Labs Alumni",
    cohort: "2024",
  }
];

export interface AcademyStat {
  value: string;
  label: string;
}

/** Proof strip under the Academy hero — the numbers behind the programs. */
export const academyStats: AcademyStat[] = [
  { value: "797+", label: "Developers trained" },
  { value: "5,500+", label: "Smart contracts deployed" },
  { value: "57+", label: "Projects and dApps built" },
  { value: "3,620+", label: "Hours of technical training delivered" },
];
