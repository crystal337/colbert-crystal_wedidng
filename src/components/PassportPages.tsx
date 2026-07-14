import { content } from '../content';
import { useLang } from '../i18n';
import studyImg from '../assets/study.jpg';
import togetherImg from '../assets/together.jpg';
import balloonsImg from '../assets/met.jpg';

const storyImages = [studyImg, togetherImg, balloonsImg];

export function PassportPages() {
  const { lang, t } = useLang();
  const serif = lang === 'zh' ? 'font-serif-zh' : 'font-serif-en';

  return (
    // Each page is sticky at the same offset, so scrolling "pulls" the next
    // page up over the previous one — like drawing pages out of a passport.
    <section className="relative mx-auto w-full px-4">
      {content.story.map((text, i) => {
        const isInvite = i === content.story.length - 1;

        return (
          <div
            key={i}
            className="sticky top-[7vh] mx-auto w-full max-w-[21rem] py-6 sm:max-w-md lg:top-[8vh] lg:max-w-lg"
            style={{ zIndex: i + 1 }}
          >
            <div className="aspect-[5/7] rounded-2xl bg-passport-green p-2.5 shadow-[0_25px_50px_-18px_rgba(10,36,25,0.6)] sm:p-3">
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-cream">
                <div className="pointer-events-none absolute inset-2 z-10 rounded-lg border border-dashed border-passport-green/20" />
                <span className="font-body-en absolute top-3 right-4 z-20 text-[0.6rem] tracking-[0.25em] text-passport-green/40">
                  {String(i + 1).padStart(2, '0')} / 04
                </span>

                {isInvite ? (
                  <div className="flex h-full flex-col items-center justify-center px-8 text-center sm:px-10 lg:px-14">
                    <span className="mb-5 text-2xl text-passport-gold">♥</span>
                    <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl lg:text-2xl`}>
                      {t(text)}
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex min-h-0 flex-1 items-center justify-center p-4 pt-6">
                      <img
                        src={storyImages[i]}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col items-center gap-2 px-6 pb-8 text-center">
                      <span className="font-body-en text-[0.6rem] tracking-[0.2em] text-passport-green/50 uppercase">
                        Chapter {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className={`${serif} text-lg leading-relaxed text-ink sm:text-xl`}>{t(text)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
