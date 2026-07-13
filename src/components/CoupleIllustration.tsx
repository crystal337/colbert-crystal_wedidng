// Elegant, hand-drawn line art: the bride resting her head on the groom's
// shoulder, with her hair flowing down — two "cameo" busts nestled together.
export function CoupleIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      className={className}
      role="img"
      aria-label="Colbert and Crystal"
    >
      <g stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        {/* groom — head + shoulder */}
        <circle cx="72" cy="58" r="25" />
        <path d="M34 156C38 111 54 96 72 96c14 0 26 9 33 24" />

        {/* bride — head tilted onto his shoulder */}
        <g transform="rotate(-12 116 100)">
          <circle cx="116" cy="100" r="21" />
          <path d="M96 170c2-37 10-49 20-49 13 0 25 12 30 40" />
        </g>

        {/* her flowing hair */}
        <path d="M132 92c17 18 19 56 8 92" />
      </g>
    </svg>
  );
}
