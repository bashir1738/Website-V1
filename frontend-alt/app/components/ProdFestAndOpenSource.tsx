import React from 'react'

export default function ProdFestAndOpenSource() {
  return (
    <section id="prodfest-opensource" className="py-24 border-b border-dark-border">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // 03. INITIATIVES & STAGE
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
              Events & <span className="text-transparent bg-gradient-to-r from-accent-purple via-pink-500 to-accent-pink bg-clip-text">Open Source.</span>
            </h2>
          </div>

          <div className="text-xs font-mono text-text-muted">
            FLAGSHIP EVENTS • PUBLIC CODE • COMMUNITY
          </div>
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: ProdFest */}
          <div className="relative p-8 sm:p-10 border border-dark-border bg-white/[0.015] backdrop-blur-xl hover:border-accent-purple/50 transition-all duration-500 flex flex-col justify-between space-y-8 group hover:-translate-y-1 shadow-xl">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent-purple/60 to-transparent group-hover:via-accent-purple transition-all duration-500" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-3 py-1 uppercase">
                  ● Flagship Showcase
                </span>
                <span className="text-xs font-mono text-text-muted">ANNUAL DEMO DAY</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                ProdFest 2026
              </h3>

              <p className="text-sm text-text-secondary font-light leading-relaxed">
                One day, one stage. Cohort teams ship in front of founders, investors, and ecosystem partners — and the room decides what deserves to keep going.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-dark-border/60">
              <button className="text-xs font-mono uppercase tracking-widest text-text-primary group-hover:text-accent-purple inline-flex items-center gap-2 transition-all">
                Register interest <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </button>
              <button className="text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-primary transition-all">
                Sponsor event
              </button>
            </div>
          </div>

          {/* Card 2: Open Source */}
          <div className="relative p-8 sm:p-10 border border-dark-border bg-white/[0.015] backdrop-blur-xl hover:border-accent-purple/50 transition-all duration-500 flex flex-col justify-between space-y-8 group hover:-translate-y-1 shadow-xl">
            <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-accent-pink/60 to-transparent group-hover:via-accent-pink transition-all duration-500" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-widest text-accent-purple bg-accent-purple/10 border border-accent-purple/20 px-3 py-1 uppercase">
                  ● 6 Active Repos
                </span>
                <span className="text-xs font-mono text-text-muted">PUBLIC REPOS</span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                Build in public with us
              </h3>

              <p className="text-sm text-text-secondary font-light leading-relaxed">
                Six repos maintained by students and residents. Contributions reviewed under the exact same rigor as client production code.
              </p>
            </div>

            <div className="pt-6 border-t border-dark-border/60">
              <a href="/open-source" className="text-xs font-mono uppercase tracking-widest text-text-primary group-hover:text-accent-purple inline-flex items-center gap-2 transition-all">
                Explore GitHub Repos <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
