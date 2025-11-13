import { create } from "zustand";
import { useTimerStore, useSettingTimeStore, useRepeatStore } from "./timeStore";

interface RunState {
  isRunning: boolean;
  currentRepeat: number;
  setIsRunning: (isRunning: boolean) => void;
  setCurrentRepeat: (count: number) => void;
  reset: () => void;
}

export const useRunStateStore = create<RunState>((set) => ({
  isRunning: true,
  currentRepeat: 0,
  setIsRunning: (isRunning) => set({ isRunning }),
  setCurrentRepeat: (count) => set({ currentRepeat: count }),

  reset: () => {
    const { runningTimeMinutes, runningTimeSeconds } = useSettingTimeStore.getState();
    const { repeatCount } = useRepeatStore.getState();
    const { stopTimer, setMinutes, setSeconds } = useTimerStore.getState();

    stopTimer();
    set({ isRunning: true, currentRepeat: repeatCount });
    setMinutes(runningTimeMinutes);
    setSeconds(runningTimeSeconds);
  },
}));