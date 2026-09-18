import style from "./Searchpage.module.css"
import api from "../../Api/Axios";
import Filter from "../../Components/Searchpage/Filter";

import { useState, useEffect } from "react"
import { Toast } from "primereact/toast";
import { useRef } from "react";

import { Rating } from 'primereact/rating';
import { useNavigate, useLocation, } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { addToCart, fetchSearchData } from "../../Api/productApi.js";
import { cartCount } from "../../Features/cart/cartSlice.js";



function Searchpage() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient();
    const toast = useRef(null);
    const loaderRef = useRef(null)
    const navigate = useNavigate()
    const [results, setResults] = useState([]);
    const [filterItems, setFilterItems] = useState([]);
    const [products, setProducts] = useState([])

    const { search } = useLocation()

    const searchQuery = new URLSearchParams(search).get("query");
    // const productId = new URLSearchParams(search).get("productId");
    const isloggedIn = useSelector(state => state.auth.isAuthenticated)

    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, initialPageParam } = useInfiniteQuery({
        queryFn: fetchSearchData,
        queryKey: ["products"],
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined
        }
    })

    const fetchData = async () => {
        // console.log(productId)
        try {
            if (searchQuery) {
                const response = await api.get(`/products/searchpage/?query=${searchQuery}`)
                setProducts(response.data.result)
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [searchQuery])








    const addToCartMutation = useMutation({
        mutationFn: addToCart,
        onSuccess: (data) => {
            console.log("item added successfuly", data);
            queryClient.invalidateQueries({
                queryKey: ['cart']
            });
            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Product added to cart",
                life: 3000
            });
            // navigate("/cart")
        },
        onError: (error) => {
            console.log(error.response?.data?.message)
        }
    })

    let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const handleAddToCart = (e, productId) => {
        e.stopPropagation()
        if (!isloggedIn) {
            guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
            const existingItem = guestCart.find(item => item.productId === productId)
            if (existingItem) {
                existingItem.quantity += 1
            }
            else {
                guestCart.push({ quantity: 1, productId: productId });
            }
            localStorage.setItem("guestCart", JSON.stringify(guestCart));

            const totalQuantity = guestCart.reduce(
                (total, item) => total + item.quantity,
                0
            );

            dispatch(cartCount(totalQuantity));

            toast.current.show({
                severity: "success",
                summary: "Success",
                detail: "Product added to cart",
                life: 3000
            });


            // navigate(`/cart`)
            return
        }
        else {
            addToCartMutation.mutate({
                productId,
                quantity: 1
            })
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


    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting &&
                !isFetchingNextPage &&
                hasNextPage
            )
                fetchNextPage()
        })
        const loader = loaderRef.current;

        if (loader) {
            observer.observe(loader);
        }
        return () => {
            observer.disconnect();
        };
    }, [isFetchingNextPage, hasNextPage, fetchNextPage])



    return (

        <div className={style.container}>
            <Toast className={style.toast} ref={toast} />
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
                                        <button className={style.addTocart} onClick={(e) => handleAddToCart(e, item._id)}>Add to cart</button>
                                        <button className={style.chatNow}>Chat Now </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    {/* <div ref={loaderRef}></div> */}
                </div>
            </div>
        </div>
    )
}

export default Searchpage
