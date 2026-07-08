import { content } from '../content';
import { useLang } from '../i18n';

export function LanguageToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center rounded-full border border-passport-gold/50 bg-cream/80 p-0.5 text-xs font-medium shadow-sm backdrop-blur-md">
      <button
        type="button"
        onClick={() => setLang('zh')}
        aria-pressed={lang === 'zh'}
        className={`rounded-full px-3 py-1 transition-colors ${
          lang === 'zh' ? 'bg-passport-green text-passport-gold' : 'text-passport-green/70'
        }`}
      >
        {content.langToggle.toZh}
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`rounded-full px-3 py-1 transition-colors ${
          lang === 'en' ? 'bg-passport-green text-passport-gold' : 'text-passport-green/70'
        }`}
      >
        {content.langToggle.toEn}
      </button>
    </div>
  );
}
