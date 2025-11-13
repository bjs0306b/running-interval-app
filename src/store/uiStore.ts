import { create } from "zustand";

interface UiState {
    isSettingModalOpen: boolean;
    openSettingModal: () => void;
    closeSettingModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
    isSettingModalOpen: false,  
    openSettingModal: () => set({ isSettingModalOpen: true }),
    closeSettingModal: () => set({ isSettingModalOpen: false }),
}));