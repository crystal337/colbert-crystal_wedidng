import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { BoardingPass } from './BoardingPass';
import { ThankYou } from './ThankYou';

// The dedicated "submission complete" screen: just the boarding pass and
// the group-join links, on a fresh full-height page.
export function Completion({ name }: { name: string }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-svh flex-col items-center justify-center py-8"
    >
      <BoardingPass name={name} />
      <ThankYou />
    </motion.div>
  );
}
