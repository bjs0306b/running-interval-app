import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RunningPage from "./page/RunningPage";
import RecordPage from "./page/RecordPage";
import MainLayout from "./layout/MainLayout";
import { useRecordStore } from "./store/recordStore";

const App: React.FC = () => {

  useEffect(() => {
    useRecordStore.getState().loadRecords();
  })

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <RunningPage />
            </MainLayout>
          }
        ></Route>
        <Route
          path="/Record"
          element={
            <MainLayout>
              <RecordPage />
            </MainLayout>
          }
        ></Route>
      </Routes>
    </Router>
  );
};
export default App;
