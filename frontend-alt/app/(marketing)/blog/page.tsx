export default function BlogPage() {
  const categories = ['Engineering', 'Training', 'Web3', 'Career', 'Open Source']

  const featuredArticles = [
    {
      title: 'Building Production-Ready Smart Contracts: A Comprehensive Guide',
      excerpt: 'Learn the patterns and practices we use to build security-first smart contracts that pass audits and scale in production.',
      date: 'Aug 26, 2024',
      category: 'Engineering',
      readTime: '8 min',
    },
    {
      title: 'From Jos to Global: Our Engineering Academy Pipeline',
      excerpt: 'How we selected 115+ engineers and deployed them to 50+ companies. A deep dive into our training methodology and outcomes.',
      date: 'Aug 19, 2024',
      category: 'Training',
      readTime: '12 min',
    },
    {
      title: 'Open Source First: Building the Future of Web3 Infrastructure',
      excerpt: 'Why we contribute heavily to open source and how it shapes our hiring, training, and product development.',
      date: 'Aug 12, 2024',
      category: 'Open Source',
      readTime: '6 min',
    },
  ]

  const recentArticles = [
    { title: 'Solana vs EVM: Choosing Your Blockchain Stack', date: 'Aug 5, 2024', category: 'Engineering' },
    { title: 'The Cost of Technical Debt in Web3 Teams', date: 'Jul 29, 2024', category: 'Engineering' },
    { title: 'Interview Preparation for Web3 Engineers', date: 'Jul 22, 2024', category: 'Career' },
    { title: 'AI Agents in DeFi: An Engineering Deep Dive', date: 'Jul 15, 2024', category: 'Web3' },
    { title: 'Mentorship at Scale: Building Community Through Code', date: 'Jul 8, 2024', category: 'Training' },
    { title: 'Zero-Knowledge Proofs in Production', date: 'Jul 1, 2024', category: 'Engineering' },
  ]

  return (
    <>
      {/* Hero - Category Showcase Layout */}
      <section className="py-16 border-b border-dark-border mb-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // ENGINEERING INSIGHTS
            </div>

            <div>
              <h1 className="text-5xl sm:text-6xl lg:text-6xl font-light leading-[1.1] tracking-tighter text-text-primary mb-4">
                Thoughts on
                <br />
                <span className="text-text-secondary">
                  building & scaling.
                </span>
              </h1>
              <p className="text-base text-text-secondary font-light max-w-2xl">
                Deep dives on engineering practices, career growth, and building the future of Web3.
              </p>
            </div>
          </div>

          {/* Category Showcase Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <a
                key={cat}
                href="#"
                className="group relative p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 text-center"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <span className="inline-block text-2xl font-light text-accent-purple/40 group-hover:text-accent-purple transition-colors mb-3">
                  {i + 1}
                </span>
                <h3 className="text-sm font-light text-text-primary group-hover:text-accent-purple transition-colors">
                  {cat}
                </h3>
                <p className="text-xs text-text-muted font-light mt-2">Explore →</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="mb-16 pb-12 border-b border-dark-border hidden">
        <p className="text-xs tracking-widest text-text-muted uppercase mb-6 font-normal">Explore by topic</p>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 border border-dark-border text-text-primary text-xs tracking-widest font-light hover:border-accent-purple hover:text-accent-purple transition-all duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Featured <em className="italic font-light text-text-secondary">stories</em>
        </h2>
        <div className="space-y-8 max-w-4xl">
          {featuredArticles.map((article, i) => (
            <a
              key={article.title}
              href="#"
              className="group block px-8 py-8 border border-dark-border bg-white/[0.01] hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="flex items-start gap-4 mb-4">
                <span className="text-xs font-mono text-accent-purple pt-1">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <h3 className="text-xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                      {article.title}
                    </h3>
                    <span className="text-[10px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-2.5 py-0.5 whitespace-nowrap">
                      {article.category}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted font-light">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.readTime} read</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Recent Articles Grid */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Recent <em className="italic font-light text-text-secondary">posts</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {recentArticles.map((article) => (
            <a
              key={article.title}
              href="#"
              className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="mb-3">
                <span className="text-[10px] font-mono tracking-widest text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-2.5 py-0.5">
                  {article.category}
                </span>
              </div>
              <h3 className="text-base font-light text-text-primary group-hover:text-accent-purple transition-colors mb-4 leading-tight">
                {article.title}
              </h3>
              <p className="text-xs text-text-muted font-light">{article.date}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="text-center py-12">
        <h3 className="text-2xl font-light text-text-primary mb-4">
          Get engineering insights in your inbox
        </h3>
        <p className="text-sm text-text-secondary mb-8">
          Join 1,000+ engineers and technical leaders receiving insights on Web3 systems, training, and career growth.
        </p>
        <form className="max-w-md mx-auto flex gap-3">
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 bg-white/[0.02] border border-dark-border text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-purple focus:bg-accent-purple/5 transition-all text-sm"
          />
          <button
            type="submit"
            className="bg-text-primary text-dark-bg px-6 py-3 text-xs tracking-widest uppercase font-mono hover:bg-transparent hover:text-text-primary hover:border hover:border-text-primary transition-all duration-300"
          >
            Subscribe
          </button>
        </form>
      </section>
    </>
  )
}
