import { notFound } from "next/navigation";
import { inboxByKey } from "@/lib/admin-inbox";
import { InboxView } from "@/components/admin/inbox-view";

export default async function AdminInboxKindPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;
  if (!inboxByKey(type)) notFound();
  return <InboxView kind={type} />;
}