import styled from "styled-components";

export const RunningPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TimerWrapper = styled.div`
  position: relative;
  width: 18rem;
  height: 18rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClockContainer = styled.div`
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  font-weight: bold;
`;

export const ClockTime = styled.div`
  width: 4rem;  
  height: 4rem;
  border: none;
  border-radius: 50%;
  background-color: white;
  font-size: 2.5rem;
  text-align: center;
  line-height: 4rem;
`;

export const RepeatCount = styled.div`
  width: 3rem;  
  height: 3rem;
  border: none;
  border-radius: 50%;
  background-color: white;
  font-size: 2rem;
  text-align: center;
  line-height: 3rem;
  top : 12rem;
  position: absolute;
`;

const CircleButton = styled.button`
  position: absolute;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SettingButton = styled(CircleButton)`
  bottom: -2.25rem;
  left: -1.25rem;
`;

export const StartButton = styled(CircleButton)`
  bottom: -2.25rem;
  right: -1.25rem;
`;

export const ResetButton = styled(CircleButton)`
  width: 5rem;
  height: 5rem;
  bottom: -4rem;
  
`;

export const SilentButton = styled(CircleButton)`
  width: 5rem;
  height: 5rem;
  top: -2rem;
  right: -0rem;
`;