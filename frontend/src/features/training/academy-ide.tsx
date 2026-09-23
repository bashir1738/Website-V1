"use client";

import React, { useState, useEffect } from "react";
import { SURFACE_CARD, CUSTOM_SCROLL } from "@/lib/styles";

interface CodeSample {
  id: string;
  name: string;
  language: string;
  color: string;
  code: string[];
  tests: string[];
}

const CODE_SAMPLES: CodeSample[] = [
  {
    id: "rust",
    name: "solana_vault.rs",
    language: "Rust (Anchor)",
    color: "#f97316",
    code: [
      "#[program]",
      "pub mod blockfuse_vault {",
      "    use super::*;",
      "    pub fn initialize(ctx: Context<InitVault>) -> Result<()> {",
      "        let vault = &mut ctx.accounts.vault;",
      "        vault.authority = ctx.accounts.signer.key();",
      "        vault.total_staked = 0;",
      '        msg!("Vault initialized");',
      "        Ok(())",
      "    }",
      "}",
    ],
    tests: [
      "✓ test_initialize_vault_state (12ms)",
      "✓ test_enforce_signer_authority (8ms)",
      "✓ test_zero_copy_deserialization (15ms)",
      "✓ test_rent_exempt_space_calc (4ms)",
    ],
  },
  {
    id: "solidity",
    name: "YieldAggregator.sol",
    language: "Solidity (EVM)",
    color: "#bf64e7",
    code: [
      "// SPDX-License-Identifier: MIT",
      "contract YieldAggregator is ReentrancyGuard {",
      "    using SafeERC20 for IERC20;",
      "    ",
      "    function deposit(uint256 amount)",
      "        external nonReentrant {",
      "        require(amount > 0, 'INVALID_AMOUNT');",
      "        IERC20(underlying).safeTransferFrom(",
      "            msg.sender, address(this), amount);",
      "        emit YieldDeposited(msg.sender, amount);",
      "    }",
    ],
    tests: [
      "✓ test_non_reentrant_guard (14ms)",
      "✓ test_safe_erc20_transfer_from (19ms)",
      "✓ test_zero_amount_revert (6ms)",
      "✓ test_event_emission_integrity (9ms)",
    ],
  },
  {
    id: "typescript",
    name: "indexer_client.ts",
    language: "TypeScript / Node",
    color: "#3b82f6",
    code: [
      'import { Connection, PublicKey } from "@solana/web3.js";',
      'import { AnchorProvider, Program } from "@coral-xyz/anchor";',
      "",
      "export class ProtocolIndexer {",
      "  async syncState(",
      "    programId: PublicKey",
      "  ): Promise<VaultState> {",
      "    const info = await this.connection",
      "      .getAccountInfo(programId);",
      '    return this.coder.accounts.decode("VaultState", info.data);',
      "  }",
    ],
    tests: [
      "✓ test_websocket_account_subscribe (22ms)",
      "✓ test_borsh_zero_copy_decoder (11ms)",
      "✓ test_rpc_failover_recovery (31ms)",
      "✓ test_memory_cache_eviction (7ms)",
    ],
  },
];

export function AcademyIDE() {
  const [activeTab, setActiveTab] = useState("rust");
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(0);

  const sample = CODE_SAMPLES.find((s) => s.id === activeTab) ?? CODE_SAMPLES[0];

  function handleRun() {
    if (isRunning) return;
    setIsRunning(true);
    setProgress(0);
    setCompleted(0);
  }

  function switchTab(id: string) {
    setActiveTab(id);
    setProgress(0);
    setCompleted(0);
    setIsRunning(false);
  }

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 25;
        setCompleted(
          Math.min(
            Math.floor((next / 100) * sample.tests.length),
            sample.tests.length,
          ),
        );
        if (next >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return next;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [isRunning, sample.tests.length]);

  const allPassed = completed === sample.tests.length && !isRunning && progress === 100;

  return (
    <div className={`${SURFACE_CARD} overflow-hidden`}>
      {/* ── Title bar ── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--line)] bg-[var(--surface-2)]">
        {/* Traffic lights */}
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60 inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60 inline-block" />
          <span className="font-mono text-[10px] text-[var(--muted)] ml-2 hidden sm:inline">
            blockfuse-ide
          </span>
        </div>

        {/* File tabs */}
        <div className="flex items-center gap-0.5 rounded-lg bg-[var(--surface)] border border-[var(--line)] p-0.5">
          {CODE_SAMPLES.map((s) => (
            <button
              key={s.id}
              onClick={() => switchTab(s.id)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] transition-colors duration-150 ${
                activeTab === s.id
                  ? "bg-[var(--surface-3)] text-[var(--page-fg)]"
                  : "text-[var(--muted)] hover:text-[var(--page-fg)]"
              }`}
            >
              {/* Dot coloured per language */}
              <span
                className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                style={{ background: s.color }}
              />
              <span className="hidden sm:inline">{s.name}</span>
              <span className="sm:hidden">{s.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Code area ── */}
      <div className={`p-4 font-mono text-[11px] leading-relaxed overflow-x-auto min-h-[220px] bg-[var(--surface)] ${CUSTOM_SCROLL}`}>
        <table className="w-full border-collapse">
          <tbody>
            {sample.code.map((line, idx) => (
              <tr key={idx} className="hover:bg-[var(--line)]">
                <td className="pr-4 text-right select-none text-[var(--muted)] text-[10px] w-6 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre text-[var(--muted)] align-top">
                  {line.startsWith("//") || line.startsWith("/*") ? (
                    <span className="text-[var(--dim)] italic">{line}</span>
                  ) : line.match(
                      /#\[program\]|pub mod|pub fn|contract |function |async |export class/,
                    ) ? (
                    <span className="text-[var(--accent)]">{line}</span>
                  ) : line.match(/Result|Context|ReentrancyGuard|IERC20|Promise/) ? (
                    <span className="text-[var(--accent-soft)]">{line}</span>
                  ) : (
                    <span className="text-[var(--bright)]">{line}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Test runner ── */}
      <div className="p-4 border-t border-[var(--line)] bg-[var(--surface-2)] space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[var(--muted)] uppercase tracking-wider">
            Test Suite Verification
          </span>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] uppercase tracking-wider rounded-md border transition-colors duration-200 ${
              isRunning
                ? "bg-[var(--accent-dim)] text-[var(--accent)] border-[var(--accent-line)] cursor-wait"
                : "bg-[var(--card)] border-[var(--line-strong)] text-[var(--page-fg)] hover:border-[var(--accent-line)] hover:bg-[var(--accent-dim)]"
            }`}
          >
            {isRunning ? (
              <>
                <svg className="w-3 h-3 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56" />
                </svg>
                Testing… ({progress}%)
              </>
            ) : (
              <>
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
                Run Test Suite
              </>
            )}
          </button>
        </div>

        {/* Progress bar */}
        {isRunning && (
          <div className="w-full h-[2px] rounded-full bg-[var(--line)] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Test output */}
        <div className="rounded-xl bg-[var(--surface)] border border-[var(--line)] p-3 font-mono text-[10px] space-y-1.5">
          {sample.tests.map((test, i) => (
            <div
              key={test}
              className={`flex items-center gap-2 transition-colors duration-300 ${
                i < completed || allPassed
                  ? "text-emerald-500"
                  : "text-[var(--muted)] opacity-30"
              }`}
            >
              <svg
                className="w-3 h-3 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {test}
            </div>
          ))}

          {allPassed && (
            <div className="pt-2 mt-1 border-t border-[var(--line)] flex items-center gap-2 text-emerald-500 text-[9px] uppercase tracking-widest">
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              All {sample.tests.length} tests passed · Production ready
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
