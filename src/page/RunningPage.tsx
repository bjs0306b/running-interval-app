import React, { useEffect, useState } from "react";
import {
  useTimerStore,
  useSettingTimeStore,
  useRepeatStore,
} from "../store/timeStore";
import SettingModal from "../components/SettingModal";
import { FaVolumeUp } from "react-icons/fa";
import { MdVibration } from "react-icons/md";

import {
  RunningPageContainer,
  TimerWrapper,
  ClockContainer,
  ClockTime,
  SettingButton,
  StartButton,
  SilentButton,
  RepeatCount,
  ResetButton,
} from "../styling/Runningpage.styled";

const RunningPage: React.FC = () => {
  const { minutes, seconds, setMinutes, setSeconds } = useTimerStore();
  const {
    runningTimeMinutes,
    runningTimeSeconds,
    restTimeMinutes,
    restTimeSeconds,
  } = useSettingTimeStore();
  const { repeatCount } = useRepeatStore();

  const [currentRepeat, setCurrentRepeat] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const playNotificationSound = () => {
    if(isMuted){
      triggerVibration();
      return;
    }
    if (!audioContext || !audioBuffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);
  };

  const triggerVibration = () => {
    if("vibrate" in navigator && !isMuted) {
      navigator.vibrate(500);
    }
  };

  const reset = () => {
    setIsTimerActive(false);
    setIsRunning(true);
    setMinutes(runningTimeMinutes);
    setSeconds(runningTimeSeconds);
    setCurrentRepeat(repeatCount);
  };

  const handleStartPause = () => {
    if (!audioContext) {
      const context = new window.AudioContext();
      setAudioContext(context);
    }
    setIsTimerActive(!isTimerActive);
  };

  useEffect(() => {
    setMinutes(runningTimeMinutes);
    setSeconds(runningTimeSeconds);
    setCurrentRepeat(repeatCount);
    setIsTimerActive(false);
  }, [
    runningTimeMinutes,
    runningTimeSeconds,
    setMinutes,
    setSeconds,
    repeatCount,
  ]);

  useEffect(() => {
    let interval: number | undefined = undefined;

    if (isTimerActive && currentRepeat > 0) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // 시간이 0이 되었을 때 (달리기 - 휴식 전환)
          playNotificationSound();
          if (isRunning) {
            const nextRepeat = currentRepeat - 1;
            setCurrentRepeat(nextRepeat);

            if (nextRepeat === 0) {
              setIsTimerActive(false);
              setIsRunning(true);
              setMinutes(runningTimeMinutes);
              setSeconds(runningTimeSeconds);
              return;
            }
          }
          setIsRunning((prevIsRunning) => {
            const nextIsRunning = !prevIsRunning;
            if (nextIsRunning) {
              // 다음 상태가 '달리기'일 때 (휴식 -> 달리기)
              setMinutes(runningTimeMinutes);
              setSeconds(runningTimeSeconds);
            } else {
              // 다음 상태가 '휴식'일 때 (달리기 -> 휴식)
              setMinutes(restTimeMinutes);
              setSeconds(restTimeSeconds);
            }
            return nextIsRunning;
          });
        }
      }, 1000);
    }

    // 컴포넌트 언마운트 또는 isTimerActive가 false가 되면 interval 정리
    return () => clearInterval(interval);
  }, [
    isTimerActive,
    minutes,
    seconds,
    isRunning,
    currentRepeat,
    restTimeMinutes,
    restTimeSeconds,
    runningTimeMinutes,
    runningTimeSeconds,
    setMinutes,
    setSeconds,
  ]);

  useEffect(() => {
    if (!audioContext) return;

    const loadSound = async () => {
      try {
        const response = await fetch("/notification.wav");
        const arrayBuffer = await response.arrayBuffer();
        const buffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer);
      } catch (error) {
        console.error("Error loading sound:", error);
      }
    };

    loadSound();
  }, [audioContext]);

  return (
    <RunningPageContainer>
      <TimerWrapper>
        <SilentButton onClick={() => setIsMuted(!isMuted)}>
          {isMuted ? <MdVibration size="2em" /> : <FaVolumeUp size="2rem" />}
        </SilentButton>

        <ClockContainer>
          <RepeatCount>{currentRepeat}</RepeatCount>
          <ClockTime>{minutes}</ClockTime>:<ClockTime>{seconds}</ClockTime>
        </ClockContainer>

        <SettingButton onClick={() => setIsModalOpen(true)}>
          setting
        </SettingButton>
        <ResetButton
          onClick={() => {
            reset();
          }}
        >
          Reset
        </ResetButton>
        <StartButton onClick={handleStartPause}>
          {isTimerActive ? "Pause" : "Start"}
        </StartButton>
      </TimerWrapper>
      <SettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </RunningPageContainer>
  );
};

export default RunningPage;
