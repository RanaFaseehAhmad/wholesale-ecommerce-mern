import style from "./SectionThree.module.css"
api
import { Link } from "react-router-dom"

import { ProductContext } from "../../Api/ProductsApi";
import { useContext } from "react";
import api from "../../Api/Axios";
import { useEffect } from "react";

function SectionThree() {
    const [category, setCategory]= useState([])
    // const { products } = useContext(ProductContext)

    // const filteredCategory = products.filter((item) => item.category === "Home & Garden")
    // const showCategory = filteredCategory.flatMap((data) => data.items)
    //     .sort(() => Math.random() - 0.5)
    // console.log(showCategory)

    const fetchDecorItems = async () => {
        try {
            const response = await api.get(`/products/cateogry?query=${Home & decor}`)
        setCategory(response.data.item)
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    useEffect(()=>{
        fetchDecorItems()
    },[])
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
                        category.slice(0, 8).map((data, index) => (
                            <div key={index} className={style.DecorItem}>

                                <div className={style.DecorItemDesc}>
                                    <p className={style.name}>{data.productName}</p>
                                    <p className={style.from}>From</p>
                                    <span className={style.price}>{data.price}</span>
                                </div>
                                <div className={style.DecorItemImg}>
                                    <img src={data.image} alt={data.productName} />
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
