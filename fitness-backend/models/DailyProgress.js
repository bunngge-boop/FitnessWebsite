const mongoose = require("mongoose");

const DailyProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  steps: {
    type: Number,
    default: 0,
    min: 0
  },

  water: {
    type: Number,
    default: 0,
    min: 0
  }
});

module.exports = mongoose.model("DailyProgress", DailyProgressSchema);  