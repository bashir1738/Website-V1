import React from 'react'

export default function CohortShowcase() {
  return (
    <section id="cohort-showcase" className="py-24 border-b border-dark-border relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* PHYSICAL LABS SECTION */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
            <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
            // 04. PHYSICAL LABS
          </div>

          {/* Tech HUD Card */}
          <div className="relative p-8 sm:p-12 border border-dark-border bg-white/[0.01] backdrop-blur-xl hover:border-accent-purple/40 transition-all duration-500 space-y-8 group shadow-2xl overflow-hidden">
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
                backgroundSize: '32px 32px'
              }}
            />

            <div className="flex flex-wrap items-center justify-between text-xs font-mono text-text-muted border-b border-dark-border/80 pb-4 gap-4 relative z-10">
              <span className="flex items-center gap-2 font-normal text-text-primary">
                <span className="h-2 w-2 bg-accent-purple inline-block animate-ping" />
                ● JOS PRODUCTION WORKSPACE — ONLINE
              </span>
              <span className="text-accent-purple">
                COHORT II • 115 ENGINEERS
              </span>
            </div>

            <div className="space-y-4 max-w-2xl relative z-10">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
                Cohort at work.
              </h3>
              <p className="text-base text-text-secondary font-light leading-relaxed">
                Jos Production Space: where real software systems get designed, reviewed, benchmarked, and shipped under live production conditions.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted border-t border-dark-border/80 pt-4 gap-4 relative z-10">
              <span className="text-text-secondary">LAT / LONG: 09.8965° N, 8.8583° E</span>
              <span className="text-text-secondary">LOCATION: PLATEAU STATE • NIGERIA</span>
            </div>
          </div>
        </div>

        {/* INTERNAL TALENT ENGINE SECTION */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // OUR INTERNAL TALENT ENGINE
            </div>
            <span className="text-xs font-mono text-text-muted">BLOCKFUSE ACADEMY</span>
          </div>

          <div className="p-8 sm:p-12 border border-dark-border bg-white/[0.01] backdrop-blur-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <h3 className="text-3xl sm:text-4xl font-light tracking-tighter text-text-primary">
                  Cultivating Africa's top Web3 & AI engineering talent.
                </h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  Behind our engineering studio is Blockfuse Academy — a rigorous, project-driven training pipeline where ambitious developers learn AI-native workflows, EVM/Solana smart contract engineering, and production testing standards.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col justify-end space-y-3">
                <a
                  href="/training"
                  className="w-full text-center py-3.5 px-6 border border-accent-purple bg-accent-purple/10 text-xs font-mono uppercase tracking-widest text-text-primary hover:bg-accent-purple hover:text-dark-bg transition-all duration-300"
                >
                  Explore Academy Curriculum →
                </a>
                <p className="text-[11px] font-mono text-text-muted text-center">
                  For aspiring engineers & cohort applicants
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
