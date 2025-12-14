import User from "../models/User.js";
import Task from "../models/Task.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.json({ users });
  } catch (error) {
    console.error("GET all users error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // optionally prevent deleting yourself as admin
    if (user._id.toString() === (req.user.userId || req.user.id)) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }

    // delete user's tasks as well, if you want cascade behavior
    await Task.deleteMany({ createdBy: user._id });

    await user.deleteOne();

    return res.json({ message: "User and their tasks deleted" });
  } catch (error) {
    console.error("DELETE user error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getAllTasksAdmin = async (req, res) => {
  try {
    const tasks = await Task.find().populate("createdBy", "name email role");
    return res.json({ tasks });
  } catch (error) {
    console.error("GET all tasks (admin) error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
