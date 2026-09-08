'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { opensource, type OpenSourceApplication, type OpensourcePayload } from '@/lib/opensource'

export default async function OpensourceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Open Source Application"
      title="Open Source Application"
      listFetcher={opensource.getAll}
      id={id}
      backHref="/admin/opensource"
      updateFn={(updateId, data, token) => opensource.update(updateId, data as unknown as OpensourcePayload, token)}
      removeFn={(removeId, token) => opensource.remove(removeId, token)}
      formatTitle={(o) => `${o.name} · ${o.github}`}
      field={(o) => [
        { label: 'Name', key: 'name', value: o.name },
        { label: 'Email', key: 'email', value: o.email, href: `mailto:${o.email}` },
        { label: 'GitHub Repo', key: 'github', value: o.github },
        { label: 'Interests', key: 'interests', value: o.interests },
        { label: 'Weekly Hours', key: 'hours', value: o.hours ?? undefined },
        { label: 'Focus', key: 'focus', value: o.focus ?? undefined, pre: true },
        { label: 'Submitted', value: o.createdAt },
      ]}
    />
  )
}