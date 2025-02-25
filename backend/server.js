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
    origin: function (origin, callback) {
      // Allow requests with no origin (like Postman, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new Error(
            `The CORS policy for this site does not allow access from the specified Origin: ${origin}.`
          ),
          false
        );
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "OPTIONS"],
    optionsSuccessStatus: 200,
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
