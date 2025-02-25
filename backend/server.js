// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quizRoutes from "./routes/quiz.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: "https://quiz-game-one-iota.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true, // If you're using cookies or authentication
  })
);
app.use(express.json());

// Connect to MongoDB (adjust the URI if needed)
mongoose
  .connect("mongodb://localhost:27017/mern_quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api", quizRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
