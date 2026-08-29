import express from "express"
import cartSchema from "../Models/cartSchema.js"
import { addToCart, getCartItems, increaseQty, decreaseQty, removeAllcartItems, removeItem } from "../Controllers/cartController.js"
const router = express.Router()


router.post("/addToCart", addToCart)
router.get("/cartItems", getCartItems)
router.patch("/increaseQty", increaseQty)
router.patch("/decreaseQty", decreaseQty)
router.delete("/removeAllcartItems", removeAllcartItems)
router.delete("/removeItem", removeItem)





export default router