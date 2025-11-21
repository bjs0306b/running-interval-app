import React, { useEffect, useState } from "react";

// zustand store
import {
  useTimerStore,
  useSettingTimeStore,
  useRepeatStore,
} from "../store/timeStore";
import { useRecordStore } from "../store/recordStore";
import { useAudioStore } from "../store/audioStore";
import { useRunStateStore } from "../store/runStateStore";
import { useTutorialStore } from "../store/uiStore";

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

import {
  GuideBox,
  GuideButton,
  GuideButtonContainer,
  GuideText,
  TutorialOverlay,
} from "../styling/Tutorial.styled";

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
  const hasSeenTutorial = useTutorialStore((state) => state.hasSeenTutorial);
  const finishTutorial = useTutorialStore((state) => state.finishTutorial);

  const [tutorialStep, setTutorialStep] = useState(0);

  const tutorialSteps = [
    {
      targetId: "timer-display",
      text: "여기에서 남은 달리기 및 휴식 시간과 반복 횟수를 확인할 수 있어요.",
      position: { top: "58%", left: "10%"},
    },
    {
      targetId: "setting-button",
      text: "'setting' 버튼을 눌러 달리기와 휴식 시간을 설정할 수 있어요.",
      position: { top: "70%", left: "3%" },
    },
    {
      targetId: "start-button",
      text: "설정이 끝나면 'start' 버튼을 눌러 인터벌 트레이닝을 시작하세요.",
      position: { top: "70%", right: "3%" },
    },
    {
      targetId: "silent-button",
      text: "'sound' 버튼을 눌러 알림음 진동으로 바꿀 수 있어요.",
      position: { top: "15%", left: "3%" },
    },
    {
      targetId: "record-tab",
      text: "운동이 끝나면 기록 탭에서 지난 운동 기록을 확인할 수 있어요.",
      position: { top: "75%", right: "3%" },
    },
  ];

  const handleNextTutorial = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1);
    } else {
      finishTutorial();
    }
  };

  const renderTutorial = () => {
    if (hasSeenTutorial) return null;

    const currentStep = tutorialSteps[tutorialStep];

    return (
      <TutorialOverlay>
        <GuideBox {...currentStep.position}>
          <GuideText>{currentStep.text}</GuideText>
          <GuideButtonContainer>
            <GuideButton onClick={handleNextTutorial}>
              {tutorialStep === tutorialSteps.length - 1 ? "완료" : "다음"}
            </GuideButton>
          </GuideButtonContainer>
        </GuideBox>
      </TutorialOverlay>
    );
  };

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
      {renderTutorial()}
      <TimerWrapper>
        <SilentButton />
        {isCountDown ? (
          <ClockContainer>
            <CountDownTime>{countDown}</CountDownTime>
          </ClockContainer>
        ) : (
          <ClockContainer>
            <RepeatCount>{currentRepeat}</RepeatCount>
            <ClockTime data-testid="clock-time-m">
              {String(minutes).padStart(2, "0")}
            </ClockTime>
            :
            <ClockTime data-testid="clock-time-s">
              {String(seconds).padStart(2, "0")}
            </ClockTime>
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
