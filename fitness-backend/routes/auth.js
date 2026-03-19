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
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (user) {
      res.json({
        message: "Login successful",
        userId: user._id,
        name: user.name
      });
    } else {
      res.json({ error: "Invalid email or password" });
    }

  } catch (err) {
    res.json({ error: err.message });
  }
});

// SAVE / UPDATE USER PROFILE
router.put("/profile/:userId", async (req, res) => {
  try {
    const { fname, lname, sex } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { fname, lname, sex },
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

// GET USER PROFILE
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

module.exports = router;    