import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current question index
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/questions")
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      questionId,
      selectedOption: answers[questionId],
    }));

    try {
      const res = await axios.post("http://localhost:5000/api/submit", {
        answers: formattedAnswers,
      });
      navigate("/result", { state: res.data });
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  if (questions.length === 0)
    return <p className="text-center text-xl mt-10">Loading...</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white rounded-xl shadow-xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Quiz Time
        </h2>

        {/* Question Display */}
        <div className="mb-6">
          <p className="text-xl font-medium text-gray-700">
            {currentIndex + 1}. {currentQuestion.question}
          </p>
          <div className="mt-4 space-y-3">
            {currentQuestion.options.map((option, i) => (
              <label
                key={i}
                className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name={currentQuestion._id}
                  value={option}
                  checked={answers[currentQuestion._id] === option}
                  onChange={() =>
                    handleOptionChange(currentQuestion._id, option)
                  }
                  className="form-radio h-5 w-5 text-blue-600 mr-3"
                />
                <span className="text-gray-800">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons: Next or Submit */}
        <div className="flex justify-between mt-6">
          {currentIndex < questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Next Question →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 text-lg font-medium text-white bg-green-600 rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;