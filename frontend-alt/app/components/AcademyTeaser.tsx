import React from 'react'

export default function AcademyTeaser() {
  return (
    <section id="academy-pipeline" className="py-24 border-b border-dark-border">
      <div className="max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 border border-dark-border bg-white/[0.01] backdrop-blur-xl relative overflow-hidden space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dark-border pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // OUR INTERNAL TALENT ENGINE
            </div>
            <span className="text-xs font-mono text-text-muted">BLOCKFUSE ACADEMY</span>
          </div>

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
    </section>
  )
}
