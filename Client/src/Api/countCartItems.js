import api from "./Axios.js"
import { useState, createContext, useEffect } from "react";

export const countCartContext = createContext()

export default function CountProvider({ children }) {
    const [count, setCount] = useState(0);


    const fetchCartCount = async () => {
        try {
            const response = await api.get("/cart/cartItems");

            const items = response.data.result[0]?.items || [];

            setCount(items.length);

        } catch (error) {
            console.log(error.response?.data?.message);
        }
    };

    useEffect(() => {
        fetchCartCount();

    }, []);

    return (
        <countCartContext.Provider value={{ count, setCount, refreshCartCount: fetchCartCount }}>
            {children}
        </countCartContext.Provider>
    );


}