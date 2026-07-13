import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { useLang } from '../i18n';
import { playChime } from '../lib/chime';

const bp = content.boardingPass;

// A deterministic barcode built from the guest's name so each pass looks unique.
function Barcode({ seed }: { seed: string }) {
  const codes = (seed || 'GUEST').split('').map((c) => c.charCodeAt(0));
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  for (let i = 0; i < 48; i++) {
    const base = codes[i % codes.length];
    const w = 1 + ((base * (i + 3)) % 4);
    const gap = 1 + ((base + i) % 2);
    bars.push({ x, w });
    x += w + gap;
  }
  return (
    <svg viewBox={`0 0 ${x} 40`} preserveAspectRatio="none" className="h-11 w-full" aria-hidden>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={40} fill="#123526" />
      ))}
    </svg>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-body-en text-[0.55rem] tracking-[0.15em] text-passport-green/50 uppercase">
        {label}
      </div>
      <div className="font-body-en mt-0.5 text-sm font-semibold text-ink">{value}</div>
    </div>
  );
}

export function BoardingPass({ name }: { name: string }) {
  const { t } = useLang();
  const passenger = (name || t(bp.fallbackName)).toUpperCase();

  useEffect(() => {
    playChime();
  }, []);

  return (
    <section className="mx-auto w-full max-w-sm px-4 pt-10">
      {/* slot the pass "prints" out of */}
      <div style={{ perspective: 1200 }}>
        <motion.div
          initial={{ y: 260, opacity: 0, rotateX: 10 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ type: 'spring', stiffness: 70, damping: 15, delay: 0.15 }}
          style={{ transformOrigin: 'top center' }}
          className="relative overflow-hidden rounded-3xl bg-[#fffdf8] shadow-[0_30px_60px_-20px_rgba(10,36,25,0.45)]"
        >
          {/* header band */}
          <div className="flex items-center justify-between bg-passport-green px-6 py-4 text-cream">
            <div>
              <p className="font-body-en text-sm font-bold tracking-[0.2em]">{bp.title}</p>
              <p className="font-serif-en text-xs text-cover-gold italic">{t(bp.subtitle)}</p>
            </div>
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-cover-gold" fill="currentColor" aria-hidden>
              <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z" />
            </svg>
          </div>

          {/* route */}
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="text-left">
              <div className="font-serif-en text-3xl font-semibold text-passport-green">{bp.fromCode}</div>
              <div className="text-xs text-ink/60">{t(bp.fromCity)}</div>
            </div>
            <div className="flex flex-1 items-center px-3 text-cover-gold">
              <span className="h-px flex-1 bg-cover-gold/40" />
              <svg viewBox="0 0 24 24" className="mx-1 h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5L21 16Z" />
              </svg>
              <span className="h-px flex-1 bg-cover-gold/40" />
            </div>
            <div className="text-right">
              <div className="font-serif-en text-3xl font-semibold text-passport-green">{bp.toCode}</div>
              <div className="text-xs text-ink/60">{t(bp.toCity)}</div>
            </div>
          </div>

          {/* passenger */}
          <div className="mt-5 px-6">
            <div className="font-body-en text-[0.55rem] tracking-[0.15em] text-passport-green/50 uppercase">
              {bp.passengerLabel}
            </div>
            <div className="font-serif-en truncate text-xl font-semibold text-ink">{passenger}</div>
          </div>

          {/* details grid */}
          <div className="mt-4 grid grid-cols-3 gap-y-4 px-6 pb-6">
            <Field label={bp.labels.flight} value={bp.flight} />
            <Field label={bp.labels.date} value={bp.date} />
            <Field label={bp.labels.boarding} value={bp.boardingTime} />
            <Field label={bp.labels.gate} value={t(bp.gate)} />
            <Field label={bp.labels.seat} value={t(bp.seat)} />
          </div>

          {/* perforation / tear line */}
          <div className="relative">
            <div className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-cream" />
            <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-cream" />
            <div className="mx-5 border-t-2 border-dashed border-passport-green/25" />
          </div>

          {/* barcode footer */}
          <div className="px-6 pt-5 pb-6">
            <Barcode seed={passenger} />
            <p className="mt-2 text-center text-[0.65rem] tracking-wide text-ink/50">{t(bp.note)}</p>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 text-center text-xs text-passport-green/60"
      >
        {t(bp.shareHint)}
      </motion.p>
    </section>
  );
}
