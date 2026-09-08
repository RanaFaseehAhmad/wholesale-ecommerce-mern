import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Features/auth/authSlice.js"
import cartReducer from "../Features/cart/cartSlice.js"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    }
})
