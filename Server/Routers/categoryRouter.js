import express from "express"
import { showCategory, getAllCategoryData } from "../Controllers/categoryController.js"
const router = express.Router()
import upload from "../config/multer.js";

router.get("/", showCategory)
router.get("/categoryData", getAllCategoryData )


export default router