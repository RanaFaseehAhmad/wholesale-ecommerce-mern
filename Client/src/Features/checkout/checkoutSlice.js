import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: [],
    subtotal: null,
    loading: false,
}
const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {

    }
//    export  const{}= checkoutSlice.actions

})
export default checkoutSlice.reducer