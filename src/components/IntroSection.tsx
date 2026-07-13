import { motion } from 'framer-motion';
import { content } from '../content';
import { EventCard } from './EventCard';

export function IntroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mx-auto w-full max-w-2xl px-4 pt-2 pb-2 lg:max-w-4xl"
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <EventCard {...content.events.wedding} />
        <EventCard {...content.events.afterParty} />
      </div>
    </motion.section>
  );
}
