import express from "express";
import { getOrders, placeOrders } from "../controllers/placeOrders.controller";
import { authenticateUser } from "../middlewares/auth.middlewares";

const router = express.Router();

router.post("/placeOrders", authenticateUser, placeOrders);
router.get("/getOrders", authenticateUser, getOrders);

export default router;
