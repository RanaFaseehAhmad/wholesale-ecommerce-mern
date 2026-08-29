import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import connectDB from "./config/db.js"
import productRouter from "./Routers/productRouter.js"
import userRouter from "./Routers/userRouter.js"
import orderRouter from "./Routers/orderRouter.js"
import authRouter from "./Routers/authRouter.js"
import categoryRouter from "./Routers/categoryRouter.js"
import cartRouter from "./Routers/cartRouter.js"
// import headerSearch from "./Routers/searchRouter.js"

const app = express()

app.use(express.json())
app.use(cors())

app.use("", authRouter)
app.use("/products", productRouter)
app.use("/category", categoryRouter)
app.use("/cart", cartRouter)
app.use("", userRouter)
app.use("", orderRouter)



await connectDB()

console.log("database:", process.env.MONGO_URI)
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
});

