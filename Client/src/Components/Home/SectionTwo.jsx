import style from "./SectionTwo.module.css"
import api from "../../Api/Axios";
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react";

function SectionTwo() {
    const [discountItems, setDiscountItems] = useState([])

    const fetchDiscountItems = async () => {
        try {
            const response = await api.get("/products/discount")
            // console.log(response.data)
            setDiscountItems(response.data.items)
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    useEffect(() => {
        fetchDiscountItems()
    }, [])

    return (

        <div className={style.SectionSale}>
            <div className={style.SectionSaleCountdown}>
                <div className={style.WrapperHeading}>
                    <div className={style.SaleTopHeading}>
                        <h4>Deals & Offers</h4>
                        <p>We Get The Amazing Deals For You</p>
                    </div>
                    <Link to="/Marketing/Top-Deals" className={style.ViewDeals}><i className={`pi pi-angle-right ${style.dealIcon}`}></i> </Link>
                </div>
            </div>
            <div className={style.SectionSaleItems}>
                <div className={style.DummyWrapper}>
                    {
                        discountItems.sort(() => Math.random() - 0.5).slice(0, 7).map((data, index) => (
                            <Link key={index} to="/Marketing/Top-Deals" className={style.itemLink}>
                                <div className={style.item} key={data.id}>
                                    <div className={style.itemImg}>
                                        <img src={data.image} alt="" />
                                    </div>
                                    <div className={style.itemDesc}>

                                        <p className={style.name}>{data.productName}</p>
                                        {/* <span className={style.Price}>{data.price}</span> */}
                                        <span className={style.discount}>Discount {data.discount}%</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }

                </div>
                <div className={style.ResultWrapper}>

                </div>

            </div>
        </div >

    )
}

export default SectionTwo
