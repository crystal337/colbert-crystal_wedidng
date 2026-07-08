import type { ElementType } from 'react';
import type { Bi } from '../content';
import { serifFor, useLang } from '../i18n';

// Renders a single Bi string in the currently selected language,
// using the serif face that matches that language.
export function BiText({
  text,
  as: Tag = 'div',
  className = '',
}: {
  text: Bi;
  as?: ElementType;
  className?: string;
}) {
  const { lang, t } = useLang();
  return <Tag className={`${serifFor(lang)} ${className}`}>{t(text)}</Tag>;
}
