import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  position: relative;
`;

export const ModalContent = styled.div`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export const TimeContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const MinuteInput = styled.input`
  font-size: 2rem;

  border: none;
  background-color: white;
  text-align: center;
`;

export const SecondInput = styled.input`
  font-size: 2rem;

  border: none;

  background-color: white;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 2rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: #aaa;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;

export const RepeatInput = styled.input`
  font-size: 2rem;
  border: none;
  background-color: white;
  text-align: center;
`;

export const PresetSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid #eee;
`;

export const PresetList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.5rem 0;
  max-height: 150px;
  overflow-y: auto;
`;

export const PresetItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #f7f7f7;
  }
`;

export const PresetName = styled.div`
  display: flex;
  flex-direction: column; // 이름과 설명을 세로로 정렬합니다.
  cursor: pointer;
  flex-grow: 1;
`;

export const PresetTitle = styled.span`
  font-size: 1.1rem; // 원하는 폰트 크기로 조절
  font-weight: 600;
  color: #333;
`;

export const PresetDetails = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-top: 4px;
`;

export const SavePresetContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const SavePresetInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #fff;
  transition: border-color 0.2s;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    border-color: #aaa;
  }
`;

export const SavePresetButton = styled.button`
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #000; 
  }
`;

export const DeleteButton = styled.button`
  top: 0.5rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #aaa;
  cursor: pointer;
  line-height: 1;

  &:hover {
    color: #333;
  }
`;
