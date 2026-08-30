import React from 'react'

export default function FinalCTA() {
  return (
    <section id="final-cta" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-purple/10 blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="p-8 sm:p-14 border border-accent-purple/40 bg-gradient-to-br from-accent-purple/10 via-dark-bg to-dark-bg backdrop-blur-2xl relative overflow-hidden shadow-2xl space-y-12">
          {/* Subtle Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-accent-purple via-pink-500 to-accent-pink" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Big Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
                <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
                // READY TO BUILD?
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
                Build your next protocol.
                <br />
                <em className="font-light text-text-secondary">Scale with vetted talent.</em>
              </h2>

              <p className="text-sm text-text-secondary font-light leading-relaxed max-w-lg">
                Whether you need a turnkey decentralized protocol build or vetted engineers embedded into your team, Blockfuse Labs delivers production-grade execution.
              </p>
            </div>

            {/* Right Interactive Action Buttons */}
            <div className="lg:col-span-5 space-y-3">
              <a href="/engineering" className="w-full text-left py-4 px-5 border border-dark-border hover:border-accent-purple bg-white/[0.02] hover:bg-white/[0.04] text-xs font-mono uppercase tracking-widest text-text-primary hover:text-accent-purple transition-all duration-300 flex items-center justify-between group block">
                <span>Start an Engineering Project</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-accent-purple">→</span>
              </a>

              <a href="/talent" className="w-full text-left py-4 px-5 border border-dark-border hover:border-accent-purple bg-white/[0.02] hover:bg-white/[0.04] text-xs font-mono uppercase tracking-widest text-text-primary hover:text-accent-purple transition-all duration-300 flex items-center justify-between group block">
                <span>Hire Vetted Web3 Engineers</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-accent-pink">→</span>
              </a>

              <a href="/training" className="w-full text-left py-4 px-5 border border-dark-border hover:border-accent-purple bg-white/[0.02] hover:bg-white/[0.04] text-xs font-mono uppercase tracking-widest text-text-muted hover:text-text-primary transition-all duration-300 flex items-center justify-between group block">
                <span>Apply to Blockfuse Academy</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-text-muted">→</span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-text-muted border-t border-dark-border/80 pt-6">
            <span>BLOCKFUSE LABS • JOS, NIGERIA</span>
            <span>EST. 2024 • WEB3 & AI ENGINEERING STUDIO</span>
          </div>
        </div>
      </div>
    </section>
  )
}
