import React from 'react'

export default function EngineeringStudio() {
  return (
    <section id="engineering-studio" className="py-24 border-b border-dark-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
            <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
            // 08. SENIOR SERVICES
          </div>

          <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
            Senior Engineering
            <br />
            <span className="text-transparent bg-gradient-to-r from-accent-purple via-pink-500 to-accent-pink bg-clip-text">
              Studio.
            </span>
          </h2>

          <div className="pt-2 hidden lg:block">
            <span className="text-xs font-mono text-text-muted px-3 py-1 border border-dark-border">
              LIMITED ENGAGEMENTS PER YEAR
            </span>
          </div>
        </div>

        {/* Right Column - Square Card */}
        <div className="lg:col-span-7 p-8 sm:p-10 border border-dark-border bg-white/[0.015] backdrop-blur-xl hover:border-accent-purple/40 transition-all duration-500 space-y-6 group shadow-xl">
          <h3 className="text-2xl font-light text-text-primary group-hover:text-accent-purple transition-all">
            Or have us build it.
          </h3>

          <p className="text-sm text-text-secondary font-light leading-relaxed">
            Some organisations do not need engineers to hire. They need the work done.
          </p>

          <p className="text-sm text-text-secondary font-light leading-relaxed">
            Our senior engineers take on a limited number of engagements each year: technical advisory when a decision is expensive, discovery when the shape of the solution is unclear, and senior-led delivery of AI, web, blockchain, and backend systems.
          </p>

          <div className="p-4 border border-dark-border bg-white/[0.01] text-xs font-mono text-text-muted space-y-1">
            <div className="text-accent-purple">// SOVEREIGN DELIVERY</div>
            <p className="font-sans font-light text-text-secondary">
              Your code, infrastructure, and IP stay 100% yours. Every engagement is accountable directly to a senior lead.
            </p>
          </div>

          <div className="pt-4">
            <a href="/engineering" className="text-xs font-mono uppercase tracking-widest text-text-primary group-hover:text-accent-purple inline-flex items-center gap-2 transition-all">
              Explore engineering services <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
