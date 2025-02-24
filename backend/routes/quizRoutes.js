import express from "express";
import Quiz from "../models/Quiz.js";

const router = express.Router();

// Get quiz questions
router.get("/", async (req, res) => {
    try {
        const questions = await Quiz.find().limit(10);
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Submit answers and calculate score
router.post("/submit", async (req, res) => {
    const { answers } = req.body;
    const questions = await Quiz.find().limit(10);
    let score = 0;

    questions.forEach((q, index) => {
        if (q.correctAnswer === answers[index]) {
            score += 1;
        }
    });

    res.json({ score });
});

export default router;
