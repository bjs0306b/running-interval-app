import { create } from "zustand";
import {
  useTimerStore,
  useSettingTimeStore,
  useRepeatStore,
} from "./timeStore";

interface RunState {
  isCountDown: boolean;
  countDown: number;
  isRunning: boolean;
  currentRepeat: number;
  isFirstStart: boolean;
  setIsCountDown: (isCountDown: boolean) => void;
  setCountDown: (countDown: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  setCurrentRepeat: (count: number) => void;
  setIsFirstStart: (isFirstStart: boolean) => void;
  reset: () => void;
}

export const useRunStateStore = create<RunState>((set) => ({
  isCountDown: false,
  countDown: 3,
  isRunning: true,
  currentRepeat: 0,
  isFirstStart: true,
  setIsCountDown: (isCountDown) => set({ isCountDown }),
  setCountDown: (countDown) => set({ countDown }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setCurrentRepeat: (count) => set({ currentRepeat: count }),
  setIsFirstStart: (isFirstStart) => set({ isFirstStart }),

  reset: () => {
    const { runningTimeMinutes, runningTimeSeconds } =
      useSettingTimeStore.getState();
    const { repeatCount } = useRepeatStore.getState();
    const { stopTimer, setMinutes, setSeconds } = useTimerStore.getState();

    stopTimer();
    set({
      isRunning: true,
      currentRepeat: repeatCount,
      isCountDown: false,
      countDown: 3,
      isFirstStart: true,
    });
    setMinutes(runningTimeMinutes);
    setSeconds(runningTimeSeconds);
  },
}));
