import style from "./Itempricequantity.module.css"
import { Rating } from 'primereact/rating';
import 'primeicons/primeicons.css';




function Itempricequantity({ item }) {
    const subtotal = item?.price || 0
    const discount = (item?.discount || 0);
    const discountAmount = subtotal * (discount) / 100
    const total = Math.round(subtotal - discountAmount)

    return (

        <div className={style.infoContent}>

            <div className={style.reviewAndNameWrapper}>
                <span className={style.availability}>
                    <i className={`pi pi-check ${style.availableIcon}`}></i> In Stock
                </span>
                <div className={style.nameRating}>
                    <h1 className={style.itemName}>{item?.name}</h1>
                    <div className={style.rating}>
                        <div className={style.starRating}>
                            <Rating className={style.ratingstarcolor} value={item?.rating || 0} readOnly cancel={false} />
                            <p className={style.ratingnum}>{item?.rating || "no rating"}</p>
                        </div>
                        <div className={style.commentsoldWrapper}>

                        <div className={style.customerComment}>
                            <span className={`pi pi-comment ${style.commentIcon}`}></span>
                            <p className={style.reviews}>{item?.reviews?.length || "No "} reviews </p>
                        </div>
                        <div className={style.sold}>
                            <span className={`pi pi-shopping-cart ${style.ShoppingCartIcon}`}></span>
                            <span className={style.soldnum}>153 sold</span>
                        </div>
                        </div>
                    </div>
                </div>
                <div className={style.priceWrapper}>
                    {discount ? <span className={style.discount}>Discount: {discount}%</span> : ""}
                    <span className={discount ? style.prevPrice : style.price}>PKR {subtotal}</span>
                    {discount > 0 && <p className={style.discountedPrice}>PKR {total} </p>}
                    <p className={style.minimumOrder}>Minimum order quantity: 500 sets</p>
                </div>
                <div className={style.quantityWrapper}>
                    <h3 className={style.quantityText}>Quantity</h3>
                    <p className={style.quantityDetail}>1 batch = 10 pieces</p>
                    <div className={style.quantity}>
                        <div className={style.pkgOne}>
                            <h2 className={style.quantityPrice}>PKR 250</h2>
                            <p className={style.pieces}>10-490 pieces</p>
                        </div>
                        <div className={style.pkgTwo}>
                            <h2 className={style.quantityPrice}>PKR 244</h2>
                            <p className={style.pieces}>500-990 pieces</p>
                        </div>
                        <div className={style.pkgThree}>
                            <h2 className={style.quantityPrice}>PKR 235</h2>
                            <p className={style.pieces}>≥1,000 pieces</p>
                        </div>
                    </div>

                </div>

                <div className={style.itemDescription}>
                    <dl className={style.detailsList}>
                        <dt className={style.itemHeading}>Price</dt>
                        <dd className={style.itemData}>Negotiable</dd>

                        <dt className={style.itemHeading}>Type</dt>
                        <dd className={style.itemData}>{item?.subCategory}</dd>

                        <dt className={style.itemHeading}>Design</dt>
                        <dd className={style.itemData}>Classic</dd>

                        <dt className={style.itemHeading}>Customization:</dt>
                        <dd className={style.itemData}>Customized logo and design custom packages</dd>

                        <dt className={style.itemHeading}>Protection:</dt>
                        <dd className={style.itemData}>Refund Policy</dd>

                        <dt className={style.itemHeading}>Warranty</dt>
                        <dd className={style.itemData}>10 days return warranty</dd>
                    </dl>

                   
                </div>
            </div>


        </div >
    )
}

export default Itempricequantity
