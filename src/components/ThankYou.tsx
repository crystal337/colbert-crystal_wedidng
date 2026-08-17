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

// Downloadable .ics for Apple Calendar (and any calendar app). Times in UTC:
// 11:30 Asia/Taipei = 03:30Z, 15:00 = 07:00Z.
const ICS_HREF = (() => {
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Colbert Crystal Wedding//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:wedding-20270123@colbert-crystal',
    'DTSTAMP:20260101T000000Z',
    'DTSTART:20270123T033000Z',
    'DTEND:20270123T070000Z',
    "SUMMARY:Colbert & Crystal's Wedding",
    'LOCATION:InterContinental Kaohsiung 高雄洲際酒店 芳苑廳',
    'DESCRIPTION:Wedding 11:30 · After-Party from 17:00',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
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
          className="text-2xl font-bold tracking-[0.1em] text-passport-green"
        />
        <span className="mx-auto mt-3 block h-px w-10 bg-cover-gold/60" />

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
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cover-gold px-5 py-3 text-sm font-medium text-passport-green shadow-md transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M3 9h18M8 2v4M16 2v4M12 12v5M9.5 14.5h5" />
              </svg>
              {t(content.thankYou.calendar)}
            </a>
            <a
              href={ICS_HREF}
              download="colbert-crystal-wedding.ics"
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-passport-green/40 bg-white/60 px-5 py-3 text-sm font-medium text-passport-green shadow-sm transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.98-.76.86-2.01 1.52-3.02 1.44-.13-1.1.42-2.26 1.06-2.98.72-.82 2.05-1.44 3.08-1.44zM20.5 17.2c-.55 1.27-.82 1.84-1.53 2.96-.99 1.57-2.39 3.52-4.12 3.53-1.54.02-1.94-.99-4.03-.98-2.09.01-2.53.99-4.07.97-1.73-.02-3.05-1.78-4.04-3.35-2.77-4.4-3.06-9.56-1.35-12.3 1.21-1.95 3.13-3.09 4.93-3.09 1.84 0 2.99 1 4.51 1 1.47 0 2.37-1 4.5-1 1.61 0 3.32.88 4.54 2.4-3.99 2.18-3.34 7.88.13 9.86z" />
              </svg>
              {t(content.thankYou.appleCalendar)}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
