import mongoose from "mongoose";
import { User } from "../types/auth.types";

const AdminSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["user", "admin"], default: "admin" },
  },
  { timestamps: true }
);

const Admin = mongoose.model<User>("Admin", AdminSchema);

export default Admin;
