import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PassportCover } from './components/PassportCover';
import { PassportPages } from './components/PassportPages';
import { IntroSection } from './components/IntroSection';
import { RSVPForm } from './components/RSVPForm';
import { Completion } from './components/Completion';
import { LanguageToggle } from './components/LanguageToggle';

function App() {
  const [opened, setOpened] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [guestName, setGuestName] = useState('');

  const handleSubmitted = (name: string) => {
    setGuestName(name);
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-svh overflow-x-clip">
      {/* soft decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-passport-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blush/30 blur-3xl" />
      </div>

      <LanguageToggle />

      <AnimatePresence mode="wait">
        {!opened && <PassportCover key="cover" onOpen={() => setOpened(true)} />}

        {opened && submitted && <Completion key="done" name={guestName} />}

        {opened && !submitted && (
          <motion.div
            key="flow"
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
            className="pb-20"
          >
            <PassportPages />
            <IntroSection />
            <RSVPForm onSubmitted={handleSubmitted} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
