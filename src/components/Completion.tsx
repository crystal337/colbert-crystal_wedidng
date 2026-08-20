import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BoardingPass } from './BoardingPass';
import { ThankYou } from './ThankYou';
import { Gallery } from './Gallery';

// The dedicated "submission complete" screen: boarding pass, group-join
// links, and a swipeable sneak-peek gallery.
export function Completion({ name }: { name: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-svh flex-col items-center justify-start py-8"
    >
      <Gallery />
      <BoardingPass name={name} />
      <ThankYou />
    </motion.div>
  );
}
