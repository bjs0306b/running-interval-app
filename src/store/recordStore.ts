import { create } from "zustand";

export interface RunningRecord {
  id: string; 
  date: string; 
  runningTimeMinutes: number;
  runningTimeSeconds: number;
  restTimeMinutes: number;
  restTimeSeconds: number;
  repeatCount: number;
}

interface RecordState {
  records: RunningRecord[];
  addRecord: (newRecord: Omit<RunningRecord, "id" | "date">) => void;
  loadRecords: () => void;
}

const RECORDS_STORAGE_KEY = "runningRecords";

export const useRecordStore = create<RecordState>((set, get) => ({
  records: [],

  loadRecords: () => {
    const savedRecords = localStorage.getItem(RECORDS_STORAGE_KEY);
    if (savedRecords) {
      set({ records: JSON.parse(savedRecords) });
    }
  },

  addRecord: (recordData) => {
    const newRecord: RunningRecord = {
      ...recordData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
    };

    const updatedRecords = [newRecord, ...get().records];
    set({ records: updatedRecords });

    localStorage.setItem(RECORDS_STORAGE_KEY, JSON.stringify(updatedRecords));
  },
}));