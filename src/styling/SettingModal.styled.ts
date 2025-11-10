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
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  background-color: white;

  width: 100%;
  font-size: 1.5rem;
`;

export const RepeatInput = styled.input`
  font-size: 2rem;
  border: none;
  background-color: white;
  text-align: center;
`;