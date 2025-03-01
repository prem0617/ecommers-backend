import express from "express";
import {
  loginAdmin,
  loginUser,
  logOut,
  registerAdmin,
  registerUser,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);

router.get("/logout", logOut);

export default router;
