import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { useLang } from '../i18n';
import { fileToCompressedBase64 } from '../lib/image';
import { submitRSVP } from '../lib/submit';

type Attending = 'wedding' | 'afterParty';
type Relationship =
  | 'groomRelative'
  | 'brideRelative'
  | 'groomFriend'
  | 'brideFriend'
  | 'bothFriend'
  | 'other';
type ChildChair = 'no' | 'yes' | 'other';

const MAX_GUESTS = 8;

const relationships = [
  ['groomRelative', content.form.relGroomRelative],
  ['brideRelative', content.form.relBrideRelative],
  ['groomFriend', content.form.relGroomFriend],
  ['brideFriend', content.form.relBrideFriend],
  ['bothFriend', content.form.relBothFriend],
  ['other', content.form.relOther],
] as const;

const childChairOptions = [
  ['no', content.form.childChairNo],
  ['yes', content.form.childChairYes],
  ['other', content.form.childChairOther],
] as const;

// Chinese labels stored in the Google Sheet, regardless of the guest's UI language.
const relationshipZh: Record<Exclude<Relationship, 'other'>, string> = {
  groomRelative: content.form.relGroomRelative.zh,
  brideRelative: content.form.relBrideRelative.zh,
  groomFriend: content.form.relGroomFriend.zh,
  brideFriend: content.form.relBrideFriend.zh,
  bothFriend: content.form.relBothFriend.zh,
};

export function RSVPForm({ onSubmitted }: { onSubmitted: (name: string) => void }) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState<Set<Relationship>>(new Set());
  const [relationshipOther, setRelationshipOther] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [companions, setCompanions] = useState<string[]>([]);
  const [attending, setAttending] = useState<Set<Attending>>(new Set());
  const [childChair, setChildChair] = useState<ChildChair>('no');
  const [childChairOther, setChildChairOther] = useState('');
  const [vegetarianCount, setVegetarianCount] = useState(0);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGuestCount = (raw: number) => {
    const count = Math.max(1, Math.min(MAX_GUESTS, raw || 1));
    setGuestCount(count);
    setCompanions((prev) => {
      const next = prev.slice(0, count - 1);
      while (next.length < count - 1) next.push('');
      return next;
    });
    setVegetarianCount((v) => Math.min(v, count));
  };

  const toggleRelationship = (value: Relationship) => {
    setRelationship((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const toggleAttending = (value: Attending) => {
    setAttending((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhotoFile(file);
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || attending.size === 0) {
      setError(t(content.form.errorRequired));
      return;
    }

    setSubmitting(true);
    try {
      let photoBase64: string | undefined;
      if (photoFile) {
        photoBase64 = await fileToCompressedBase64(photoFile);
      }

      const relationshipStr = Array.from(relationship)
        .map((r) =>
          r === 'other'
            ? relationshipOther.trim()
              ? `${content.form.relOther.zh}：${relationshipOther.trim()}`
              : content.form.relOther.zh
            : relationshipZh[r],
        )
        .join('、');

      const childChairZh =
        childChair === 'other'
          ? `${content.form.childChairOther.zh}：${childChairOther.trim()}`
          : childChair === 'yes'
            ? content.form.childChairYes.zh
            : content.form.childChairNo.zh;

      const attendingLabels = Array.from(attending).map((v) =>
        v === 'wedding' ? content.form.attendWedding.zh : content.form.attendAfterParty.zh,
      );

      await submitRSVP({
        name: name.trim(),
        email: email.trim(),
        relationship: relationshipStr,
        guestCount,
        companions: companions.map((c) => c.trim()).filter(Boolean),
        attending: attendingLabels,
        childChair: childChairZh,
        vegetarianCount,
        photoBase64,
        photoFileName: photoFile?.name,
      });

      onSubmitted(name.trim());
    } catch (err) {
      console.error(err);
      setError(t(content.form.errorGeneric));
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'mt-2 w-full rounded-lg border border-passport-green/20 bg-cream/60 px-4 py-2.5 text-ink outline-none focus:border-passport-gold focus:ring-2 focus:ring-passport-gold/30';

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24, transition: { duration: 0.35, ease: 'easeIn' } }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      className="mx-auto w-full max-w-xl px-4 py-10"
    >
      {/* heading + deadline, outside the form card */}
      <div className="mb-6 text-center">
        <BiText text={content.form.heading} as="h2" className="text-2xl font-semibold text-passport-green" />
        <p className="mt-2 text-sm text-passport-green/70">{t(content.form.deadline)}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-passport-gold/40 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      >
        {/* name */}
        <div>
          <label htmlFor="rsvp-name" className="block text-sm font-medium text-ink">
            {t(content.form.name)}
          </label>
          <input
            id="rsvp-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t(content.form.namePlaceholder)}
            className={inputClass}
          />
        </div>

        {/* email */}
        <div>
          <label htmlFor="rsvp-email" className="block text-sm font-medium text-ink">
            {t(content.form.email)}
          </label>
          <input
            id="rsvp-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t(content.form.emailPlaceholder)}
            className={inputClass}
          />
        </div>

        {/* relationship to the couple (multi-select) */}
        <div>
          <span className="block text-sm font-medium text-ink">{t(content.form.relationship)}</span>
          <p className="mt-1 text-xs text-ink/50">{t(content.form.relationshipHint)}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {relationships.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleRelationship(value)}
                aria-pressed={relationship.has(value)}
                className={`rounded-lg border px-4 py-2.5 text-sm transition-colors ${
                  relationship.has(value)
                    ? 'border-passport-gold bg-passport-gold/15 font-medium text-passport-green'
                    : 'border-passport-green/20 bg-cream/60 text-ink'
                }`}
              >
                {t(label)}
              </button>
            ))}
          </div>
          {relationship.has('other') && (
            <input
              type="text"
              value={relationshipOther}
              onChange={(e) => setRelationshipOther(e.target.value)}
              placeholder={t(content.form.relOtherPlaceholder)}
              className={inputClass}
            />
          )}
        </div>

        {/* guest count */}
        <div>
          <label htmlFor="rsvp-count" className="block text-sm font-medium text-ink">
            {t(content.form.guestCount)}
          </label>
          <select
            id="rsvp-count"
            value={guestCount}
            onChange={(e) => handleGuestCount(Number(e.target.value))}
            className="mt-2 w-28 rounded-lg border border-passport-green/20 bg-cream/60 px-4 py-2.5 text-ink outline-none focus:border-passport-gold focus:ring-2 focus:ring-passport-gold/30"
          >
            {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* companions — only when more than one guest */}
        {guestCount > 1 && (
          <div>
            <span className="block text-sm font-medium text-ink">{t(content.form.companions)}</span>
            <p className="mt-1 text-xs text-ink/50">{t(content.form.companionsHint)}</p>
            <div className="mt-3 space-y-2">
              {companions.map((value, i) => (
                <input
                  key={i}
                  type="text"
                  value={value}
                  onChange={(e) =>
                    setCompanions((prev) => {
                      const next = [...prev];
                      next[i] = e.target.value;
                      return next;
                    })
                  }
                  placeholder={`${t(content.form.companionPlaceholder)} ${i + 2}`}
                  className="w-full rounded-lg border border-passport-green/20 bg-cream/60 px-4 py-2.5 text-ink outline-none focus:border-passport-gold focus:ring-2 focus:ring-passport-gold/30"
                />
              ))}
            </div>
          </div>
        )}

        {/* attending */}
        <div>
          <span className="block text-sm font-medium text-ink">{t(content.form.attending)}</span>
          <p className="mt-1 text-xs text-ink/50">{t(content.form.attendingHint)}</p>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            {(
              [
                ['wedding', content.form.attendWedding],
                ['afterParty', content.form.attendAfterParty],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`flex flex-1 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
                  attending.has(value)
                    ? 'border-passport-gold bg-passport-gold/15'
                    : 'border-passport-green/20 bg-cream/60'
                }`}
              >
                <input
                  type="checkbox"
                  checked={attending.has(value)}
                  onChange={() => toggleAttending(value)}
                  className="h-4 w-4 accent-passport-green"
                />
                <span className="text-sm font-medium">{t(label)}</span>
              </label>
            ))}
          </div>
        </div>

        {/* high chair */}
        <div>
          <span className="block text-sm font-medium text-ink">{t(content.form.childChair)}</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {childChairOptions.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setChildChair(value)}
                aria-pressed={childChair === value}
                className={`rounded-lg border px-5 py-2 text-sm transition-colors ${
                  childChair === value
                    ? 'border-passport-gold bg-passport-gold/15 font-medium text-passport-green'
                    : 'border-passport-green/20 bg-cream/60 text-ink'
                }`}
              >
                {t(label)}
              </button>
            ))}
          </div>
          {childChair === 'other' && (
            <input
              type="text"
              value={childChairOther}
              onChange={(e) => setChildChairOther(e.target.value)}
              placeholder={t(content.form.childChairOtherPlaceholder)}
              className={inputClass}
            />
          )}
        </div>

        {/* vegetarian count */}
        <div>
          <label htmlFor="rsvp-veg" className="block text-sm font-medium text-ink">
            {t(content.form.vegetarianCount)}
          </label>
          <select
            id="rsvp-veg"
            value={vegetarianCount}
            onChange={(e) => setVegetarianCount(Math.max(0, Math.min(guestCount, Number(e.target.value) || 0)))}
            className="mt-2 w-28 rounded-lg border border-passport-green/20 bg-cream/60 px-4 py-2.5 text-ink outline-none focus:border-passport-gold focus:ring-2 focus:ring-passport-gold/30"
          >
            {Array.from({ length: guestCount + 1 }, (_, i) => i).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        {/* photo */}
        <div>
          <span className="block text-sm font-medium text-ink">{t(content.form.photo)}</span>
          <p className="mt-1 text-xs text-ink/50">{t(content.form.photoHint)}</p>

          <div className="mt-3 flex items-center gap-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="h-20 w-20 rounded-lg border border-passport-gold/40 object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-passport-green/30 bg-cream/60 px-7 py-3.5 text-sm font-medium text-passport-green"
            >
              {photoFile ? t(content.form.photoChange) : t(content.form.photoChoose)}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </div>
        </div>

        {error && <p className="text-sm text-blush-dark">{error}</p>}

        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={{ scale: 0.97 }}
          className="w-full rounded-full bg-passport-green py-3 font-medium text-passport-gold shadow-md disabled:opacity-60"
        >
          {submitting ? t(content.form.submitting) : t(content.form.submit)}
        </motion.button>
      </form>
    </motion.section>
  );
}
