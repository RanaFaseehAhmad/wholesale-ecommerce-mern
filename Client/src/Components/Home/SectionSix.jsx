import style from "./SectionSix.module.css"
import api from "../../Api/Axios"
import { useNavigate } from "react-router-dom"
import { useRef, useState, useEffect, useCallback } from "react"

function SectionSix() {
    const [product, setProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const [cursor, setCursor] = useState(null)
    const [hasMore, setHasMore] = useState(true)
    const loaderRef = useRef(null)
    const loadingRef = useRef(false);
    const navigate = useNavigate();


    const selectItem = (id) => {
        navigate(`/itemsummary/${id}`);
    }

    const fetchproducts = useCallback(async () => {
        if (loadingRef.current || !hasMore) return;

        loadingRef.current = true;
        setLoading(true)
        try {
            const url = cursor ? `/products?cursor=${cursor}` :
                `/products`
            const response = await api.get(url)
            // console.log(response.data)
            const newData = response.data.products
            setProduct((prev) => [
                ...prev,
                ...newData
            ])
            // console.log("products are :", newData)

            setCursor(response.data.nextCursor)
            // console.log("Next cursor:", response.data.nextCursor)
            if (!response.data.nextCursor) {
                setHasMore(false)
            }
        } catch (error) {
            console.log(error.response?.data)
        }
        finally {
            loadingRef.current = false;
            setLoading(false)
        }
    }, [cursor])

    useEffect(() => {
        fetchproducts()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                fetchproducts()
            }
        })
        observer.observe(loaderRef.current)
        return () => {
            observer.disconnect();
        };
    }, [fetchproducts])


    return (

        <div className={style.SectionRecommended}>
            <h1 className={style.title}>Recommended items</h1>
            <div className={style.RecommendedItems}>

                {/* map go here */}
                {
                    product.map((item) => (

                        <div key={item._id} className={style.RecommendedItem}
                            onClick={() => selectItem(item._id)}
                        >
                            <div className={style.RecommendedItemImg}>
                                <img src={item.image} alt="" />
                            </div>
                            <div className={style.RecommendedItemDesc}>
                                <p className={style.name}>{item.productName}</p>

                                <p className={style.description}>{item.description}</p>
                                <span className={style.price}>PKR {item.price}</span>
                            </div>
                        </div>

                    ))

                }
                <div ref={loaderRef}></div>
            </div>
        </div>

    )
}

export default SectionSix
