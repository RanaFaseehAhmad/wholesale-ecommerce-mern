import express from "express"
import cartSchema from "../Models/cartSchema.js"
import { verifyToken } from "../Middleware/verifyToken.js"
import { addToCart, getCartItems, increaseQty, decreaseQty, removeAllcartItems, removeItem, guestCartItems, mergeGuestCart, removeOrderedItem } from "../Controllers/cartController.js"
const router = express.Router()


router.post("/addToCart", verifyToken, addToCart)
router.post("/guestCartItems", guestCartItems)
router.get("/cartItems", verifyToken, getCartItems)
router.post("/mergeGuestCart", verifyToken, mergeGuestCart)
router.patch("/increaseQty", verifyToken, increaseQty)
router.patch("/decreaseQty", verifyToken, decreaseQty)
router.delete("/removeAllcartItems", verifyToken, removeAllcartItems)
router.delete("/removeItem", verifyToken, removeItem)
router.delete("/removeOrderedItem", verifyToken, removeOrderedItem)





export default router