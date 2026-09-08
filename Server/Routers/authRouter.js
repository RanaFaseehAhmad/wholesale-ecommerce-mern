import express from "express"
const router = express.Router()
import { verifyToken } from "../Middleware/verifyToken.js"
import { registerBuyer, signIn, forgetPass, verifyOtp, ResetPassword,refreshToken, getCurrentUser } from "../Controllers/authController.js"

router.post("/register", registerBuyer)
router.post("/signIn", signIn)
router.get("/me", verifyToken, getCurrentUser);
router.post("/verifyEmail", forgetPass)
router.post("/verify-otp", verifyOtp)
router.put("/change-password", ResetPassword)
router.post("/refresh", refreshToken)



export default router