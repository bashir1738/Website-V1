/**
 * Paystack Standard Checkout (redirect flow — no embedded popup).
 *
 * After the server creates the transaction, the visitor is redirected to the
 * Paystack-hosted checkout (`authorizationUrl`). Paystack sends them back to
 * the site's `/payment/status?...` callback, which verifies server-side. The
 * public key and amount are never hard-coded here: they come from the server's
 * submit response, which sets the authoritative price server-side.
 */

export interface PaystackCharge {
  publicKey: string;
  email: string;
  /** Kobo. */
  amountKobo: number;
  /** Server-generated reference that must be passed back for verification. */
  reference: string;
  /** Paystack-hosted checkout page the visitor is redirected to. */
  authorizationUrl: string;
}

/**
 * Send the visitor to Paystack's hosted checkout. The page navigates away; the
 * site is re-entered at `/payment/status` via the callback URL.
 */
export function redirectToCheckout(charge: PaystackCharge): void {
  window.location.assign(charge.authorizationUrl);
}

/**
 * Remember the in-flight payment so the callback page can show the right
 * message and map back to the submission. Keyed by the Paystack reference.
 */
export function savePendingPayment(reference: string, formKey: string): void {
  try {
    sessionStorage.setItem(
      "blockfuse-pending-payment",
      JSON.stringify({ reference, formKey, startedAt: Date.now() }),
    );
  } catch {
    // sessionStorage unavailable (private mode) — the callback page still works
    // off the `reference` in the URL.
  }
}

/** Read the pending-payment marker without clearing it. */
export function peekPendingPayment(): { reference: string; formKey: string } | null {
  try {
    const raw = sessionStorage.getItem("blockfuse-pending-payment");
    return raw ? (JSON.parse(raw) as { reference: string; formKey: string }) : null;
  } catch {
    return null;
  }
}

/** Read and clear the pending-payment marker. */
export function takePendingPayment(): { reference: string; formKey: string } | null {
  const pending = peekPendingPayment();
  if (pending) {
    try {
      sessionStorage.removeItem("blockfuse-pending-payment");
    } catch {
      // ignore
    }
  }
  return pending;
}