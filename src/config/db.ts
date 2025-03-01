import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
// console.log(MONGO_URI, "URL");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Database Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
