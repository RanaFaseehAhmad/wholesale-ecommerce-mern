import style from "./SectionSix.module.css"
import { fetchProducts } from "../../Api/productApi.js";
import { useNavigate } from "react-router-dom"
import { useRef, useEffect } from "react"
import { useInfiniteQuery } from "@tanstack/react-query";


function SectionSix() {
    const loaderRef = useRef(null)
    const navigate = useNavigate();


    const selectItem = (id) => {
        navigate(`/itemsummary/${id}`);
    }
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, initialPageParam } = useInfiniteQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts,
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor ?? undefined
        }
    })
    const products = data?.pages.flatMap(page => page.products) ?? []


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

        <div className={style.SectionRecommended}>
            <h1 className={style.title}>Recommended items</h1>
            <div className={style.RecommendedItems}>
                {
                    products.map((item) => (

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
