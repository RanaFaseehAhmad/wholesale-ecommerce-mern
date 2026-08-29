import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
       

    } catch (error) {
        console.log("error in database not connected", error.message)
    }
}
export default connectDB