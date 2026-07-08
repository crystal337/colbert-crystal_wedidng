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
    <div className="relative flex-1 rounded-2xl border border-passport-gold/40 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      <span className="font-body-en inline-block rounded-full bg-blush px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-ink/70 uppercase">
        {t(badge)}
      </span>

      <BiText text={name} as="h3" className="mt-3 text-xl font-semibold text-passport-green" />

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 text-ink/50">{t(fields.date)}</dt>
          <dd>{t(date)}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 text-ink/50">{t(fields.time)}</dt>
          <dd>{t(time)}</dd>
        </div>
        <div className="flex gap-3">
          <dt className="w-12 shrink-0 text-ink/50">{t(fields.venue)}</dt>
          <dd>{t(location)}</dd>
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
