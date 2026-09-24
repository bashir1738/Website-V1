/**
 * Paystack Inline (embedded popup — no page redirect).
 *
 * The public key and amount are never hard-coded here: they come from the
 * server's submit response, which sets the authoritative price server-side.
 */

interface PaystackResponse {
  reference: string;
  trans?: string;
  status?: string;
  message?: string;
}

interface PaystackPop {
  setup(options: {
    key: string;
    email: string;
    amount: number;
    ref: string;
    currency?: string;
    callback: (response: PaystackResponse) => void;
    onClose: () => void;
  }): void;
}

declare global {
  interface Window {
    PaystackPop?: PaystackPop;
  }
}

const INLINE_SRC = "https://js.paystack.co/v1/inline.js";

let scriptPromise: Promise<PaystackPop> | null = null;

/** Load Paystack Inline once; resolves with the popup API. */
export function loadPaystack(): Promise<PaystackPop> {
  if (window.PaystackPop) return Promise.resolve(window.PaystackPop);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = INLINE_SRC;
    script.async = true;
    script.onload = () => {
      if (window.PaystackPop) resolve(window.PaystackPop);
      else reject(new Error("Paystack loads but PaystackPop is unavailable."));
    };
    script.onerror = () => {
      scriptPromise = null;
      reject(
        new Error("We couldn't load the payment widget. Check your connection and try again."),
      );
    };
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export interface PaystackCharge {
  publicKey: string;
  email: string;
  /** Kobo. */
  amountKobo: number;
  /** Server-generated reference that must be passed back for verification. */
  reference: string;
}

export type PaystackResult = "paid" | "cancelled";

/**
 * Open the embedded Paystack popup. Resolves "paid" once the popup's callback
 * fires, "cancelled" if the user closes the widget without paying, and rejects
 * only on real failures (widget unavailable / setup crash).
 */
export async function payWithPaystack(charge: PaystackCharge): Promise<PaystackResult> {
  const pop = await loadPaystack();

  return new Promise<PaystackResult>((resolve, reject) => {
    try {
      pop.setup({
        key: charge.publicKey,
        email: charge.email,
        amount: charge.amountKobo,
        ref: charge.reference,
        currency: "NGN",
        callback: (response) => {
          if (response.reference) resolve("paid");
          else reject(new Error("Payment reference is missing from the Paystack response."));
        },
        onClose: () => resolve("cancelled"),
      });
    } catch (err) {
      reject(err instanceof Error ? err : new Error("Could not start the payment widget."));
    }
  });
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