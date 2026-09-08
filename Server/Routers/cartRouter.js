import express from "express"
import cartSchema from "../Models/cartSchema.js"
import { verifyToken } from "../Middleware/verifyToken.js"
import { addToCart, getCartItems, increaseQty, decreaseQty, removeAllcartItems, removeItem, guestCartItems, mergeGuestCart } from "../Controllers/cartController.js"
const router = express.Router()


router.post("/addToCart", verifyToken, addToCart)
router.post("/guestCartItems", guestCartItems)
router.get("/cartItems", verifyToken, getCartItems)
router.post("/mergeGuestCart",verifyToken,mergeGuestCart)
router.patch("/increaseQty", increaseQty)
router.patch("/decreaseQty", decreaseQty)
router.delete("/removeAllcartItems", removeAllcartItems)
router.delete("/removeItem", removeItem)





export default router