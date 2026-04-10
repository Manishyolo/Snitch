import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "2d",
  });

  res.cookie("token", token);

  res.status(201).json({
    success: true,
    message: message,
    user: user,
  });
}

export async function RegisterController(req, res) {
  try {

    console.log("Request Body:", req.body); // Debugging line to check the request body
    const { email, contact, password, fullname,role } = req.body;

    const exitingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (exitingUser) {
        console.log("Existing User Found:", exitingUser); // Debugging line to check if existing user is found
      return res.status(400).json({
        success: false,
        message: "User already exists with this email or contact",
      });
    }

    const createUser = await userModel.create({
      email,
      contact,
      password,
      fullname,
      role
    });

    await sendTokenResponse(createUser, res, "User Registered Successfully");
  } catch (error) {
    console.error("Error in RegisterController:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}

export async function LoginController(req, res) {
  try {
    const { email, password } = req.body;

    const User = await userModel.findOne({ $or: [{ email }, { contact }] });

    if (!User) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isMatch = await User.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    await sendTokenResponse(User, res, "User Logged In Successfully");
  } catch (error) {
    console.error("Error in LoginController:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
