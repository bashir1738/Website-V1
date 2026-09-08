'use client'

import { RecordDetailPage } from '@/app/admin/components/RecordDetailPage'
import { contact, type Contact, type ContactPayload } from '@/lib/contact'

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <RecordDetailPage
      badge="Contact Message"
      title="Contact Message"
      listFetcher={contact.getAll}
      id={id}
      backHref="/admin/contacts"
      updateFn={(updateId, data, token) => contact.update(updateId, data as unknown as ContactPayload, token)}
      removeFn={(removeId, token) => contact.remove(removeId, token)}
      formatTitle={(c) => `${c.name} · ${c.topic}`}
      field={(c) => [
        { label: 'Name', key: 'name', value: c.name },
        { label: 'Email', key: 'email', value: c.email, href: `mailto:${c.email}` },
        { label: 'Topic', key: 'topic', value: c.topic },
        { label: 'Message', key: 'message', value: c.message, pre: true },
        { label: 'Received', value: c.createdAt },
      ]}
    />
  )
}