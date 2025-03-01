import express from "express";

import { authenticateUser } from "../middlewares/auth.middlewares";
import { getProducts, getProduct } from "../controllers/userProduct.controller";

const router = express.Router();

router.get("/products", authenticateUser, getProducts);
router.get("/product/:id", authenticateUser, getProduct);

export default router;
