'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { alumni, type AlumniProfile, type AlumniPayload } from '@/lib/alumni'

export default async function AlumniDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Alumni Profile"
      title="Alumni Profile"
      listFetcher={alumni.getAll}
      id={id}
      backHref="/admin/alumni"
      updateFn={(updateId, data, token) => alumni.update(updateId, data as unknown as AlumniPayload, token)}
      removeFn={(removeId, token) => alumni.remove(removeId, token)}
      formatTitle={(a) => `${a.name} · ${a.track}`}
      field={(a) => [
        { label: 'Name', key: 'name', value: a.name },
        { label: 'Email', key: 'email', value: a.email, href: `mailto:${a.email}` },
        { label: 'Cohort', key: 'cohort', value: a.cohort },
        { label: 'Track', key: 'track', value: a.track },
        { label: 'Current Status', key: 'current_status', value: a.current_status },
        { label: 'Location', key: 'location', value: a.location ?? undefined },
        { label: 'GitHub', key: 'github', value: a.github ?? undefined, href: a.github ? `https://github.com/${a.github}` : undefined },
        { label: 'LinkedIn', key: 'linkedin', value: a.linkedin ?? undefined, href: a.linkedin ? `https://linkedin.com/in/${a.linkedin}` : undefined },
        { label: 'Open To', key: 'open_to', value: a.open_to },
        { label: 'Verification Info', key: 'verification_info', value: a.verification_info ?? undefined, pre: true },
        { label: 'Photo', key: 'photo_url', value: a.photo_url ?? undefined, href: a.photo_url ?? undefined },
        { label: 'Submitted', value: a.createdAt },
      ]}
    />
  )
}