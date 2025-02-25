// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quizRoutes from "./routes/quiz.js";

const app = express();

// Allowed origins (both local and deployed frontend)
const allowedOrigins = [
  "http://localhost:5173",
  "https://quiz-game-one-iota.vercel.app",
];

app.use(
  cors({
    origin: "https://quiz-game-one-iota.vercel.app/",
    methods: "GET,POST",
     allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If you're using cookies or authentication
  })
);

app.use(express.json());

// Connect to MongoDB: Use your Atlas URI for production or local URI for development.
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mern_quiz", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/api", quizRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
