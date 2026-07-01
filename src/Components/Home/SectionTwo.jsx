import style from "./SectionTwo.module.css"
import 'primeicons/primeicons.css';
import { Link } from "react-router-dom"
import { useContext } from "react"
import { ProductContext } from "../../Api/ProductsApi"

function SectionTwo() {
    const { products } = useContext(ProductContext)

    //we cannot directly filter the discount from items because items is an array means we have many items thats why we use flatMap this gives us items in an array combine
    const flatarray = products.flatMap((data) => data.items)
    const selectedItem = flatarray.filter((item) => item.discount)
        .sort(() => Math.random() - 0.5)

    // console.log("filteres item", selectedItem)


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
                        selectedItem.slice(0, 6).map((data) => (
                            <Link to="/Marketing/Top-Deals" className={style.itemLink}>
                                <div className={style.item} key={data.id}>
                                    <div className={style.itemImg}>
                                        <img src={data.image} alt="" />
                                    </div>
                                    <div className={style.itemDesc}>

                                        <p className={style.name}>{data.name}</p>
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
