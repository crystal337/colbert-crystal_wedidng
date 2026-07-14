import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { content } from '../content';
import { useLang } from '../i18n';
import couplePng from '../assets/couple.png';
import studyImg from '../assets/study.jpg';
import togetherImg from '../assets/together.jpg';
import balloonsImg from '../assets/met.jpg';

const storyImages = [studyImg, togetherImg, balloonsImg];

// Deck: page 0 is the cover, pages 1..4 are the four story pages.
const PAGE_COUNT = 1 + 4;

const variants = {
  enter: (dir: number) => ({ opacity: 0, rotateY: dir >= 0 ? 20 : -20 }),
  center: { opacity: 1, rotateY: 0, transformOrigin: 'center center' },
  exit: (dir: number) => ({
    opacity: 0,
    rotateY: dir >= 0 ? -162 : 162,
    transformOrigin: dir >= 0 ? 'left center' : 'right center',
  }),
};

export function FlipBook({ onFinish }: { onFinish: () => void }) {
  const { lang, t } = useLang();
  const serif = lang === 'zh' ? 'font-serif-zh' : 'font-serif-en';
  const [[index, dir], setPage] = useState<[number, number]>([0, 1]);

  const paginate = (d: number) => {
    const next = index + d;
    if (next < 0) return;
    if (next >= PAGE_COUNT) {
      onFinish();
      return;
    }
    setPage([next, d]);
  };

  const isCover = index === 0;
  const storyIndex = index - 1; // 0..3 into content.story
  const isInvite = index === PAGE_COUNT - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 1 }}
      className="flex min-h-svh w-full flex-col items-center justify-center px-6 py-8"
    >
      <div className="w-full max-w-[21rem] sm:max-w-md lg:max-w-lg" style={{ perspective: 1800 }}>
        <div className="relative aspect-[5/7]" style={{ transformStyle: 'preserve-3d' }}>
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.62, ease: 'easeInOut' }}
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0"
            >
              {isCover ? (
                /* ---------- COVER (always English) ---------- */
                <div className="relative flex h-full w-full flex-col items-center rounded-2xl border border-cover-gold/40 bg-passport-green px-7 pt-9 pb-6 text-cover-gold shadow-[0_20px_60px_-15px_rgba(10,36,25,0.6)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_15%,rgba(232,207,156,0.15),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-[12px] rounded-xl border border-cover-gold/30" />
                  <div className="relative z-10 flex h-full w-full flex-col items-center">
                    <h1 className="font-serif-en text-3xl font-semibold tracking-[0.3em] sm:text-4xl lg:text-5xl">
                      {content.cover.passportWord}
                    </h1>
                    <p className="font-serif-en mt-2 text-base italic opacity-85 sm:text-lg lg:text-xl">
                      {content.cover.line}
                    </p>
                    <div className="flex w-full min-h-0 flex-1 items-center justify-center py-2">
                      <img src={couplePng} alt="Crystal & Colbert" className="max-h-full w-auto object-contain" />
                    </div>
                    <span className="h-px w-10 bg-cover-gold/60" />
                    <p className="font-body-en mt-2 mb-2 text-xs tracking-[0.3em] sm:text-sm">
                      {content.cover.date}
                    </p>
                    <motion.button
                      type="button"
                      onClick={() => paginate(1)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 1.6, ease: 'easeOut' }}
                      whileTap={{ scale: 0.95 }}
                      className="font-serif-en rounded-full bg-cover-gold px-9 py-1.5 text-base font-semibold tracking-wide text-passport-green shadow-lg shadow-cover-gold/30"
                    >
                      {content.cover.openButton}
                    </motion.button>
                  </div>
                </div>
              ) : (
                /* ---------- STORY PAGE ---------- */
                <div className="h-full w-full rounded-2xl bg-passport-green p-2.5 shadow-[0_25px_50px_-18px_rgba(10,36,25,0.6)] sm:p-3">
                  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-cream">
                    <div className="pointer-events-none absolute inset-2 z-10 rounded-lg border border-dashed border-passport-green/20" />
                    <span className="font-body-en absolute top-3 right-4 z-20 text-[0.6rem] tracking-[0.25em] text-passport-green/40">
                      {String(index).padStart(2, '0')} / 04
                    </span>

                    {isInvite ? (
                      <div className="flex h-full flex-col items-center justify-center px-8 text-center sm:px-10 lg:px-14">
                        <span className="mb-5 text-2xl text-passport-gold">♥</span>
                        <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl lg:text-2xl`}>
                          {t(content.story[storyIndex])}
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex min-h-0 flex-1 items-center justify-center p-4 pt-6">
                          <img src={storyImages[storyIndex]} alt="" className="max-h-full max-w-full object-contain" />
                        </div>
                        <div className="flex flex-col items-center gap-2 px-6 pb-8 text-center">
                          <span className="font-body-en text-[0.6rem] tracking-[0.2em] text-passport-green/50 uppercase">
                            Chapter {String(index).padStart(2, '0')}
                          </span>
                          <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl`}>
                            {t(content.story[storyIndex])}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls — hidden on the cover, which advances via its Open button */}
        {!isCover && (
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-passport-green/30 text-lg text-passport-green"
            >
              ‹
            </button>

            <div className="flex gap-2">
              {content.story.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === storyIndex ? 'bg-passport-green' : 'bg-passport-green/25'
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              className="flex h-10 items-center justify-center rounded-full bg-passport-green px-5 text-sm font-medium text-cover-gold shadow-md"
            >
              {isInvite ? t(content.flipbook.toForm) : t(content.flipbook.next)}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
