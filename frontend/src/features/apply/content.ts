/**
 * Fees for each track, keyed by the same ids as the training page's
 * detailedPrograms and programGroups so curriculum and payment screens stay in
 * step. /apply renders these on the cards and in the track picker.
 *
 * NOTE: the fees here are for display only — the authoritative price and
 * installment split always come from the server at payment time.
 */
export interface ApplyTrack {
  id: string;
  title: string;
  duration: string;
  price: string;
  installments?: string;
}

export const applyTracks: ApplyTrack[] = [
  {
    id: "basic",
    title: "Basic Track",
    duration: "3 months",
    price: "₦100,000",
  },
  {
    id: "intermediate",
    title: "Intermediate Track",
    duration: "3 months",
    price: "₦100,000",
  },
  {
    id: "advanced",
    title: "Advanced Track",
    duration: "3 months",
    price: "₦100,000",
  },
  {
    id: "professional",
    title: "Professional Track",
    duration: "3 months",
    price: "₦100,000",
  },
  {
    id: "full-program",
    title: "Full-Program Bundle",
    duration: "12 months",
    price: "₦250,000",
  },
  {
    id: "blockchain",
    title: "Blockchain Engineering Track",
    duration: "6 months",
    price: "₦250,000",
    installments: "2 × ₦125,000",
  },
];

/** Duration, fee, and installment split per track, for the picker rows. */
export const applyFeesByTrack: Record<
  string,
  { duration: string; price: string; installments?: string }
> = Object.fromEntries(
  applyTracks.map((track) => [
    track.id,
    { duration: track.duration, price: track.price, installments: track.installments },
  ]),
);

/**
 * The headline for each program card, keyed by `programGroups` id. /apply is an
 * admissions page, so a card has to answer "how long, and what does it cost?"
 * before anyone opens the picker. Display only, as above.
 */
export const applyFeesByGroup: Record<string, string> = {
  "ai-software-engineering":
    "3 months per track · from ₦100,000 · 12-month bundle",
  "blockchain-engineering": "6 months · ₦250,000 · 2 × ₦125,000",
};
