export default function TeamPage() {
  const coreTeam = [
    {
      name: 'Adeniyi Alao',
      role: 'Founder & Engineering Lead',
      specialization: 'Protocol Architecture & Smart Contracts',
      bio: 'Former senior engineer at major Web3 protocols. 10+ years in systems design and blockchain infrastructure.',
    },
    {
      name: 'Chioma Okafor',
      role: 'Head of Academy',
      specialization: 'Engineering Education & Talent Development',
      bio: 'Built talent pipelines across 3 continents. Passionate about unlocking engineering potential.',
    },
    {
      name: 'Tunde Somade',
      role: 'Technical Director',
      specialization: 'Full-Stack Development & Product Engineering',
      bio: 'Shipped 5 production protocols from zero to mainnet. Expert in rapid iteration and quality at scale.',
    },
    {
      name: 'Zainab Ibrahim',
      role: 'Head of Partnerships',
      specialization: 'Ecosystem Growth & Strategic Partnerships',
      bio: 'Connected Blockfuse Labs to 50+ protocols and companies. Focused on sustainable ecosystem building.',
    },
  ]

  const stats = [
    { value: '115+', label: 'Engineers graduated & deployed', icon: '👨‍💻' },
    { value: '50+', label: 'Companies & protocols partnered', icon: '🤝' },
    { value: '500+', label: 'Smart contracts engineered', icon: '⛓️' },
    { value: '2 Years', label: 'Operating in Jos', icon: '🏗️' },
  ]

  const alumniHighlights = [
    {
      cohort: 'Cohort 1',
      year: '2024',
      deployed: '23 engineers',
      companies: 'Uniswap, Polygon, OpenZeppelin',
    },
    {
      cohort: 'Cohort 2',
      year: '2024',
      deployed: '31 engineers',
      companies: 'Aave, Curve, Lido',
    },
    {
      cohort: 'Cohort 3',
      year: '2024',
      deployed: '28 engineers',
      companies: 'SolanaLabs, Orca, Magic Eden',
    },
    {
      cohort: 'Cohort 4',
      year: '2024',
      deployed: '33 engineers',
      companies: 'Worldcoin, Scroll, Arbitrum',
    },
  ]

  const contributions = [
    { project: 'Foundry', link: '#', description: 'Core contributor to Ethereum smart contract development framework' },
    { project: 'The Graph', link: '#', description: 'Subgraph development and indexing infrastructure improvements' },
    { project: 'Solana Programs', link: '#', description: 'Rust-based smart contract development and optimization' },
    { project: 'Web3.py', link: '#', description: 'Python Web3 library enhancements and documentation' },
  ]

  return (
    <>
      <h1 className="text-6xl font-light mb-6 tracking-tighter text-text-primary">
        Community
      </h1>
      <p className="text-lg text-text-secondary font-light mb-12 max-w-2xl">
        The team, alumni, and open source contributors building the future of software engineering in Jos.
      </p>

      {/* Stats Overview */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="p-6 border border-dark-border bg-white/[0.01] hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 group relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-light text-transparent bg-gradient-to-r from-accent-purple via-pink-500 to-accent-pink bg-clip-text mb-2">
                {stat.value}
              </div>
              <p className="text-xs text-text-secondary font-light">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Team */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          The <em className="italic font-light text-text-secondary">team</em>
        </h2>
        <div className="space-y-8 max-w-4xl">
          {coreTeam.map((member, i) => (
            <div
              key={member.name}
              className="group p-8 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="flex items-start gap-6">
                <div className="text-sm font-mono text-accent-purple pt-1">
                  [{String(i + 1).padStart(2, '0')}]
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <h3 className="text-xl font-light text-text-primary mb-1 group-hover:text-accent-purple transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm text-text-secondary font-light">{member.role}</p>
                  </div>

                  <div className="mb-4 pb-4 border-b border-dark-border">
                    <p className="text-[10px] font-mono tracking-widest text-accent-purple uppercase mb-2">Specialization</p>
                    <p className="text-sm text-text-secondary font-light">{member.specialization}</p>
                  </div>

                  <p className="text-sm text-text-secondary font-light leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alumni Cohorts */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Graduate <em className="italic font-light text-text-secondary">cohorts</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {alumniHighlights.map((cohort) => (
            <div
              key={cohort.cohort}
              className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs text-text-muted font-light tracking-widest mb-1">GRADUATION</p>
                  <h3 className="text-lg font-light text-text-primary">{cohort.cohort}</h3>
                </div>
                <span className="text-[10px] font-mono text-accent-pink px-2.5 py-0.5 border border-accent-pink/20 bg-accent-pink/10">
                  {cohort.year}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-accent-purple mb-1">DEPLOYED</p>
                  <p className="text-sm font-light text-text-primary">{cohort.deployed}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-accent-purple mb-1">COMPANIES</p>
                  <p className="text-xs font-light text-text-secondary leading-relaxed">{cohort.companies}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Open source <em className="italic font-light text-text-secondary">contributions</em>
        </h2>
        <div className="space-y-6 max-w-3xl">
          {contributions.map((contrib) => (
            <a
              key={contrib.project}
              href={contrib.link}
              className="group block p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-light text-text-primary group-hover:text-accent-purple transition-colors">
                  {contrib.project}
                </h3>
                <span className="text-text-muted group-hover:text-accent-purple transition-colors">→</span>
              </div>
              <p className="text-sm text-text-secondary font-light">
                {contrib.description}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="py-12 text-center border-t border-dark-border">
        <h3 className="text-2xl font-light text-text-primary mb-4">Join our community</h3>
        <p className="text-sm text-text-secondary mb-8 max-w-lg mx-auto">
          Whether you're an engineer looking to level up, a company seeking talent, or an open source contributor, there's a place for you in the Blockfuse Labs community.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/training" className="inline-flex items-center gap-2 px-6 py-3 bg-text-primary text-dark-bg hover:bg-transparent hover:text-text-primary hover:border hover:border-text-primary transition-all duration-300 text-xs tracking-widest uppercase font-mono">
            Apply to Academy
            <span>→</span>
          </a>
          <a href="/talent" className="inline-flex items-center gap-2 px-6 py-3 border border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all duration-300 text-xs tracking-widest uppercase font-mono">
            Browse Talent
            <span>→</span>
          </a>
          <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all duration-300 text-xs tracking-widest uppercase font-mono">
            Get in Touch
            <span>→</span>
          </a>
        </div>
      </section>
    </>
  )
}
