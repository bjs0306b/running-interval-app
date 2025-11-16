import React, { useEffect } from "react";

// zustand store
import {
  useTimerStore,
  useSettingTimeStore,
  useRepeatStore,
} from "../store/timeStore";
import { useRecordStore } from "../store/recordStore";
import { useAudioStore } from "../store/audioStore";
import { useRunStateStore } from "../store/runStateStore";

// components
import StartButton from "../components/StartButton";
import SilentButton from "../components/SilentButton";
import SettingButton from "../components/SettingButton";
import SettingModal from "../components/SettingModal";
import ResetButton from "../components/ResetButton";

// styled components
import {
  RunningPageContainer,
  TimerWrapper,
  ClockContainer,
  ClockTime,
  RepeatCount,
  CountDownTime,
} from "../styling/Runningpage.styled";

const RunningPage: React.FC = () => {
  const minutes = useTimerStore((state) => state.minutes);
  const seconds = useTimerStore((state) => state.seconds);
  const setMinutes = useTimerStore((state) => state.setMinutes);
  const setSeconds = useTimerStore((state) => state.setSeconds);
  const isTimerActive = useTimerStore((state) => state.isTimerActive);
  const stopTimer = useTimerStore((state) => state.stopTimer);
  const runningTimeMinutes = useSettingTimeStore(
    (state) => state.runningTimeMinutes
  );
  const runningTimeSeconds = useSettingTimeStore(
    (state) => state.runningTimeSeconds
  );
  const restTimeMinutes = useSettingTimeStore((state) => state.restTimeMinutes);
  const restTimeSeconds = useSettingTimeStore((state) => state.restTimeSeconds);
  const repeatCount = useRepeatStore((state) => state.repeatCount);
  const addRecord = useRecordStore((state) => state.addRecord);
  const playNotification = useAudioStore((state) => state.playNotification);
  const currentRepeat = useRunStateStore((state) => state.currentRepeat);
  const setCurrentRepeat = useRunStateStore((state) => state.setCurrentRepeat);
  const isRunning = useRunStateStore((state) => state.isRunning);
  const setIsRunning = useRunStateStore((state) => state.setIsRunning);
  const isCountDown = useRunStateStore((state) => state.isCountDown);
  const setIsCountDown = useRunStateStore((state) => state.setIsCountDown);
  const countDown = useRunStateStore((state) => state.countDown);
  const setCountDown = useRunStateStore((state) => state.setCountDown);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);

  useEffect(() => {
    setMinutes(runningTimeMinutes);
    setSeconds(runningTimeSeconds);
    setCurrentRepeat(repeatCount);
    stopTimer();
  }, [
    runningTimeMinutes,
    runningTimeSeconds,
    setMinutes,
    setSeconds,
    repeatCount,
    setCurrentRepeat,
    stopTimer,
    setIsCountDown,
  ]);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isCountDown && countDown > 0) {
      interval = window.setInterval(() => {
        setCountDown(countDown - 1);
      }, 1000);
    } else if (isCountDown && countDown === 0) {
      setIsCountDown(false);
      toggleTimer();
      setCountDown(3);
    } else if (isTimerActive && currentRepeat > 0) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // 시간이 0이 되었을 때 (달리기 - 휴식 전환)

          playNotification();
          if (isRunning) {
            const nextRepeat = currentRepeat - 1;
            setCurrentRepeat(nextRepeat);

            if (nextRepeat === 0) {
              stopTimer();
              addRecord({
                runningTimeMinutes,
                runningTimeSeconds,
                restTimeMinutes,
                restTimeSeconds,
                repeatCount,
              });
              setMinutes(runningTimeMinutes);
              setSeconds(runningTimeSeconds);
              setCurrentRepeat(repeatCount);
              return;
            }
          }

          const nextIsRunning = !isRunning;
          setIsRunning(nextIsRunning);

          if (nextIsRunning) {
            setMinutes(runningTimeMinutes);
            setSeconds(runningTimeSeconds);
          } else {
            setMinutes(restTimeMinutes);
            setSeconds(restTimeSeconds);
          }
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    isCountDown,
    countDown,
    isTimerActive,
    currentRepeat,
    minutes,
    seconds,
    isRunning,
    runningTimeMinutes,
    runningTimeSeconds,
    restTimeMinutes,
    restTimeSeconds,
    repeatCount,
    setMinutes,
    setSeconds,
    setCurrentRepeat,
    setIsRunning,
    setIsCountDown,
    setCountDown,
    stopTimer,
    playNotification,
    addRecord,
    toggleTimer,
  ]);

  return (
    <RunningPageContainer>
      <TimerWrapper>
        <SilentButton />
        {isCountDown ? (
          <ClockContainer>
            <CountDownTime>{countDown}</CountDownTime>
          </ClockContainer>
        ) : (
          <ClockContainer>
            <RepeatCount>{currentRepeat}</RepeatCount>
            <ClockTime data-testid="clock-time-m">{String(minutes).padStart(2, "0")}</ClockTime>:
            <ClockTime data-testid="clock-time-s">{String(seconds).padStart(2, "0")}</ClockTime>
          </ClockContainer>
        )}
        <SettingButton />
        <ResetButton />
        <StartButton />
      </TimerWrapper>
      <SettingModal />
    </RunningPageContainer>
  );
};

export default RunningPage;
