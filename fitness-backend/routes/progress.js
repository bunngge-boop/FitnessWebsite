const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");
const Calories = require("../models/Calories");

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const workouts = await Workout.find({ userId });
    const caloriesEntries = await Calories.find({ userId });

    const totalWorkouts = workouts.length;

    const totalCaloriesBurned = workouts.reduce((sum, item) => {
      return sum + (item.calories || 0);
    }, 0);

    const totalCaloriesConsumed = caloriesEntries.reduce((sum, item) => {
      return sum + (item.calories || 0);
    }, 0);

    const totalWorkoutMinutes = workouts.reduce((sum, item) => {
      return sum + (item.minutes || 0);
    }, 0);

    res.json({
      totalWorkouts,
      totalCaloriesBurned,
      totalCaloriesConsumed,
      totalWorkoutMinutes,
      workouts,
      caloriesEntries
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;