import type { Bi } from '../content';
import { content } from '../content';
import { BiText } from './BiText';
import { useLang } from '../i18n';

export function EventCard({
  badge,
  name,
  location,
  date,
  time,
  description,
}: {
  badge: Bi;
  name: Bi;
  location: Bi;
  date: Bi;
  time: Bi;
  description?: Bi;
}) {
  const { t } = useLang();
  const fields = content.eventFields;

  return (
    <div className="relative flex-1 rounded-2xl border border-cover-gold/40 bg-white/70 p-5 shadow-[0_14px_34px_-18px_rgba(10,36,25,0.28)] backdrop-blur-sm sm:p-6">
      <span className="inline-block rounded-full border border-cover-gold/50 bg-cover-gold/10 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-passport-green uppercase">
        {t(badge)}
      </span>

      <BiText text={name} as="h3" className="mt-3 text-xl font-semibold text-passport-green" />

      <dl className="mt-4 space-y-3">
        <div>
          <dt className="font-body-en text-[0.6rem] tracking-[0.12em] text-passport-green/50 uppercase">
            {t(fields.date)}
          </dt>
          <dd className="text-sm text-ink">{t(date)}</dd>
        </div>
        <div>
          <dt className="font-body-en text-[0.6rem] tracking-[0.12em] text-passport-green/50 uppercase">
            {t(fields.time)}
          </dt>
          <dd className="text-sm text-ink">{t(time)}</dd>
        </div>
        <div>
          <dt className="font-body-en text-[0.6rem] tracking-[0.12em] text-passport-green/50 uppercase">
            {t(fields.venue)}
          </dt>
          <dd className="text-sm text-ink">{t(location)}</dd>
        </div>
      </dl>

      {description && (
        <p className="mt-4 border-t border-passport-gold/20 pt-3 text-sm text-ink/70">
          {t(description)}
        </p>
      )}
    </div>
  );
}
