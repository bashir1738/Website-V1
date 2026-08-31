'use client'

import { useState, useEffect, useRef } from 'react'

const engineers = [
  {
    id: 1,
    name: 'Adeniyi Adesanya',
    title: 'Senior Smart Contract Engineer',
    tags: ['Solidity Expert', 'EVM Specialist', 'DeFi Builder'],
    bio: 'Adeniyi has shipped over 40 production smart contracts across DeFi, NFT, and DAO protocols. He approaches every engagement with a security-first mindset and audit-ready code from day one.',
    stack: ['Solidity', 'Foundry', 'Hardhat', 'Viem'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 2,
    name: 'Chioma Okafor',
    title: 'Full-Stack dApp Developer',
    tags: ['Web3 UI', 'Subgraphs', 'Next.js'],
    bio: 'Chioma builds end-to-end decentralised applications with a sharp eye for UX and performance. She has integrated wallet connections, real-time indexing, and complex on-chain state across 12+ live products.',
    stack: ['Next.js', 'TypeScript', 'The Graph', 'wagmi'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 3,
    name: 'Tunde Salami',
    title: 'AI Systems Engineer',
    tags: ['LLM Pipelines', 'Agents', 'RAG'],
    bio: 'Tunde designs and deploys reliable AI-powered systems — not just demos. His work spans agentic workflows, retrieval-augmented generation, and on-chain inference pipelines integrated into live Web3 products.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Vector DBs'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 4,
    name: 'Zainab Ibrahim',
    title: 'Protocol Architect',
    tags: ['Rust', 'Solana', 'System Design'],
    bio: 'Zainab architects distributed systems and Solana programs that hold up under real production load. She brings deep protocol intuition to every engagement and communicates complex tradeoffs clearly.',
    stack: ['Rust', 'Anchor', 'Solana', 'TypeScript'],
    available: 'Mar 2025',
    photo: 'https://images.unsplash.com/photo-1589156215202-bce1f91e27ef?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 5,
    name: 'Emeka Eze',
    title: 'Blockchain Security Engineer',
    tags: ['Audit', 'Fuzzing', 'Formal Verification'],
    bio: 'Emeka specialises in smart contract security — from manual code review to automated fuzzing and formal verification. He has identified critical vulnerabilities in protocols managing millions in TVL.',
    stack: ['Solidity', 'Slither', 'Echidna', 'Foundry'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 6,
    name: 'Fatima Usman',
    title: 'DevOps & Infrastructure Engineer',
    tags: ['CI/CD', 'Cloud', 'Monitoring'],
    bio: 'Fatima builds the infrastructure that keeps Web3 products running — from node infrastructure and RPC management to deployment pipelines and on-chain monitoring systems.',
    stack: ['Docker', 'AWS', 'Terraform', 'Grafana'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 7,
    name: 'Kelvin Musa',
    title: 'Backend Engineer',
    tags: ['APIs', 'Node.js', 'Databases'],
    bio: 'Kelvin builds robust backend systems that power Web3 product data layers — from indexing services and off-chain APIs to webhook infrastructure and high-availability databases.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Prisma'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 8,
    name: 'Amina Garba',
    title: 'Applied AI Engineer',
    tags: ['Fine-tuning', 'Evaluation', 'Deployment'],
    bio: 'Amina focuses on building production-grade AI applications — evaluating model reliability, managing latency and cost, and deploying systems that behave predictably outside of demo conditions.',
    stack: ['Python', 'HuggingFace', 'FastAPI', 'LLMOps'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 9,
    name: 'Adeniyi Adesanya',
    title: 'Senior Smart Contract Engineer',
    tags: ['Solidity Expert', 'EVM Specialist', 'DeFi Builder'],
    bio: 'Adeniyi has shipped over 40 production smart contracts across DeFi, NFT, and DAO protocols. He approaches every engagement with a security-first mindset and audit-ready code from day one.',
    stack: ['Solidity', 'Foundry', 'Hardhat', 'Viem'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 10,
    name: 'Chioma Okafor',
    title: 'Full-Stack dApp Developer',
    tags: ['Web3 UI', 'Subgraphs', 'Next.js'],
    bio: 'Chioma builds end-to-end decentralised applications with a sharp eye for UX and performance. She has integrated wallet connections, real-time indexing, and complex on-chain state across 12+ live products.',
    stack: ['Next.js', 'TypeScript', 'The Graph', 'wagmi'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 11,
    name: 'Tunde Salami',
    title: 'AI Systems Engineer',
    tags: ['LLM Pipelines', 'Agents', 'RAG'],
    bio: 'Tunde designs and deploys reliable AI-powered systems — not just demos. His work spans agentic workflows, retrieval-augmented generation, and on-chain inference pipelines integrated into live Web3 products.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Vector DBs'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 12,
    name: 'Zainab Ibrahim',
    title: 'Protocol Architect',
    tags: ['Rust', 'Solana', 'System Design'],
    bio: 'Zainab architects distributed systems and Solana programs that hold up under real production load. She brings deep protocol intuition to every engagement and communicates complex tradeoffs clearly.',
    stack: ['Rust', 'Anchor', 'Solana', 'TypeScript'],
    available: 'Mar 2025',
    photo: 'https://images.unsplash.com/photo-1589156215202-bce1f91e27ef?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 13,
    name: 'Emeka Eze',
    title: 'Blockchain Security Engineer',
    tags: ['Audit', 'Fuzzing', 'Formal Verification'],
    bio: 'Emeka specialises in smart contract security — from manual code review to automated fuzzing and formal verification. He has identified critical vulnerabilities in protocols managing millions in TVL.',
    stack: ['Solidity', 'Slither', 'Echidna', 'Foundry'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 14,
    name: 'Fatima Usman',
    title: 'DevOps & Infrastructure Engineer',
    tags: ['CI/CD', 'Cloud', 'Monitoring'],
    bio: 'Fatima builds the infrastructure that keeps Web3 products running — from node infrastructure and RPC management to deployment pipelines and on-chain monitoring systems.',
    stack: ['Docker', 'AWS', 'Terraform', 'Grafana'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 15,
    name: 'Kelvin Musa',
    title: 'Backend Engineer',
    tags: ['APIs', 'Node.js', 'Databases'],
    bio: 'Kelvin builds robust backend systems that power Web3 product data layers — from indexing services and off-chain APIs to webhook infrastructure and high-availability databases.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Prisma'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 16,
    name: 'Amina Garba',
    title: 'Applied AI Engineer',
    tags: ['Fine-tuning', 'Evaluation', 'Deployment'],
    bio: 'Amina focuses on building production-grade AI applications — evaluating model reliability, managing latency and cost, and deploying systems that behave predictably outside of demo conditions.',
    stack: ['Python', 'HuggingFace', 'FastAPI', 'LLMOps'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 17,
    name: 'Adeniyi Adesanya',
    title: 'Senior Smart Contract Engineer',
    tags: ['Solidity Expert', 'EVM Specialist', 'DeFi Builder'],
    bio: 'Adeniyi has shipped over 40 production smart contracts across DeFi, NFT, and DAO protocols. He approaches every engagement with a security-first mindset and audit-ready code from day one.',
    stack: ['Solidity', 'Foundry', 'Hardhat', 'Viem'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 18,
    name: 'Chioma Okafor',
    title: 'Full-Stack dApp Developer',
    tags: ['Web3 UI', 'Subgraphs', 'Next.js'],
    bio: 'Chioma builds end-to-end decentralised applications with a sharp eye for UX and performance. She has integrated wallet connections, real-time indexing, and complex on-chain state across 12+ live products.',
    stack: ['Next.js', 'TypeScript', 'The Graph', 'wagmi'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 19,
    name: 'Tunde Salami',
    title: 'AI Systems Engineer',
    tags: ['LLM Pipelines', 'Agents', 'RAG'],
    bio: 'Tunde designs and deploys reliable AI-powered systems — not just demos. His work spans agentic workflows, retrieval-augmented generation, and on-chain inference pipelines integrated into live Web3 products.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Vector DBs'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 20,
    name: 'Zainab Ibrahim',
    title: 'Protocol Architect',
    tags: ['Rust', 'Solana', 'System Design'],
    bio: 'Zainab architects distributed systems and Solana programs that hold up under real production load. She brings deep protocol intuition to every engagement and communicates complex tradeoffs clearly.',
    stack: ['Rust', 'Anchor', 'Solana', 'TypeScript'],
    available: 'Mar 2025',
    photo: 'https://images.unsplash.com/photo-1589156215202-bce1f91e27ef?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 21,
    name: 'Emeka Eze',
    title: 'Blockchain Security Engineer',
    tags: ['Audit', 'Fuzzing', 'Formal Verification'],
    bio: 'Emeka specialises in smart contract security — from manual code review to automated fuzzing and formal verification. He has identified critical vulnerabilities in protocols managing millions in TVL.',
    stack: ['Solidity', 'Slither', 'Echidna', 'Foundry'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 22,
    name: 'Fatima Usman',
    title: 'DevOps & Infrastructure Engineer',
    tags: ['CI/CD', 'Cloud', 'Monitoring'],
    bio: 'Fatima builds the infrastructure that keeps Web3 products running — from node infrastructure and RPC management to deployment pipelines and on-chain monitoring systems.',
    stack: ['Docker', 'AWS', 'Terraform', 'Grafana'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 23,
    name: 'Kelvin Musa',
    title: 'Backend Engineer',
    tags: ['APIs', 'Node.js', 'Databases'],
    bio: 'Kelvin builds robust backend systems that power Web3 product data layers — from indexing services and off-chain APIs to webhook infrastructure and high-availability databases.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Prisma'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 24,
    name: 'Amina Garba',
    title: 'Applied AI Engineer',
    tags: ['Fine-tuning', 'Evaluation', 'Deployment'],
    bio: 'Amina focuses on building production-grade AI applications — evaluating model reliability, managing latency and cost, and deploying systems that behave predictably outside of demo conditions.',
    stack: ['Python', 'HuggingFace', 'FastAPI', 'LLMOps'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 25,
    name: 'Adeniyi Adesanya',
    title: 'Senior Smart Contract Engineer',
    tags: ['Solidity Expert', 'EVM Specialist', 'DeFi Builder'],
    bio: 'Adeniyi has shipped over 40 production smart contracts across DeFi, NFT, and DAO protocols. He approaches every engagement with a security-first mindset and audit-ready code from day one.',
    stack: ['Solidity', 'Foundry', 'Hardhat', 'Viem'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 26,
    name: 'Chioma Okafor',
    title: 'Full-Stack dApp Developer',
    tags: ['Web3 UI', 'Subgraphs', 'Next.js'],
    bio: 'Chioma builds end-to-end decentralised applications with a sharp eye for UX and performance. She has integrated wallet connections, real-time indexing, and complex on-chain state across 12+ live products.',
    stack: ['Next.js', 'TypeScript', 'The Graph', 'wagmi'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 27,
    name: 'Tunde Salami',
    title: 'AI Systems Engineer',
    tags: ['LLM Pipelines', 'Agents', 'RAG'],
    bio: 'Tunde designs and deploys reliable AI-powered systems — not just demos. His work spans agentic workflows, retrieval-augmented generation, and on-chain inference pipelines integrated into live Web3 products.',
    stack: ['Python', 'LangChain', 'OpenAI', 'Vector DBs'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 28,
    name: 'Zainab Ibrahim',
    title: 'Protocol Architect',
    tags: ['Rust', 'Solana', 'System Design'],
    bio: 'Zainab architects distributed systems and Solana programs that hold up under real production load. She brings deep protocol intuition to every engagement and communicates complex tradeoffs clearly.',
    stack: ['Rust', 'Anchor', 'Solana', 'TypeScript'],
    available: 'Mar 2025',
    photo: 'https://images.unsplash.com/photo-1589156215202-bce1f91e27ef?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 29,
    name: 'Emeka Eze',
    title: 'Blockchain Security Engineer',
    tags: ['Audit', 'Fuzzing', 'Formal Verification'],
    bio: 'Emeka specialises in smart contract security — from manual code review to automated fuzzing and formal verification. He has identified critical vulnerabilities in protocols managing millions in TVL.',
    stack: ['Solidity', 'Slither', 'Echidna', 'Foundry'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 30,
    name: 'Fatima Usman',
    title: 'DevOps & Infrastructure Engineer',
    tags: ['CI/CD', 'Cloud', 'Monitoring'],
    bio: 'Fatima builds the infrastructure that keeps Web3 products running — from node infrastructure and RPC management to deployment pipelines and on-chain monitoring systems.',
    stack: ['Docker', 'AWS', 'Terraform', 'Grafana'],
    available: 'Jan 2025',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 31,
    name: 'Kelvin Musa',
    title: 'Backend Engineer',
    tags: ['APIs', 'Node.js', 'Databases'],
    bio: 'Kelvin builds robust backend systems that power Web3 product data layers — from indexing services and off-chain APIs to webhook infrastructure and high-availability databases.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Prisma'],
    available: 'Immediately',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
  {
    id: 32,
    name: 'Amina Garba',
    title: 'Applied AI Engineer',
    tags: ['Fine-tuning', 'Evaluation', 'Deployment'],
    bio: 'Amina focuses on building production-grade AI applications — evaluating model reliability, managing latency and cost, and deploying systems that behave predictably outside of demo conditions.',
    stack: ['Python', 'HuggingFace', 'FastAPI', 'LLMOps'],
    available: 'Feb 2025',
    photo: 'https://images.unsplash.com/photo-1619895862022-09114b41f16f?w=400&h=600&fit=crop&crop=face',
    github: 'https://github.com',
    twitter: 'https://twitter.com',
    linkedin: 'https://linkedin.com',
  },
]

export default function TalentPage() {
  const [activeIdx, setActiveIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx((i) => (i + 1) % engineers.length)
    }, 3000)
  }

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const select = (i: number) => {
    setActiveIdx(i)
    resetTimer()
  }

  const active = engineers[activeIdx]

  const engagementModels = [
    { title: 'Full-Time Hiring', subtitle: 'Permanent team members', description: 'Direct hire from our verified network. Onboarded in 1-2 weeks.' },
    { title: 'Contract Engagement', subtitle: 'Project-based roles', description: 'Short-term or long-term contracts for specific initiatives.' },
    { title: 'Embedded Teams', subtitle: 'Dedicated engineers', description: 'Full teams embedded in your sprint cycles for rapid scaling.' },
    { title: 'Staff Augmentation', subtitle: 'On-demand capacity', description: 'Scale your team up or down based on project needs.' },
  ]

  const testimonials = [
    { quote: 'We hired 3 engineers from Blockfuse and they shipped production code in week one. The quality bar is genuinely different.', company: 'Polygon Labs', name: 'Sarah Chen', role: 'VP Engineering' },
    { quote: 'The vetting process is so rigorous that we actually trust the engineers without onboarding. That never happens.', company: 'OpenZeppelin', name: 'David Ozdemir', role: 'Talent Lead' },
    { quote: 'Not just talented engineers — they actually understand product thinking and can solve real problems.', company: 'Uniswap Foundation', name: 'Emma Rodriguez', role: 'Engineering Manager' },
  ]

  const faqs = [
    { q: 'How vetted are your engineers?', a: "Every engineer passes production code review, live debugging assessments, and system design interviews. They've all shipped real projects." },
    { q: "What's the hiring timeline?", a: 'Most placements happen within 2-3 weeks. We can expedite for urgent needs.' },
    { q: 'Can I hire full-time or contract?', a: "Both. Full-time permanent hires, contract roles, or embedded teams. We're flexible." },
    { q: "What if the engineer doesn't work out?", a: 'We stand behind our placements. First 30 days include close collaboration to ensure fit.' },
    { q: 'Do you do team training?', a: 'Yes. We offer custom training programs for your organisation. Contact us to discuss.' },
  ]

  const insights = [
    { title: 'Hiring Smart Contract Engineers in 2025', date: 'Aug 22, 2024', type: 'Guide' },
    { title: 'Building Production Teams Across Time Zones', date: 'Aug 15, 2024', type: 'Case Study' },
    { title: 'The Real Cost of Hiring Junior Engineers (And Why It Matters)', date: 'Aug 8, 2024', type: 'Article' },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center relative border-b border-dark-border mb-24 overflow-hidden py-16">
        <div className="absolute top-8 left-0 z-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
            <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
            // VERIFIED ENGINEERING TALENT
          </div>
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-[clamp(2.8rem,8vw,7rem)] font-bold leading-[0.95] tracking-tighter text-text-primary uppercase">
            Hire Production-
            <br />
            <span className="text-text-muted">Ready Engineers</span>
            <br />
            From Today
          </h1>
        </div>
        <div className="relative z-10 text-center mt-10 flex flex-col items-center gap-6">
          <p className="text-sm text-text-secondary font-light leading-relaxed max-w-md">
            Access our network of 115+ vetted Web3 and AI engineers. No hiring overhead. Ready to ship on day one.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="#engineers" className="bg-text-primary text-dark-bg border border-text-primary px-6 py-3.5 text-xs tracking-widest uppercase font-mono inline-flex items-center gap-3 hover:bg-transparent hover:text-text-primary transition-all duration-300">
              Meet the Engineers <span>→</span>
            </a>
            <a href="#contact" className="border border-dark-border text-text-primary px-6 py-3.5 text-xs tracking-widest uppercase font-mono inline-flex items-center gap-3 hover:border-accent-purple hover:text-accent-purple bg-white/[0.01] transition-all duration-300">
              Talk to us <span>→</span>
            </a>
          </div>
          <div className="flex items-center gap-10 pt-4 border-t border-dark-border/40 mt-2">
            {[['115+', 'Verified engineers'], ['2 weeks', 'Avg. placement'], ['98%', 'Retention rate']].map(([val, lbl], i, arr) => (
              <div key={lbl} className="flex items-center gap-10">
                <div className="text-center">
                  <p className="text-xl font-light text-accent-purple">{val}</p>
                  <p className="text-[9px] text-text-muted font-mono tracking-widest uppercase mt-1">{lbl}</p>
                </div>
                {i < arr.length - 1 && <div className="h-8 w-px bg-dark-border" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineer Showcase */}
      <section id="engineers" className="mb-24 pb-24 border-b border-dark-border">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
                <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
                // THE NETWORK
              </div>
              <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
                Meet our <em className="italic font-light text-text-secondary">engineers</em>
              </h2>
            </div>
            <p className="text-xs font-mono text-text-muted tracking-widest uppercase">Auto-rotating · Click to select</p>
          </div>

          {/* Showcase panel — fixed height */}
          <div className="border border-dark-border h-screen flex  overflow-hidden">

            {/* Left — active engineer detail */}
            <div className="w-[40%] h-full min-h-0 border-r border-dark-border flex flex-col overflow-hidden">
              {/* Portrait */}
              <div className="relative flex-1 min-h-0 overflow-hidden">
                <img
                  src={active.photo}
                  alt={active.name}
                  className="absolute inset-0 w-full h-full object-cover object-top grayscale"
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/20 to-transparent" />

                {/* Engineer name over portrait */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-6">
                  <p className="text-[8px] font-mono tracking-widest text-accent-purple uppercase mb-2">
                    ENGINEER {String(active.id).padStart(2, '0')}
                  </p>

                  <h3 className="text-2xl font-light text-text-primary leading-tight mb-1">
                    {active.name}
                  </h3>

                  <p className="text-[11px] font-mono tracking-widest text-text-muted uppercase">
                    {active.title}
                  </p>
                </div>
              </div>

              {/* Engineer Details */}
              <div className="shrink-0 max-h-[48%] overflow-y-auto bg-dark-bg border-t border-dark-border">
                <div className="p-6 space-y-5">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono tracking-wider border border-dark-border px-2 py-0.5 text-text-muted uppercase"
                      >
                        ({tag})
                      </span>
                    ))}
                  </div>

                  {/* Bio */}
                  <p className="text-[12.5px] text-text-secondary font-light leading-relaxed">
                    {active.bio}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {active.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] font-mono border border-accent-purple/20 bg-accent-purple/5 text-accent-purple px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Availability */}
                  <div className="pt-4 border-t border-dark-border">
                    <p className="text-[8px] font-mono tracking-widest uppercase">
                      {active.available === 'Immediately' ? (
                        <span className="text-emerald-400">
                          ● Available now
                        </span>
                      ) : (
                        <span className="text-text-muted">
                          Available {active.available}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Social Links + Hire */}
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={active.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase text-text-muted hover:text-accent-purple border border-dark-border px-3 py-1.5 hover:border-accent-purple transition-colors"
                    >
                      GitHub
                    </a>

                    <a
                      href={active.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase text-text-muted hover:text-accent-purple border border-dark-border px-3 py-1.5 hover:border-accent-purple transition-colors"
                    >
                      X / Twitter
                    </a>

                    <a
                      href={active.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-mono tracking-widest uppercase text-text-muted hover:text-accent-purple border border-dark-border px-3 py-1.5 hover:border-accent-purple transition-colors"
                    >
                      LinkedIn
                    </a>

                    <a
                      href="/contact"
                      className="ml-auto text-[10px] font-mono tracking-widest uppercase bg-text-primary text-dark-bg px-4 py-1.5 hover:bg-accent-purple hover:text-white transition-colors"
                    >
                      Hire →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — scrollable 4-col photo grid */}
            <div className="w-[60%] h-full min-h-0 relative overflow-hidden">
              {/* Scroll container */}
              <div className="h-full min-h-0 overflow-y-auto overflow-x-hidden hide-scrollbar">
                <div className="grid grid-cols-4 content-start">
                  {engineers.map((eng, i) => (
                    <button
                      key={eng.id}
                      onClick={() => select(i)}
                      className={`relative aspect-square overflow-hidden border-b border-r border-dark-border group transition-all duration-200
            ${activeIdx === i ? 'ring-1 ring-inset ring-accent-purple' : ''}`}
                    >
                      <img
                        src={eng.photo}
                        alt={eng.name}
                        className={`w-full h-full object-cover object-top transition-all duration-300
              ${activeIdx === i ? 'grayscale-0 brightness-100' : 'grayscale brightness-50 group-hover:brightness-75'}`}
                      />

                      {/* Active indicator */}
                      {activeIdx === i && (
                        <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent-purple" />
                      )}

                      {/* Name */}
                      <div className="absolute bottom-0 left-0 right-0 bg-dark-bg/70 px-1 py-1">
                        <span className="text-[7px] font-mono tracking-wider uppercase text-text-muted truncate block text-center">
                          {eng.name.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom scroll indicator */}
              {engineers.length > 8 && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 pt-8 bg-gradient-to-t from-dark-bg/90 to-transparent pointer-events-none">
                  <span className="text-text-muted text-xs animate-bounce">
                    ↓
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="mb-24 pb-24 border-b border-dark-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
                <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
                // HOW IT WORKS
              </div>

              <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
                Choose your
                <br />
                <em className="italic font-light text-text-secondary">engagement model</em>
              </h2>
            </div>

            <div className="lg:col-span-6">
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                We work the way your organization needs. Full-time hires, contract roles, embedded teams, or staff augmentation.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {engagementModels.map((model, i) => (
              <div
                key={model.title}
                className="group p-8 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-light text-accent-purple/40 group-hover:text-accent-purple transition-colors">
                      0{i + 1}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-xl font-light text-text-primary mb-1">{model.title}</h3>
                      <p className="text-xs text-text-muted font-light">{model.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-sm text-text-secondary font-light leading-relaxed pt-4 border-t border-dark-border/50">
                    {model.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="mb-24 pb-24 border-b border-dark-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
              What <em className="italic font-light text-text-secondary">clients</em> say
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.company}
                className="group p-8 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="space-y-6">
                  <div className="text-3xl font-light text-accent-purple/20">"</div>

                  <p className="text-sm text-text-secondary font-light leading-relaxed">
                    {testimonial.quote}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-dark-border/50">
                    <p className="text-sm font-light text-text-primary">{testimonial.name}</p>
                    <p className="text-xs text-text-muted font-light">{testimonial.role}</p>
                    <p className="text-xs text-accent-purple font-mono tracking-widest">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24 pb-24 border-b border-dark-border">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase">
              <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
              // FAQ
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
              Common <em className="italic font-light text-text-secondary">questions</em>
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group border border-dark-border hover:border-accent-purple transition-all duration-300 p-6"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-base font-light text-text-primary group-hover:text-accent-purple transition-colors">
                    {faq.q}
                  </h3>
                  <span className="text-accent-purple group-hover:scale-110 transition-transform text-lg">+</span>
                </summary>

                <p className="text-sm text-text-secondary font-light leading-relaxed mt-4 pt-4 border-t border-dark-border/50">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Insights/Blog */}
      <section className="mb-24 pb-24 border-b border-dark-border">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // INSIGHTS
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
              Hiring <em className="italic font-light text-text-secondary">insights</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight) => (
              <a
                key={insight.title}
                href="#"
                className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="space-y-4">
                  <span className="inline-block text-[10px] font-mono tracking-widest text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-0.5">
                    {insight.type}
                  </span>

                  <h3 className="text-base font-light text-text-primary group-hover:text-accent-purple transition-colors leading-tight">
                    {insight.title}
                  </h3>

                  <p className="text-xs text-text-muted font-light">{insight.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="contact" className="py-24 text-center border-t border-dark-border relative">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase">
              <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
              // GET STARTED
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
              Ready to scale your
              <br />
              <em className="italic font-light text-text-secondary">engineering team?</em>
            </h2>

            <p className="text-base text-text-secondary font-light leading-relaxed">
              Schedule a 30-minute call to discuss your hiring needs and explore the right engineers for your team.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center pt-8">
            <a href="#" className="bg-text-primary text-dark-bg px-8 py-4 text-xs tracking-widest uppercase font-mono hover:bg-transparent hover:text-text-primary hover:border hover:border-text-primary transition-all duration-300">
              Schedule a Call
            </a>
            <a href="#" className="border border-dark-border text-text-primary px-8 py-4 text-xs tracking-widest uppercase font-mono hover:border-accent-purple hover:text-accent-purple transition-all duration-300">
              Browse Profiles
            </a>
          </div>

          <p className="text-xs text-text-muted font-light pt-8">
            Questions? Email us at <strong>connect@blockfuselabs.com</strong> or call <strong>+1 (555) 123</strong>
          </p>
        </div>
      </section>
    </>
  )
}
