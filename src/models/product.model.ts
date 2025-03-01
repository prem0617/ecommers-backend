import mongoose from "mongoose";

export interface Product {
  name: string;
  description?: string;
  price: number;
  category: mongoose.Schema.Types.ObjectId;
  stock: number;
  salesCount: number;
}

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stock: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<Product>("Product", ProductSchema);
