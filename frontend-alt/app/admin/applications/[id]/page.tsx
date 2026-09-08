'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { applications, type Application, type ApplicationPayload } from '@/lib/applications'

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Program Application"
      title="Program Application"
      listFetcher={applications.getAll}
      id={id}
      backHref="/admin/applications"
      updateFn={(updateId, data, token) => applications.update(updateId, data as unknown as ApplicationPayload, token)}
      removeFn={(removeId, token) => applications.remove(removeId, token)}
      formatTitle={(a) => `${a.name} · ${a.track ?? 'General'}`}
      field={(a) => [
        { label: 'Name', key: 'name', value: a.name },
        { label: 'Email', key: 'email', value: a.email, href: `mailto:${a.email}` },
        { label: 'Phone', key: 'phone', value: a.phone },
        { label: 'Location', key: 'location', value: a.location ?? undefined },
        { label: 'Track', key: 'track', value: a.track ?? undefined },
        { label: 'Experience Level', key: 'experience_level', value: a.experience_level ?? undefined },
        { label: 'GitHub', key: 'github', value: a.github ?? undefined, href: a.github ?? undefined },
        { label: 'Referral', key: 'referral', value: a.referral ?? undefined },
        { label: 'Resume URL', key: 'resume_url', value: a.resume_url ?? undefined, href: a.resume_url ?? undefined },
        { label: 'Motivation', key: 'motivation', value: a.motivation, pre: true },
        { label: 'Submitted', value: a.createdAt },
      ]}
    />
  )
}