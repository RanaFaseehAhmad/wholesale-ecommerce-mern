import style from "./SearchItems.module.css"

import AsyncSelect from 'react-select/async';

import { useCallback, useContext } from "react";

import { ProductContext } from "../../Api/ProductsApi";
import { useNavigate, useLocation } from 'react-router-dom';

function SearchItems({ className }) {
    const { products } = useContext(ProductContext)
    const navigate = useNavigate()
    const location = useLocation();

    // console.log(products)
    const loadOptions = useCallback(async (inputValue) => {
        if (!inputValue.trim()) return []

        const options = products.flatMap((item) => item.items).filter((eachproduct) =>
            eachproduct.subCategory.toLowerCase().includes(inputValue.toLowerCase()) ||
            eachproduct.name.toLowerCase().includes(inputValue.toLowerCase())
        ).map((items) => ({
            value: items.id,
            label: items.name
        }
        ))
        // console.log(options)
        return options
    }, [products])


    return (
        <div style={{ width: "300px" }} className={className}>
            <AsyncSelect classNamePrefix="search"
                loadOptions={loadOptions} placeholder="Search here..."
                defaultOptions
                noOptionsMessage={() => "No results found"}
                loadingMessage={() => "Searching..."}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                styles={{
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 99999,
                    }),
                }}
                isClearable
                onChange={(selected) => {

                    if (!selected) return;

                    const query = selected.label;
                    if (location.pathname.includes("subcategorypage") ||
                        location.pathname.includes("cart")) {
                        navigate(`/subcategorypage?query=${query}`);
                    }
                    else if (location.pathname.includes("itemsummary")) {
                        navigate(`/searchpage?query=${query}`);
                    }
                    else {
                        navigate(`/searchpage?query=${query}`);
                    }

                }}
            />

        </div>
    )
}

export default SearchItems
