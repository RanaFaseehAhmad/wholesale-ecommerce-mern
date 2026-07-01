import style from "./Cart.module.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../CartContext/CreateContext";
function Cart() {
    const { state, dispatch } = useContext(CartContext)
    const navigate = useNavigate()

    const getItemTotal = (item) => {
        const qty = item.quantity || 1
        return item.price * qty
    }

    const getItemFinalPrice = (item) => {
        const qty = item.quantity || 1
        const discount = (Number(item.discount || 0))

        const total = item.price * qty

        return discount > 0
            ? Math.round(total * (1 - discount / 100))
            : total
    }
    const subtotal = state.cartItems // only selected items are counted
        .filter((items) => state.selectedItems.includes(items.id))
        .reduce((acc, item) => acc + getItemFinalPrice(item), 0)

    console.log(subtotal)

    return (
        <div className={style.container}>
            <div className={style.cartWrapper}>
                <div className={style.Title}>
                    <h1>Shopping Cart {`(${state.cartItems.length})`}</h1>
                </div>
                {state.cartItems.length > 0 && <div className={style.selectDeselectAll}>
                    <label> <input name="select" type="checkbox" checked={
                        state.cartItems.length > 0 &&
                        state.cartItems.every(item =>
                            state.selectedItems.includes(item.id)
                        )
                    } onChange={() => dispatch({ type: "SelectAll_items" })} />Select all items</label>

                </div>}
                {state.cartItems.length > 0 ? (

                    <div className={style.cartitemsContainer}>
                        <div className={style.cartitemsWrapper}>
                            <div className={style.itemListBox}>
                                <div className={style.itemsList}>

                                    {state.cartItems.map((item) => (

                                        <div className={style.card} onClick={() => navigate(`/itemsummary/${item.id}`)}>
                                            <div className={style.cardtop}>
                                                <input onClick={(e) => e.stopPropagation()} className={style.select} name="select" checked={state.selectedItems.includes(item.id)} onChange={() => dispatch({ type: "Select_item", payload: item.id })} type="checkbox" />
                                                <i className={`pi pi-times ${style.deleteItem}`} onClick={(e) => { e.stopPropagation(); dispatch({ type: "Remove_item", payload: item.id }) }}></i>
                                            </div>
                                            <div className={style.itemWrapper}>
                                                <div className={style.item} >
                                                    <div className={style.imgBox}>
                                                        <img className={style.itemImage} src={item.image} alt="" />
                                                    </div>
                                                    <div className={style.content}>
                                                        <h2 className={style.name}>{item.name}</h2>
                                                        <p className={style.description}>{item.description}</p>
                                                        <p className={style.gender}>Gender: {item.gender}</p>
                                                        <p className={style.color}>Color: Blue</p>
                                                        {(item.discount) ? <span className={style.discount}>{(item.discount)}% off</span> : ""}
                                                    </div>
                                                </div>
                                                <div className={style.quantityPrice}>

                                                    <div className={style.price}>

                                                        {Number(item.discount) > 0 && <span className={style.discountPrice}>PKR {getItemFinalPrice(item)} </span>}
                                                        <span className={(item.discount) ? style.originalpriceLinethrought : style.originalPrice}>PKR {getItemTotal(item)}</span>
                                                    </div>
                                                    <span className={style.quantityControl}>
                                                        <button className={style.decrease} onClick={(e) => {
                                                            e.stopPropagation(); dispatch({ type: "Decrease_Qty", payload: item.id })
                                                        }}>
                                                            <span className={`pi pi-minus`}></span>
                                                        </button>
                                                        <span className={style.itemQuantity}>{item.quantity}</span>
                                                        <button className={style.increase} onClick={(e) => { e.stopPropagation(); dispatch({ type: "Increase_Qty", payload: item.id }) }}>
                                                            <span className={`pi pi-plus `}></span>
                                                        </button>
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                    ))
                                    }
                                </div>
                                <div className={style.buttons}>
                                    <button className={style.backBtn} onClick={() => navigate(-1)}><i className="pi pi-arrow-left"></i>Back to shop</button>
                                    <button className={style.removeallBtn} onClick={() => dispatch({ type: "clear_Cart" })}><i className="pi pi-trash" ></i>Remove all</button>
                                </div>
                            </div>

                            <div className={style.checkoutBoxWrapper}>
                                <div className={style.checkoutBox}>
                                    <div className={style.coupon}>
                                        <h3 className={style.couponTitle}>Hava a coupon?</h3>
                                        <form>
                                            <input className={style.coupon} type="text" placeholder="Add a Coupon?" />
                                            <button className={style.applyBtn} type="submit">Apply</button>
                                        </form>
                                    </div>
                                    <div className={style.totalBox}>
                                        <div className={style.subtotalBox}>
                                            <p className={style.subtotaltext}>SubTotal:</p>
                                            <span>Pkr {subtotal}</span>
                                        </div>
                                        <div className={style.discountBox}>
                                            <p className={style.discounttext}>Discount:</p>
                                            <span> -60Pkr</span>
                                        </div>
                                        <div className={style.total}>
                                            <p className={style.totalText}>Total:</p>
                                            <span>Rs {subtotal}</span>
                                        </div>
                                        <button className={style.checkout}>CheckOut</button>
                                        <span className={style.paymentCards}>
                                            <img className={style.Cardsimg} src="/itemsummarypage/paypal.jfif" alt="" />
                                            <img className={style.Cardsimg} src="/itemsummarypage/visa.jfif" alt="" />
                                            <img className={style.Cardsimg} src="/itemsummarypage/mastercard.png" alt="" />
                                            <img className={style.Cardsimg} src="/itemsummarypage/applepay.png" alt="" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>)
                    :

                    (
                        <div className={style.emptyContainer}>

                            <div className={style.emptycontentWrapper}>
                                <div className={style.emptyCartimgBox}>
                                    <img className={style.emptycartimg} src="/cart page/emptyshoppingcart.webp" alt="empty cart" />
                                </div>

                                <div className={style.emptycartContent}>
                                    <h2 className={style.emptycartTitle}>Your shopping cart is empty.</h2>
                                    <div className={style.emptycartdesc}>
                                        <p>Alibaba.com order protection</p>
                                        <div className={style.securePayment}>
                                            <i className={`pi pi-shield ${style.securePaymentIcon}`}></i>
                                            <p>Secure payments</p>
                                            <span className={style.paymentcards}>
                                                <img className={style.Cardsimg} src="/itemsummarypage/paypal.jfif" alt="PayPal" />
                                                <img className={style.Cardsimg} src="/itemsummarypage/visa.jfif" alt="Visa" />
                                                <img className={style.Cardsimg} src="/itemsummarypage/mastercard.png" alt="master" />
                                                <img className={style.Cardsimg} src="/itemsummarypage/applepay.png" alt="" />
                                            </span>
                                        </div>
                                        <div className={style.guaranteedDelivery}>
                                            <i className={`pi pi-truck ${style.guaranteedDeliveryIcon}`}></i>
                                            <p>Guaranteed delivery</p>
                                        </div>
                                        <div className={style.moneybackProtec}>
                                            <i className={`pi pi-money-bill ${style.moneybackProtecIcon}`}></i>
                                            <p>Money-back protection</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <button className={style.startshoppingBtn} onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth"
                                }); navigate("/")
                            }}> Start shopping</button>
                        </div>
                    )

                }
            </div>
        </div >
    )
}

export default Cart
