import express from "express";
import {
  addCategories,
  deleteCategories,
  getCategories,
  updateCategories,
} from "../controllers/categories.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/auth.middlewares";

const router = express.Router();

router.post("/categories", authenticateUser, authorizeAdmin, addCategories);
router.put(
  "/categories/:id",
  authenticateUser,
  authorizeAdmin,
  updateCategories
);
router.delete(
  "/categories/:id",
  authenticateUser,
  authorizeAdmin,
  deleteCategories
);
router.get("/categories", authenticateUser, authorizeAdmin, getCategories);

export default router;
