import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            image: String
        }
    ],

    totalPrice: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    }
});

export default mongoose.model("Order", orderSchema);