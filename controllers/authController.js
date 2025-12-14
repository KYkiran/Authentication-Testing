import User from "../models/User.js";
import { generateToken } from "../lib/jwt.js";
import { setAuthCookie, clearAuthCookie } from "../lib/cookies.js";

export const register = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.name || !data.email || !data.password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    await user.save();

    const token = generateToken(user._id, user.role);
    setAuthCookie(res, token); // <- centralized helper

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("REGISTER error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.email || !data.password) {
      return res
        .status(400)
        .json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email: data.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);
    setAuthCookie(res, token);

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const logout = (req, res) => {
  clearAuthCookie(res);
  return res.json({ message: "Logged out" });
};
