// frontend/src/components/Result.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  // Redirect to home if no result state exists
  if (!state) {
    navigate("/");
    return null;
  }

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Result Card */}
      <div className="relative z-10 max-w-md p-8 bg-white rounded-xl shadow-xl border border-gray-200 transform transition duration-500 hover:scale-105">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6 drop-shadow">
          Quiz Result
        </h2>
        <p className="text-xl text-center text-gray-700 mb-8">
          You got{" "}
          <span className="font-bold text-green-600">{state.correct}</span> out
          of <span className="font-bold text-green-600">{state.total}</span>{" "}
          correct!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
