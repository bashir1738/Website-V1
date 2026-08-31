export default function EngineeringPage() {
  const deliveryStandards = [
    { standard: 'Production-Grade Code', detail: '100% test coverage, security audits' },
    { standard: 'Senior Oversight', detail: 'Architect approval at every milestone' },
    { standard: 'Full Ownership', detail: '100% sovereign IP & code control' },
    { standard: 'Deployment Ready', detail: 'Mainnet-ready with monitoring setup' },
  ]

  const services = [
    {
      title: 'Protocol & Smart Contract Development',
      tagline: 'EVM & Solana / Security-First',
      description: 'Design, build, and verify high-throughput smart contracts and decentralized protocols. Built with rigorous unit testing, formal verification patterns, and security audit readiness.',
      techs: ['Solidity', 'Rust / Anchor', 'Foundry', 'Hardhat', 'Viem / Ethers'],
    },
    {
      title: 'Full-Stack Decentralized Applications',
      tagline: 'Production dApps & Subgraphs',
      description: 'End-to-end Web3 web applications built for speed, seamless wallet connections, real-time data indexing, and high-performance RPC interaction.',
      techs: ['Next.js', 'TypeScript', 'The Graph', 'Subgraphs', 'Wallet Standard'],
    },
    {
      title: 'Applied AI & Web3 Autonomous Systems',
      tagline: 'AI Agents & On-Chain Inference',
      description: 'Architect autonomous AI agents, automated on-chain execution bots, intelligent copy-trading systems, and RAG pipelines integrated into Web3 products.',
      techs: ['Python', 'LangChain', 'LLMs', 'Vector DBs', 'Automated Agents'],
    },
    {
      title: 'Infrastructure & DevOps',
      tagline: 'Scalable Backend Systems',
      description: 'Production infrastructure for Web3 systems including RPC nodes, indexers, monitoring stacks, and deployment pipelines optimized for high-throughput, low-latency systems.',
      techs: ['Kubernetes', 'Docker', 'AWS / GCP', 'Monitoring', 'CI/CD Pipelines'],
    },
  ]

  const workflowSteps = [
    {
      step: '01',
      title: 'Discovery & Architecture',
      description: 'Deep dive on your requirements, token economics, protocol design, and technical constraints.',
    },
    {
      step: '02',
      title: 'Design & Scoping',
      description: 'Comprehensive technical specification, system diagrams, and development roadmap with senior architect oversight.',
    },
    {
      step: '03',
      title: 'Development & Testing',
      description: 'Iterative development with daily standups, rigorous unit testing, integration tests, and staged audits.',
    },
    {
      step: '04',
      title: 'Audit & Security Review',
      description: 'Full formal verification patterns, security audits, and vulnerability assessments before production deployment.',
    },
    {
      step: '05',
      title: 'Production Deployment',
      description: 'Mainnet deployment, monitoring setup, incident response playbooks, and ongoing technical support.',
    },
  ]

  const caseStudies = [
    {
      title: 'DeFi Protocol Launch',
      excerpt: 'Architected and shipped a multi-chain DEX with $50M+ TVL in 4 months.',
      tags: ['Solidity', 'Subgraphs', 'Full-Stack'],
    },
    {
      title: 'AI Trading Bot System',
      excerpt: 'Built autonomous trading agents integrated with 5+ on-chain protocols and real-time market data.',
      tags: ['Python', 'LangChain', 'Smart Contracts'],
    },
    {
      title: 'Layer 2 Infrastructure',
      excerpt: 'Deployed indexing and monitoring infrastructure for high-throughput scaling solutions.',
      tags: ['Kubernetes', 'DevOps', 'Monitoring'],
    },
  ]

  return (
    <>
      {/* Hero - Two Column Split Layout */}
      <section className="min-h-[70vh] flex flex-col justify-center border-b border-dark-border mb-24 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto w-full">
          {/* Left Column - Text & CTA */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase w-fit">
                <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
                // CUSTOM DEVELOPMENT
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-light leading-[1.1] tracking-tighter text-text-primary">
                Ship production systems
                <br />
                <span className="text-text-secondary">
                  at scale.
                </span>
              </h1>
            </div>

            <p className="text-base text-text-secondary font-light leading-relaxed max-w-xl">
              Senior technical advisory and system delivery for organizations building with Web3, AI, and modern technologies. From architecture to mainnet launch.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4">
              <a href="#services" className="bg-text-primary text-dark-bg border border-text-primary px-6 py-3 text-xs tracking-widest uppercase font-mono hover:bg-transparent hover:text-text-primary transition-all duration-300">
                Explore Services
              </a>
              <a href="#contact" className="border border-dark-border text-text-primary px-6 py-3 text-xs tracking-widest uppercase font-mono hover:border-accent-pink hover:text-accent-pink bg-white/[0.01] transition-all duration-300">
                Start a Project
              </a>
            </div>
          </div>

          {/* Right Column - Standards Panel */}
          <div className="lg:col-span-6">
            <div className="p-8 border border-dark-border bg-white/[0.02] backdrop-blur-sm sticky top-24">
              <div className="text-xs font-mono text-text-muted uppercase tracking-wider border-b border-dark-border pb-4 mb-6 flex justify-between">
                <span>Delivery Standard</span>
                <span className="text-accent-pink">Production-Grade</span>
              </div>

              <div className="space-y-6">
                {deliveryStandards.map((item, i) => (
                  <div key={item.standard} className="group">
                    <div className="flex items-start gap-4">
                      <span className="text-xl font-light text-accent-pink/40 group-hover:text-accent-pink transition-colors">
                        0{i + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-base font-light text-text-primary mb-1 group-hover:text-accent-pink transition-colors">
                          {item.standard}
                        </h4>
                        <p className="text-xs text-text-secondary font-light leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-dark-border/50">
                <p className="text-[10px] text-text-muted font-light tracking-widest uppercase mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {['Solidity', 'Rust', 'TypeScript', 'Next.js', 'Foundry', 'Hardhat', 'Python', 'LangChain'].map((tech) => (
                    <span key={tech} className="text-[9px] font-mono text-text-muted border border-dark-border px-2 py-1 bg-white/[0.01]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Offerings */}
      <section id="services" className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          What we <em className="italic font-light text-text-secondary">build</em>
        </h2>
        <div className="space-y-8 max-w-4xl">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group p-8 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="flex items-start gap-4 mb-6">
                <span className="text-xs font-mono text-accent-purple pt-1">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-2.5 py-0.5 whitespace-nowrap">
                      {service.tagline}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.techs.map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono text-text-muted border border-dark-border px-2 py-0.5 bg-white/[0.01]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Development Workflow */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Our <em className="italic font-light text-text-secondary">process</em>
        </h2>
        <div className="space-y-6 max-w-4xl">
          {workflowSteps.map((item, i) => (
            <div
              key={item.step}
              className="group relative pl-12 py-4"
            >
              <div className="absolute left-0 top-0 w-8 h-8 border-2 border-dark-border group-hover:border-accent-purple transition-colors flex items-center justify-center">
                <span className="text-xs font-mono text-text-muted group-hover:text-accent-purple transition-colors">
                  {item.step}
                </span>
              </div>

              {i !== workflowSteps.length - 1 && (
                <div className="absolute left-3.5 top-8 bottom-0 w-[1px] bg-gradient-to-b from-accent-purple to-transparent" />
              )}

              <div>
                <h3 className="text-lg font-light text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Case <em className="italic font-light text-text-secondary">studies</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          {caseStudies.map((study) => (
            <a
              key={study.title}
              href="#"
              className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300"
            >
              <h3 className="text-lg font-light text-text-primary group-hover:text-accent-purple transition-colors mb-3">
                {study.title}
              </h3>
              <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                {study.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono text-text-muted border border-dark-border px-2 py-0.5 bg-white/[0.01]">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Delivery <em className="italic font-light text-text-secondary">standards</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-accent-purple mt-2" />
              <div>
                <p className="text-sm font-light text-text-primary mb-1">Production-Grade Code</p>
                <p className="text-xs text-text-secondary font-light">100% test coverage with unit, integration, and end-to-end testing.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-accent-pink mt-2" />
              <div>
                <p className="text-sm font-light text-text-primary mb-1">Security Audited</p>
                <p className="text-xs text-text-secondary font-light">All contracts undergo formal verification and third-party audits.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-accent-purple mt-2" />
              <div>
                <p className="text-sm font-light text-text-primary mb-1">Full Documentation</p>
                <p className="text-xs text-text-secondary font-light">Architecture docs, API specs, deployment runbooks, and incident playbooks.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 bg-accent-pink mt-2" />
              <div>
                <p className="text-sm font-light text-text-primary mb-1">Ongoing Support</p>
                <p className="text-xs text-text-secondary font-light">Post-launch monitoring, performance optimization, and incident response.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-12 border-t border-dark-border">
        <p className="text-text-primary font-normal text-lg mb-4">Ready to build?</p>
        <p className="text-text-secondary text-sm mb-8 max-w-md mx-auto">
          Let's discuss your project requirements and build a custom engagement plan.
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-dark-bg border border-text-primary hover:bg-transparent hover:text-text-primary transition-all duration-300 text-xs tracking-widest uppercase font-mono">
          Start a Project
          <span>→</span>
        </a>
      </section>
    </>
  )
}
