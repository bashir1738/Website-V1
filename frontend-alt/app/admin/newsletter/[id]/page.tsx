'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { newsletter, type NewsletterSubscriber, type NewsletterPayload } from '@/lib/newsletter'

export default async function NewsletterDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Newsletter Subscriber"
      title="Newsletter Subscriber"
      listFetcher={newsletter.getAll}
      id={id}
      backHref="/admin/newsletter"
      updateFn={(updateId, data, token) => newsletter.update(updateId, data as unknown as NewsletterPayload, token)}
      removeFn={(removeId, token) => newsletter.remove(removeId, token)}
      formatTitle={(n) => `${n.name ?? n.email}`}
      field={(n) => [
        { label: 'Name', key: 'name', value: n.name ?? undefined },
        { label: 'Email', key: 'email', value: n.email, href: `mailto:${n.email}` },
        { label: 'Topics', key: 'topics', value: n.topics },
        { label: 'Subscribed', value: n.createdAt },
      ]}
    />
  )
}