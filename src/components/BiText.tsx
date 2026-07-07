import type { ElementType } from 'react';
import type { Bi } from '../content';

export function BiText({
  text,
  as: Tag = 'div',
  className = '',
  enClassName = '',
  zhClassName = '',
}: {
  text: Bi;
  as?: ElementType;
  className?: string;
  enClassName?: string;
  zhClassName?: string;
}) {
  return (
    <Tag className={className}>
      <span className={`block font-serif-zh ${zhClassName}`}>{text.zh}</span>
      <span className={`block font-serif-en italic opacity-70 ${enClassName}`}>{text.en}</span>
    </Tag>
  );
}
