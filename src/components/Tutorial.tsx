import React, { useState } from "react";

// zustand store

import { useTutorialStore } from "../store/uiStore";

// styled components
import {
  GuideBox,
  GuideButton,
  GuideButtonContainer,
  GuideText,
  TutorialOverlay,
} from "../styling/Tutorial.styled";

const Tutorial: React.FC = () => {
  const hasSeenTutorial = useTutorialStore((state) => state.hasSeenTutorial);
  const finishTutorial = useTutorialStore((state) => state.finishTutorial);

  const [tutorialStep, setTutorialStep] = useState(0);

  const tutorialSteps = [
    {
      targetId: "timer-display",
      text: "여기에서 남은 달리기 및 휴식 시간과 반복 횟수를 확인할 수 있어요.",
      position: { top: "58%", left: "10%" },
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

export default Tutorial;
