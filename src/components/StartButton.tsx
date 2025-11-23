import React from "react";

// zustand store
import { useTimerStore } from "../store/timeStore";
import { useAudioStore } from "../store/audioStore"; 
import { useRunStateStore } from "../store/runStateStore";

// styled components
import { StartButton as StyledStartButton } from "../styling/Runningpage.styled";

const StartButton: React.FC = () => {
  
  const isTimerActive = useTimerStore((state) => state.isTimerActive);
  const initializeAudio = useAudioStore((state) => state.initializeAudio);
  const setIsCountDown = useRunStateStore((state) => state.setIsCountDown);
  const isCountDown = useRunStateStore((state) => state.isCountDown);
  const isFirstStart = useRunStateStore((state) => state.isFirstStart);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);
  const setIsFirstStart = useRunStateStore((state) => state.setIsFirstStart);

  const handleClick = () => {
    initializeAudio();
    if(isFirstStart){
      setIsCountDown(true);
      setIsFirstStart(false);
    }
    else toggleTimer();
  };

  return (
    <StyledStartButton onClick={handleClick} data-testid="start-button">
      {isTimerActive || isCountDown ? "Pause" : "Start"}
    </StyledStartButton>
  );
};

export default StartButton;