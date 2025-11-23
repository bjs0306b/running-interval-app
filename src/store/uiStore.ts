import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UiState {
    isSettingModalOpen: boolean;
    openSettingModal: () => void;
    closeSettingModal: () => void;
}

interface TutorialState {
    hasSeenTutorial: boolean;
    finishTutorial: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    isSettingModalOpen: false,  
    openSettingModal: () => set({ isSettingModalOpen: true }),
    closeSettingModal: () => set({ isSettingModalOpen: false }),
}));

export const useTutorialStore = create(
    persist<TutorialState>(
        (set) => ({ 
            hasSeenTutorial: false,
            finishTutorial: () => set({ hasSeenTutorial: true }),
         }),
         {
            name: "tutorial-storage",
         }
    )
);     