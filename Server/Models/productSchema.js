import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
        index:true
    },
    productName: {
        type: String
    },
    description: {
        type: String
    },
    brand: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    gender: {
        type: String
    },
    discount: {
        type: Number
    },
    rating: {
        type: Number
    },
    price: {
        type: Number
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        index:true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        index: true
    },
    reviews:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    features: {
        type: String
    },
    condition: {
        type: String
    },

    image: {
        type: String
    },
    imagePublicId: {
        type: String
    },
    limit: Number

})
export default mongoose.model("Product", productSchema)