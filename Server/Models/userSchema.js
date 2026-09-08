import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["seller", "buyer"],
        // default: "user"
        required: true
    },
    name: {
        type: String,
        default: undefined,
        required:true
    },
    gender: {
        type: String,
        default: undefined
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        default: undefined,
    },
    age: {
        type: Number,
        default: undefined
    },
    country: {
        type: String,
        default: undefined
    },
    countryCode: {
        type: String,
        default: undefined
    },
    phone: {
        type: [String],
        default: undefined,
    },
    social: {
        Facebook: {
            type: String,
            default: undefined
        },
        Twitter: {
            type: String,
            default: undefined
        },
    },
    DoB: {
        type: Date,
        default: undefined
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    },
    resetOtp: {
        type: String,
        default: null
    },

    resetOtpExpires: {
        type: Date,
        default: null
    }
})
export default mongoose.model("User", userSchema)