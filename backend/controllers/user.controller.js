/**
 * User controller
 * Handles fetching & updating user data
 */

import User from "../models/user.model.js";

// GET ALL USERS
export async function getUserList(req, res) {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ message: "User list fetched successfully", users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// GET USER PROFILE BY ID
export async function getUserProfileById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// UPDATE CURRENT USER PROFILE
export async function updateUserProfile(req, res) {
  try {
    const { fullName, role, skills } = req.body;
    const updateData = { fullName, role, skills };

    const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// GET CURRENT USER PROFILE (needs JWT auth)
export async function getCurrentUserProfile(req, res) {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
