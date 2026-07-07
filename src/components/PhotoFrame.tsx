export function PhotoFrame({ src, alt, className = '' }: { src?: string; alt: string; className?: string }) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm border-2 border-passport-gold/70 bg-passport-gold/10 shadow-inner ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-passport-green/40">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="M21 16l-5.5-5.5L9 17" />
          </svg>
          <span className="font-body-en text-[0.65rem] uppercase tracking-[0.2em]">Photo</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 border border-white/40" />
    </div>
  );
}
