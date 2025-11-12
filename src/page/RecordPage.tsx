import React from "react";
import { useRecordStore } from "../store/recordStore";
import {
  RecordPageContainer,
  RecordList,
  RecordCard,
  RecordDate,
  RecordStats,
  StatItem,
  NoRecords,
} from "../styling/RecordPage.styled";

// 숫자를 항상 두 자리로 포맷팅하는 헬퍼 함수 (e.g., 5 -> "05")
const formatTime = (time: number) => time.toString().padStart(2, "0");

const RecordPage: React.FC = () => {
  const records = useRecordStore((state) => state.records);

  return (
    <RecordPageContainer>
      {records.length === 0 ? (
        <NoRecords>아직 기록이 없습니다.</NoRecords>
      ) : (
        <RecordList>
          {records.map((record) => (
            <RecordCard key={record.id}>
              <RecordDate>{record.date}</RecordDate>
              <RecordStats>
                <StatItem>
                  달리기: {formatTime(record.runningTimeMinutes)}분{" "}
                  {formatTime(record.runningTimeSeconds)}초
                </StatItem>
                <StatItem>
                  휴식: {formatTime(record.restTimeMinutes)}분{" "}
                  {formatTime(record.restTimeSeconds)}초
                </StatItem>
                <StatItem>반복: {record.repeatCount}회</StatItem>
              </RecordStats>
            </RecordCard>
          ))}
        </RecordList>
      )}
    </RecordPageContainer>
  );
};

export default RecordPage;