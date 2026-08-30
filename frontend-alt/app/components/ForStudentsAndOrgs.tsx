import React from 'react'
import { engagementModels } from '@/app/content/home'

export default function ForStudentsAndOrgs() {
  return (
    <section id="engagement" className="py-24 border-b border-dark-border">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-pink/10 border border-accent-pink/30 text-[11px] font-mono tracking-widest text-accent-pink uppercase">
              <span className="h-1.5 w-1.5 bg-accent-pink inline-block animate-pulse" />
              // 03. ENGAGEMENT MODELS
            </div>
            <h2 className="text-4xl lg:text-5xl font-light tracking-tighter text-text-primary">
              How companies{' '}
              <em className="font-light text-text-secondary">partner with us.</em>
            </h2>
          </div>
          <div className="text-xs font-mono text-text-muted">
            MANAGED DELIVERY • EMBEDDED PODS • CUSTOM PIPELINES
          </div>
        </div>

        {/* Cards — flush, no gap, no radius */}
        <div className="grid grid-cols-1 md:grid-cols-3 border border-dark-border">
          {engagementModels.map((model, i) => {
            const isMid = i === 1

            return (
              <div
                key={model.title}
                className={`group relative flex flex-col border-dark-border bg-white/[0.015] hover:border-accent-purple/50 hover:bg-accent-purple/5 transition-all duration-300
                  ${i !== 0 ? 'md:border-l border-dark-border' : ''}
                `}
              >
                <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                {/* Image top — only cards 1 & 3 */}
                {!isMid && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-dark-border/30">
                    <div
                      className="absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase opacity-40">
                        Image placeholder
                      </span>
                    </div>
                  </div>
                )}

                {/* Card body */}
                <div className="flex flex-col flex-1 gap-4 p-7">
                  <div>
                    <h3 className="text-[15px] font-semibold leading-snug mb-3 text-text-primary group-hover:text-accent-purple transition-colors duration-200">
                      {model.title}
                    </h3>
                    <div className="h-px w-full bg-dark-border" />
                  </div>

                  <p className="text-[12.5px] text-text-secondary font-light leading-relaxed flex-1">
                    {model.description}
                  </p>

                  <a
                    href={model.href}
                    className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-text-secondary hover:text-accent-purple transition-colors duration-200 group/link"
                  >
                    {model.ctaText}
                    <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
                  </a>
                </div>

                {/* Image bottom — middle card only */}
                {isMid && (
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-dark-border/30">
                    <div
                      className="absolute inset-0 opacity-[0.12]"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, #a855f7 1px, transparent 1px), linear-gradient(to bottom, #a855f7 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-mono tracking-widest text-text-muted uppercase opacity-40">
                        Image placeholder
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
