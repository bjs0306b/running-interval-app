import { create } from "zustand";

interface AudioState {
  audioContext: AudioContext | null;
  audioBuffer: AudioBuffer | null;
  isMuted: boolean;
  initializeAudio: () => void;
  toggleMute: () => void;
  playNotification: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  audioContext: null,
  audioBuffer: null,
  isMuted: false,

  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  initializeAudio: async () => {
    if (get().audioContext) return;

    const context = new window.AudioContext();
    set({ audioContext: context });

    try {
      const response = await fetch("/notification.wav");
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await context.decodeAudioData(arrayBuffer);
      set({ audioBuffer: buffer });
    } catch (error) {
      console.error("Error loading sound:", error);
    }
  },

  playNotification: () => {
    const { isMuted, audioContext, audioBuffer } = get();

    if (isMuted) {
      if ("vibrate" in navigator) {
        navigator.vibrate(200);
      }
      return;
    }

    if (!audioContext || !audioBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  },
}));