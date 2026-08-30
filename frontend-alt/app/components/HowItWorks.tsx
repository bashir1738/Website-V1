import React from 'react'
import { whyBlockfusePoints } from '@/app/content/home'

export default function HowItWorks() {
  return (
    <section id="why-us" className="py-24 border-b border-dark-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
            <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
            // 04. THE BLOCKFUSE ADVANTAGE
          </div>

          <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
            Why teams choose
            <br />
            <em className="font-light text-text-secondary">Blockfuse Labs.</em>
          </h2>

          <p className="text-sm text-text-secondary font-light leading-relaxed max-w-md">
            Whether you need a full turnkey dApp build or embedded Web3 engineers, we deliver with senior oversight, verified code, and zero onboarding latency.
          </p>

          <div className="hidden lg:block pt-6">
            <div className="p-4 border border-dark-border bg-white/[0.01] text-xs font-mono space-y-2">
              <div className="text-accent-purple">// CLIENT GUARANTEE</div>
              <p className="text-text-secondary font-sans font-light">
                Direct senior lead accountability, daily GitHub commits, and complete IP sovereignty on all client engagements.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Stacked Advantage Points */}
        <div className="lg:col-span-7 space-y-4 relative">
          <div className="divide-y divide-dark-border border-y border-dark-border">
            {whyBlockfusePoints.map((point, i) => (
              <div 
                key={point.title} 
                className="py-7 group relative transition-all duration-300 hover:px-4 hover:bg-gradient-to-r hover:from-accent-purple/[0.04] hover:to-transparent"
              >
                <div className="flex items-start gap-6">
                  <span className="text-xs font-mono text-accent-purple border border-accent-purple/30 bg-accent-purple/10 px-2 py-1">
                    0{i + 1}
                  </span>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                        {point.title}
                      </h3>
                      <span className="text-[10px] font-mono text-text-muted border border-dark-border px-2 py-0.5">
                        {point.tag}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
