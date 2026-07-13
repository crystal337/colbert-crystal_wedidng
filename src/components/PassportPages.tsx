import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { content } from '../content';
import { useLang } from '../i18n';
import studyImg from '../assets/study.jpg';
import togetherImg from '../assets/together.jpg';
import balloonsImg from '../assets/met.jpg';

const storyImages = [studyImg, togetherImg, balloonsImg];

// One passport page inside a green "mat", flipping up into view as it scrolls.
function Page({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div style={{ perspective: 1400 }} className="w-full">
      <motion.div
        initial={{ rotateX: 16, y: 60, opacity: 0 }}
        whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{ transformOrigin: 'top center' }}
        className="rounded-2xl bg-passport-green p-2.5 shadow-[0_25px_50px_-20px_rgba(10,36,25,0.55)] sm:p-3"
      >
        {/* cream inner page */}
        <div className="relative overflow-hidden rounded-xl bg-cream">
          <div className="pointer-events-none absolute inset-2 rounded-lg border border-dashed border-passport-green/20" />
          {/* passport page number */}
          <span className="font-body-en absolute top-3 right-4 z-10 text-[0.6rem] tracking-[0.25em] text-passport-green/40">
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
    <section className="mx-auto flex w-full max-w-md flex-col gap-8 px-4 py-10 sm:gap-12 lg:max-w-4xl lg:gap-16 lg:py-16">
      {content.story.map((text, i) => {
        const isInvite = i === content.story.length - 1;

        if (isInvite) {
          return (
            <Page key={i} index={i}>
              <div className="flex flex-col items-center justify-center px-6 py-14 text-center sm:px-10 lg:px-20 lg:py-24">
                <span className="mb-5 text-2xl text-passport-gold">♥</span>
                <p className={`${serif} max-w-xl text-lg leading-relaxed text-ink sm:text-xl lg:text-2xl`}>
                  {t(text)}
                </p>
              </div>
            </Page>
          );
        }

        return (
          <Page key={i} index={i}>
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-stretch">
              {/* photo side */}
              <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-[22rem]">
                <img src={storyImages[i]} alt="" className="h-full w-full object-cover" />
              </div>
              {/* text side */}
              <div className="flex flex-col items-center justify-center gap-4 px-8 py-10 text-center lg:px-12">
                <span className="font-body-en rounded-full bg-passport-green/8 px-3 py-1 text-[0.6rem] tracking-[0.2em] text-passport-green/60 uppercase">
                  Chapter {String(i + 1).padStart(2, '0')}
                </span>
                <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl lg:text-2xl`}>
                  {t(text)}
                </p>
              </div>
            </div>
          </Page>
        );
      })}
    </section>
  );
}
