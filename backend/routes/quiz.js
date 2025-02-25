// backend/routes/quiz.js
import express from "express";
import Question from "../models/Question.js";
import Score from "../models/Score.js";

const router = express.Router();

// GET 10 random questions
router.get("/questions", async (req, res) => {
  try {
    const count = await Question.countDocuments();
    // If count is less than 10, skip 0; otherwise, pick a random starting index.
    const random = count > 10 ? Math.floor(Math.random() * (count - 10)) : 0;
    const questions = await Question.find().skip(random).limit(10);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Submit answers and store score
router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body; // answers: [{ questionId, selectedOption }]
    let correctCount = 0;

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);
      if (question && question.answer === answer.selectedOption) {
        correctCount++;
      }
    }

    // Save the score
    const scoreEntry = new Score({ correct: correctCount });
    await scoreEntry.save();

    res.json({ correct: correctCount, total: 10 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// (Optional) GET all scores
router.get("/scores", async (req, res) => {
  try {
    const scores = await Score.find().sort({ date: -1 });
    res.json(scores);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
