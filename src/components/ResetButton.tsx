import React from "react";

// zustand store
import { useRunStateStore } from "../store/runStateStore";

// styled components
import { ResetButton as StyledResetButton } from "../styling/Runningpage.styled";

const ResetButton: React.FC = () => {
  const reset = useRunStateStore((state) => state.reset);
  return <StyledResetButton onClick={reset}>Reset</StyledResetButton>;
};

export default ResetButton;
