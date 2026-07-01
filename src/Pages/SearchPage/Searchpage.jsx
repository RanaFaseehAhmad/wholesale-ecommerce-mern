import style from "./Searchpage.module.css"
import Filter from "../../Components/Searchpage/Filter";

import { useContext, useState, useEffect } from "react"
import { ProductContext } from "../../Api/ProductsApi"
import { Rating } from 'primereact/rating';
import { useNavigate, useSearchParams } from "react-router-dom"
import { CartContext } from "../../CartContext/CreateContext";

function Searchpage() {
    const navigate = useNavigate()
    const { products } = useContext(ProductContext)
    const { dispatch } = useContext(CartContext)
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const [results, setResults] = useState([]);
    const [filterItems, setFilterItems] = useState([]);

    useEffect(() => {
        if (!query) return;

        const flatArray = products.flatMap((arr) => arr.items);

        const findItem = flatArray.find(
            (item) => item.name === query
        );

        if (findItem) {
            const data = flatArray.filter(
                (item) => item.subCategory === findItem.subCategory
            );

            setResults(data);
        }
    }, [query, products]);

    const addTocart = (item) => {
        navigate(`/cart`)
        dispatch({
            type: "Add_To_Cart",
            payload: item
        })
    }
    const exploreItem = (item) => {
        navigate(`/itemsummary/${item.id}`)
    }

    const displayedResult = filterItems ?
        results.filter((eachproduct) =>
            eachproduct.subCategory.includes(filterItems) ||
            eachproduct.name.includes(filterItems) ||
            eachproduct.tags.includes(filterItems)) : results
    // console.log("selected attr are:", displayedResult)
    useEffect(() => {
        setFilterItems([]);
    }, [query]);
    return (

        <div className={style.container}>
            <div className={style.wrapper}>
                <Filter results={results} setFilterItems={setFilterItems} filterItems={filterItems} />
                <div className={style.list}>
                    {
                        displayedResult.map((item) => (

                            <div key={item.id} className={style.card} onClick={() => exploreItem(item)}>
                                <div className={style.ItemImg}>
                                    <img src={item.image} alt="" />
                                </div>
                                <div className={style.ItemDesc}>
                                    <p className={style.name}>{item.name}</p>
                                    <Rating className={style.ratingstarcolor} value={item?.rating || 0} readOnly cancel={false} />
                                    <p className={style.description}>{item.description}</p>
                                    {item.discount && <span className={style.discount}>{item.discount}% off</span>}
                                    <span className={style.price}>PKR {item.price}</span>
                                    <div className={style.buttons}>
                                        <button className={style.addTocart} onClick={(e) => { e.stopPropagation(); addTocart(item) }}>Add to cart</button>
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
