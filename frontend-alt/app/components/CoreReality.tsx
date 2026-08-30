import React from 'react'

export default function CoreReality() {
  return (
    <section id="core-reality" className="py-24 border-b border-dark-border relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase">
              <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
              // 02. THE INDUSTRY CHALLENGE
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
              The bottleneck is not ideas.
              <br />
              <em className="font-light text-text-secondary">It is execution & talent.</em>
            </h2>

            <div className="pt-4 hidden lg:block">
              <div className="p-4 border border-dark-border bg-white/[0.01] space-y-2 text-xs font-mono text-text-muted">
                <div className="flex justify-between text-accent-purple">
                  <span>MARKET REALITY</span>
                  <span>PRODUCTION PROOF</span>
                </div>
                <p className="font-sans font-light text-text-secondary">
                  80% of blockchain projects stall due to unverified code or shortage of senior protocol engineers.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Square Tech Card */}
          <div className="lg:col-span-7 relative p-8 sm:p-10 border border-dark-border bg-white/[0.015] backdrop-blur-xl hover:border-accent-purple/40 transition-all duration-500 group shadow-2xl space-y-6">
            {/* Corner Crosshairs */}
            <span className="absolute top-3 left-3 text-xs font-mono text-dark-border group-hover:text-accent-purple transition-colors">+</span>
            <span className="absolute top-3 right-3 text-xs font-mono text-dark-border group-hover:text-accent-purple transition-colors">+</span>
            <span className="absolute bottom-3 left-3 text-xs font-mono text-dark-border group-hover:text-accent-purple transition-colors">+</span>
            <span className="absolute bottom-3 right-3 text-xs font-mono text-dark-border group-hover:text-accent-purple transition-colors">+</span>

            <p className="text-lg sm:text-xl text-text-primary font-light leading-relaxed">
              Web3 protocols and tech enterprises move fast, but finding production-ready smart contract developers and full-stack Web3 engineers remains an uphill battle.
            </p>

            <div className="p-6 border border-accent-purple/30 bg-gradient-to-r from-accent-purple/10 to-accent-pink/5 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-purple to-accent-pink" />
              <p className="text-base text-text-primary font-normal tracking-tight">
                Blockfuse Labs bridges the execution gap.
              </p>
              <p className="text-xs text-text-secondary font-light">
                We combine turnkey engineering delivery with an elite internal talent engine — giving founders and enterprises immediate access to verified technical capability.
              </p>
            </div>

            <p className="text-sm text-text-secondary font-light leading-relaxed">
              Our engineering team does not write code to pass online courses. We design protocols, test smart contracts against security vulnerabilities, ship dApps to live networks, and embed pre-vetted engineers directly into client sprint cycles.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
