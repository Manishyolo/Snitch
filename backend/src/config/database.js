import mongoose from "mongoose";
import { config } from "./config.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectToDatabase;
