import { Mail, Phone, MapPin } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TiltCard } from "@/components/ui/tilt-card";
import { SURFACE_CARD } from "@/lib/styles";
import { siteConfig } from "@/config/site";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Location */}
      <ScrollReveal delay={1}>
        <TiltCard className={`${SURFACE_CARD} p-6 sm:p-8`}>
          <div className="flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)]">
              <MapPin className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading text-base font-bold text-[var(--page-fg)] mb-2">
                Blockfuse Labs Headquarters
              </h3>
              <p className="text-sm text-[var(--muted)]">
                {siteConfig.location}
              </p>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Phone */}
      <ScrollReveal delay={2}>
        <TiltCard className={`${SURFACE_CARD} p-6 sm:p-8`}>
          <div className="flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)]">
              <Phone className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono text-base font-bold text-[var(--page-fg)] mb-1">
                <a
                  href={siteConfig.phoneHref}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </h3>
              <p className="text-xs text-[var(--dim)]">
                Call or message us on WhatsApp
              </p>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>

      {/* Email */}
      <ScrollReveal delay={3}>
        <TiltCard className={`${SURFACE_CARD} p-6 sm:p-8`}>
          <div className="flex gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-[var(--card)]">
              <Mail className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="flex-1">
              <h3 className="font-mono text-base font-bold text-[var(--page-fg)] break-all mb-1">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  {siteConfig.email}
                </a>
              </h3>
              <p className="text-xs text-[var(--dim)]">
                All enquiries
              </p>
            </div>
          </div>
        </TiltCard>
      </ScrollReveal>
    </div>
  );
}
