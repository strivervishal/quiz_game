// backend/models/Score.js
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ScoreSchema = new Schema({
  correct: { type: Number, required: true },
  total: { type: Number, default: 10 },
  date: { type: Date, default: Date.now },
});

export default model("Score", ScoreSchema);
