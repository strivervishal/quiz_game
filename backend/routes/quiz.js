// backend/routes/quiz.js
import express from "express";
import Question from "../models/Question.js";
import Score from "../models/Score.js";

const router = express.Router();

// GET 10 random questions
router.get("/questions", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    // Determine a random starting point if there are more than 10 questions.
    const random = count > 10 ? Math.floor(Math.random() * (count - 10)) : 0;
    const questions = await Question.find().skip(random).limit(10);
    console.log(`Fetched ${questions.length} questions from database.`);
    res.json(questions);
  } catch (err) {
    console.error("Error in /questions route:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST: Submit answers and store score
router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body; // Expected format: [{ questionId, selectedOption }]
    console.log("Received answers:", answers);

    let correctCount = 0;
    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question) {
        if (question.answer === answer.selectedOption) {
          correctCount++;
        }
      } else {
        console.warn(`Question with ID ${answer.questionId} not found.`);
      }
    }
    console.log("Correct answers count:", correctCount);

    // Save the score into the database
    const scoreEntry = new Score({ correct: correctCount });
    await scoreEntry.save();
    console.log("Score saved successfully:", scoreEntry);

    res.json({ correct: correctCount, total: 10 });
  } catch (err) {
    console.error("Error in /submit route:", err);
    res.status(500).json({ message: err.message });
  }
});

// (Optional) GET all scores, sorted by date (most recent first)
router.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ date: -1 });
    console.log(`Fetched ${scores.length} scores from database.`);
    res.json(scores);
  } catch (err) {
    console.error("Error in /scores route:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
