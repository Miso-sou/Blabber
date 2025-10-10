import express from "express"
import {signup, login, logout, onboard} from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/onboarding", protectRoute, onboard)

// Checks if the user is logged in or not
router.get("/me", protectRoute, (req, res) => {
    res.status(200).json({success: true, user: req.user})
})

// Can add forget password with email, email verification



export default router