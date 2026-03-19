const express = require("express");
const router = express.Router();

const Workout = require("../models/Workout");
const Calories = require("../models/Calories");
const DailyProgress = require("../models/DailyProgress");
const WeightHistory = require("../models/WeightHistory");

function calculateStreak(history) {
  if (!history.length) {
    return { currentStreak: 0, bestStreak: 0 };
  }

  const sortedDates = history
    .map(item => item.date)
    .filter(Boolean)
    .sort();

  let bestStreak = 0;
  let currentRun = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    if (i === 0) {
      currentRun = 1;
    } else {
      const prev = new Date(sortedDates[i - 1]);
      const curr = new Date(sortedDates[i]);
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentRun++;
      } else if (diffDays > 1) {
        currentRun = 1;
      }
    }

    if (currentRun > bestStreak) {
      bestStreak = currentRun;
    }
  }

  let currentStreak = 0;
  for (let i = sortedDates.length - 1; i >= 0; i--) {
    if (i === sortedDates.length - 1) {
      currentStreak = 1;
    } else {
      const prev = new Date(sortedDates[i]);
      const curr = new Date(sortedDates[i + 1]);
      const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  return { currentStreak, bestStreak };
}

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const workouts = await Workout.find({ userId });
    const caloriesEntries = await Calories.find({ userId });
    const dailyHistory = await DailyProgress.find({ userId }).sort({ date: 1 });
    const weightHistory = await WeightHistory.find({ userId }).sort({ date: 1 });

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

    const streakSource = dailyHistory.filter(item => {
      return (item.steps || 0) > 0 || (item.water || 0) > 0;
    });

    const { currentStreak, bestStreak } = calculateStreak(streakSource);

    const latestWeight = weightHistory.length
      ? weightHistory[weightHistory.length - 1].weight
      : null;

    res.json({
      totalWorkouts,
      totalCaloriesBurned,
      totalCaloriesConsumed,
      totalWorkoutMinutes,
      currentStreak,
      bestStreak,
      latestWeight,
      workouts,
      caloriesEntries,
      dailyHistory,
      weightHistory
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;