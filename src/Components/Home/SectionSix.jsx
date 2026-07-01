import style from "./SectionSix.module.css"
import {  useNavigate } from "react-router-dom"
import { ProductContext } from "../../Api/ProductsApi"
import { useContext } from "react"

function SectionSix() {
    const { products } = useContext(ProductContext)
    const navigate = useNavigate();

    const filteredItems = products.flatMap((data) => data.items)
        .sort(() => Math.random() - 0.5)

    const selectItem = (id) => {
        navigate(`/itemsummary/${id}`);
    }

    return (

        <div className={style.SectionRecommended}>
            <h1 className={style.title}>Recommended items</h1>
            <div className={style.RecommendedItems}>

                {/* map go here */}
                {
                    filteredItems.slice(0, 54).map((item, id) => (

                        <div key={item.id} className={style.RecommendedItem} onClick={() => selectItem(item.id)}>
                            <div className={style.RecommendedItemImg}>
                                <img src={item.image} alt="" />
                            </div>
                            <div className={style.RecommendedItemDesc}>
                                <p className={style.name}>{item.name}</p>

                                <p className={style.description}>{item.description}</p>
                                <span className={style.price}>PKR {item.price}</span>
                            </div>
                        </div>

                    ))

                }

            </div>
        </div>

    )
}

export default SectionSix
