import { motion } from 'framer-motion';
import { content } from '../content';
import { CoupleIllustration } from './CoupleIllustration';
import { BiText } from './BiText';

export function PassportCover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1.1, ease: 'easeOut' }}
      className="flex min-h-svh w-full flex-col items-center justify-center px-6 py-8"
    >
      <div className="relative w-full max-w-[22rem] sm:max-w-sm">
        <div className="relative flex aspect-[5/7] w-full flex-col items-center justify-between rounded-2xl border border-passport-gold/40 bg-passport-green px-6 pt-8 pb-20 text-passport-gold shadow-[0_20px_60px_-15px_rgba(10,36,25,0.6)]">
          {/* faux leather sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_15%,rgba(232,207,156,0.15),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-[10px] rounded-xl border border-passport-gold/25" />

          <div className="relative z-10 flex flex-col items-center gap-1 pt-2 text-center">
            <span className="font-body-en text-[0.65rem] tracking-[0.35em] opacity-90">
              {content.cover.topLine.en.toUpperCase()} · {content.cover.topLine.zh}
            </span>
            <span className="mt-3 font-body-en text-xs font-semibold tracking-[0.5em] opacity-90">
              {content.cover.passportLabel.en}
            </span>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 text-center">
            <h1 className="font-serif-en px-2 text-2xl leading-snug font-medium tracking-wide sm:text-3xl">
              {content.cover.title}
            </h1>
            <CoupleIllustration className="h-28 w-auto text-passport-gold sm:h-32" />
          </div>
        </div>

        <motion.button
          type="button"
          onClick={onOpen}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full bg-passport-gold px-10 py-3 text-passport-green shadow-lg shadow-passport-gold/30"
        >
          <BiText
            text={content.cover.openButton}
            className="leading-tight"
            zhClassName="text-lg font-semibold"
            enClassName="text-[0.7rem] not-italic tracking-[0.2em] uppercase opacity-80"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
