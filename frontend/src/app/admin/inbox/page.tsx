import { redirect } from "next/navigation";
import { DEFAULT_INBOX_KEY } from "@/lib/admin-inbox";

export default function AdminInboxPage() {
  redirect(`/admin/inbox/${DEFAULT_INBOX_KEY}`);
}