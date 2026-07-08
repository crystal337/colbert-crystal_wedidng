import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PassportCover } from './components/PassportCover';
import { PassportBook } from './components/PassportBook';
import { IntroSection } from './components/IntroSection';
import { RSVPForm } from './components/RSVPForm';
import { ThankYou } from './components/ThankYou';
import { LanguageToggle } from './components/LanguageToggle';

function App() {
  const [opened, setOpened] = useState(false);
  const [bookDone, setBookDone] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="relative min-h-svh overflow-x-hidden">
      {/* soft decorative background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blush/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-passport-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-blush/30 blur-3xl" />
      </div>

      <LanguageToggle />

      <AnimatePresence mode="wait">{!opened && <PassportCover key="cover" onOpen={() => setOpened(true)} />}</AnimatePresence>

      {opened && (
        <div className="pb-20">
          <PassportBook onDone={() => setBookDone(true)} />

          {bookDone && (
            <>
              <IntroSection />
              {submitted ? <ThankYou /> : <RSVPForm onSubmitted={() => setSubmitted(true)} />}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
