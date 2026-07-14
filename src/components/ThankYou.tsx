import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { useLang } from '../i18n';
import { LINE_GROUP_URL, WHATSAPP_GROUP_URL } from '../config';

// Google Calendar "add event" link for the wedding (Asia/Taipei time).
const CALENDAR_URL = (() => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: "Colbert & Crystal's Wedding",
    dates: '20270123T113000/20270123T150000',
    ctz: 'Asia/Taipei',
    location: 'InterContinental Kaohsiung 高雄洲際酒店',
    details:
      'Wedding 11:30 · Dinner Gathering from 17:00\nhttps://crystal337.github.io/colbert-crystal_wedidng/',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
})();

export function ThankYou() {
  const { t } = useLang();

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
          className="text-2xl font-semibold text-passport-green"
        />

        <BiText
          text={content.thankYou.paragraph}
          as="p"
          className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink"
        />

        <div className="mt-8 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={LINE_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full bg-passport-green px-6 py-3 font-medium text-cream shadow-md transition-transform hover:scale-[1.02]"
            >
              {t(content.thankYou.line)}
            </a>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex-1 rounded-full bg-passport-green px-6 py-3 font-medium text-cream shadow-md transition-transform hover:scale-[1.02]"
            >
              {t(content.thankYou.whatsapp)}
            </a>
          </div>
          <a
            href={CALENDAR_URL}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-cover-gold px-6 py-3 font-medium text-passport-green shadow-md transition-transform hover:scale-[1.02]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="17" rx="2" />
              <path d="M3 9h18M8 2v4M16 2v4M12 12v5M9.5 14.5h5" />
            </svg>
            {t(content.thankYou.calendar)}
          </a>
        </div>
      </div>
    </motion.section>
  );
}
