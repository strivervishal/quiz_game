// frontend/src/components/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quiz");
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-xl shadow-xl border border-gray-200 transform transition duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          MERN Quiz App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Challenge your mind with our curated quiz. Ready to test your
          knowledge?
        </p>
        <div className="flex justify-center">
          <button
            onClick={startQuiz}
            className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
