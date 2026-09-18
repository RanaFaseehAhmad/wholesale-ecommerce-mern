
import api from "./Axios";

export const fetchProducts = async ({ pageParam }) => {

    const url = pageParam
        ? `/products?cursor=${pageParam}`
        : `/products`;

    const response = await api.get(url);
    // console.log(response.data)
    return response.data;
}

export const addToCart = async (cartData) => {
    const response = await api.post("/cart/addToCart", cartData);
    // console.log(response.data)
    return response.data;
}

export const guestUserItems = async (productIds) => {
    const response = await api.post("/cart/guestCartItems", { productIds });
    // console.log(response.data)
    return response.data;
}
export const loginUserCartItems = async () => {
    const response = await api.get("/cart/cartItems");
    // console.log(response.data)
    return response.data;
}
export const increaseLoginQtyMutation = async (productId) => {
    const response = await api.patch("/cart/increaseQty", { productId });
    // console.log(response.data)
    return response.data;
}
export const decreaseLoginQtyMutation = async (productId) => {
    const response = await api.patch("/cart/decreaseQty", { productId });
    // console.log(response.data)
    return response.data;
}
export const removeLoginItem = async (productId) => {
    const response = await api.delete("/cart/removeItem", { data: { productId: productId } });
    // console.log(response.data)
    return response.data;
}
export const removeAllLoginItem = async () => {
    const response = await api.delete("/cart/removeAllcartItems");
    // console.log(response.data)
    return response.data;
}
export const mergeCart = async (guestCart) => {
    const response = await api.post("/cart/mergeGuestCart", { guestCart });
    // console.log(response.data)
    return response.data;
}
export const handleOrder = async ({ formData, orderData }) => {
    const response = await api.post("/order/checkout", { formData, orderData });
    console.log(response.data.result)
    return response.data;
}
export const removeFromCart = async (selectedProducts) => {
    const response = await api.delete("/cart/removeOrderedItem", { data: { selectedProducts } });
    console.log(response.data.result)
    return response.data;
}

// products

export const fetchSearchData = async ({pageParam}) => {
    const response = await api.get(`/products/searchpage?cursor=${pageParam}` );
    console.log(response.data.result)
    return response.data;
}




