import express from "express";
import { login, signup ,getMe} from "../controllers/authcontroller.js";

import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/me", verifyToken, getMe);
router.post("/signup", signup);
router.post("/login", login);


export default router;
