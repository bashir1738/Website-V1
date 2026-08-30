import React from 'react'
import Stars from './Stars'

export default function Hero() {
  return (
    <section id="home" className="min-h-[calc(100vh-6rem)] flex flex-col justify-between relative py-6 border-b border-dark-border">
      {/* <Stars /> */}

      <div className="flex flex-col gap-8 max-w-4xl my-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
          <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
          // WEB3 & BLOCKCHAIN ENGINEERING STUDIO
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tighter text-text-primary">
          We build decentralized systems &
          <br />
          <em className="font-light text-text-secondary">
            deploy vetted engineering talent.
          </em>
        </h1>

        <div className="space-y-3 max-w-2xl">
          <p className="text-sm sm:text-base text-text-secondary font-light leading-relaxed">
            Blockfuse Labs is a premier Web3 & Blockchain engineering studio. We architect production-grade protocols, smart contracts, and AI-powered Web3 products while deploying battle-tested engineering talent to global technology teams.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a href="/engineering" className="bg-text-primary text-dark-bg border border-text-primary px-6 py-3.5 text-xs tracking-widest uppercase font-mono inline-flex items-center gap-3 hover:bg-transparent hover:text-text-primary transition-all duration-300">
            Start an Engineering Project
            <span>→</span>
          </a>

          <a href="/talent" className="border border-dark-border text-text-primary px-6 py-3.5 text-xs tracking-widest uppercase font-mono inline-flex items-center gap-3 hover:border-accent-purple hover:text-accent-purple bg-white/[0.01] transition-all duration-300">
            Hire Vetted Web3 Engineers
            <span>→</span>
          </a>

          <a href="/training" className="text-xs tracking-widest uppercase font-mono text-text-muted hover:text-accent-pink transition-colors px-2 py-2">
            Explore Academy Pipeline →
          </a>
        </div>
      </div>

      <img className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 pointer-events-none max-w-xl" src="/hero-imgs/light.png" alt="light bg" />
    </section>
  )
}
