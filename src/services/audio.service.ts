import audioManifest from '../data/audio-manifest.json';

const FEMALE_VOICE_KEYWORDS = [
  'zira',      // Windows Microsoft Zira (en-US, female)
  'jenny',     // Windows / Edge Natural Jenny (en-US, female)
  'aria',      // Windows / Edge Natural Aria (en-US, female)
  'samantha',  // macOS / iOS Samantha (en-US, female)
  'victoria',  // macOS Victoria (en-US, female)
  'libby',     // Edge Libby (en-GB, female)
  'sonia',     // Edge Sonia (en-GB, female)
  'hazel',     // Windows Hazel (en-GB, female)
  'serena',    // macOS Serena (en-GB, female)
  'karen',     // iOS / macOS Karen (en-AU, female)
  'susan',     // Windows Susan
  'female',    // Google UK English Female / generic
  'eva',
  'clara',
  'emma',
];

const MALE_VOICE_KEYWORDS = [
  'david',
  'mark',
  'george',
  'guy',
  'daniel',
  'james',
  'richard',
  'male',
  'cosimo',
];

class AudioService {
  private speechAvailable: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private soundEnabled: boolean = true;
  private listeners: Array<() => void> = [];
  private currentAudio: HTMLAudioElement | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.speechAvailable = true;
      this.initVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoices();
          this.notifyListeners();
        };
      }
      // Also register standard event listener for maximum browser compatibility
      window.speechSynthesis.addEventListener?.('voiceschanged', () => {
        this.initVoices();
        this.notifyListeners();
      });
    }
  }

  public onVoicesUpdated(callback: () => void) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((cb) => {
      try {
        cb();
      } catch {
        // ignore callback error
      }
    });
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stop();
    }
  }

  public isAvailable(): boolean {
    return true; // Bundled native English audio clips are always available
  }

  public getEnglishVoices(): SpeechSynthesisVoice[] {
    if (!this.speechAvailable) return [];
    const voices = window.speechSynthesis.getVoices();
    return voices.filter((v) => {
      const lang = v.lang.toLowerCase();
      // Strictly exclude any Italian voices
      if (lang.startsWith('it') || v.name.toLowerCase().includes('elsa') || v.name.toLowerCase().includes('cosimo')) {
        return false;
      }
      return lang.startsWith('en') || lang.includes('en-') || lang.includes('en_');
    });
  }

  public selectBestFemaleVoice(): SpeechSynthesisVoice | null {
    const enVoices = this.getEnglishVoices();
    if (enVoices.length === 0) return null;

    // 1. Try to find a known natural/high-quality female English voice
    for (const name of FEMALE_VOICE_KEYWORDS) {
      const match = enVoices.find((v) => {
        const lowerName = v.name.toLowerCase();
        return (
          lowerName.includes(name) &&
          !MALE_VOICE_KEYWORDS.some((m) => lowerName.includes(m))
        );
      });
      if (match) return match;
    }

    // 2. Try to find any English voice that is not marked as male
    const nonMale = enVoices.filter(
      (v) => !MALE_VOICE_KEYWORDS.some((m) => v.name.toLowerCase().includes(m))
    );
    if (nonMale.length > 0) {
      const preferred = nonMale.find((v) => {
        const lang = v.lang.toLowerCase();
        return lang === 'en-us' || lang === 'en-gb';
      });
      return preferred || nonMale[0];
    }

    // 3. Fallback to any genuinely English voice
    return enVoices[0] || null;
  }

  private initVoices() {
    if (!this.speechAvailable) return;
    this.selectedVoice = this.selectBestFemaleVoice();
  }

  public getSelectedVoice(): SpeechSynthesisVoice | null {
    if (!this.selectedVoice) {
      this.selectedVoice = this.selectBestFemaleVoice();
    }
    return this.selectedVoice;
  }

  public setVoiceByName(voiceName: string) {
    const enVoices = this.getEnglishVoices();
    const found = enVoices.find((v) => v.name === voiceName);
    if (found) {
      this.selectedVoice = found;
      this.notifyListeners();
    }
  }

  public speak(text: string, rate = 0.85): boolean {
    if (!this.soundEnabled) {
      return false;
    }

    this.stop();

    const normalized = text.toLowerCase().trim();
    const manifestPath = (audioManifest as Record<string, string>)[normalized];

    // Priority 1: High-fidelity bundled native English audio file
    if (manifestPath) {
      try {
        const baseUrl =
          typeof import.meta !== 'undefined' && import.meta.env?.BASE_URL
            ? import.meta.env.BASE_URL
            : './';
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const audioSrc = manifestPath.startsWith('./')
          ? `${cleanBase}${manifestPath.slice(2)}`
          : manifestPath;

        const audio = new Audio(audioSrc);
        this.currentAudio = audio;
        audio.play().catch(() => {
          this.fallbackSpeak(text, rate);
        });
        return true;
      } catch {
        return this.fallbackSpeak(text, rate);
      }
    }

    // Priority 2: Verified English Web Speech or streamed English audio
    return this.fallbackSpeak(text, rate);
  }

  private fallbackSpeak(text: string, rate: number): boolean {
    const voiceToUse = this.selectedVoice || this.selectBestFemaleVoice();

    // Verify the voice is genuinely English and NEVER Italian
    const isVoiceEnglish =
      voiceToUse &&
      (voiceToUse.lang.toLowerCase().startsWith('en') ||
        voiceToUse.lang.toLowerCase().includes('en-') ||
        voiceToUse.lang.toLowerCase().includes('en_')) &&
      !voiceToUse.lang.toLowerCase().startsWith('it') &&
      !voiceToUse.name.toLowerCase().includes('cosimo') &&
      !voiceToUse.name.toLowerCase().includes('elsa');

    if (this.speechAvailable && isVoiceEnglish) {
      try {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voiceToUse;
        utterance.lang = voiceToUse.lang || 'en-US';
        utterance.rate = rate;
        utterance.pitch = 1.15; // friendly, cheerful, feminine teacher pitch

        window.speechSynthesis.speak(utterance);
        return true;
      } catch {
        // If Web Speech throws, fall through to streaming
      }
    }

    // Priority 3: Native English Audio Stream (guarantees 100% native accent, NEVER Italian)
    try {
      const streamUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=en&client=tw-ob`;
      const audio = new Audio(streamUrl);
      this.currentAudio = audio;
      audio.play().catch(() => {});
      return true;
    } catch {
      return false;
    }
  }

  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
    if (this.speechAvailable) {
      window.speechSynthesis.cancel();
    }
  }

  // Play simple procedural UI sound effects using Web Audio API
  public playSoundEffect(type: 'correct' | 'wrong' | 'pop' | 'star' | 'coin') {
    if (!this.soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;

      if (type === 'correct') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 0.22);
        });
      } else if (type === 'wrong') {
        [349.23, 311.13].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.12);
          gain.gain.setValueAtTime(0.12, now + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.12);
          osc.stop(now + idx * 0.12 + 0.28);
        });
      } else if (type === 'star') {
        [587.33, 880.0, 1174.66].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.12, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.28);
        });
      } else if (type === 'coin') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(987.77, now);
        osc.frequency.setValueAtTime(1318.51, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === 'pop') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      }
    } catch {
      // AudioContext not supported
    }
  }
}

export const audioService = new AudioService();
