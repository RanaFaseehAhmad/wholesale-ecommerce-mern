import api from "../Api/Axios"
import { useState, createContext, useEffect } from "react";

export const ProductContext = createContext()

export default function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {

            const response = await api.get("/products")
            const { data } = response
            setProducts(data)
        };
        fetchdata();
    }, []);
    
    return (
        <ProductContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductContext.Provider>
    );
    

}