// backend/seedQuestions.js
import mongoose from "mongoose";
import Question from "./models/Question.js";

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Mark Twain",
      "Leo Tolstoy",
    ],
    answer: "William Shakespeare",
  },
  {
    question: "What is the largest planet in our Solar System?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What year did World War II end?",
    options: ["1940", "1942", "1945", "1950"],
    answer: "1945",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "H2O", "CO2", "NaCl"],
    answer: "H2O",
  },
  {
    question: "Which language is primarily used for Android app development?",
    options: ["JavaScript", "Swift", "Java", "Ruby"],
    answer: "Java",
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: "2",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Vincent Van Gogh",
      "Claude Monet",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the boiling point of water at sea level?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Mercury"],
    answer: "Mars",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/mern_quiz",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB for seeding");

    // Remove existing questions (if needed)
    await Question.deleteMany({});
    console.log("Existing questions removed");

    // Insert sample questions
    await Question.insertMany(sampleQuestions);
    console.log("Sample questions inserted");

    mongoose.connection.close();
    console.log("MongoDB connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDB();
