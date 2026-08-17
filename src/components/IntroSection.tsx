import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { EventCard } from './EventCard';

export function IntroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mx-auto w-full max-w-xl px-4 pt-8 pb-2"
    >
      <div className="mb-6 flex flex-col items-center gap-2">
        <BiText
          text={content.eventsHeading}
          as="h2"
          className="text-2xl font-bold tracking-[0.1em] text-passport-green"
        />
        <span className="h-px w-10 bg-cover-gold/60" />
      </div>

      <div className="flex flex-col gap-4">
        <EventCard {...content.events.wedding} />
        <EventCard {...content.events.afterParty} />
      </div>
    </motion.section>
  );
}
