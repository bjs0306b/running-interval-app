import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100dvh;
  min-width: 100dvw;
`;

export const Header = styled.header`
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  height: 5dvh;
  font-size: 2rem;
  font-weight: bold;
`;

export const PageArea = styled.div`
  height: 87dvh;
`;

export const OptionArea = styled.div`
  background-color: #f0f0f0;
  height: 8dvh;
`;

export const Button = styled.button`
  border: none;
  width: 50%;
  height: 100%;
  background-color: #f0f0f0;
  font-size: 2rem;
  font-weight: bold;
`;
