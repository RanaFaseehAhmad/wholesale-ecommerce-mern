import style from "./Itemdescription.module.css"
import { TabView, TabPanel } from 'primereact/tabview';
import { Rating } from 'primereact/rating';
import { useState } from "react";


function Itemdescription({ products }) {
    const [open, setOpen] = useState(false)
    // const menuref = useRef(null)
    console.log("products", products)

    const toggleOpen = () => {
        setOpen((prev) => !prev)
    }
    // console.log(item)
    const averageRating =
        products?.reviews?.length
            ? products.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
            products.reviews.length
            : 0;


    return (
        <div className={style.container}>

            <div className={style.blockDescription}>
                <div className={style.descriptionNav}>
                    <ul className={style.descriptionMenu}>
                        <li>Description</li>
                        <li> <a href="#reviews">Reviews</a> </li>
                        <li>Shipping</li>
                        <li>About seller</li>
                    </ul>
                </div>
                <div className={style.description}>
                    <h2 className={style.descriptionTitle}>Key Attributes</h2>
                    <div className={style.descriptionTable}>
                        <dl className={style.desList}>
                            <div className={style.row}>
                                <dt className={style.title}>Type </dt>
                                <dd className={style.detail}>{products.subcategory?.name}</dd>

                                <dt className={style.title}>Style </dt>
                                <dd className={style.detail}>Modern</dd>
                            </div>
                            <div className={style.row}>
                                <dt className={style.title}>Application </dt>
                                <dd className={style.detail}>Camping, Entertainment, Gambling, casino entertainment, casino club, casino gambling, play mahjong</dd>

                                <dt className={style.title}>Place of Origin </dt>
                                <dd className={style.detail}>Headphones</dd>
                            </div>
                            <div className={style.row}>
                                <dt className={style.title}>Beijing, China </dt>
                                <dd className={style.detail}>Headphones</dd>

                                <dt className={style.title}>Color </dt>
                                <dd className={style.detail}>Blue, Pink, Purple</dd>
                            </div>
                            <div className={style.row}>
                                <dt className={style.title}>Size </dt>
                                <dd className={style.detail}>Custom Size</dd>

                                <dt className={style.title}>Usage        </dt>
                                <dd className={style.detail}>Casino Club</dd>
                            </div>
                            <div className={style.row}>
                                <dt className={style.title}>Quality </dt>
                                <dd className={style.detail}>Professional Casino Quality</dd>

                                <dt className={style.title}>Number of Players </dt>
                                <dd className={style.detail}>4</dd>
                            </div>
                            <div className={style.row}>
                                <dt className={style.title}>Feature </dt>
                                <dd className={style.detail}>Portable</dd>

                                <dt className={style.title}>Applicable People </dt>
                                <dd className={style.detail}>Universal, Female, Male</dd>
                            </div>
                            <div className={style.row}>
                                <dt className={style.title}>Material </dt>
                                <dd className={style.detail}>Acrylic </dd>

                                <dt className={style.title}>Logo </dt>
                                <dd className={style.detail}>Customer Logo</dd>
                            </div>
                            <div className={style.row} >
                                <dt className={style.title}>Keyword </dt>
                                <dd className={style.detail}>Mahjong Juego Mesa Tile</dd>
                            </div>
                        </dl>

                    </div>
                    <div className={style.leadtime}>
                        <div className={style.hideshow}>
                            <h2 className={style.leadtimetitle}> Lead time</h2>
                            <div className={style.icon}>

                                <i onClick={toggleOpen} className={open ? "pi pi-angle-up" : "pi pi-angle-down"}></i>

                            </div>
                        </div>

                        <dl className={open ? style.leadtimeTable : style.leadtimeTablehidden}>
                            <div className={style.leadtimeTablerow}>
                                <dd className={style.leadTableTitle}>Quantity (packs)</dd>
                                <div className={style.detailList}>

                                    <dt className={style.leadTableDesc}>1-100</dt>
                                    <dt className={style.leadTableDesc}>101-500</dt>
                                    <dt className={style.leadTableDesc}>Greater then 500</dt>
                                </div>
                            </div>
                            <div className={style.leadtimeTablerow}>
                                <dd className={style.leadTableTitle}>Lead time (days)</dd>
                                <div className={style.detailList}>
                                    <dt className={style.leadTableDesc}>25</dt>
                                    <dt className={style.leadTableDesc}>30</dt>
                                    <dt className={style.leadTableDesc}>To be negotiated</dt>
                                </div>
                            </div>
                        </dl>
                    </div>
                    <div className={style.ratingreviewsWrapper}>
                        <TabView id="reviews">
                            <TabPanel header={`Product reviews (${products?.reviews?.length || 0})`}>
                                <div className={style.reviewContainer}>
                                    {products?.reviews?.length > 0 ?
                                        (<div className={style.reviewWrapper}>
                                            <div className={style.overallAvgTitleWrapper}>
                                                <h1 className={style.avgRating}>{averageRating.toFixed(1)}</h1>
                                                <Rating className={style.ratingstarcolor} value={averageRating} readOnly cancel={false} />
                                                <p className={style.satisfaction}>Very Satisfied</p>
                                                <p className={style.reviewsNumber}>Based on {products.reviews?.length} reviews for <span className={style.varifiedpurchaseText}>Verified Purschase</span> <i className={`pi pi-verified ${style.varifiedpurchaseTextIcon}`}></i></p>
                                            </div>

                                            {products?.reviews?.map((rev, index) => (

                                                <div key={index} className={style.reviewSection}>
                                                    <div className={style.customerReview}>
                                                        <p className={style.customerNameWrapper}><span className={style.cutomerProfile}> {rev.user?.charAt(0)?.toUpperCase() || "U"}</span>{rev.user}</p>

                                                        <span className={style.countryFlag}> pakistan </span>
                                                        <span className={style.verifiedPurchaseText}>Verified Purschase</span>
                                                    </div>
                                                    <div className={style.customerrating}>
                                                        <Rating className={style.ratingstarcolor} value={rev.rating} readOnly cancel={false} />
                                                        <p className={style.customerComment}>{rev.comment}</p>
                                                    </div>
                                                </div>
                                            ))}

                                        </div>) :
                                        (<div className={style.reviewMsg}>  <p className="m-0"> No product reviews yet</p>
                                            <p>Go to Store reviews to see reviews for other products</p>  </div>)

                                    }
                                </div>
                            </TabPanel>
                            <TabPanel header="Store reviews (0)">
                                <p className={`m-0 ${style.reviewMsg}`}>
                                    No reviews yet
                                </p>
                            </TabPanel>
                        </TabView>

                    </div>




                </div>

            </div>
        </div>
    )
}

export default Itemdescription
