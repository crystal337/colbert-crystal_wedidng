// Two upright figures standing together — a simple, hand-drawn feel matching
// the passport-cover sketch. Groom (left) in a suit, bride (right) in a dress.
export function CoupleIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 180"
      fill="none"
      className={className}
      role="img"
      aria-label="Colbert and Crystal"
    >
      <g stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        {/* ── Groom (left) ── */}
        {/* head */}
        <circle cx="82" cy="48" r="20" />
        {/* short hair */}
        <path d="M63 44c1-15 9-24 19-24s18 9 19 24" />
        {/* shoulders + suit body */}
        <path d="M50 162c0-40 8-70 32-70s32 30 32 70" />
        {/* collar + lapel */}
        <path d="M82 92l-9 13 9 7 9-7-9-13" />
        <path d="M82 119v34" />

        {/* ── Bride (right) ── */}
        {/* head */}
        <circle cx="144" cy="50" r="19" />
        {/* long hair framing the face */}
        <path d="M125 50c-2-19 8-29 19-29s21 10 19 29" />
        <path d="M126 52c-4 18-3 34 1 46" />
        <path d="M162 52c4 18 3 34-1 46" />
        {/* dress: gently flaring skirt */}
        <path d="M116 164c1-34 10-66 28-66s27 32 28 66" />
        <path d="M116 164q28 8 56 0" />
      </g>
    </svg>
  );
}
