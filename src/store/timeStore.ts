import { create } from "zustand";

interface TimerState {
  minutes: number;
  seconds: number;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
}

interface SettingTimeState {
  runningTimeMinutes: number;
  runningTimeSeconds: number;
  restTimeMinutes: number;
  restTimeSeconds: number;
  setRunningTimeMinutes: (minutes: number) => void;
  setRunningTimeSeconds: (seconds: number) => void;
  setRestTimeMinutes: (minutes: number) => void;
  setRestTimeSeconds: (seconds: number) => void;
}

interface RepeatState {
  repeatCount: number;
  setRepeatCount: (count: number) => void;
}

export const useTimerStore = create<TimerState>((set) => ({
  minutes: 0,
  seconds: 0,
  setMinutes: (minutes) => set({ minutes }),
  setSeconds: (seconds) => set({ seconds }),
}));

export const useSettingTimeStore = create<SettingTimeState>((set) => ({
  runningTimeMinutes: 2,
  runningTimeSeconds: 0,
  restTimeMinutes: 1,
  restTimeSeconds: 0,
  setRunningTimeMinutes: (minutes) => set({ runningTimeMinutes: minutes }),
  setRunningTimeSeconds: (seconds) => set({ runningTimeSeconds: seconds }),
  setRestTimeMinutes: (minutes) => set({ restTimeMinutes: minutes }),
  setRestTimeSeconds: (seconds) => set({ restTimeSeconds: seconds }),
}));

export const useRepeatStore = create<RepeatState>((set) => ({
  repeatCount: 3,
  setRepeatCount: (count) => set({ repeatCount: count }),
}));