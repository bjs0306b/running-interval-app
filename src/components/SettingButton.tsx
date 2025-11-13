import React from "react";

// zustand store
import { useUiStore } from "../store/uiStore";

// styled components
import { SettingButton as StyledSettingButton } from "../styling/Runningpage.styled";

const SettingButton: React.FC = () => {
  const openSettingModal = useUiStore((state) => state.openSettingModal);
  return (
    <StyledSettingButton onClick={openSettingModal}>
      setting
    </StyledSettingButton>
  );
};

export default SettingButton;
