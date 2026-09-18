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

            quantity: {
                type: Number,
                required: true,
                min: 1
            },

            unitPrice: {
                type: Number,
                required: true
            },

            totalPrice: {
                type: Number,
                required: true
            },
            image: String
        }
    ],
    shippingAddress: {
        country: {
            type: String
        },
        fullName: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true
        },

        address: {
            type: String,
            required: true
        },
        houseNo: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        postalCode: {
            type: String,
            required: true
        }
    },

    paymentMethod: {
        type: String,
        enum: ["COD", "ONLINE"],
        default: "COD"
    },

    paymentStatus: {
        type: String,
        enum: ["pending", "paid", "failed"],
        default: "pending"
    },

    orderStatus: {
        type: String,
        enum: [
            "pending",
            "confirmed",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ],
        default: "pending"
    }
},
    {
        timestamps: true
    }
);

export default mongoose.model("Order", orderSchema);