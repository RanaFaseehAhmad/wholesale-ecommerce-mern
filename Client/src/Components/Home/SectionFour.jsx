import { Link } from "react-router-dom"
import style from "./SectionFour.module.css"

import { ProductContext } from "../../Api/ProductsApi";
import { useContext } from "react";

function SectionFour() {
    const { products } = useContext(ProductContext)

    const filteredCategory = products.filter((item) => item.category === "Electronics")
    const showCategory = filteredCategory.flatMap((data) => data.items)
        .sort(() => Math.random() - 0.5)


    return (

        <div className={style.SectionConsumerElectronics}>
            <div className={style.ConsumerLeftSide}>
                <div className={style.ConsumerItemsImg}>
                    <div className={style.ConsumerItemsDesc}>
                        <h4>Consumer <br /> Electronics and Gadgets</h4>

                        <Link to="">

                            <button className={style.ConsumerItemsImgBtn}>Source now</button>
                        </Link>
                    </div>

                </div>

            </div>
            <div className={style.SectionConsumerMain}>
                <div className={style.MainConsumerItems}>
                    {
                        showCategory.slice(0, 8).map((data, index) => (


                            <div className={style.ConsumerItem}>
                                <div className={style.ConsumerItemDesc}>
                                    <p className={style.name}>{data.name}</p>
                                    <p className={style.from}>From</p>
                                    <span className={style.price}>{data.price}</span>
                                </div>
                                <div className={style.ConsumerItemImg}>
                                    <img src={data.image} alt="chair" />
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </div>

    )
}

export default SectionFour
