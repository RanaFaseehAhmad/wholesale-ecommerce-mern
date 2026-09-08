import style from "./Searchpage.module.css"
import api from "../../Api/Axios";
import Filter from "../../Components/Searchpage/Filter";

import { useState, useEffect } from "react"
import { Rating } from 'primereact/rating';
import { useNavigate, useLocation, } from "react-router-dom"


function Searchpage() {
    const navigate = useNavigate()
    const [results, setResults] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [products, setProducts] = useState([])

    const { search } = useLocation()

    const searchQuery = new URLSearchParams(search).get("query");
    const productId = new URLSearchParams(search).get("productId");
    const fetchData = async () => {
        // console.log(productId)
        try {
            if (productId) {
                const response = await api.get(`/products/searchpage/?productId=${productId}`)
                setProducts(response.data.result)
            }
            else if (searchQuery) {
                const response = await api.get(`/products/searchpage/?query=${searchQuery}`)
                setProducts(response.data.result)
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [productId, searchQuery])

    const addTocart = async (e, productId) => {
        // console.log(productId)
        // console.log("ADD TO CART CLICKED");
        // console.log("PRODUCT ID:", productId);
        e.stopPropagation()

        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [] ;
            const existingItem = guestCart.find(item => item.productId === productId)
            if (existingItem) {
                existingItem.quantity += 1
            }
            else {
                guestCart.push({ quantity: 1, productId: productId });
            }
            localStorage.setItem("guestCart", JSON.stringify(guestCart));
            navigate(`/cart`)
            return
        }
        try {
            const response = await api.post("/cart/addToCart", {
                productId: productId,
                quantity: 1
            })
            navigate(`/cart`)
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    const exploreItem = (item) => {
        navigate(`/itemsummary/${item._id}`)
    }
    // console.log(filterItems)
    const displayedResult = filterItems ?
        products.filter((eachproduct) =>
            eachproduct.subcategory?.name.includes(filterItems) ||
            eachproduct.name?.includes(filterItems) ||
            eachproduct.tags?.some(tags => tags.includes(filterItems))) : products

    return (

        <div className={style.container}>
            <div className={style.wrapper}>
                <Filter results={results} setFilterItems={setFilterItems} filterItems={filterItems} products={products} />
                <div className={style.list}>
                    {
                        displayedResult.map((item, id) => (

                            <div key={item._id} className={style.card} onClick={() => exploreItem(item)}>
                                <div className={style.ItemImg}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className={style.ItemDesc}>
                                    <p className={style.name}>{item.productName}</p>
                                    <Rating className={style.ratingstarcolor} value={item?.rating || 0} readOnly cancel={false} />
                                    <p className={style.description}>{item.description}</p>
                                    {item.discount && <span className={style.discount}>{item.discount}% off</span>}
                                    <span className={style.price}>PKR {item.price}</span>
                                    <div className={style.buttons}>
                                        <button className={style.addTocart} onClick={(e) => addTocart(e, item._id)}>Add to cart</button>
                                        <button className={style.chatNow}>Chat Now </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Searchpage
