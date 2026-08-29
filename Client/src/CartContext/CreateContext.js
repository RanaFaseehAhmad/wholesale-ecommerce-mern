import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext();

const initianlState = {
    cartItems: JSON.parse(localStorage.getItem("cart")) || [],
    selectedItems: []

}

function reducer(state, action) {
    switch (action.type) {

        case "Add_To_Cart": {
            const newItem = action.payload;

            const exists = state.cartItems.find(i => i.id === newItem.id);

            if (exists) return state;

            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    { ...newItem, quantity: 1 }
                ]
            };
        }

        case "Remove_item": {
            const selectedId = action.payload
            const updated = state.cartItems.filter((item) => item.id !== selectedId)
            return {
                ...state,
                cartItems: updated,
                selectedItems: state.selectedItems.filter((id) => id !== selectedId)
            };

        }

        case "Increase_Qty": {
            const selectedId = action.payload
            const updated = state.cartItems.map((item) => {
                const CurrQty = item.quantity || 1
                return item.id === selectedId ? { ...item, quantity: (CurrQty + 1) } : item
            })
            return {
                ...state,
                cartItems: updated
            };
        }
        case "Decrease_Qty": {
            const selectedId = action.payload
            const updated = state.cartItems.map((item) => {
                const CurrQty = item.quantity || 1
                return item.id === selectedId ?
                { ...item, quantity: (CurrQty > 1 ? CurrQty - 1 : 1) } : item
            })
            return {
                ...state,
                cartItems: updated
            };
        }

        case "Select_item": {
            const selectedId = action.payload
            const isSelectedId = state.selectedItems.includes(selectedId)
            const updated = isSelectedId ?
                state.selectedItems.filter((item) => item !== selectedId) :
                [...state.selectedItems, selectedId]
            return {
                ...state,
                selectedItems: updated
            };
        }

        case "SelectAll_items": {
            const cartItemsId = state.cartItems.map((items) => items.id)
            const isAllselected = state.selectedItems.length === cartItemsId.length
            return {
                ...state,
                selectedItems: isAllselected ? [] : cartItemsId
            };
        }

        case "clear_Cart": {

            return {
                ...state,
                cartItems: [],
                selectedItems: []
            };
        }

        case "subTotal":

            return;

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initianlState)
    useEffect(() => {
        localStorage.setItem("cart",JSON.stringify(state.cartItems)
        );
    }, [state.cartItems]);
    return (
        <CartContext.Provider value={{ state, dispatch }} >
            {children}
        </CartContext.Provider>
    );
}