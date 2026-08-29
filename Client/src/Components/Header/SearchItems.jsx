import style from "./SearchItems.module.css"
import api from "../../Api/Axios.js";

import {useEffect, useState, useRef } from "react";

import { useNavigate, useLocation } from 'react-router-dom';

function SearchItems({ className }) {
    const [inputField, setInputField] = useState("")
    const [searchedData, setSearchedData] = useState([])
    const navigate = useNavigate()
    const location = useLocation();
    const searchRef = useRef(null)

    const handleInputField = (e) => {
        setInputField(e.target.value)
        if (e.target.value.trim() === "") {
            setSearchedData([])
            return
        }
    }
    const fetchData = async () => {
        if (!inputField.trim()) {
            setSearchedData([]);
            return;
        }
        try {

            const response = await api.get(`/products/search?query=${inputField}`)
            console.log(response.data.result)
            setSearchedData(response.data.result)

        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [inputField])

    const selectOption = (productName) => {
        if (location.pathname.includes("subcategorypage") ||
            location.pathname.includes("cart")) {
            navigate(`/subcategorypage?query=${productName}`);

        }
        else if (location.pathname.includes("itemsummary")) {
            navigate(`/searchpage?query=${productName}`);

        }
        else {
            navigate(`/searchpage?query=${productName}`);
        }
        setInputField("")
        setSearchedData([])

    }


    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!searchRef.current?.contains(e.target)) {
                setSearchedData([]);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div style={{ width: "300px" }} className={className}>

            <div ref={searchRef} className={style.searchContainer}>

                <div className={style.searchBox}>

                    <input className={style.inputField} type="search" placeholder="search items here..." value={inputField} onChange={(e) => handleInputField(e)}
                        onKeyDown={(e) => {
                            if (inputField === "") return
                            if (e.key === "Enter") {
                                if (location.pathname.includes("subcategorypage") ||
                                    location.pathname.includes("cart")) {
                                    navigate(`/subcategorypage?query=${inputField}`);
                                }
                                else if (location.pathname.includes("itemsummary")) {
                                    navigate(`/searchpage?query=${inputField}`);
                                }
                                else {
                                    navigate(`/searchpage?query=${inputField}`);
                                }
                            }
                        }} />
                </div>

                {searchedData.length > 0 &&
                    <div className={style.dropDown}>
                        <ul className={style.searchSuggestions}>
                            {searchedData.map((nm) => (
                                <li className={style.listSuggestions} key={nm._id} onClick={() => selectOption(nm.productName)}>{nm.productName}</li>

                            ))
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default SearchItems
