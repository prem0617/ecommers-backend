import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route";
import categoryRoute from "./routes/categories.route";
import productRoute from "./routes/product.route";
import salesRoute from "./routes/sales.route";

import productsRoute from "./routes/products.route";
import orderRoute from "./routes/order.route";

import connectDB from "./config/db";

const app = express();
const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoute);
app.use("/api/admin", categoryRoute);
app.use("/api/admin", productRoute);
app.use("/api/admin", salesRoute);

app.use("/api/user", productsRoute);
app.use("/api/user", orderRoute);
app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
