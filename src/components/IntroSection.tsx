import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { EventCard } from './EventCard';

export function IntroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="mx-auto w-full max-w-2xl px-4 pt-10 pb-2 sm:pt-14"
    >
      <BiText
        text={content.intro.paragraph}
        as="p"
        className="mx-auto max-w-xl text-center"
        zhClassName="text-base leading-relaxed text-ink sm:text-lg"
        enClassName="mt-3 text-sm leading-relaxed text-ink/60 not-italic"
      />

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <EventCard {...content.events.wedding} />
        <EventCard {...content.events.afterParty} />
      </div>
    </motion.section>
  );
}
