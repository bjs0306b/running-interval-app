import React from "react";

// zustand store
import { useSettingTimeStore, useRepeatStore } from "../store/timeStore";
import { useUiStore } from "../store/uiStore";

// styled components
import {
  ModalOverlay,
  ModalWrapper,
  ModalContent,
  CloseButton,
  MinuteInput,
  SecondInput,
  TimeContainer,
  RepeatInput,
} from "../styling/SettingModal.styled";

const SettingModal: React.FC = () => {
  const {
    runningTimeMinutes,
    runningTimeSeconds,
    restTimeMinutes,
    restTimeSeconds,
    setRunningTimeMinutes,
    setRunningTimeSeconds,
    setRestTimeMinutes,
    setRestTimeSeconds,
  } = useSettingTimeStore();

  const repeatCount = useRepeatStore((state) => state.repeatCount);
  const setRepeatCount = useRepeatStore((state) => state.setRepeatCount);
  const isOpen = useUiStore((state) => state.isSettingModalOpen);
  const onClose = useUiStore((state) => state.closeSettingModal);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalWrapper>
        <ModalContent> 러닝 시간 설정 </ModalContent>
        <TimeContainer>
          <MinuteInput
            type="number"
            min="0"
            max="59"
            value={String(runningTimeMinutes).padStart(2, "0")}
            onChange={(e) => setRunningTimeMinutes(Number(e.target.value))}
          />{" "}
          <h2>:</h2>
          <SecondInput
            type="number"
            min="0"
            max="59"
            value={String(runningTimeSeconds).padStart(2, "0")}
            onChange={(e) => setRunningTimeSeconds(Number(e.target.value))}
          />
        </TimeContainer>
        <ModalContent> 휴식 시간 설정 </ModalContent>
        <TimeContainer>
          <MinuteInput
            type="number"
            min="0"
            max="59"
            value={String(restTimeMinutes).padStart(2, "0")}
            onChange={(e) => setRestTimeMinutes(Number(e.target.value))}
          />{" "}
          <h2>:</h2>
          <SecondInput
            type="number"
            min="0"
            max="59"
            value={String(restTimeSeconds).padStart(2, "0")}
            onChange={(e) => setRestTimeSeconds(Number(e.target.value))}
          />
        </TimeContainer>
        <ModalContent> 반복 횟수 설정 </ModalContent>
        <TimeContainer>
          <RepeatInput
            type="number"
            min="1"
            value={repeatCount}
            onChange={(e) => setRepeatCount(Number(e.target.value))}
          />
        </TimeContainer>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default SettingModal;
