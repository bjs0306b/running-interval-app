import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  deleteRecord: (id: string) => void;
}

const RECORDS_STORAGE_KEY = "runningRecords";

export const useRecordStore = create(
  persist<RecordState>(
    (set) => ({
      records: [],

      addRecord: (recordData) => {
        const newRecord: RunningRecord = {
          ...recordData,
          id: Date.now().toString(),
          date: new Date().toLocaleDateString(),
        };
        set((state) => ({ records: [newRecord, ...state.records] }));
      },

      deleteRecord: (id) => {
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        }));
      },
    }),
    {
      name: RECORDS_STORAGE_KEY, 
    }
  )
);