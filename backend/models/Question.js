// backend/models/Question.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const QuestionSchema = new Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

export default model("Question", QuestionSchema);
