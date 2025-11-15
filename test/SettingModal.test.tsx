import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import SettingModal from "../src/components/SettingModal";

// --- Mocking Setup ---

let isModalOpen = false;

const mockSettingTimeState = {
  runningTimeMinutes: 5,
  runningTimeSeconds: 10,
  restTimeMinutes: 1,
  restTimeSeconds: 20,
  setRunningTimeMinutes: jest.fn(),
  setRunningTimeSeconds: jest.fn(),
  setRestTimeMinutes: jest.fn(),
  setRestTimeSeconds: jest.fn(),
};

const mockRepeatState = {
  repeatCount: 3,
  setRepeatCount: jest.fn(),
};

const mockUiState = {
  isSettingModalOpen: isModalOpen,
  closeSettingModal: jest.fn(),
};

jest.mock("../src/store/timeStore", () => ({
  useSettingTimeStore: (
    selector: (state: typeof mockSettingTimeState) => any
  ) => (selector ? selector(mockSettingTimeState) : mockSettingTimeState),
  useRepeatStore: (selector: (state: typeof mockRepeatState) => any) =>
    selector ? selector(mockRepeatState) : mockRepeatState,
}));

jest.mock("../src/store/uiStore", () => ({
  useUiStore: (selector: (state: typeof mockUiState) => any) => {
    const dynamicUiState = { ...mockUiState, isSettingModalOpen: isModalOpen };
    return selector ? selector(dynamicUiState) : dynamicUiState;
  },
}));

describe("SettingModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("모달이 닫혀 있을 때 (isSettingModalOpen: false)", () => {
    beforeEach(() => {
      isModalOpen = false;
    });

    test("모달의 어떤 내용도 렌더링되지 않는다", () => {
      render(<SettingModal />);
      expect(screen.queryByText("러닝 시간 설정")).not.toBeInTheDocument();
    });
  });

  describe("모달이 열려 있을 때 (isSettingModalOpen: true)", () => {
    beforeEach(() => {
      isModalOpen = true;
    });

    test("모달의 모든 컨텐츠와 초기값이 올바르게 렌더링된다", () => {
      render(<SettingModal />);

      expect(screen.getByText("러닝 시간 설정")).toBeInTheDocument();
      expect(screen.getByText("휴식 시간 설정")).toBeInTheDocument();
      expect(screen.getByText("반복 횟수 설정")).toBeInTheDocument();

      expect(screen.getByDisplayValue("5")).toBeInTheDocument();
      expect(screen.getByDisplayValue("10")).toBeInTheDocument();
      expect(screen.getByDisplayValue("1")).toBeInTheDocument();
      expect(screen.getByDisplayValue("20")).toBeInTheDocument();
      expect(screen.getByDisplayValue("3")).toBeInTheDocument();

      expect(screen.getByRole("button", { name: "닫기" })).toBeInTheDocument();
    });

    test("러닝 시간(분) input을 변경하면 setRunningTimeMinutes 함수가 호출된다", () => {
      render(<SettingModal />);

      const runningMinutesInput = screen.getByDisplayValue("5");
      fireEvent.change(runningMinutesInput, { target: { value: "30" } });

      expect(mockSettingTimeState.setRunningTimeMinutes).toHaveBeenCalledWith(
        30
      );
    });

    test("반복 횟수 input을 변경하면 setRepeatCount 함수가 호출된다", () => {
      render(<SettingModal />);

      const repeatInput = screen.getByDisplayValue("3");
      fireEvent.change(repeatInput, { target: { value: "10" } });

      expect(mockRepeatState.setRepeatCount).toHaveBeenCalledWith(10);
    });

    test("닫기 버튼을 클릭하면 closeSettingModal 함수가 호출된다", () => {
      render(<SettingModal />);

      const closeButton = screen.getByRole("button", { name: "닫기" });
      fireEvent.click(closeButton);

      expect(mockUiState.closeSettingModal).toHaveBeenCalledTimes(1);
    });
  });
});
