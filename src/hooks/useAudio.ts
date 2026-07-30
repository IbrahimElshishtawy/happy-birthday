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
  {
    id: 2,
    title: "A Thousand Years",
    artist: "Christina Perri",
    src: "",
  },
  {
    id: 3,
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "",
  },
  {
    id: 4,
    title: "You Are My Sunshine",
    artist: "Classic",
    src: "",
  },
];

export function useAudio(tracks: Track[] = DEFAULT_TRACKS) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(283); // default at 4:43 for Aicha
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [isLoop, setIsLoop] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [analyserData, setAnalyserData] = useState<number[]>(Array(32).fill(0));
  const hasInitializedStartTime = useRef(false);

  const currentTrack = tracks[currentTrackIndex] || tracks[0];

  // Initialize audio element
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.volume = volume;
    audio.loop = isLoop;

    if (currentTrack.src && audio.src !== currentTrack.src) {
      audio.src = currentTrack.src;
      audio.load();
      hasInitializedStartTime.current = false;
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      if (!hasInitializedStartTime.current && currentTrack.initialTime) {
        audio.currentTime = currentTrack.initialTime;
        setCurrentTime(currentTrack.initialTime);
        hasInitializedStartTime.current = true;
      }
    };
    const handleEnded = () => {
      if (!isLoop) handleNext();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack.src, isLoop]);

  // Visualizer simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setAnalyserData(Array.from({ length: 32 }, () => Math.random() * 100));
      }, 100);
    } else {
      setAnalyserData(Array(32).fill(0));
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (currentTrack.src) {
      if (!hasInitializedStartTime.current && currentTrack.initialTime) {
        audio.currentTime = currentTrack.initialTime;
        setCurrentTime(currentTrack.initialTime);
        hasInitializedStartTime.current = true;
      }
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (e) {
        console.log('Autoplay blocked by browser:', e);
      }
    } else {
      // Fallback for empty tracks
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  // Attempt autoplay on first user interaction anywhere on the page
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        play();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [isPlaying, play]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIdx);
    hasInitializedStartTime.current = false;
    setCurrentTime(tracks[nextIdx].initialTime || 0);
  }, [currentTrackIndex, tracks]);

  const handlePrev = useCallback(() => {
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrackIndex(prevIdx);
    hasInitializedStartTime.current = false;
    setCurrentTime(tracks[prevIdx].initialTime || 0);
  }, [currentTrackIndex, tracks]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((v: number) => {
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const toggleMute = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    setIsMuted((m) => !m);
  }, [isMuted]);

  const toggleLoop = useCallback(() => {
    setIsLoop((l) => !l);
    if (audioRef.current) audioRef.current.loop = !isLoop;
  }, [isLoop]);

  const selectTrack = useCallback(
    (index: number) => {
      setCurrentTrackIndex(index);
      hasInitializedStartTime.current = false;
      const targetTrack = tracks[index];
      setCurrentTime(targetTrack.initialTime || 0);
      if (audioRef.current && targetTrack.src) {
        audioRef.current.src = targetTrack.src;
        if (targetTrack.initialTime) {
          audioRef.current.currentTime = targetTrack.initialTime;
        }
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    },
    [tracks]
  );

  return {
    isPlaying,
    currentTrack,
    currentTrackIndex,
    tracks,
    currentTime,
    duration,
    volume,
    isLoop,
    isMuted,
    analyserData,
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
