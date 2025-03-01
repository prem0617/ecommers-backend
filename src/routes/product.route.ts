import express from "express";
import {
  addProducts,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middlewares";

const router = express.Router();

router.post("/product", authenticateUser, authorizeAdmin, addProducts);
router.get("/products", authenticateUser, authorizeAdmin, getProducts);
router.delete("/product/:id", authenticateUser, authorizeAdmin, deleteProduct);
router.put("/product/:id", authenticateUser, authorizeAdmin, updateProduct);

export default router;
