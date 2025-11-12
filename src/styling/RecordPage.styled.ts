import styled from "styled-components";

export const RecordPageContainer = styled.div`
  height: 100%;
  padding: 1rem;
  overflow-y: auto; // 기록이 많아지면 스크롤
  background-color: #f7f7f7;
`;

export const RecordList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const RecordCard = styled.li`
  background-color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const RecordDate = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.75rem;
`;

export const RecordStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StatItem = styled.div`
  font-size: 1rem;
  color: #333;
`;

export const NoRecords = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
  font-size: 1.2rem;
`;