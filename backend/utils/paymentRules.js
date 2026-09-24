const { INSTALLMENT_RATIO, INSTALLMENT_2_DUE_AFTER_WEEKS } = require('../config/tracks');

const addWeeks = (date, weeks) => {
  const d = new Date(date);
  d.setDate(d.getDate() + 7 * weeks);
  return d;
};

const startOfDay = (date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

/**
 * Authoritative amount due for a given track + installment, in naira.
 * Installment tracks split the full price evenly (e.g. Blockchain 2 × 50%).
 */
const dueAmountFor = (track, installmentNumber) => {
  if (!track || !track.price) return 0;
  if (track.total_installments > 1) {
    return Math.round(Number(track.price) * INSTALLMENT_RATIO);
  }
  return Number(track.price);
};

/**
 * Date (local midnight) from which the next Blockchain installment becomes
 * due. Requires the applicant's program start date; falls back to null when
 * it has not been assigned yet.
 */
const installment2DueDateFor = (applicant) => {
  if (!applicant.program_start_date) return null;
  return addWeeks(applicant.program_start_date, INSTALLMENT_2_DUE_AFTER_WEEKS);
};

/**
 * Decide whether an applicant may upload proof right now, and for which
 * installment. Enforces the flow rules:
 *   • block a second upload while any payment is pending_review,
 *   • allow re-upload only after a rejection,
 *   • installment 2 (Blockchain) is only available once installment 1 is
 *     verified AND the due date (start + 8 weeks) has passed.
 *
 * @returns {{ allowed: boolean, reason?: string, installmentNumber?: number, amount?: number, dueDate?: Date|null }}
 */
const uploadWindowFor = ({ applicant, track, payments }) => {
  const pending = (payments || []).find((p) => p.status === 'pending_review');
  if (pending) {
    return {
      allowed: false,
      reason: 'You already have a transfer proof awaiting verification. Please wait for the review to finish.',
    };
  }

  if (!track) {
    return {
      allowed: false,
      reason: 'This application is not tied to a current track. Contact us to continue the payment step.',
    };
  }

  const rejected = (payments || []).filter((p) => p.status === 'rejected');
  const latestVerified = (payments || [])
    .filter((p) => p.status === 'verified')
    .sort((a, b) => b.installment_number - a.installment_number)[0];

  const totalInstallments = track.total_installments || 1;

  // Single full payment (all tracks except Blockchain).
  if (totalInstallments === 1) {
    if (latestVerified) {
      return { allowed: false, reason: 'Your payment has already been verified.' };
    }
    if (rejected.length > 0) {
      return {
        allowed: true,
        installmentNumber: 1,
        amount: dueAmountFor(track, 1),
        rejectedPrior: true,
      };
    }
    return {
      allowed: true,
      installmentNumber: 1,
      amount: dueAmountFor(track, 1),
    };
  }

  // Installment flow (Blockchain Engineering).
  const install1 = (payments || []).find((p) => p.installment_number === 1);
  if (!install1 || install1.status !== 'verified') {
    // First installment not yet verified — may upload/re-upload installment 1.
    return {
      allowed: true,
      installmentNumber: 1,
      amount: dueAmountFor(track, 1),
      rejectedPrior: install1 ? install1.status === 'rejected' : false,
    };
  }

  // Installment 1 verified → next window is installment 2, once due.
  const dueDate = installment2DueDateFor(applicant);
  if (!dueDate) {
    return {
      allowed: false,
      reason: 'Installment 2 opens after your program start date is set. We will notify you when it becomes due.',
    };
  }
  const now = startOfDay(new Date());
  const isDue = now >= startOfDay(dueDate);
  if (!isDue) {
    return {
      allowed: false,
      reason: `Installment 2 (50%) is not due yet. It opens after week 8 of the program (${dueDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}).`,
      installmentNumber: 2,
      amount: dueAmountFor(track, 2),
      dueDate,
    };
  }

  const install2 = (payments || []).find((p) => p.installment_number === 2);
  if (install2 && install2.status === 'verified') {
    return { allowed: false, reason: 'Both installments have been verified. You are fully enrolled.' };
  }

  return {
    allowed: true,
    installmentNumber: 2,
    amount: dueAmountFor(track, 2),
    dueDate,
  };
};

module.exports = {
  dueAmountFor,
  installment2DueDateFor,
  uploadWindowFor,
};