import { createContext, useState } from "react";

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    // const [selected, setSelected] = useState(null);
    const [input, setInput] = useState(null )

    return (
        <SearchContext.Provider value={{ input, setInput }}>
            {children}
        </SearchContext.Provider>
    );
}