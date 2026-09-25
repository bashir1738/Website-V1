import type { Metadata } from "next";
import { ApplyStatusClient } from "@/features/apply/status-client";

export const metadata: Metadata = {
  title: "Your application: Blockfuse Labs Academy",
  description: "Bank-transfer instructions, proof upload, and live payment status.",
};

export default async function ApplyStatusPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  return <ApplyStatusClient token={token} />;
}