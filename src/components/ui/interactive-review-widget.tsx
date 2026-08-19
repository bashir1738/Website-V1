"use client";

import React, { useState } from "react";

interface CodeSnippet {
  id: string;
  title: string;
  category: string;
  filename: string;
  lines: Array<{
    num: number;
    code: string;
    status?: "approved" | "warning" | "error" | "normal";
    comment?: string;
  }>;
  summary: string;
  verdict: string;
  readinessScore: number;
}

const snippets: CodeSnippet[] = [
  {
    id: "smart-contract",
    title: "Smart Contract: Vault Reentrancy Guard",
    category: "Blockchain",
    filename: "BlockfuseVault.sol",
    lines: [
      { num: 1, code: "// SPDX-License-Identifier: MIT", status: "normal" },
      { num: 2, code: "pragma solidity ^0.8.24;", status: "normal" },
      { num: 3, code: "", status: "normal" },
      { num: 4, code: "contract BlockfuseVault is ReentrancyGuard {", status: "normal" },
      { num: 5, code: "    mapping(address => uint256) private balances;", status: "normal" },
      { num: 6, code: "    event Withdrawn(address indexed user, uint256 amount);", status: "normal" },
      { num: 7, code: "", status: "normal" },
      { num: 8, code: "    function withdraw(uint256 amount) external nonReentrant {", status: "approved", comment: "✓ nonReentrant modifier verified against cross-function reentrancy" },
      { num: 9, code: "        require(balances[msg.sender] >= amount, 'Insufficient');", status: "approved" },
      { num: 10, code: "        balances[msg.sender] -= amount; // Checks-Effects-Interactions", status: "approved", comment: "✓ State updated prior to external call. Prevents reentrancy exploit." },
      { num: 11, code: "        (bool sent, ) = msg.sender.call{value: amount}('');", status: "warning", comment: "⚠️ Low-level call verified with custom revert decoding." },
      { num: 12, code: "        require(sent, 'Failed to send Ether');", status: "approved" },
      { num: 13, code: "        emit Withdrawn(msg.sender, amount);", status: "approved" },
      { num: 14, code: "    }", status: "normal" },
      { num: 15, code: "}", status: "normal" },
    ],
    summary: "Reviews real Solidity smart contract logic against DeFi vulnerabilities. Checks-Effects-Interactions strictly verified.",
    verdict: "PASSED: Production-Readiness Standard Tier-1",
    readinessScore: 98.4,
  },
  {
    id: "applied-ai",
    title: "AI Pipeline: Structured Memory & Guardrails",
    category: "Applied AI",
    filename: "agent_orchestrator.ts",
    lines: [
      { num: 1, code: "import { z } from 'zod';", status: "normal" },
      { num: 2, code: "import { TokenBucketRateLimiter } from '@/lib/ai/ratelimit';", status: "normal" },
      { num: 3, code: "", status: "normal" },
      { num: 4, code: "export const ExecutionPlanSchema = z.object({", status: "approved", comment: "✓ Strict schema validation prevents LLM structured output drift." },
      { num: 5, code: "  intent: z.enum(['QUERY_DATA', 'MUTATE_STATE', 'RETRY']),", status: "approved" },
      { num: 6, code: "  confidence: z.number().min(0).max(1),", status: "approved" },
      { num: 7, code: "  sanitizedPayload: z.record(z.unknown()),", status: "warning", comment: "⚠️ Payload sanitized through PII filter before vector storage." },
      { num: 8, code: "});", status: "normal" },
      { num: 9, code: "", status: "normal" },
      { num: 10, code: "export async function executeAgentWorkflow(ctx: Context) {", status: "normal" },
      { num: 11, code: "  const limiter = await TokenBucketRateLimiter.check(ctx.orgId);", status: "approved", comment: "✓ Hard latency & token cost circuit breakers in place." },
      { num: 12, code: "  if (!limiter.allowed) throw new QuotaExceededError();", status: "approved" },
      { num: 13, code: "  return await ctx.llm.generateStructured(ExecutionPlanSchema);", status: "approved" },
      { num: 14, code: "}", status: "normal" },
    ],
    summary: "Production LLM agents must enforce schema validation, cost circuit breakers, and deterministic fallback routes.",
    verdict: "PASSED: Production-Readiness Standard Tier-1",
    readinessScore: 99.1,
  },
  {
    id: "backend-systems",
    title: "Distributed Backend: Distributed Lock & Idempotency",
    category: "Systems",
    filename: "settlement_worker.rs",
    lines: [
      { num: 1, code: "pub async fn process_settlement(", status: "normal" },
      { num: 2, code: "    db: &DatabasePool,", status: "normal" },
      { num: 3, code: "    tx: SettlementTransaction,", status: "normal" },
      { num: 4, code: ") -> Result<SettlementStatus, EngineError> {", status: "normal" },
      { num: 5, code: "    // 1. Acquire Redis distributed lock with lease TTL", status: "approved" },
      { num: 6, code: "    let lock_key = format!('lock:settlement:{}', tx.id);", status: "approved" },
      { num: 7, code: "    let _guard = db.acquire_lock(&lock_key, Duration::from_secs(10)).await?;", status: "approved", comment: "✓ Concurrency race condition prevented under high load." },
      { num: 8, code: "    // 2. Idempotent check before state mutation", status: "normal" },
      { num: 9, code: "    if db.is_already_settled(&tx.id).await? {", status: "approved", comment: "✓ Zero double-spending guarantee verified." },
      { num: 10, code: "        return Ok(SettlementStatus::AlreadyProcessed);", status: "approved" },
      { num: 11, code: "    }", status: "normal" },
      { num: 12, code: "    db.execute_ledger_settlement(&tx).await", status: "approved" },
      { num: 13, code: "}", status: "normal" },
    ],
    summary: "Engineers are assessed on concurrency control, idempotency guarantees, and fail-safe ledger operations.",
    verdict: "PASSED: Production-Readiness Standard Tier-1",
    readinessScore: 97.9,
  },
];

export function InteractiveReviewWidget() {
  const [selectedId, setSelectedId] = useState("smart-contract");
  const [activeCommentLine, setActiveCommentLine] = useState<number | null>(10);
  const [auditing, setAuditing] = useState(false);
  const [auditedScore, setAuditedScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const currentSnippet =
    snippets.find((s) => s.id === selectedId) || snippets[0];

  const handleRunAudit = () => {
    setAuditing(true);
    setAuditedScore(null);
    setTimeout(() => {
      setAuditedScore(currentSnippet.readinessScore);
      setAuditing(false);
    }, 1100);
  };

  const handleCopy = () => {
    const text = currentSnippet.lines.map((l) => l.code).join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-cursor="AUDIT"
      className="surface-card relative overflow-hidden rounded-3xl border border-[var(--line-strong)] bg-[var(--surface-2)]/95 shadow-2xl transition-all"
    >
      {/* Top Window Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--surface)]/80 px-5 py-3.5 backdrop-blur-md">
        {/* Terminal Mac Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 font-mono text-xs text-[var(--muted)]">
            Blockfuse Production-Readiness Inspector
          </span>
        </div>

        {/* Track Selector Tabs */}
        <div className="flex items-center gap-1 rounded-xl border border-[var(--line)] bg-[var(--card)] p-1">
          {snippets.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelectedId(s.id);
                setActiveCommentLine(
                  s.lines.find((l) => l.comment)?.num || null
                );
                setAuditedScore(null);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                selectedId === s.id
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "text-[var(--muted)] hover:text-[var(--page-fg)]"
              }`}
            >
              {s.category}
            </button>
          ))}
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="rounded-lg border border-[var(--line)] bg-[var(--card)] px-3 py-1 text-xs text-[var(--muted)] transition hover:border-[var(--accent)] hover:text-[var(--page-fg)]"
        >
          {copied ? "✓ Copied" : "Copy Code"}
        </button>
      </div>

      {/* Code Editor Body */}
      <div className="grid lg:grid-cols-[1.6fr_1fr]">
        {/* Left: Code with status highlights */}
        <div className="overflow-x-auto border-b lg:border-b-0 lg:border-r border-[var(--line)] bg-[#0c0c0e] p-5 font-mono text-xs sm:text-[13px] leading-6">
          <div className="mb-3 flex items-center justify-between text-[11px] text-[var(--muted)]">
            <span className="flex items-center gap-2 text-[var(--accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {currentSnippet.filename}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[var(--muted)]/70">
              Click line for reviewer notes
            </span>
          </div>

          <div className="space-y-0.5">
            {currentSnippet.lines.map((l) => {
              const hasComment = Boolean(l.comment);
              const isSelected = activeCommentLine === l.num;

              return (
                <div
                  key={l.num}
                  onClick={() => hasComment && setActiveCommentLine(l.num)}
                  className={`group flex items-start gap-4 rounded px-2 py-0.5 transition-colors ${
                    hasComment ? "cursor-pointer" : ""
                  } ${
                    isSelected
                      ? "bg-[var(--accent)]/20 text-white"
                      : l.status === "approved"
                      ? "hover:bg-emerald-950/30 text-emerald-300/90"
                      : l.status === "warning"
                      ? "hover:bg-amber-950/30 text-amber-300/90"
                      : "text-zinc-400 hover:bg-zinc-800/40"
                  }`}
                >
                  <span className="w-6 shrink-0 select-none text-right text-zinc-600">
                    {l.num}
                  </span>
                  <span className="flex-1 overflow-x-auto whitespace-pre font-mono">
                    {l.code}
                  </span>
                  {hasComment && (
                    <span className="shrink-0 text-[10px] font-sans font-semibold text-[var(--accent)] opacity-80 group-hover:opacity-100">
                      [note]
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Senior Reviewer Feedback & Audit Score Meter */}
        <div className="flex flex-col justify-between p-6 sm:p-7 bg-[var(--surface-2)]">
          <div className="space-y-5">
            <div>
              <span className="eyebrow text-[var(--accent)]">
                Senior Reviewer Breakdown
              </span>
              <h4 className="mt-1.5 font-heading text-lg font-bold text-[var(--page-fg)]">
                {currentSnippet.title}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-[var(--muted)]">
                {currentSnippet.summary}
              </p>
            </div>

            {/* Active Line Comment Callout */}
            {activeCommentLine && (
              <div className="rounded-2xl border border-[var(--accent)]/30 bg-[var(--accent)]/8 p-4 text-xs">
                <div className="flex items-center justify-between font-semibold text-[var(--accent)]">
                  <span>Line {activeCommentLine} Review Note:</span>
                  <span className="text-[10px] font-mono">Senior Engineer</span>
                </div>
                <p className="mt-2 leading-relaxed text-[var(--page-fg)]">
                  {
                    currentSnippet.lines.find(
                      (l) => l.num === activeCommentLine
                    )?.comment
                  }
                </p>
              </div>
            )}

            {/* Status Checklist */}
            <div className="space-y-2 rounded-xl border border-[var(--line)] bg-[var(--card)] p-3.5 text-xs text-[var(--muted)]">
              <div className="flex items-center justify-between">
                <span>Direct Engineer Code Review:</span>
                <span className="font-bold text-emerald-400">✓ PASS</span>
              </div>
              <div className="flex items-center justify-between">
                <span>AI Output Verification:</span>
                <span className="font-bold text-emerald-400">✓ VERIFIED</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Edge-Case & Security Test:</span>
                <span className="font-bold text-emerald-400">✓ 100% COVERED</span>
              </div>
            </div>
          </div>

          {/* Bottom Audit Action & Score */}
          <div className="mt-6 pt-5 border-t border-[var(--line)]">
            {auditedScore !== null ? (
              <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3.5 animate-fadeIn">
                <div>
                  <p className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                    Verified Readiness Score
                  </p>
                  <p className="font-heading text-2xl font-bold text-[var(--page-fg)]">
                    {auditedScore}%
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Production Ready
                </span>
              </div>
            ) : (
              <button
                onClick={handleRunAudit}
                disabled={auditing}
                className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 font-heading text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-[var(--accent)]/20 transition-all hover:bg-[var(--accent-dim)] hover:scale-[1.02] active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {auditing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Running Readiness Assessment...
                  </span>
                ) : (
                  "Run Production-Readiness Audit →"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
