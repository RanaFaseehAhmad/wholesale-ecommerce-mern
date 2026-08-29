import express from "express"
import { searchBar } from "../Controllers/searchController.js"
const router = express.Router()
import upload from "../config/multer.js";

router.get("/search", searchBar)


export default router