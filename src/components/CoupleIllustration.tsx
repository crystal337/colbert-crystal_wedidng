export function CoupleIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 190"
      fill="none"
      className={className}
      role="img"
      aria-label="Illustration of the couple"
    >
      <g stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round">
        {/* heart above the couple */}
        <path d="M120 8c-9-11-26-6-26 6 0 10 15 18 26 27 11-9 26-17 26-27 0-12-17-17-26-6Z" />

        {/* joined hands */}
        <path d="M96 118c8-6 18-9 24-9s16 3 24 9" />

        {/* groom */}
        <circle cx="82" cy="42" r="16" />
        <path d="M82 58v6" />
        <path d="M62 108c0-24 4-38 20-38s20 14 20 38l6 44H56l6-44Z" />
        <path d="M82 70v40" />
        <path d="M74 78l8 6 8-6" />

        {/* bride */}
        <path d="M138 34c8-14 28-14 36 0" />
        <circle cx="156" cy="42" r="15" />
        <path d="M156 57v6" />
        <path d="M132 118c2-26 8-40 24-40s22 14 24 40l10 34H122l10-34Z" />
        <path d="M144 108c8 6 20 6 28 0" />
      </g>
    </svg>
  );
}
