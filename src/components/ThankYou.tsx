import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { LINE_GROUP_URL, WHATSAPP_GROUP_URL } from '../config';

export function ThankYou() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="mx-auto w-full max-w-xl px-4 py-10 text-center"
    >
      <div className="rounded-2xl border border-passport-gold/40 bg-white/70 p-8 shadow-sm backdrop-blur-sm">
        <BiText
          text={content.thankYou.heading}
          as="h2"
          zhClassName="text-2xl font-semibold text-passport-green"
          enClassName="text-sm text-passport-green/60 not-italic tracking-[0.2em] uppercase"
        />

        <BiText
          text={content.thankYou.paragraph}
          as="p"
          className="mx-auto mt-4 max-w-md"
          zhClassName="text-base leading-relaxed text-ink"
          enClassName="mt-2 text-sm leading-relaxed text-ink/60 not-italic"
        />

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={LINE_GROUP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-[#06C755] px-6 py-3 font-medium text-white shadow-md transition-transform hover:scale-[1.02]"
          >
            {content.thankYou.line.zh} <span className="opacity-80">/ {content.thankYou.line.en}</span>
          </a>
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-full bg-[#25D366] px-6 py-3 font-medium text-white shadow-md transition-transform hover:scale-[1.02]"
          >
            {content.thankYou.whatsapp.zh} <span className="opacity-80">/ {content.thankYou.whatsapp.en}</span>
          </a>
        </div>
      </div>
    </motion.section>
  );
}
