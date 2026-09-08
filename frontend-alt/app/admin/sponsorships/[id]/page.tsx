'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { sponsor, type Sponsorship, type SponsorPayload } from '@/lib/sponsor'

export default async function SponsorshipDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Sponsorship Interest"
      title="Sponsorship Interest"
      listFetcher={sponsor.getAll}
      id={id}
      backHref="/admin/sponsorships"
      updateFn={(updateId, data, token) => sponsor.update(updateId, data as unknown as SponsorPayload, token)}
      removeFn={(removeId, token) => sponsor.remove(removeId, token)}
      formatTitle={(s) => `${s.organisation}`}
      field={(s) => [
        { label: 'Organisation', key: 'organisation', value: s.organisation },
        { label: 'Contact Name', key: 'name', value: s.name },
        { label: 'Email', key: 'email', value: s.email, href: `mailto:${s.email}` },
        { label: 'Interests', key: 'interests', value: s.interests },
        { label: 'Budget', key: 'budget', value: s.budget ?? undefined },
        { label: 'Metrics / Goals', key: 'metrics', value: s.metrics ?? undefined, pre: true },
        { label: 'Submitted', value: s.createdAt },
      ]}
    />
  )
}