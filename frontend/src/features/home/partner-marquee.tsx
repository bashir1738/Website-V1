import Image from "next/image";

type LogoKind = "word" | "mark" | "photo";

interface PartnerLogo {
  name: string;
  src: string;
  width: number;
  height: number;
  kind: LogoKind;
  /** White artwork — needs the dark tile to stay legible. */
  onDark?: boolean;
}

/**
 * Logos from public/Blockfuse_Partner_Logos (partners/).
 * SVGs are used where the pack ships one; rasters fall back to the source file.
 */
const PARTNER_LOGOS: PartnerLogo[] = [
  { name: "Ethereum Foundation", src: "/Blockfuse_Partner_Logos/partners/ethereum-foundation.svg", width: 121, height: 41, kind: "word", onDark: true },
  { name: "Base", src: "/Blockfuse_Partner_Logos/partners/base-2color.svg", width: 1280, height: 324, kind: "word" },
  { name: "The Graph", src: "/Blockfuse_Partner_Logos/partners/the-graph-dark.svg", width: 238, height: 56, kind: "word" },
  { name: "HackMD", src: "/Blockfuse_Partner_Logos/partners/hackmd.svg", width: 456, height: 95, kind: "word", onDark: true },
  { name: "Lisk", src: "/Blockfuse_Partner_Logos/partners/lisk-dark.svg", width: 265, height: 92, kind: "word" },
  { name: "Uniswap Foundation", src: "/Blockfuse_Partner_Logos/partners/uniswap-foundation.svg", width: 149, height: 35, kind: "word" },
  { name: "AfriVerse", src: "/Blockfuse_Partner_Logos/partners/afriverse.svg", width: 132, height: 32, kind: "word", onDark: true },
  { name: "Quai Network", src: "/Blockfuse_Partner_Logos/partners/quai-symbol.svg", width: 46, height: 46, kind: "mark" },
  { name: "Blip Pay", src: "/Blockfuse_Partner_Logos/partners/blip-pay-symbol.svg", width: 100, height: 100, kind: "mark" },
  { name: "AyaHQ", src: "/Blockfuse_Partner_Logos/partners/ayahq-symbol-white.svg", width: 28, height: 28, kind: "mark", onDark: true },
  { name: "Starknet Africa", src: "/Blockfuse_Partner_Logos/partners/starknet-africa.jpg", width: 3854, height: 3854, kind: "photo" },
  { name: "Superteam Nigeria", src: "/Blockfuse_Partner_Logos/partners/superteam-nigeria.jpg", width: 584, height: 584, kind: "photo" },
];

const TILE_DARK = "bg-[#14141c] ring-1 ring-white/10";
const TILE_LIGHT = "bg-white ring-1 ring-black/[0.06]";

const LOGO_SIZE: Record<LogoKind, string> = {
  word: "h-7 w-auto max-w-[8.5rem] object-contain sm:h-8 sm:max-w-[9.5rem]",
  mark: "h-9 w-auto max-w-[7rem] object-contain sm:h-10",
  photo: "h-11 w-auto max-w-[7.5rem] rounded-lg object-contain sm:h-12",
};

/** Infinite logo ticker for the partners section. Pauses on hover/focus. */
export function PartnerMarquee() {
  const loop = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] motion-reduce:[mask-image:none]">
      <div className="flex w-max animate-marquee items-center gap-4 [--marquee-duration:55s] [--marquee-gap:0.5rem] [will-change:transform] group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:[will-change:auto]">
        {loop.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            aria-hidden={index >= PARTNER_LOGOS.length || undefined}
            className={`flex h-14 shrink-0 items-center justify-center rounded-xl px-5 sm:h-16 sm:px-6 ${
              logo.onDark ? TILE_DARK : TILE_LIGHT
            }`}
          >
            <Image
              src={logo.src}
              alt={`${logo.name} logo`}
              width={logo.width}
              height={logo.height}
              unoptimized={logo.src.endsWith(".svg")}
              className={LOGO_SIZE[logo.kind]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
