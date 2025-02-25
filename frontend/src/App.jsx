// frontend/src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
