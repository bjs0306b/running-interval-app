import React, { useEffect } from "react";

// zustand store
import { useRecordStore } from "../store/recordStore";

// styled components
import {
  RecordPageContainer,
  RecordList,
  RecordCard,
  RecordDate,
  RecordStats,
  StatItem,
  NoRecords,
  DeleteButton,
} from "../styling/RecordPage.styled";

const formatTime = (time: number) => time.toString().padStart(2, "0");

const RecordPage: React.FC = () => {
  const records = useRecordStore((state) => state.records);
  const deleteRecord = useRecordStore((state) => state.deleteRecord);

  return (
    <RecordPageContainer>
      {records.length === 0 ? (
        <NoRecords>아직 기록이 없습니다.</NoRecords>
      ) : (
        <RecordList>
          {records.map((record) => (
            <RecordCard key={record.id}>
              <DeleteButton onClick={() => deleteRecord(record.id)}>X</DeleteButton>
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
