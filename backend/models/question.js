
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  options: {
    type: [String],
    required: true,
  },

  correctAnswer: {
    type: Number,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy",
  },
});

module.exports = mongoose.model("Question", questionSchema);
