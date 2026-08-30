import React from 'react'
import { engineeringCapabilities } from '@/app/content/home'

export default function ProgramPaths() {
  return (
    <section id="capabilities" className="py-24 border-b border-dark-border relative">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // 01. CAPABILITIES & SERVICES
            </div>

            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary leading-tight">
              Engineering solutions,
              <br />
              <em className="font-light text-text-secondary">built for scale.</em>
            </h2>
          </div>

          <div className="lg:col-span-6">
            <p className="text-sm text-text-secondary font-light leading-relaxed">
              We partner with Web3 protocols, ecosystem foundations, and technology companies to design, develop, and scale production-grade decentralized infrastructure and talent.
            </p>
          </div>
        </div>

        {/* 2-Column Split Axiom Stack */}
        <div className="">
          {/* Left Sticky Info Panel */}
          {/* <div className="lg:col-span-4 hidden lg:block space-y-6 sticky top-24 h-fit p-6 border border-dark-border bg-white/[0.01] backdrop-blur-md">
            <div className="text-xs font-mono text-text-muted uppercase tracking-wider border-b border-dark-border pb-3 flex justify-between">
              <span>Delivery Standard</span>
              <span className="text-accent-purple">Production-Grade</span>
            </div>
            <ul className="space-y-3 text-xs text-text-secondary font-light">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-purple inline-block" />
                Senior architect oversight & scoping
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-pink inline-block" />
                Smart contract audit readiness
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-purple inline-block" />
                100% sovereign IP & code control
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent-pink inline-block" />
                Pre-vetted engineering staff augmentation
              </li>
            </ul>
          </div> */}

          {/* Right Stacked Capabilities */}
          <div className="divide-y divide-dark-border border-y border-dark-border ">
            {engineeringCapabilities.map((capability, i) => (
              <div 
                key={capability.title} 
                className="py-8 group relative transition-all duration-300 hover:px-4 hover:bg-gradient-to-r hover:from-accent-purple/[0.04] hover:to-transparent"
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                <div className="flex items-start gap-6">
                  <span className="text-xs font-mono text-accent-purple/80 pt-1 group-hover:text-accent-purple transition-colors">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>

                  <div className="space-y-4 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3 className="text-xl lg:text-2xl font-light text-text-primary group-hover:text-accent-purple transition-all">
                        {capability.title}
                      </h3>
                      <span className="text-[10px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-2.5 py-0.5">
                        {capability.tagline}
                      </span>
                    </div>

                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {capability.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {capability.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono text-text-muted border border-dark-border px-2 py-0.5 bg-white/[0.01]">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <a href={capability.href} className="uppercase tracking-widest text-text-primary group-hover:text-accent-purple inline-flex items-center gap-2 transition-all font-mono text-[11px]">
                        Explore service details <span className="group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                      </a>
                    </div>
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
