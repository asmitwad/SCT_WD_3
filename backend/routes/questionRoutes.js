const express = require("express");
const router = express.Router();

const Question = require("../models/question");

// Get random quiz questions based on filters
router.get("/", async (req, res) => {
  try {
    const { category, difficulty, limit } = req.query;

    // Validate question limit
    const questionLimit = Number(limit) || 10;

    if (questionLimit < 1 || questionLimit > 10) {
      return res.status(400).json({
        message: "Question limit must be between 1 and 10",
      });
    }

    // Build filter object
    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (difficulty && difficulty !== "All") {
      filter.difficulty = difficulty;
    }

    // Fetch random questions
    const questions = await Question.aggregate([
      {
        $match: filter,
      },
      {
        $sample: {
          size: questionLimit,
        },
      },
    ]);

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
});

module.exports = router;