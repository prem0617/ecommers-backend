import mongoose from "mongoose";

export interface Order {
  user: mongoose.Schema.Types.ObjectId;
  products: { product: mongoose.Schema.Types.ObjectId; quantity: number }[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model<Order>("Order", OrderSchema);
