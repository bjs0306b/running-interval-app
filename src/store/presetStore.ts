import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Preset {
  id: string;
  name: string;
  runningTimeMinutes: number;
  runningTimeSeconds: number;
  restTimeMinutes: number;
  restTimeSeconds: number;
  repeatCount: number;
}

interface PresetState {
  presets: Preset[];
  addPreset: (preset: Omit<Preset, "id">) => void;
  deletePreset: (id: string) => void;
}

export const usePresetStore = create(
  persist<PresetState>(
    (set) => ({
      presets: [],
      addPreset: (newPresetData) =>
        set((state) => ({
          presets: [
            { id: new Date().toISOString(), ...newPresetData },
            ...state.presets,
          ],
        })),
      deletePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((preset) => preset.id !== id),
        })),
    }),
    {
      name: "preset-storage", // localStorage에 저장될 키
    }
  )
);