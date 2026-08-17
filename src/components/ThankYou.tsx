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
      <div className="rounded-2xl border border-cover-gold/40 bg-white/70 p-8 shadow-[0_14px_34px_-18px_rgba(10,36,25,0.28)] backdrop-blur-sm">
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
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-passport-green px-6 py-3 font-medium text-cream shadow-md transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
                <path d="M12 3C6.9 3 2.75 6.42 2.75 10.63c0 3.77 3.29 6.93 7.74 7.53.3.06.71.2.81.46.09.24.06.6.03.85l-.13.79c-.04.24-.19.93.82.51 1-.42 5.42-3.19 7.39-5.46 1.36-1.49 2.01-3.01 2.01-4.68C21.42 6.42 17.27 3 12 3zM8.13 12.87H6.2a.4.4 0 0 1-.4-.4V9.35a.4.4 0 0 1 .8 0v2.72h1.53a.4.4 0 0 1 0 .8zm1.63-.4a.4.4 0 0 1-.8 0V9.35a.4.4 0 0 1 .8 0v3.12zm3.83 0a.4.4 0 0 1-.32.39h-.08a.4.4 0 0 1-.32-.16l-1.6-2.17v1.94a.4.4 0 0 1-.8 0V9.35a.4.4 0 0 1 .72-.24l1.6 2.18V9.35a.4.4 0 0 1 .8 0v3.12zm2.71-1.96a.4.4 0 0 1 0 .8h-1.13v.73h1.13a.4.4 0 0 1 0 .8h-1.53a.4.4 0 0 1-.4-.4V9.35a.4.4 0 0 1 .4-.4h1.53a.4.4 0 0 1 0 .8h-1.13v.76h1.13z" />
              </svg>
              {t(content.thankYou.line)}
            </a>
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-passport-green px-6 py-3 font-medium text-cream shadow-md transition-transform hover:scale-[1.02]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden>
                <path d="M.06 24l1.69-6.16a11.87 11.87 0 0 1-1.6-5.96C.15 5.32 5.5 0 12.06 0a11.82 11.82 0 0 1 8.41 3.49 11.75 11.75 0 0 1 3.48 8.4c0 6.55-5.35 11.88-11.9 11.88a11.94 11.94 0 0 1-5.7-1.45L.06 24zM6.6 20.13c1.68 1 3.28 1.59 5.4 1.59 5.44 0 9.87-4.42 9.88-9.86A9.83 9.83 0 0 0 12.06 2c-5.45 0-9.88 4.42-9.88 9.85 0 2.23.65 3.9 1.75 5.65l-1 3.65 3.67-.96zm11.38-5.43c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42z" />
              </svg>
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
