const mongoose = require("mongoose");

const WeightHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },

  date: {
    type: String,
    required: true
  },

  weight: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = mongoose.model("WeightHistory", WeightHistorySchema);