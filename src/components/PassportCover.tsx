import { motion } from 'framer-motion';
import { content } from '../content';
import { CoupleIllustration } from './CoupleIllustration';
import { BiText } from './BiText';
import { useLang, serifFor } from '../i18n';

export function PassportCover({ onOpen }: { onOpen: () => void }) {
  const { lang, t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 1.4, ease: 'easeOut' }}
      className="flex min-h-svh w-full flex-col items-center justify-center px-6 py-8"
    >
      <div className="relative w-full max-w-[21rem] sm:max-w-[22rem]">
        {/* passport cover */}
        <div className="relative flex aspect-[5/7] w-full flex-col items-center rounded-2xl border border-passport-gold/40 bg-passport-green px-7 pt-9 pb-16 text-passport-gold shadow-[0_20px_60px_-15px_rgba(10,36,25,0.6)]">
          {/* faux leather sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_15%,rgba(232,207,156,0.15),transparent_55%)]" />
          {/* inner gold frame */}
          <div className="pointer-events-none absolute inset-[12px] rounded-xl border border-passport-gold/30" />

          <div className="relative z-10 flex h-full w-full flex-col items-center">
            {/* PASSPORT / 護照 */}
            <h1 className={`${serifFor(lang)} text-3xl font-semibold tracking-[0.25em] sm:text-4xl`}>
              {t(content.cover.passportWord)}
            </h1>

            {/* the marriage… subtitle */}
            <BiText
              text={content.cover.subtitle}
              className="mt-2 text-base italic opacity-80 sm:text-lg"
            />

            {/* couple line art */}
            <CoupleIllustration className="mt-5 h-32 w-auto text-passport-gold sm:h-36" />

            {/* names */}
            <p className="font-serif-en mt-auto text-xl tracking-wide sm:text-2xl">
              {content.cover.names}
            </p>

            {/* short gold divider + date */}
            <span className="mt-2 h-px w-10 bg-passport-gold/60" />
            <p className="font-body-en mt-2 text-xs tracking-[0.3em]">{t(content.cover.date)}</p>
          </div>
        </div>

        {/* Open button — fades in 2s after the cover appears */}
        <motion.button
          type="button"
          onClick={onOpen}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2, ease: 'easeOut' }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full bg-passport-gold px-9 py-1.5 text-passport-green shadow-lg shadow-passport-gold/30"
        >
          <BiText
            text={content.cover.openButton}
            className="text-base leading-tight font-semibold"
          />
        </motion.button>
      </div>
    </motion.div>
  );
}
