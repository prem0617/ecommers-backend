import mongoose from "mongoose";

export interface Category {
  name: string;
}

const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<Category>("Category", CategorySchema);
