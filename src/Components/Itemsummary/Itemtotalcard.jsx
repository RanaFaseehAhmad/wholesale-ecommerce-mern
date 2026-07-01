import style from "./Itemtotalcard.module.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../CartContext/CreateContext";

function Itemtotalcard({ item }) {
    const { dispatch } = useContext(CartContext);
    const navigate = useNavigate();

    const addTocart = (item) => {
        navigate("/cart")
        dispatch({
            type: "Add_To_Cart",
            payload: item
        })
    }
    return (
        <div className={style.sellerInfoMain}>

            <div className={style.sellerInfo}>

                <div className={style.sellerProfile}>
                    <h3 className={style.shippingtitle}>Shipping</h3>
                    <span className={style.shippingtitleInfo}>Shipping fee and delivery date to be negotiated. Chat with supplier now for more details.</span>
                </div>
                <div className={style.orderProtectionWrapper}>
                    <div className={style.popupWrapper}>
                        <p className={style.visitPopupProtection}>BuyAllGuyz.com Order Protection</p>
                        <i className="pi pi-angle-right"></i>
                    </div>

                </div>
                <div className={style.securePayment}>
                    <div className={style.imgTextWrapper}>
                        <i className="pi pi-shield"></i>
                        <span className={style.paymentcardBox}>
                            <h4 className={style.heading}>Secure Payment</h4>

                            <img src="/itemsummarypage/paypal.jfif" alt="PayPal" />
                            <img src="/itemsummarypage/visa.jfif" alt="Visa" />
                            <img src="/itemsummarypage/mastercard.png" alt="master" />
                            <img src="/itemsummarypage/applepay.png" alt="master" />
                        </span>
                    </div>
                    <p className={style.paymentText}>Every transaction you make through Alibaba.com is protected by SSL encryption and PCI DSS data security protocols.</p>
                </div>
                <div className={style.moneyBackWrapper}>
                    <div className={style.moneyBackProtection}>
                        <i className="pi pi-money-bill"></i>
                        <h4 className={style.heading}>Money-back protection</h4>
                    </div>
                    <p className={style.paymentText}>Claim a refund if your order doesn't ship, is missing, or arrives with product issues</p>
                </div>
                <div className={style.btn}>
                    <button onClick={() => addTocart(item)} className={style.sendInquirybtn}><i className="pi pi-shopping-cart"></i>Add to cart</button>
                    <button className={style.chatNowbtn}>Chat Now</button>
                </div>
            </div>


        </div>
    )
}

export default Itemtotalcard
