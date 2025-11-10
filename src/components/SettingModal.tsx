import React from "react";
import { useSettingTimeStore, useRepeatStore } from "../store/timeStore";

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

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingModal: React.FC<SettingModalProps> = ({ isOpen, onClose }) => {
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
  const { repeatCount, setRepeatCount } = useRepeatStore();

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
            value={runningTimeMinutes}
            onChange={(e) => setRunningTimeMinutes(Number(e.target.value))}
          />{" "}
          <h2>:</h2>
          <SecondInput
            type="number"
            min="0"
            max="59"
            value={runningTimeSeconds}
            onChange={(e) => setRunningTimeSeconds(Number(e.target.value))}
          />
        </TimeContainer>
        <ModalContent> 휴식 시간 설정 </ModalContent>
        <TimeContainer>
          <MinuteInput
            type="number"
            min="0"
            max="59"
            value={restTimeMinutes}
            onChange={(e) => setRestTimeMinutes(Number(e.target.value))}
          />{" "}
          <h2>:</h2>
          <SecondInput
            type="number"
            min="0"
            max="59"
            value={restTimeSeconds}
            onChange={(e) => setRestTimeSeconds(Number(e.target.value))}
          />
        </TimeContainer>
        <ModalContent> 반복 횟수 설정 </ModalContent>
        <TimeContainer>
          <RepeatInput type="number" min="1" value={repeatCount} onChange={(e) => setRepeatCount(Number(e.target.value))} />
        </TimeContainer>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default SettingModal;
