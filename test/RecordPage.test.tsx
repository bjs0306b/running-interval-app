import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import RecordPage from "../src/page/RecordPage";

// --- Mocking Setup ---

let mockRecords: any[] = [];

jest.mock("../src/store/recordStore", () => ({
  useRecordStore: (selector: (state: { records: any[] }) => any) => {
    const state = { records: mockRecords };
    return selector ? selector(state) : state;
  },
}));

describe("RecordPage", () => {
  describe("기록이 없을 때", () => {
    beforeEach(() => {
      mockRecords = [];
    });

    test("'아직 기록이 없습니다.' 메시지가 렌더링된다", () => {
      render(<RecordPage />);
      expect(screen.getByText("아직 기록이 없습니다.")).toBeInTheDocument();
    });

    test("기록 카드는 렌더링되지 않는다", () => {
      render(<RecordPage />);
      expect(screen.queryByText(/2025/)).not.toBeInTheDocument();
    });
  });

  describe("기록이 있을 때", () => {
    const sampleRecords = [
      {
        id: "1",
        date: "2025-11-16",
        runningTimeMinutes: 5,
        runningTimeSeconds: 0,
        restTimeMinutes: 1,
        restTimeSeconds: 30,
        repeatCount: 3,
      },
      {
        id: "2",
        date: "2025-11-15",
        runningTimeMinutes: 10,
        runningTimeSeconds: 0,
        restTimeMinutes: 2,
        restTimeSeconds: 0,
        repeatCount: 5,
      },
    ];

    beforeEach(() => {
      mockRecords = sampleRecords;
    });

    test("모든 기록 카드의 내용이 올바르게 렌더링된다", () => {
      render(<RecordPage />);

      expect(screen.getByText("2025-11-16")).toBeInTheDocument();
      expect(screen.getByText(/달리기: 05분 00초/)).toBeInTheDocument();
      expect(screen.getByText(/휴식: 01분 30초/)).toBeInTheDocument();
      expect(screen.getByText(/반복: 3회/)).toBeInTheDocument();

      expect(screen.getByText("2025-11-15")).toBeInTheDocument();
      expect(screen.getByText(/달리기: 10분 00초/)).toBeInTheDocument();
      expect(screen.getByText(/휴식: 02분 00초/)).toBeInTheDocument();
      expect(screen.getByText(/반복: 5회/)).toBeInTheDocument();
    });

    test("'아직 기록이 없습니다.' 메시지는 렌더링되지 않는다", () => {
      render(<RecordPage />);
      expect(
        screen.queryByText("아직 기록이 없습니다.")
      ).not.toBeInTheDocument();
    });
  });
});
