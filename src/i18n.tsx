import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Bi } from './content';

export type Lang = 'zh' | 'en';

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (bi: Bi) => string;
};

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('zh');
  const t = (bi: Bi) => bi[lang];
  const toggle = () => setLang((l) => (l === 'zh' ? 'en' : 'zh'));

  return <Ctx.Provider value={{ lang, setLang, toggle, t }}>{children}</Ctx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider');
  return ctx;
}

// Serif font class for the currently selected language.
// eslint-disable-next-line react-refresh/only-export-components
export function serifFor(lang: Lang) {
  return lang === 'zh' ? 'font-serif-zh' : 'font-serif-en';
}
