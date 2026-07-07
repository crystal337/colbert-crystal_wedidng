import type { Bi } from '../content';
import { BiText } from './BiText';

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
  return (
    <div className="relative flex-1 rounded-2xl border border-passport-gold/40 bg-white/70 p-5 shadow-sm backdrop-blur-sm sm:p-6">
      <span className="font-body-en inline-block rounded-full bg-blush px-3 py-1 text-[0.65rem] font-semibold tracking-[0.15em] text-ink/70 uppercase">
        {badge.zh} · {badge.en}
      </span>

      <BiText
        text={name}
        as="h3"
        className="mt-3"
        zhClassName="text-xl font-semibold text-passport-green"
        enClassName="text-sm text-passport-green/70 not-italic tracking-wide"
      />

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <dt className="w-14 shrink-0 font-body-en text-xs tracking-wide text-ink/50 uppercase">Date</dt>
          <dd className="font-serif-zh">
            {date.zh} <span className="text-ink/50">/ {date.en}</span>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-14 shrink-0 font-body-en text-xs tracking-wide text-ink/50 uppercase">Time</dt>
          <dd className="font-serif-zh">
            {time.zh} <span className="text-ink/50">/ {time.en}</span>
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="w-14 shrink-0 font-body-en text-xs tracking-wide text-ink/50 uppercase">Venue</dt>
          <dd className="font-serif-zh">
            {location.zh} <span className="text-ink/50">/ {location.en}</span>
          </dd>
        </div>
      </dl>

      {description && (
        <p className="mt-4 border-t border-passport-gold/20 pt-3 text-sm text-ink/70">
          {description.zh}
          <span className="block text-xs text-ink/50 italic">{description.en}</span>
        </p>
      )}
    </div>
  );
}
