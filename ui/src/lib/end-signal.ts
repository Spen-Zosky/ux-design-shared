/**
 * Il segnale sonoro di fine lavoro (Enzo, 2026-11-16): essenziale, discreto, disattivabile, e
 * rispettoso delle preferenze del browser.
 *
 * - Due note brevi e morbide (circa 0,35 s in tutto) a volume basso, generate con Web Audio: niente
 *   file da scaricare.
 * - Si disattiva per persona con `setEndSignalEnabled(false)`; la scelta resta nel browser.
 * - Non suona se la persona non l'ha attivo, se il browser non ha Web Audio, o se il browser blocca
 *   l'audio senza un gesto dell'utente (in quel caso la promessa si risolve con `false`).
 */

const CHIAVE = 'heuresys-segnale-fine';

function storage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

/** Vero se la persona non ha spento il segnale (acceso per impostazione predefinita). */
export function isEndSignalEnabled(): boolean {
  try {
    return storage()?.getItem(CHIAVE) !== 'spento';
  } catch {
    return true;
  }
}

export function setEndSignalEnabled(acceso: boolean): void {
  try {
    storage()?.setItem(CHIAVE, acceso ? 'acceso' : 'spento');
  } catch {
    /* il browser non tiene la scelta: resta il valore predefinito */
  }
}

type AudioCtor = typeof AudioContext;

/** Suona il segnale di fine. Risolve `true` se ha suonato, `false` se non poteva o non doveva. */
export async function playEndSignal(opts: { volume?: number } = {}): Promise<boolean> {
  if (!isEndSignalEnabled() || typeof window === 'undefined') return false;
  const Ctor: AudioCtor | undefined =
    (window as unknown as { AudioContext?: AudioCtor }).AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
  if (!Ctor) return false;
  try {
    const ctx = new Ctor();
    if (ctx.state === 'suspended') await ctx.resume();
    if (ctx.state !== 'running') {
      void ctx.close();
      return false;
    }
    const volume = Math.max(0, Math.min(0.3, opts.volume ?? 0.08));
    const t0 = ctx.currentTime;
    const note = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, t0 + start);
      gain.gain.linearRampToValueAtTime(volume, t0 + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + start + dur);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t0 + start);
      osc.stop(t0 + start + dur + 0.02);
    };
    note(880, 0, 0.16);
    note(1318.5, 0.12, 0.22);
    setTimeout(() => void ctx.close(), 600);
    return true;
  } catch {
    return false;
  }
}
