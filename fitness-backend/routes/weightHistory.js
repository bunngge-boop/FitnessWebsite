const express = require("express");
const router = express.Router();
const WeightHistory = require("../models/WeightHistory");

// ADD OR UPDATE WEIGHT FOR A DAY
router.post("/save", async (req, res) => {
  try {
    const { userId, date, weight } = req.body;

    if (!userId || !date || weight === undefined) {
      return res.status(400).json({ error: "userId, date and weight are required" });
    }

    const updated = await WeightHistory.findOneAndUpdate(
      { userId, date },
      { $set: { weight } },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      message: "Weight saved successfully",
      weightEntry: updated
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET ALL WEIGHT HISTORY FOR USER
router.get("/:userId", async (req, res) => {
  try {
    const history = await WeightHistory.find({ userId: req.params.userId }).sort({ date: 1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET SPECIFIC DATE
router.get("/:userId/:date", async (req, res) => {
  try {
    const entry = await WeightHistory.findOne({
      userId: req.params.userId,
      date: req.params.date
    });

    if (!entry) {
      return res.json({
        userId: req.params.userId,
        date: req.params.date,
        weight: null
      });
    }

    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;