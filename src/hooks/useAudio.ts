import { useState, useEffect, useRef, useCallback } from 'react';
import aichaAudio from '@/assets/music/Aicha (Live A Bercy 1_2_3 Soleils)(M4A_128K).m4a';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  duration?: number;
  initialTime?: number;
}

export const DEFAULT_TRACKS: Track[] = [
  {
    id: 1,
    title: "Aïcha (Live à Bercy)",
    artist: "Khaled, Faudel & Rachid Taha",
    src: aichaAudio,
    initialTime: 283, // 4:43 start time
  },
];

// Single global HTMLAudioElement instance shared across the entire app
let globalAudio: HTMLAudioElement | null = null;
let globalHasInitializedStartTime = false;

// Global state listeners
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

// Global state variables
let globalIsPlaying = false;
let globalCurrentTrackIndex = 0;
let globalCurrentTime = 283;
let globalDuration = 0;
let globalVolume = 0.8;
let globalIsLoop = true;
let globalIsMuted = false;

function getGlobalAudio(): HTMLAudioElement {
  if (!globalAudio) {
    globalAudio = new Audio(DEFAULT_TRACKS[0].src);
    globalAudio.volume = globalVolume;
    globalAudio.loop = globalIsLoop;

    globalAudio.addEventListener('timeupdate', () => {
      if (globalAudio) {
        globalCurrentTime = globalAudio.currentTime;
        notifyListeners();
      }
    });

    globalAudio.addEventListener('loadedmetadata', () => {
      if (globalAudio) {
        globalDuration = globalAudio.duration;
        if (!globalHasInitializedStartTime && DEFAULT_TRACKS[0].initialTime) {
          globalAudio.currentTime = DEFAULT_TRACKS[0].initialTime;
          globalCurrentTime = DEFAULT_TRACKS[0].initialTime;
          globalHasInitializedStartTime = true;
        }
        notifyListeners();
      }
    });

    globalAudio.addEventListener('play', () => {
      globalIsPlaying = true;
      notifyListeners();
    });

    globalAudio.addEventListener('pause', () => {
      globalIsPlaying = false;
      notifyListeners();
    });

    globalAudio.addEventListener('ended', () => {
      globalIsPlaying = false;
      notifyListeners();
    });
  }
  return globalAudio;
}

export function startGlobalAudioAt443() {
  const audio = getGlobalAudio();
  if (!globalHasInitializedStartTime && DEFAULT_TRACKS[0].initialTime) {
    audio.currentTime = DEFAULT_TRACKS[0].initialTime;
    globalCurrentTime = DEFAULT_TRACKS[0].initialTime;
    globalHasInitializedStartTime = true;
  }
  audio
    .play()
    .then(() => {
      globalIsPlaying = true;
      notifyListeners();
    })
    .catch((err) => {
      console.log('Autoplay deferred until user interaction:', err);
    });
}

// Auto-trigger on page load and any user interaction
if (typeof window !== 'undefined') {
  const attemptAutoplay = () => {
    startGlobalAudioAt443();
  };

  // Attempt immediately on module load
  setTimeout(attemptAutoplay, 100);

  // Attach global event listeners for instant start on any user gesture
  const events = ['click', 'touchstart', 'mousedown', 'keydown', 'scroll', 'mousemove', 'pointerdown'];
  const handleGesture = () => {
    attemptAutoplay();
    events.forEach((evt) => window.removeEventListener(evt, handleGesture));
  };

  events.forEach((evt) => window.addEventListener(evt, handleGesture, { once: true }));
}

export function useAudio(tracks: Track[] = DEFAULT_TRACKS) {
  const [, setTick] = useState(0);

  useEffect(() => {
    const update = () => setTick((t) => t + 1);
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  // Ensure audio is initialized
  useEffect(() => {
    getGlobalAudio();
  }, []);

  const play = useCallback(async () => {
    startGlobalAudioAt443();
  }, []);

  const pause = useCallback(() => {
    if (globalAudio) {
      globalAudio.pause();
      globalIsPlaying = false;
      notifyListeners();
    }
  }, []);

  const toggle = useCallback(() => {
    if (globalIsPlaying) pause();
    else play();
  }, [play, pause]);

  const handleNext = useCallback(() => {
    const nextIdx = (globalCurrentTrackIndex + 1) % tracks.length;
    globalCurrentTrackIndex = nextIdx;
    globalHasInitializedStartTime = false;
    const targetTrack = tracks[nextIdx] || tracks[0];
    if (globalAudio && targetTrack.src) {
      globalAudio.src = targetTrack.src;
      if (targetTrack.initialTime) {
        globalAudio.currentTime = targetTrack.initialTime;
        globalCurrentTime = targetTrack.initialTime;
      }
      globalAudio.play().catch(() => {});
    }
    notifyListeners();
  }, [tracks]);

  const handlePrev = useCallback(() => {
    const prevIdx = (globalCurrentTrackIndex - 1 + tracks.length) % tracks.length;
    globalCurrentTrackIndex = prevIdx;
    globalHasInitializedStartTime = false;
    const targetTrack = tracks[prevIdx] || tracks[0];
    if (globalAudio && targetTrack.src) {
      globalAudio.src = targetTrack.src;
      if (targetTrack.initialTime) {
        globalAudio.currentTime = targetTrack.initialTime;
        globalCurrentTime = targetTrack.initialTime;
      }
      globalAudio.play().catch(() => {});
    }
    notifyListeners();
  }, [tracks]);

  const seek = useCallback((time: number) => {
    if (globalAudio) {
      globalAudio.currentTime = time;
      globalCurrentTime = time;
      notifyListeners();
    }
  }, []);

  const setVolume = useCallback((v: number) => {
    globalVolume = v;
    if (globalAudio) globalAudio.volume = v;
    notifyListeners();
  }, []);

  const toggleMute = useCallback(() => {
    globalIsMuted = !globalIsMuted;
    if (globalAudio) globalAudio.muted = globalIsMuted;
    notifyListeners();
  }, []);

  const toggleLoop = useCallback(() => {
    globalIsLoop = !globalIsLoop;
    if (globalAudio) globalAudio.loop = globalIsLoop;
    notifyListeners();
  }, []);

  const selectTrack = useCallback(
    (index: number) => {
      globalCurrentTrackIndex = index;
      globalHasInitializedStartTime = false;
      const targetTrack = tracks[index] || tracks[0];
      if (globalAudio && targetTrack.src) {
        globalAudio.src = targetTrack.src;
        if (targetTrack.initialTime) {
          globalAudio.currentTime = targetTrack.initialTime;
          globalCurrentTime = targetTrack.initialTime;
        }
        globalAudio.play().then(() => {
          globalIsPlaying = true;
          notifyListeners();
        }).catch(() => {});
      }
      notifyListeners();
    },
    [tracks]
  );

  const currentTrack = tracks[globalCurrentTrackIndex] || tracks[0] || DEFAULT_TRACKS[0];

  return {
    isPlaying: globalIsPlaying,
    currentTrack,
    currentTrackIndex: globalCurrentTrackIndex,
    tracks,
    currentTime: globalCurrentTime,
    duration: globalDuration,
    volume: globalVolume,
    isLoop: globalIsLoop,
    isMuted: globalIsMuted,
    analyserData: globalIsPlaying ? Array.from({ length: 32 }, () => Math.random() * 100) : Array(32).fill(0),
    play,
    pause,
    toggle,
    handleNext,
    handlePrev,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
    selectTrack,
  };
}
