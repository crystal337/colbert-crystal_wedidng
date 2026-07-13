import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { content } from '../content';
import { useLang } from '../i18n';
import studyImg from '../assets/study.jpg';
import togetherImg from '../assets/together.jpg';
import balloonsImg from '../assets/met.jpg';

const storyImages = [studyImg, togetherImg, balloonsImg];

// One passport page — same 5/7 proportion as the cover — flipping up on scroll.
function Page({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div style={{ perspective: 1600 }} className="mx-auto w-full max-w-[21rem] sm:max-w-md lg:max-w-lg">
      <motion.div
        initial={{ rotateX: 18, y: 60, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'top center' }}
        className="aspect-[5/7] rounded-2xl bg-passport-green p-2.5 shadow-[0_25px_50px_-20px_rgba(10,36,25,0.55)] sm:p-3"
      >
        {/* cream inner page */}
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-cream">
          <div className="pointer-events-none absolute inset-2 z-10 rounded-lg border border-dashed border-passport-green/20" />
          <span className="font-body-en absolute top-3 right-4 z-20 text-[0.6rem] tracking-[0.25em] text-passport-green/40">
            {String(index + 1).padStart(2, '0')} / 04
          </span>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export function PassportPages() {
  const { lang, t } = useLang();
  const serif = lang === 'zh' ? 'font-serif-zh' : 'font-serif-en';

  return (
    <section className="mx-auto flex w-full flex-col gap-10 px-4 py-10 sm:gap-14 lg:gap-20 lg:py-16">
      {content.story.map((text, i) => {
        const isInvite = i === content.story.length - 1;

        if (isInvite) {
          return (
            <Page key={i} index={i}>
              <div className="flex h-full flex-col items-center justify-center px-8 text-center sm:px-10 lg:px-14">
                <span className="mb-5 text-2xl text-passport-gold">♥</span>
                <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl lg:text-2xl`}>
                  {t(text)}
                </p>
              </div>
            </Page>
          );
        }

        return (
          <Page key={i} index={i}>
            {/* photo — shown uncropped, with page background around it */}
            <div className="flex min-h-0 flex-1 items-center justify-center p-4 pt-6">
              <img src={storyImages[i]} alt="" className="max-h-full max-w-full object-contain" />
            </div>
            {/* caption */}
            <div className="flex flex-col items-center gap-2 px-6 pb-8 text-center">
              <span className="font-body-en text-[0.6rem] tracking-[0.2em] text-passport-green/50 uppercase">
                Chapter {String(i + 1).padStart(2, '0')}
              </span>
              <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl`}>{t(text)}</p>
            </div>
          </Page>
        );
      })}
    </section>
  );
}
