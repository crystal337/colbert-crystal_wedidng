import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { useLang } from '../i18n';
import g1 from '../assets/gallery1.jpg';
import g2 from '../assets/gallery2.jpg';
import g3 from '../assets/gallery3.jpg';
import g4 from '../assets/gallery4.jpg';
import g5 from '../assets/gallery5.jpg';

const photos = [g1, g2, g3, g4, g5];

// A horizontally-swipeable "sneak peek" of the couple's photos, each shown
// like a framed picture hung on a wall.
export function Gallery() {
  const { t } = useLang();

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
      className="mx-auto w-full max-w-5xl px-4 py-10"
    >
      <div className="mb-2 flex flex-col items-center gap-2">
        <BiText
          text={content.gallery.heading}
          as="h2"
          className="text-2xl font-bold tracking-[0.1em] text-passport-green"
        />
        <span className="h-px w-10 bg-cover-gold/60" />
      </div>
      <p className="mb-5 text-center text-xs text-passport-green/50">{t(content.gallery.hint)}</p>

      <div
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pt-2 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="shrink-0 snap-center rounded-sm bg-white p-2.5 shadow-[0_18px_36px_-16px_rgba(10,36,25,0.5)] ring-1 ring-cover-gold/30"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-64 w-auto rounded-[2px] object-cover sm:h-80"
            />
          </div>
        ))}
      </div>
    </motion.section>
  );
}
