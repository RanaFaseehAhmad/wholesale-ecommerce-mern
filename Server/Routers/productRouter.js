import express from "express"
import { searchProduct, getDiscountProducts, getScrollProducts, getsearchedProduct, getDiscountProductsandCategory, getProductByFiltersubCategory, getItemDetail, getrecommendedItems } from "../Controllers/productController.js"
const router = express.Router()
import upload from "../config/multer.js";

router.get("/search", searchProduct)
router.get("/discount", getDiscountProducts)
router.get("/", getScrollProducts)
router.get("/searchpage", getsearchedProduct)
router.get("/top-deals", getDiscountProductsandCategory)
router.get("/FiltersubCategory/filter", getProductByFiltersubCategory)
router.get("/itemsummary/:productId", getItemDetail)
router.get("/recommendedItems/:productSubcategoryId", getrecommendedItems)
// router.get("/filterProduct", productFilter)


// router.get("/", showProducts)


export default router