import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { content } from '../content';
import { StampIcon } from './StampIcon';
import { PhotoFrame } from './PhotoFrame';

type Spread = {
  stamp: (typeof content.stamps)['met'];
  photoSrc?: string;
  photoAlt: string;
  rotate: number;
};

const spreads: Spread[] = [
  { stamp: content.stamps.met, photoAlt: 'Colbert and Crystal — where we met', rotate: -7 },
  { stamp: content.stamps.together, photoAlt: 'Colbert and Crystal — together forever', rotate: 5 },
];

const FLIP_DELAY_MS = 2200;
const DONE_DELAY_MS = 2000;

export function PassportBook({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const toNext = setTimeout(() => setIndex(1), FLIP_DELAY_MS);
    return () => clearTimeout(toNext);
  }, []);

  useEffect(() => {
    if (index !== spreads.length - 1) return;
    const finish = setTimeout(onDone, DONE_DELAY_MS);
    return () => clearTimeout(finish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const spread = spreads[index];

  return (
    <motion.div
      initial={{ opacity: 0, rotateY: 90, scale: 0.92 }}
      animate={{ opacity: 1, rotateY: 0, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{ perspective: 1400 }}
      className="mx-auto w-full max-w-2xl px-4 pt-10 sm:pt-14"
    >
      <div className="relative mx-auto aspect-[3/2] w-full rounded-lg border border-passport-gold/50 bg-passport-green p-2 shadow-[0_25px_50px_-20px_rgba(10,36,25,0.5)] sm:aspect-[16/10]">
        <div
          className="relative flex h-full w-full overflow-hidden rounded-md bg-cream"
          style={{ perspective: 1400 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, rotateY: -70 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: 70 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              style={{ transformOrigin: 'center', transformStyle: 'preserve-3d' }}
              className="grid h-full w-full grid-cols-2"
            >
              {/* left page */}
              <div className="relative flex flex-col items-center justify-center gap-2 border-r border-dashed border-passport-green/30 p-4 sm:p-6">
                <div
                  className="pointer-events-none absolute inset-2 rounded border border-passport-green/15"
                  aria-hidden
                />
                <StampIcon label={spread.stamp} rotate={spread.rotate} className="w-24 sm:w-32" />
              </div>

              {/* right page */}
              <div className="relative flex items-center justify-center p-4 sm:p-6">
                <div
                  className="pointer-events-none absolute inset-2 rounded border border-passport-green/15"
                  aria-hidden
                />
                <PhotoFrame src={spread.photoSrc} alt={spread.photoAlt} className="max-w-[9rem] sm:max-w-[10rem]" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* spine shadow */}
          <div className="pointer-events-none absolute inset-y-0 left-1/2 w-6 -translate-x-1/2 bg-[linear-gradient(to_right,rgba(10,36,25,0.12),transparent_40%,transparent_60%,rgba(10,36,25,0.12))]" />
        </div>
      </div>

      <div className="mt-3 flex justify-center gap-2">
        {spreads.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? 'bg-passport-gold' : 'bg-passport-gold/30'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}
