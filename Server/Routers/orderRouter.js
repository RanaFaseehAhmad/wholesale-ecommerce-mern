import express from "express"
import { createOrder } from "../Controllers/orderController.js"
import { verifyToken } from "../Middleware/verifyToken.js"
const router = express.Router()

router.post("/checkout", verifyToken, createOrder)



export default router