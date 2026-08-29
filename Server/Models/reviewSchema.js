import mongoose from "mongoose"
const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
})
export default mongoose.model("Review", reviewSchema)
