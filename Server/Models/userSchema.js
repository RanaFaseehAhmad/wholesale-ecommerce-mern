import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    name: {
        type: String,
        default: undefined
    },
    gender: {
        type: String,
        default: undefined
    },
    email: {
        type: String,
        default: undefined
    },
    password: {
        type: String,
        default: undefined
    },
    age: {
        type: Number,
        default: undefined
    },
    country: {
        type: String,
        default: undefined
    },
    phonenumber: {
        type: [String],
        default: undefined
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
    }
})
export default mongoose.model("User", userSchema)