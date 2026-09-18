import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    cartLoaded: false,
    count: 0,
    selectedItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState,

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
        },
        SetselectedItems: (state, action) => {
            state.selectedItems = action.payload
        },
        ClearSelectedItems: (state, action) => {
            state.selectedItems = []
        }
        // addCartItem: (state, action) => {
        //     const newItem = action.payload
        //     const existingItem = state.items.find(
        //         item => item.product._id === newItem.product._id
        //     )
        //     if (existingItem) {
        //         existingItem.quantity = newItem.quantity
        //     }
        //     else {
        //         state.items.push(newItem)
        //     }
        //     state.count = state.count + 1

        // },
        // setCartItems: (state, action) => {
        //     state.items = action.payload;
        //     state.loading = false;
        //     state.cartLoaded = true;

        // },
        // increaseCartItemQty: (state, action) => {
        //     const { quantity, productId } = action.payload
        //     const existingItem = state.items.find(
        //         items => items.product._id === productId
        //     )
        //     if (existingItem) {

        //         existingItem.quantity = quantity
        //     }
        // },
        // decreaseCartItemQty: (state, action) => {
        //     const { quantity, productId } = action.payload
        //     const existingItem = state.items.find(
        //         items => items.product._id === productId
        //     )
        //     if (existingItem) {

        //         existingItem.quantity = quantity
        //     }
        // },
        // removeCartItem: (state, action) => {
        //     const { productId } = action.payload;

        //     state.items = state.items.filter(
        //         item => item.product._id !== productId)
        //     state.count -= 1
        // },
        // clearCart: (state, action) => {
        //     state.items = [];
        //     state.count = 0;
        // }

    }
})
export const { cartStart, cartSuccess, cartCount, SetselectedItems, ClearSelectedItems } = cartSlice.actions
export default cartSlice.reducer