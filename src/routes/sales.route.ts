import express from "express";

import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middlewares";
import {
  topSelling,
  worstSelling,
  salesCategoryWise,
} from "../controllers/sales.controller";

const router = express.Router();

router.get("/topSelling", authenticateUser, authorizeAdmin, topSelling);
router.get("/worstSelling", authenticateUser, authorizeAdmin, worstSelling);
router.get(
  "/salesCategoryWise",
  authenticateUser,
  authorizeAdmin,
  salesCategoryWise
);

export default router;
