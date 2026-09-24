/**
 * Shared Tailwind utility class strings.
 * These replace the old hand-written CSS component classes — every value is a
 * Tailwind utility (or arbitrary value) so the platform styles live in markup.
 */

/* ─── Typography helpers ─── */
export const FONT_HEADING = "font-heading";
export const FONT_MONO = "font-mono";

export const EYEBROW =
  "inline-block font-mono text-[0.656rem] font-medium uppercase tracking-[0.22em] text-(--accent)";

export const BF_H2 =
  "max-w-[20ch] font-heading text-[clamp(2.15rem,4.8vw,3.75rem)] font-bold leading-none tracking-[-0.05em]";

export const BF_PROSE =
  "grid gap-[1.15rem] max-w-[56ch] text-[clamp(1rem,1.25vw,1.1rem)] leading-[1.75] text-(--muted)";

export const BF_EYEBROW_LIGHT = "text-[#e6c2f7]";

/* ─── Buttons ───
 * Shared action palette: all CTAs paint with --action-bg / --action-hover
 * (matches the Choose-your-path band). */
const BTN_BASE =
  "inline-flex items-center justify-center gap-[0.5625rem] h-[3.125rem] px-7 text-[0.906rem] font-semibold text-white bg-(--action-bg) border border-(--action-bg) rounded-full cursor-pointer shadow-none transition-[transform,background-color,border-color,box-shadow] duration-200 no-underline whitespace-nowrap hover:bg-(--action-hover) hover:text-white hover:border-(--action-hover) hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--accent) disabled:cursor-not-allowed disabled:opacity-60 disabled:transform-none";

export const BTN_PRIMARY = BTN_BASE;

export const BTN_SECONDARY = `${BTN_BASE} backdrop-blur-[12px]`;

export const BTN_CONTRAST =
  "inline-flex items-center justify-center gap-2 h-[2.875rem] px-6 rounded-full bg-(--action-bg) text-white border border-(--action-bg) text-[0.844rem] font-semibold cursor-pointer whitespace-nowrap transition-transform duration-200 hover:bg-(--action-hover) hover:text-white hover:border-(--action-hover) hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--accent)";

export const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 h-[2.875rem] px-6 rounded-full bg-(--action-bg) border border-(--action-bg) text-white text-[0.844rem] font-semibold cursor-pointer whitespace-nowrap transition-[transform,background-color] duration-200 hover:bg-(--action-hover) hover:text-white hover:border-(--action-hover) hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--accent)";

/** Underlined inline action (link variant). */
export const LINK_ACTION =
  "inline-flex items-center gap-[0.4375rem] text-[0.813rem] font-semibold text-(--page-fg) cursor-pointer pb-0.5 border-b border-(--accent-line) transition-[gap] duration-200 no-underline hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-(--accent)";

export const BTN_ARROW = "h-4 w-4 transition-transform duration-[250ms] ease group-hover:translate-x-[3px]";

export const ARROW_ICON =
  "h-4 w-4 transition-transform duration-[250ms] ease group-hover:translate-x-[3px]";

/* Header Apply CTA + admin logo chip share the action palette. */
export const ACTION_COLOR =
  "bg-(--action-bg) text-white border-(--action-bg) hover:bg-(--action-hover) hover:text-white hover:border-(--action-hover)";

/* Ghost-on-violet CTA (events hero, band sections). */
export const BF_ON_DARK_BTN =
  "border-[rgba(255,255,255,0.4)]! bg-[rgba(255,255,255,0.06)]! text-white! backdrop-blur-[10px] hover:bg-[rgba(255,255,255,0.14)]! hover:border-[rgba(255,255,255,0.6)]!";

/* ─── Final CTA banner (engineering, training, prodfest) ───
 * Full-bleed image with a vertical dark gradient overlay. */
export const CTA_BANNER =
  "relative isolate overflow-hidden mx-auto max-w-[1240px] rounded-[2rem] bg-[#0d0d13] text-white after:content-[''] after:absolute after:inset-0 after:-z-[1] after:bg-[linear-gradient(180deg,rgba(13,13,19,0.45)_0%,rgba(13,13,19,0.6)_52%,rgba(13,13,19,0.8)_100%)]";
export const CTA_BANNER_MEDIA = "absolute inset-0 -z-[2]";
export const CTA_BANNER_MEDIA_PIC =
  "object-cover object-[center_35%] saturate-50 contrast-[1.05]";
export const CTA_BANNER_INNER =
  "relative z-[2] py-[clamp(3.5rem,8vw,6.5rem)] px-[clamp(1.5rem,5vw,5rem)] text-center";
export const CTA_BANNER_H2 =
  "max-w-[18ch] mt-5 mx-auto font-heading text-[clamp(2.35rem,5.6vw,4.5rem)] font-bold leading-[0.98] tracking-[-0.05em] text-white";
export const CTA_BANNER_P =
  "max-w-[48ch] mt-7 mx-auto text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.7] text-[rgba(255,255,255,0.76)]";
export const CTA_BANNER_ACTIONS = "flex flex-wrap justify-center gap-4 mt-10";

/* ─── Forms ─── */
export const FIELD_LABEL =
  "flex items-center gap-[0.4375rem] text-xs font-semibold tracking-[0.02em] text-(--bright) mb-[0.5625rem]";

export const FIELD_INPUT =
  "w-full rounded-xl border border-(--line-strong) bg-(--card) text-(--page-fg) text-[1rem] sm:text-[0.875rem] transition-[border-color,background-color] duration-200 h-[2.875rem] px-[0.9375rem] focus:outline-none focus:border-[rgba(191,100,231,0.6)] data-[invalid=true]:border-[rgba(248,113,113,0.55)]";

export const FIELD_SELECT =
  "w-full rounded-xl border border-(--line-strong) bg-(--card) text-(--page-fg) text-[1rem] sm:text-[0.875rem] transition-[border-color,background-color] duration-200 h-[2.875rem] px-[0.9375rem] appearance-none pr-9 bg-[linear-gradient(45deg,transparent_50%,var(--muted)_50%),linear-gradient(135deg,var(--muted)_50%,transparent_50%)] bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-18px)_50%,calc(100%-13px)_50%] bg-no-repeat focus:outline-none focus:border-[rgba(191,100,231,0.6)] data-[invalid=true]:border-[rgba(248,113,113,0.55)]";

export const FIELD_TEXTAREA =
  "w-full rounded-xl border border-(--line-strong) bg-(--card) text-(--page-fg) text-[1rem] sm:text-[0.875rem] transition-[border-color,background-color] duration-200 py-[0.8125rem] px-[0.9375rem] leading-[1.55] resize-y focus:outline-none focus:border-[rgba(191,100,231,0.6)] data-[invalid=true]:border-[rgba(248,113,113,0.55)] custom-scroll";

export const FIELD_FILE =
  "flex items-center gap-[0.875rem] h-[2.875rem] px-[0.9375rem] rounded-xl border border-dashed border-(--line-strong) bg-(--card) text-(--dim) text-[0.813rem] cursor-pointer transition-[border-color,color] duration-200 hover:border-[rgba(191,100,231,0.5)] hover:text-(--bright) data-[invalid=true]:border-[rgba(248,113,113,0.55)]";

export const FIELD_ERROR =
  "mt-1 text-xs leading-[1.45] text-[#f87171]";

export const CHIP =
  "px-[0.875rem] py-2 rounded-full border border-(--line-strong) bg-(--card) text-[0.781rem] text-(--muted) cursor-pointer transition-[border-color,color,background-color] duration-100 hover:border-[rgba(191,100,231,0.55)] hover:text-(--page-fg) hover:bg-(--accent-dim) data-[selected=true]:border-[rgba(191,100,231,0.6)] data-[selected=true]:bg-(--accent-dim) data-[selected=true]:text-(--page-fg)";

/* ─── Surfaces ─── */
export const SURFACE_CARD =
  "bg-(--card) backdrop-blur-[14px] border border-(--line) rounded-[20px] shadow-(--shadow-card) transition-[border-color,transform,background-color] duration-300 hover:bg-(--card-hover) hover:border-(--accent-line)";

export const SURFACE_CARD_ACCENT =
  "hover:shadow-[0_10px_28px_-20px_rgba(191,100,231,0.22)]";

export const GLASS =
  "bg-(--card) backdrop-blur-[20px] border border-(--line)";

export const CARD_RULED = "relative overflow-hidden";

export const FEATURE_PANEL =
  "relative overflow-hidden border border-(--accent-line) rounded-[22px] bg-[linear-gradient(150deg,rgba(191,100,231,0.16),rgba(78,46,245,0.1)_60%,var(--card))]";

export const HAIRLINE_GRID =
  "grid gap-px bg-(--line) border border-(--line) rounded-[22px] overflow-hidden";

export const HAIRLINE_CELL =
  "bg-(--panel-fill) backdrop-blur-[14px] transition-[background-color] duration-300 hover:bg-(--panel-fill-hover)";

export const ROW_LIST = "border border-(--line) rounded-[20px] overflow-hidden";
export const ROW_LIST_ITEM =
  "border-b border-(--line) bg-(--panel-fill) transition-[background-color] duration-[250ms] last:border-b-0 hover:bg-(--panel-fill-hover)";

export const STATUS_PILL =
  "inline-flex items-center gap-[0.5625rem] py-[0.375rem] pr-[0.875rem] pl-2 border border-(--line-strong) rounded-full bg-(--card) backdrop-blur-[12px]";

export const STATUS_PILL_DOT =
  "w-[7px] h-[7px] rounded-full bg-[#34d399] shadow-[0_0_10px_#34d399] ml-[5px]";

export const STATUS_PILL_LABEL =
  "font-mono text-[0.656rem] uppercase tracking-[0.14em] text-(--bright)";

export const MONO_TAG =
  "inline-flex items-center font-mono text-[0.594rem] font-medium uppercase tracking-[0.14em] border border-(--line-strong) rounded-full px-[0.625rem] py-1 text-(--muted)";

export const MONO_TAG_ACCENT = "text-(--accent) border-(--accent-line)";

export const CHECK_ACCENT = "text-(--accent)";

/* ─── Step number watermark ─── */
export const STEP_NUMBER =
  "font-heading text-[8rem] font-extrabold leading-none text-(--line) absolute right-[1.5rem] top-1/2 -translate-y-1/2 pointer-events-none select-none";

/* ─── Custom scroll region ─── */
export const CUSTOM_SCROLL = "custom-scroll";
