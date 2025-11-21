import styled from "styled-components";

export const TutorialOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

interface GuideBoxProps {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
}

export const GuideBox = styled.div<GuideBoxProps>`
  position: absolute;
  background-color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 300px;
  z-index: 1001;

    top: ${(props) => props.top};
    left: ${(props) => props.left};
    right: ${(props) => props.right || 'auto'};
    bottom: ${(props) => props.bottom || 'auto'};
`;

export const GuideText = styled.p`
  margin: 0 0 1rem 0;
  font-size: 1rem;
  line-height: 1.5;
`;

export const GuideButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export const GuideButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  background-color: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;