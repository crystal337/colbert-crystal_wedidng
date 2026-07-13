// A soft two-note "ding" played when the boarding pass prints out.
// Synthesised with the Web Audio API so no audio file is needed.
export function playChime() {
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    const now = ctx.currentTime;
    const notes: [number, number][] = [
      [880, 0], // A5
      [1318.51, 0.12], // E6
    ];
    for (const [freq, offset] of notes) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      const start = now + offset;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.06, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.4);
    }
    setTimeout(() => ctx.close().catch(() => {}), 1200);
  } catch {
    /* audio is a nice-to-have; ignore any failure */
  }
}
