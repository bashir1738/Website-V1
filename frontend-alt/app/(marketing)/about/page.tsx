import { aboutBeliefs, aboutPartners } from '@/app/content/about'

export default function AboutPage() {
  return (
    <>
      {/* Hero - Mission Statement Layout */}
      <section className="min-h-[65vh] flex flex-col justify-center border-b border-dark-border mb-24 py-12">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          {/* Mission as Large Quote */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase w-fit">
              <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
              // OUR STORY
            </div>

            <blockquote className="space-y-4">
              <p className="text-5xl sm:text-6xl lg:text-6xl font-light leading-[1.1] text-text-primary">
                We develop
                <br />
                <span className="text-text-secondary">
                  engineers,
                </span>
                <br />
                not certificates.
              </p>

              <p className="text-lg text-text-secondary font-light leading-relaxed max-w-2xl">
                Since 2024, we've been building serious technology talent in Jos, Nigeria. Production-grade engineers. Real projects. Honest feedback.
              </p>
            </blockquote>
          </div>

          {/* Key Stats/Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-dark-border/50">
            <div className="space-y-2">
              <p className="text-3xl font-light text-accent-purple">
                2024
              </p>
              <p className="text-xs text-text-muted font-light tracking-widest uppercase">Founded</p>
              <p className="text-sm text-text-secondary font-light">Jos, Nigeria</p>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-light text-accent-purple">
                115+
              </p>
              <p className="text-xs text-text-muted font-light tracking-widest uppercase">Engineers Trained</p>
              <p className="text-sm text-text-secondary font-light">Globally deployed</p>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-light text-accent-purple">
                500+
              </p>
              <p className="text-xs text-text-muted font-light tracking-widest uppercase">Contracts Shipped</p>
              <p className="text-sm text-text-secondary font-light">Production systems</p>
            </div>
          </div>

          {/* Core Values - Inline */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-dark-border/50">
            {[
              { icon: '⚙️', value: 'Production-Grade' },
              { icon: '🤝', value: 'Transparent' },
              { icon: '📈', value: 'Growth-Focused' },
              { icon: '🌍', value: 'Global' },
            ].map((v) => (
              <div key={v.value} className="p-4 border border-dark-border/50 hover:border-accent-pink hover:bg-accent-pink/5 transition-all text-center">
                <div className="text-2xl mb-2">{v.icon}</div>
                <p className="text-xs font-light text-text-primary">{v.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          What we <em className="italic font-light text-text-secondary">believe</em>
        </h2>
        <div className="space-y-8 max-w-3xl">
          {aboutBeliefs.map((belief) => (
            <div key={belief.title}>
              <h3 className="text-lg font-light text-text-primary mb-2">{belief.title}</h3>
              <p className="text-sm text-text-secondary font-light leading-relaxed">
                {belief.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Our <em className="italic font-light text-text-secondary">partners</em>
        </h2>
        <div className="space-y-6 max-w-3xl">
          {aboutPartners.map((partner) => (
            <div key={partner.name} className="px-6 py-4 bg-white/2 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/8 transition-all duration-300">
              <h3 className="font-light text-text-primary mb-1">{partner.name}</h3>
              <p className="text-sm text-text-secondary font-light">{partner.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="mt-32 pt-12 border-t border-dark-border text-center">
        <p className="text-text-primary font-normal text-lg mb-2">Questions?</p>
        <p className="text-text-muted text-sm">connect@blockfuselabs.com</p>
      </section>
    </>
  )
}
