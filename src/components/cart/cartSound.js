/**
 * Short two-note "ding" played when an item is added to the cart.
 * Synthesised with the Web Audio API so no audio file has to ship with the site.
 * Browsers only allow sound after a user gesture, which an Add to Cart click is.
 */
let ctx;

export function playAddToCartSound() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    ctx = ctx || new AudioCtx();
    if (ctx.state === "suspended") ctx.resume();

    const now = ctx.currentTime;
    const notes = [
      { freq: 880, start: 0, length: 0.18 }, // A5
      { freq: 1318.5, start: 0.12, length: 0.32 }, // E6
    ];

    notes.forEach(({ freq, start, length }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, now + start);
      gain.gain.exponentialRampToValueAtTime(0.18, now + start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + start + length);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + length + 0.05);
    });
  } catch {
    // Audio is a nicety; never let it break adding to the cart.
  }
}
