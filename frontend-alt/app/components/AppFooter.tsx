import Link from 'next/link'
import { footerLinks } from '@/app/content/footer'

export default function AppFooter() {
  return (
    <footer className="relative border-t border-dark-border bg-gradient-to-b from-dark-bg/50 to-dark-bg mt-24">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-purple to-transparent" />

      <div className="mx-auto max-w-6xl px-8 py-20 space-y-16">
        {/* Top section with brand and CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <h3 className="text-4xl font-light tracking-tighter text-accent-purple">
              Blockfuse Labs
            </h3>
            <p className="text-sm text-text-secondary font-light leading-relaxed max-w-sm">
              Building production-grade Web3 infrastructure and cultivating Africa's next generation of elite software engineers.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-accent-purple pt-2">
              <span className="h-1.5 w-1.5 bg-accent-purple rounded-full animate-pulse" />
              Based in Jos, Nigeria
            </div>
          </div>

          {/* Quick CTA Card */}
          <div className="p-6 border border-accent-purple/30 bg-accent-purple/5 backdrop-blur-sm rounded-lg space-y-3 hover:border-accent-purple/60 transition-all duration-300">
            <p className="text-xs font-mono tracking-widest text-accent-purple uppercase">Let's Build Together</p>
            <p className="text-sm text-text-secondary font-light">Ready to join us or collaborate?</p>
            <a href="/contact" className="inline-flex items-center gap-2 text-xs font-mono text-accent-purple hover:text-accent-pink transition-colors uppercase tracking-widest">
              Get in touch <span>→</span>
            </a>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-dark-border py-12">
          {/* Programs */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Programs</p>
            <ul className="space-y-2.5">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-text-secondary font-light hover:text-accent-purple hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Organizations */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Organizations</p>
            <ul className="space-y-2.5">
              {footerLinks.organizations.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-text-secondary font-light hover:text-accent-purple hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Community</p>
            <ul className="space-y-2.5">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-text-secondary font-light hover:text-accent-purple hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="text-xs font-mono tracking-widest text-text-muted uppercase">Company</p>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs text-text-secondary font-light hover:text-accent-purple hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[11px] text-text-muted font-light">
          <p>© {new Date().getFullYear()} Blockfuse Labs. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/contact" className="hover:text-accent-purple transition-colors">Privacy Policy</a>
            <span className="text-dark-border">•</span>
            <a href="/contact" className="hover:text-accent-purple transition-colors">Terms of Service</a>
            <span className="text-dark-border">•</span>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent-purple transition-colors">Twitter</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
