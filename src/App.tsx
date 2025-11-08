import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RunningPage from "./page/RunningPage";
import RecordPage from "./page/RecordPage";
import MainLayout from "./layout/MainLayout";

const App: React.FC = () => {
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
