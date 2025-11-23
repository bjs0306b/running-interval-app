import React from "react";

// zustand store
import { useSettingTimeStore, useRepeatStore } from "../store/timeStore";
import { useUiStore } from "../store/uiStore";
import { usePresetStore, type Preset } from "../store/presetStore";

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
  PresetSection,
  PresetList,
  PresetItem,
  PresetName,
  PresetTitle,
  PresetDetails,
  SavePresetContainer,
  SavePresetInput,
  SavePresetButton,
  DeleteButton,
} from "../styling/SettingModal.styled";

const SettingModal: React.FC = () => {
  const runningTimeMinutes = useSettingTimeStore(
    (state) => state.runningTimeMinutes
  );
  const setRunningTimeMinutes = useSettingTimeStore(
    (state) => state.setRunningTimeMinutes
  );
  const runningTimeSeconds = useSettingTimeStore(
    (state) => state.runningTimeSeconds
  );
  const setRunningTimeSeconds = useSettingTimeStore(
    (state) => state.setRunningTimeSeconds
  );
  const restTimeMinutes = useSettingTimeStore((state) => state.restTimeMinutes);
  const setRestTimeMinutes = useSettingTimeStore(
    (state) => state.setRestTimeMinutes
  );
  const restTimeSeconds = useSettingTimeStore((state) => state.restTimeSeconds);
  const setRestTimeSeconds = useSettingTimeStore(
    (state) => state.setRestTimeSeconds
  );

  const repeatCount = useRepeatStore((state) => state.repeatCount);
  const setRepeatCount = useRepeatStore((state) => state.setRepeatCount);
  const isOpen = useUiStore((state) => state.isSettingModalOpen);
  const onClose = useUiStore((state) => state.closeSettingModal);

  const presets = usePresetStore((state) => state.presets);
  const addPreset = usePresetStore((state) => state.addPreset);
  const deletePreset = usePresetStore((state) => state.deletePreset);

  const [presetName, setPresetName] = React.useState("");

  const handleSavePreset = () => {
    addPreset({
      name: presetName,
      runningTimeMinutes,
      runningTimeSeconds,
      restTimeMinutes,
      restTimeSeconds,
      repeatCount,
    });
    setPresetName("");
  };

  const handleApplyPreset = (preset: Preset) => {
    setRunningTimeMinutes(preset.runningTimeMinutes);
    setRunningTimeSeconds(preset.runningTimeSeconds);
    setRestTimeMinutes(preset.restTimeMinutes);
    setRestTimeSeconds(preset.restTimeSeconds);
    setRepeatCount(preset.repeatCount);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalWrapper>
        <CloseButton onClick={onClose} data-testid="setting-close-button">x</CloseButton>
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
        <SavePresetContainer>
          <SavePresetInput
            type="text"
            placeholder="프리셋 이름"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
          />
          <SavePresetButton onClick={handleSavePreset}>
            프리셋 저장
          </SavePresetButton>
        </SavePresetContainer>
        <PresetSection>
          <ModalContent> 프리셋 </ModalContent>
          <PresetList>
            {presets.map((preset) => (
              <PresetItem key={preset.id}>
                <PresetName onClick={() => handleApplyPreset(preset)}>
                  <PresetTitle>{preset.name}</PresetTitle>
                  <PresetDetails>
                    {`(러닝: ${String(preset.runningTimeMinutes).padStart(
                      2,
                      "0"
                    )}:${String(preset.runningTimeSeconds).padStart(
                      2,
                      "0"
                    )}, 휴식: ${String(preset.restTimeMinutes).padStart(
                      2,
                      "0"
                    )}:${String(preset.restTimeSeconds).padStart(
                      2,
                      "0"
                    )}, 반복: ${preset.repeatCount}회)`}
                  </PresetDetails>
                </PresetName>
                <DeleteButton onClick={() => deletePreset(preset.id)}>
                  ×
                </DeleteButton>
              </PresetItem>
            ))}
          </PresetList>
        </PresetSection>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default SettingModal;
