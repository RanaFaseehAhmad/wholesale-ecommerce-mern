import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    count: 0,
    reducers: {
        cartStart: (state) => {
            state.loading = true;
        },
        cartSuccess: (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        cartCount: (state, action) => {
            state.count = action.payload
        }
    }
})
export const { cartStart, cartSuccess, cartCount } = cartSlice.actions
export default cartSlice.reducer