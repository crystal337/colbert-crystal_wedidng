import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FlipBook } from './components/FlipBook';
import { IntroSection } from './components/IntroSection';
import { RSVPForm } from './components/RSVPForm';
import { Completion } from './components/Completion';
import { LanguageToggle } from './components/LanguageToggle';
import { content } from './content';
import { useLang } from './i18n';

type Stage = 'book' | 'form' | 'done';

function App() {
  const { t } = useLang();
  const [stage, setStage] = useState<Stage>('book');
  const [guestName, setGuestName] = useState('');

  // Scroll to the top whenever the stage changes so each stage starts fresh.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [stage]);

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
        {stage === 'book' && <FlipBook key="book" onFinish={() => setStage('form')} />}

        {stage === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            className="pb-20"
          >
            <div className="mx-auto w-full max-w-2xl px-4 pt-6 lg:max-w-4xl">
              <button
                type="button"
                onClick={() => setStage('book')}
                className="text-sm font-medium text-passport-green/70 transition-colors hover:text-passport-green"
              >
                {t(content.flipbook.backToPassport)}
              </button>
            </div>
            <IntroSection />
            <RSVPForm
              onSubmitted={(name) => {
                setGuestName(name);
                setStage('done');
              }}
            />
          </motion.div>
        )}

        {stage === 'done' && <Completion key="done" name={guestName} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
