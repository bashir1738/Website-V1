import React from 'react'
import { stats } from '@/app/content/home'

export default function About() {
  const statTags = ['GRADUATES', 'CONTRACTS', 'APPLICATIONS', 'CAMPUS']

  return (
    <section id="about" className="py-24 border-b border-dark-border">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // 06. PROOF & METRICS
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
              Proven in code,
              <br />
              <em className="font-light text-text-secondary">measured in production.</em>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We don't train for certificates. We train for engineering capability that holds up under professional scrutiny and live production benchmarks.
            </p>
          </div>
        </div>

        {/* Axiom Stats Grid Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <div 
              key={stat.label} 
              className="p-8 border border-dark-border bg-white/[0.015] backdrop-blur-xl hover:border-accent-purple/50 transition-all duration-500 space-y-4 group hover:-translate-y-1 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-accent-purple">0{i + 1}</span>
                <span className="text-text-muted group-hover:text-accent-pink transition-colors font-mono">
                  [{statTags[i]}]
                </span>
              </div>

              <div className="text-4xl sm:text-5xl font-light text-accent-purple tracking-tight">
                {stat.value}
              </div>

              <p className="text-xs text-text-secondary font-light leading-relaxed group-hover:text-text-primary transition-colors">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
