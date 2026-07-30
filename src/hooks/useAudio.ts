import { useState, useEffect, useRef, useCallback } from 'react';

export interface Track {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  duration?: number;
}

const DEMO_TRACKS: Track[] = [
  {
    id: 1,
    title: "Happy Birthday To You",
    artist: "Birthday Song",
    src: "",
    cover: "",
  },
  {
    id: 2,
    title: "A Thousand Years",
    artist: "Christina Perri",
    src: "",
    cover: "",
  },
  {
    id: 3,
    title: "Perfect",
    artist: "Ed Sheeran",
    src: "",
    cover: "",
  },
];

export function useAudio(tracks: Track[] = DEMO_TRACKS) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [isLoop, setIsLoop] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [analyserData, setAnalyserData] = useState<number[]>(Array(32).fill(0));

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.volume = volume;
    audio.loop = isLoop;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
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
  }, [isLoop]);

  // Simulate visualizer data when no audio
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
    if (!audioRef.current || !currentTrack.src) {
      // No real audio file, just simulate playing
      setIsPlaying(true);
      return;
    }
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (e) {
      console.log('Audio play error:', e);
      setIsPlaying(true); // Still show playing state
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else play();
  }, [isPlaying, play, pause]);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((i) => (i + 1) % tracks.length);
    setCurrentTime(0);
  }, [tracks.length]);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((i) => (i - 1 + tracks.length) % tracks.length);
    setCurrentTime(0);
  }, [tracks.length]);

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

  const selectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setCurrentTime(0);
    if (isPlaying) {
      setTimeout(() => play(), 100);
    }
  }, [isPlaying, play]);

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
