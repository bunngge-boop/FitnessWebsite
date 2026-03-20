const express = require("express");
const router = express.Router();

const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name, password });

    if (user) {
      res.json({
        message: "Login successful",
        userId: user._id,
        name: user.name
      });
    } else {
      res.json({ error: "Invalid name or password" });
    }

  } catch (err) {
    res.json({ error: err.message });
  }
});

// GET FULL PROFILE
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE PERSONAL INFO
router.put("/profile/:userId", async (req, res) => {
  try {
    const {
      fname,
      lname,
      sex,
      handle,
      age,
      location,
      goal,
      activity
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        fname,
        lname,
        sex,
        handle,
        age,
        location,
        goal,
        activity
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BMI DATA
router.put("/profile/bmi/:userId", async (req, res) => {
  try {
    const { height, bmiWeight, bmi } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        height,
        bmiWeight,
        bmi
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "BMI data saved successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BODY FAT DATA
router.put("/profile/bodyfat/:userId", async (req, res) => {
  try {
    const { bodyFat } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { bodyFat },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Body fat data saved successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE GOAL WEIGHT DATA
router.put("/profile/goalweight/:userId", async (req, res) => {
  try {
    const { startWeight, currentWeight, goalWeight } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        startWeight,
        currentWeight,
        goalWeight
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "Goal weight data saved successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;