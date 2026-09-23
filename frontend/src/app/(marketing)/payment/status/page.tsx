"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { PageHero, PageShell } from "@/components/ui/page-hero";
import { ApiError, postJson } from "@/lib/api";
import { forms } from "@/lib/forms";
import { peekPendingPayment, takePendingPayment } from "@/lib/paystack";

type State =
  | { status: "verifying"; title: string; body: string }
  | { status: "done"; paid: boolean; title: string; body: string };

function formKeyHint(): "program" | "sponsor" {
  const pending = peekPendingPayment();
  return pending?.formKey === "sponsor" ? "sponsor" : "program";
}

function PaymentStatusInner() {
  const params = useSearchParams();
  const reference = params.get("reference") || "";

  const [state, setState] = useState<State>(() => {
    const spec = forms[formKeyHint()];
    if (!reference) {
      return {
        status: "done",
        paid: false,
        title: "No payment link",
        body: "This page needs a payment reference. If you were in the middle of paying, go back and submit the form again.",
      };
    }
    return { status: "verifying", title: spec.successTitle, body: spec.successBody };
  });

  useEffect(() => {
    // Consume the in-flight payment marker once (title/body were derived from it
    // during the state initializer; this just records that the visit happened).
    takePendingPayment();
    if (!reference) return;

    let cancelled = false;
    (async () => {
      try {
        const data = (await postJson("/payments/verify", { reference })) as
          | { paid?: boolean }
          | undefined;
        if (cancelled) return;
        if (data?.paid) {
          setState((prev) => ({ ...prev, status: "done", paid: true }));
        } else {
          setState((prev) => ({
            ...prev,
            status: "done",
            paid: false,
            body: "We couldn't confirm the payment on this attempt. If you were charged, rest assured it's being confirmed and your submission is saved.",
          }));
        }
      } catch (err) {
        if (cancelled) return;
        if (err instanceof ApiError) {
          if (err.status === 402) {
            setState((prev) => ({
              ...prev,
              status: "done",
              paid: false,
              body: "Your payment wasn't completed, so your submission is still marked as unpaid. You can go back and submit again.",
            }));
          } else if (err.status === 404) {
            setState({
              status: "done",
              paid: false,
              title: "No matching submission",
              body: "We couldn't match this payment to a submission. Please contact hello@blockfuselabs.com if you believe this is a mistake.",
            });
          } else {
            setState((prev) => ({
              ...prev,
              status: "done",
              paid: false,
              body: "We couldn't confirm your payment right now. If you were charged, your submission is saved and will be confirmed shortly.",
            }));
          }
        } else {
          setState((prev) => ({
            ...prev,
            status: "done",
            paid: false,
            body: "We couldn't reach the payment service. Give it a moment and revisit this page, or contact hello@blockfuselabs.com.",
          }));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <PageShell>
      <div className="max-w-[620px]">
        <PageHero
          eyebrow={state.status === "verifying" ? "Checking payment" : "Payment"}
          title={state.status === "verifying" ? "Confirming your payment…" : state.title}
        />
        <p className="mt-5 max-w-[56ch] text-[17px] leading-relaxed text-[var(--muted)]">
          {state.body}
        </p>

        {state.status === "done" && (
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/" className="btn-primary">
              Back to home
            </Link>
            <a href="mailto:hello@blockfuselabs.com" className="btn-ghost">
              Contact us
            </a>
          </div>
        )}
      </div>
    </PageShell>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense>
      <PaymentStatusInner />
    </Suspense>
  );
}