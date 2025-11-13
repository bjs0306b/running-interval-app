import React from "react";

// zustand store
import { useTimerStore } from "../store/timeStore";
import { useAudioStore } from "../store/audioStore"; 

// styled components
import { StartButton as StyledStartButton } from "../styling/Runningpage.styled";

const StartButton: React.FC = () => {
  
  const isTimerActive = useTimerStore((state) => state.isTimerActive);
  const toggleTimer = useTimerStore((state) => state.toggleTimer);
  const initializeAudio = useAudioStore((state) => state.initializeAudio);

  const handleClick = () => {
    initializeAudio();
    toggleTimer();
  };

  return (
    <StyledStartButton onClick={handleClick}>
      {isTimerActive ? "Pause" : "Start"}
    </StyledStartButton>
  );
};

export default StartButton;