import style from "./SectionThree.module.css"
import { Link } from "react-router-dom"

import { ProductContext } from "../../Api/ProductsApi";
import { useContext } from "react";

function SectionThree() {
    const { products } = useContext(ProductContext)

    const filteredCategory = products.filter((item) => item.category === "Home & Garden")
    const showCategory = filteredCategory.flatMap((data) => data.items)
        .sort(() => Math.random() - 0.5)
    // console.log(showCategory)
    return (

        <div className={style.SectionDecor}>
            <div className={style.SectionDecorLeftSide}>
                <div className={style.DecorItemsImg}>
                    <div className={style.DecorItemsDesc}>
                        <h4>Home and <br />outdoor </h4>
                        <Link to="">

                            <button className={style.DecorItemsImgBtn}>Source now</button>
                        </Link>
                    </div>

                </div>

            </div>
            <div className={style.SectionDecorMain}>
                <div className={style.MainDecorItems}>

                    {
                        showCategory.slice(0, 8).map((data, index) => (
                            <div key={index} className={style.DecorItem}>

                                <div className={style.DecorItemDesc}>
                                    <p className={style.name}>{data.name}</p>
                                    <p className={style.from}>From</p>
                                    <span className={style.price}>{data.price}</span>
                                </div>
                                <div className={style.DecorItemImg}>
                                    <img src={data.image} alt={data.name} />
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>



        </div>

    )
}

export default SectionThree
