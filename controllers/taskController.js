import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const user = req.user;

    let tasks;
    if (user.role === "admin") {
      tasks = await Task.find().populate("createdBy", "name email role");
    } else {
      tasks = await Task.find({ createdBy: user.userId || user.id });
    }

    return res.json({ tasks });
  } catch (error) {
    console.error("GET tasks error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = new Task({
      title: data.title,
      description: data.description || "",
      status: data.status || "pending",
      createdBy: req.user.userId || req.user.id,
    });

    await task.save();

    return res.status(201).json({ message: "Task created", task });
  } catch (error) {
    console.error("CREATE task error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const data = req.body;
    const user = req.user;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isOwner = task.createdBy.toString() === (user.userId || user.id);
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to update this task" });
    }

    if (data.title !== undefined) task.title = data.title;
    if (data.description !== undefined) task.description = data.description;
    if (data.status !== undefined) task.status = data.status;

    await task.save();

    return res.json({ message: "Task updated", task });
  } catch (error) {
    console.error("UPDATE task error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const user = req.user;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const isOwner = task.createdBy.toString() === (user.userId || user.id);
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed to delete this task" });
    }

    await task.deleteOne();

    return res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("DELETE task error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
