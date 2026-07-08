import type { Bi } from '../content';
import { serifFor, useLang } from '../i18n';

export function StampIcon({
  label,
  rotate = -6,
  className = '',
}: {
  label: Bi;
  rotate?: number;
  className?: string;
}) {
  const { lang, t } = useLang();

  return (
    <div
      className={`relative inline-flex aspect-square w-full max-w-[9.5rem] items-center justify-center rounded-full border-[3px] border-double border-passport-green/70 text-passport-green/80 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="absolute inset-[6px] rounded-full border border-passport-green/60" />
      <div className="flex flex-col items-center gap-1 px-3 text-center">
        <span className={`${serifFor(lang)} text-lg font-semibold tracking-widest`}>{t(label)}</span>
        <span className="mt-1 h-px w-8 bg-current opacity-60" />
        <span className="font-body-en text-[0.6rem] tracking-[0.3em]">2027</span>
      </div>
    </div>
  );
}
