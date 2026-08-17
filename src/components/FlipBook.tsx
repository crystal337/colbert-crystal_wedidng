import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { content } from '../content';
import { useLang } from '../i18n';
import couplePng from '../assets/couple.png';
import story1 from '../assets/story1.jpg';
import story2 from '../assets/story2.jpg';
import story3 from '../assets/story3.jpg';
import story4 from '../assets/story4.jpg';
import balloonsImg from '../assets/met.jpg';

const storyImages = [story1, story2, story3, story4, balloonsImg];

// Deck: page 0 is the cover, pages 1..5 are the story pages, last page is the invite.
const PAGE_COUNT = 1 + storyImages.length + 1;

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
      className="flex min-h-svh w-full flex-col items-center justify-center px-4 py-4"
    >
      <div
        className={`mx-auto ${
          isCover
            ? 'w-[min(92vw,62svh)] sm:w-[min(26rem,60svh)] lg:w-[min(32rem,60svh)]'
            : 'w-[min(90vw,54svh)] sm:w-[min(26rem,54svh)] lg:w-[min(32rem,56svh)]'
        }`}
        style={{ perspective: 1800 }}
      >
        <div className="relative">
        <div
          className="relative aspect-[5/7] touch-pan-y"
          style={{ transformStyle: 'preserve-3d' }}
          onPointerDown={(e) => {
            const startX = e.clientX;
            const finish = (ev: PointerEvent) => {
              window.removeEventListener('pointerup', finish);
              const dx = ev.clientX - startX;
              if (dx <= -50) paginate(1);
              else if (dx >= 50) paginate(-1);
            };
            window.addEventListener('pointerup', finish);
          }}
        >
          <AnimatePresence custom={dir} initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              style={{ backfaceVisibility: 'hidden' }}
              className="absolute inset-0"
            >
              {isCover ? (
                /* ---------- COVER (always English) ---------- */
                <div className="relative flex h-full w-full flex-col items-center rounded-2xl border border-cover-gold/40 bg-passport-green px-7 pt-9 pb-6 text-cover-gold shadow-[0_20px_60px_-15px_rgba(10,36,25,0.6)]">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_30%_15%,rgba(232,207,156,0.15),transparent_55%)]" />
                  <div className="pointer-events-none absolute inset-[12px] rounded-xl border border-cover-gold/30" />
                  <div className="relative z-10 flex h-full w-full flex-col items-center">
                    <h1 className="font-passport text-center text-[clamp(1.4rem,4.6svh,2.35rem)] font-semibold tracking-[0.18em] [text-indent:0.18em]">
                      {content.cover.passportWord}
                    </h1>
                    <p className="font-passport-serif mt-2 text-[clamp(0.9rem,2.6svh,1.3rem)] tracking-[0.06em] text-cover-gold/90 italic">
                      {content.cover.line}
                    </p>
                    <div className="flex w-full min-h-0 flex-1 items-center justify-center py-2">
                      <img src={couplePng} alt="Crystal & Colbert" className="max-h-full w-auto object-contain" />
                    </div>
                    <span className="h-px w-10 bg-cover-gold/60" />
                    <p className="font-passport-serif mt-2 mb-2 text-sm font-medium tracking-[0.35em] sm:text-base">
                      {content.cover.date}
                    </p>
                    <motion.button
                      type="button"
                      onClick={() => paginate(1)}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 1.6, ease: 'easeOut' }}
                      whileTap={{ scale: 0.95 }}
                      className="font-passport-serif rounded-full bg-cover-gold px-10 py-1.5 text-lg font-semibold tracking-[0.15em] text-passport-green shadow-lg shadow-cover-gold/30"
                    >
                      {content.cover.openButton}
                    </motion.button>
                  </div>
                </div>
              ) : isInvite ? (
                /* ---------- INVITATION — the passport's back cover ---------- */
                <div className="relative flex h-full w-full flex-col items-start justify-center rounded-2xl border border-cover-gold/40 bg-passport-green px-8 text-left text-cream shadow-[0_25px_50px_-18px_rgba(10,36,25,0.6)] sm:px-11">
                  <div className="pointer-events-none absolute inset-[12px] rounded-xl border border-cover-gold/25" />
                  <div className="relative z-10 w-full space-y-4">
                    {content.invite.map((para, i) => (
                      <p key={i} className={`${serif} text-[clamp(0.82rem,2.5svh,1.05rem)] leading-relaxed`}>
                        {t(para)}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                /* ---------- STORY PAGE ---------- */
                <div className="h-full w-full rounded-2xl bg-passport-green p-2.5 shadow-[0_25px_50px_-18px_rgba(10,36,25,0.6)] sm:p-3">
                  <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-cream">
                    <div className="pointer-events-none absolute inset-2 z-10 rounded-lg border border-dashed border-passport-green/20" />
                    <div className="absolute top-3 right-3 z-20 -rotate-6 rounded border border-cover-gold/50 px-1.5 py-[1px]">
                      <span className="font-passport-serif text-[0.62rem] font-semibold tracking-[0.12em] text-cover-gold">
                        {String(index).padStart(2, '0')} / {String(PAGE_COUNT - 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="flex min-h-0 flex-1 items-center justify-center p-5 pt-7">
                      <img
                        src={storyImages[storyIndex]}
                        alt=""
                        className="max-h-full max-w-full rounded-[3px] border-[6px] border-white shadow-[0_10px_24px_-10px_rgba(10,36,25,0.4)]"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2 px-6 pb-8 text-center">
                      <span className="text-[0.6rem] font-semibold tracking-[0.3em] text-cover-gold uppercase">
                        Chapter {String(index).padStart(2, '0')}
                      </span>
                      <span className="h-px w-6 bg-cover-gold/50" />
                      <p className={`${serif} text-lg leading-relaxed font-medium text-ink sm:text-xl`}>
                        {t(content.story[storyIndex])}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          </div>

          {/* side navigation arrows — hidden on the cover (which uses Open) */}
          {!isCover && (
            <>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous"
                className="absolute left-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-passport-green/15 bg-cream/85 text-xl text-passport-green shadow-md backdrop-blur sm:-left-3 lg:-left-5"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label={isInvite ? t(content.flipbook.toForm) : t(content.flipbook.next)}
                className="absolute right-1 top-1/2 z-30 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-passport-green/15 bg-cream/85 text-xl text-passport-green shadow-md backdrop-blur sm:-right-3 lg:-right-5"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* progress dots (kept close under the page) + last-page RSVP entry */}
        {!isCover && (
          <div className="mt-3 flex flex-col items-center gap-3">
            <div className="flex gap-2">
              {Array.from({ length: PAGE_COUNT - 1 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    i === index - 1 ? 'bg-passport-green' : 'bg-passport-green/25'
                  }`}
                />
              ))}
            </div>
            {isInvite && (
              <button
                type="button"
                onClick={() => paginate(1)}
                className="rounded-full bg-passport-green px-6 py-2 text-sm font-medium text-cover-gold shadow-md"
              >
                {t(content.flipbook.toForm)}
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
