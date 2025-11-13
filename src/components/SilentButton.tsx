import React from "react";

// zustand store
import { useAudioStore } from "../store/audioStore";

// styled components
import { SilentButton as StyledSilentButton } from "../styling/Runningpage.styled";

// icons
import { FaVolumeUp } from "react-icons/fa";
import { MdVibration } from "react-icons/md";

const SilentButton: React.FC = () => {
  const isMuted = useAudioStore((state) => state.isMuted);
  const toggleMute = useAudioStore((state) => state.toggleMute);

  return (
    <StyledSilentButton onClick={toggleMute}>
      {isMuted ? <MdVibration size="2.5rem" /> : <FaVolumeUp size="2.5rem" />}
    </StyledSilentButton>
  );
};

export default SilentButton;