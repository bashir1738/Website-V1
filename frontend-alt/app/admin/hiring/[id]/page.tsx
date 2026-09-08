'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { hire, type HireRequest, type HirePayload } from '@/lib/hire'

export default async function HiringDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Hiring Request"
      title="Hiring Request"
      listFetcher={hire.getAll}
      id={id}
      backHref="/admin/hiring"
      updateFn={(updateId, data, token) => hire.update(updateId, data as unknown as HirePayload, token)}
      removeFn={(removeId, token) => hire.remove(removeId, token)}
      formatTitle={(h) => `${h.company} · ${h.name}`}
      field={(h) => [
        { label: 'Company', key: 'company', value: h.company },
        { label: 'Contact Name', key: 'name', value: h.name },
        { label: 'Email', key: 'email', value: h.email, href: `mailto:${h.email}` },
        { label: 'Roles', key: 'roles', value: h.roles },
        { label: 'Engagement Type', key: 'engagement_type', value: h.engagement_type ?? undefined },
        { label: 'Seniority', key: 'seniority', value: h.seniority ?? undefined },
        { label: 'Headcount', key: 'count', value: h.count ?? undefined },
        { label: 'Timeline', key: 'timeline', value: h.timeline ?? undefined },
        { label: 'Details', key: 'details', value: h.details, pre: true },
        { label: 'Submitted', value: h.createdAt },
      ]}
    />
  )
}