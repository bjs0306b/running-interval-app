import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

import RunningPage from "../src/page/RunningPage";

// --- Mocking Setup ---

const mockTimerState = {
  minutes: 5,
  seconds: 0,
  isTimerActive: false,
  setMinutes: jest.fn(),
  setSeconds: jest.fn(),
  stopTimer: jest.fn(),
  toggleTimer: jest.fn(),
};

const mockSettingTimeState = {
  runningTimeMinutes: 5,
  runningTimeSeconds: 0,
  restTimeMinutes: 1,
  restTimeSeconds: 30,
};

const mockRepeatState = {
  repeatCount: 3,
};

const mockRunState = {
  isRunning: true,
  currentRepeat: 3,
  reset: jest.fn(),
  setCurrentRepeat: jest.fn(),
  setIsRunning: jest.fn(),
};

const mockUiState = {
  isSettingModalOpen: false,
  openSettingModal: jest.fn(),
  closeSettingModal: jest.fn(),
};

const mockAudioState = {
  initializeAudio: jest.fn(),
  playNotification: jest.fn(),
};

jest.mock("../src/store/timeStore", () => ({
  useTimerStore: (selector: (state: typeof mockTimerState) => any) =>
    selector ? selector(mockTimerState) : mockTimerState,
  useSettingTimeStore: (
    selector: (state: typeof mockSettingTimeState) => any
  ) => (selector ? selector(mockSettingTimeState) : mockSettingTimeState),
  useRepeatStore: (selector: (state: typeof mockRepeatState) => any) =>
    selector ? selector(mockRepeatState) : mockRepeatState,
}));

jest.mock("../src/store/runStateStore", () => ({
  useRunStateStore: (selector: (state: typeof mockRunState) => any) =>
    selector ? selector(mockRunState) : mockRunState,
}));

jest.mock("../src/store/uiStore", () => ({
  useUiStore: (selector: (state: typeof mockUiState) => any) =>
    selector ? selector(mockUiState) : mockUiState,
}));

jest.mock("../src/store/audioStore", () => ({
  useAudioStore: (selector: (state: typeof mockAudioState) => any) =>
    selector ? selector(mockAudioState) : mockAudioState,
}));

describe("RunningPage", () => {
  // 각 테스트가 실행되기 전에 모든 mock 함수의 호출 기록을 초기화합니다.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("초기 상태가 올바르게 렌더링된다", () => {
    render(<RunningPage />);

    const clockTimeElement = screen.getByTestId("clock-time-m");
    expect(clockTimeElement).toHaveTextContent("5");

    const clockTimeElementSeconds = screen.getByTestId("clock-time-s");
    expect(clockTimeElementSeconds).toHaveTextContent("0");

    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "setting" })).toBeInTheDocument();
  });

  test("Reset 버튼을 클릭하면 reset 함수가 호출된다", () => {
    render(<RunningPage />);

    const resetButton = screen.getByRole("button", { name: "Reset" });
    fireEvent.click(resetButton);

    expect(mockRunState.reset).toHaveBeenCalledTimes(1);
  });

  test("setting 버튼을 클릭하면 openSettingModal 함수가 호출된다", () => {
    render(<RunningPage />);

    const settingButton = screen.getByRole("button", { name: "setting" });
    fireEvent.click(settingButton);

    expect(mockUiState.openSettingModal).toHaveBeenCalledTimes(1);
  });

  test("타이머 로직이 담긴 useEffect가 설정값 변경 시 타이머를 초기화한다", () => {
    act(() => {
      render(<RunningPage />);
    });
    expect(mockTimerState.setMinutes).toHaveBeenCalledWith(5);
    expect(mockTimerState.setSeconds).toHaveBeenCalledWith(0);
    expect(mockTimerState.stopTimer).toHaveBeenCalled();
  });

  test("Start 버튼을 클릭하면 toggleTimer와 initializeAudio 함수가 호출된다", () => {
    render(<RunningPage />);

    const startButton = screen.getByRole("button", { name: "Start" });

    fireEvent.click(startButton);

    expect(mockAudioState.initializeAudio).toHaveBeenCalledTimes(1);
    expect(mockTimerState.toggleTimer).toHaveBeenCalledTimes(1);
  });
});
