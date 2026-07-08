import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { content } from '../content';
import { BiText } from './BiText';
import { useLang } from '../i18n';
import { fileToCompressedBase64 } from '../lib/image';
import { submitRSVP } from '../lib/submit';

type Attending = 'wedding' | 'afterParty';

export function RSVPForm({ onSubmitted }: { onSubmitted: () => void }) {
  const { t } = useLang();
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attending, setAttending] = useState<Set<Attending>>(new Set());
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      await submitRSVP({
        name: name.trim(),
        guestCount,
        attending: Array.from(attending),
        photoBase64,
        photoFileName: photoFile?.name,
      });

      onSubmitted();
    } catch (err) {
      console.error(err);
      setError(t(content.form.errorGeneric));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      className="mx-auto w-full max-w-xl px-4 py-10"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-passport-gold/40 bg-white/70 p-6 shadow-sm backdrop-blur-sm sm:p-8"
      >
        <BiText
          text={content.form.heading}
          as="h2"
          className="text-center text-2xl font-semibold text-passport-green"
        />

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
            className="mt-2 w-full rounded-lg border border-passport-green/20 bg-cream/60 px-4 py-2.5 text-ink outline-none focus:border-passport-gold focus:ring-2 focus:ring-passport-gold/30"
          />
        </div>

        {/* guest count */}
        <div>
          <label htmlFor="rsvp-count" className="block text-sm font-medium text-ink">
            {t(content.form.guestCount)}
          </label>
          <input
            id="rsvp-count"
            type="number"
            min={1}
            max={20}
            value={guestCount}
            onChange={(e) => setGuestCount(Math.max(1, Number(e.target.value) || 1))}
            className="mt-2 w-28 rounded-lg border border-passport-green/20 bg-cream/60 px-4 py-2.5 text-ink outline-none focus:border-passport-gold focus:ring-2 focus:ring-passport-gold/30"
          />
        </div>

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

        {/* photo */}
        <div>
          <span className="block text-sm font-medium text-ink">{t(content.form.photo)}</span>
          <p className="mt-1 text-xs text-ink/50">{t(content.form.photoHint)}</p>

          <div className="mt-3 flex items-center gap-4">
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="h-16 w-16 rounded-lg border border-passport-gold/40 object-cover"
              />
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-lg border border-passport-green/30 bg-cream/60 px-4 py-2 text-sm text-passport-green"
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
