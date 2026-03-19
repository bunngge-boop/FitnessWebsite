const express = require("express");
const router = express.Router();
const DailyProgress = require("../models/DailyProgress");

// CREATE OR UPDATE DAILY PROGRESS
router.post("/save", async (req, res) => {
  try {
    const { userId, date, steps, water } = req.body;

    if (!userId || !date) {
      return res.status(400).json({ error: "userId and date are required" });
    }

    const updated = await DailyProgress.findOneAndUpdate(
      { userId, date },
      {
        $set: {
          steps: steps ?? 0,
          water: water ?? 0
        }
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      message: "Daily progress saved successfully",
      progress: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET TODAY / SPECIFIC DATE
router.get("/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;

    const progress = await DailyProgress.findOne({ userId, date });

    if (!progress) {
      return res.json({
        userId,
        date,
        steps: 0,
        water: 0
      });
    }

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL HISTORY FOR USER
router.get("/:userId", async (req, res) => {
  try {
    const history = await DailyProgress.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;