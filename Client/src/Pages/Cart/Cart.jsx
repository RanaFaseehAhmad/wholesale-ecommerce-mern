import style from "./Cart.module.css"
import api from "../../Api/Axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPopup from "../../Components/LoginPopup/LoginPopup";
import { useDispatch, useSelector } from "react-redux";
import {  cartCount } from "../../Features/cart/cartSlice";


function Cart() {
    const navigate = useNavigate()
    const [selectedItems, setSelectedItems] = useState([]);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
    const [data, setData] = useState([])


    const dispatch = useDispatch()
    const guestData = async () => {
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || []
        if (guestCart.length === 0) {
            setData([])
            dispatch(cartCount(guestCart.length || 0))
            return
        }
        const productIds = guestCart.map(item => item.productId)
        // console.log(productIds)
        try {
            const response = await api.post("/cart/guestCartItems", { productIds })

            console.log(response.data.result)
            const product = response.data.result
            const items = product.map(product => {
                const guestItem = guestCart.find(item => item.productId === product._id);
                return {
                    product,
                    quantity: guestItem.quantity
                };
            });
            dispatch(cartCount(product?.length || 0))
            setData([{ items }])
            console.log("result is", [{ items }])
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    //----LOGIN USER-----///

    const fetchData = async () => {
        try {
            const response = await api.get("/cart/cartItems")
            console.log(response.data.result[0].items.length)
            const result = response.data?.result || []
            setData(result)
            dispatch(cartCount(result[0]?.items?.length || 0))
            // refreshCartCount()
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            fetchData(); // logged-in user ka DB cart
        } else {
            guestData(); // guest ka localStorage cart
        }
    }, [isLoggedIn]);

    const getItemTotal = (priceparam, quantity) => {
        const qty = quantity || 1
        return priceparam * qty
    }

    const getItemFinalPrice = (discountparam, quantity, priceparam) => {
        const qty = quantity || 1
        const discount = (Number(discountparam || 0))

        const total = priceparam * qty

        return discount > 0
            ? Math.round(total * (1 - discount / 100))
            : total
    }

    const increaseQty = async (e, productId) => {
        e.stopPropagation()

        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || []
            const updatedGuestCart = guestCart.map(item => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            });
            localStorage.setItem(
                "guestCart",
                JSON.stringify(updatedGuestCart)
            );
            // setData(prev =>
            //     prev.map(cart => ({
            //         ...cart,
            //         items: cart.items.map(item =>
            //             item.product._id === productId ?
            //                 {
            //                     ...item,
            //                     quantity: item.quantity + 1
            //                 } : item
            //         )
            //     }))
            // )
            guestData()
            return
        }
        // -------LoginUser increaseQty-----//
        else {
            try {
                const response = await api.patch("/cart/increaseQty", { productId })
                // console.log(response.data)
                // setData(prev =>
                //     prev.map(cart => ({
                //         ...cart,
                //         items: cart.items.map(item =>
                //             item.product._id === productId ?
                //                 {
                //                     ...item,
                //                     quantity: response.data.cartItem.quantity
                //                 }
                //                 : item
                //         )
                //     })
                //     )
                // )
                fetchData()
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        }
    }
    const decreaseQty = async (e, productId) => {
        e.stopPropagation()

        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || []
            const updatedGuestCart = guestCart.map(item => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity: item.quantity - 1
                    }
                }
                return item
            });
            localStorage.setItem(
                "guestCart",
                JSON.stringify(updatedGuestCart)
            );

            // setData(prev =>
            //     prev.map(cart => ({
            //         ...cart,
            //         items: cart.items.map(item =>
            //             item.product._id === productId
            //                 ? {
            //                     ...item,
            //                     quantity: item.quantity - 1
            //                 }
            //                 : item
            //         )
            //     }))
            // );
            guestData()
            return
        }

        // -------LoginUser DecreaseQty-----//
        try {
            const response = await api.patch("/cart/decreaseQty", { productId })
            // console.log(response.data.cartItems)
            // setData(prev =>
            //     prev.map(cart => ({
            //         ...cart,
            //         items: cart.items.map(cartitem =>
            //             cartitem.product._id === productId ?
            //                 {
            //                     ...cartitem,
            //                     quantity: response.data.cartItems.quantity
            //                 } :
            //                 cartitem
            //         )
            //     }))
            // )
            fetchData()
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    const subtotal = data[0]?.items
        .filter((items) => selectedItems.includes(items.product._id))
        .reduce((acc, item) => acc + getItemFinalPrice(
            item.product.discount,
            item.quantity,
            item.product.price
        ), 0)
    // only selected items are counted
    // console.log("selectedItems:", selectedItems)

    const removeItem = async (productId) => {

        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {

            const guestCart = JSON.parse(localStorage.getItem("guestCart")) || []
            const removeGuestItem = guestCart.filter(item =>
                item.productId !== productId
            )
            localStorage.setItem("guestCart", JSON.stringify(removeGuestItem))

            guestData()
            return
        }
        // ---------------Login user removeitem--------------//
        try {
            await api.delete("/cart/removeItem", { data: { productId } })

            fetchData()

        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    const removeAllcartItems = async () => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            localStorage.removeItem("guestCart")
            guestData()
            return
        }
        // -------login User remove all items--------//
        try {
            const response = await api.delete("/cart/removeAllcartItems")
            console.log(response.data)
            fetchData()
        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    const handleCheckOut = async () => {
        const accessToken = localStorage.getItem("accessToken")
        if (!accessToken) {
            setShowLoginPopup(true)
        }
    }
    const cartItems = useSelector(state => state.cart.count)
    console.log(cartItems)
    return (
        <div className={style.container}>
            <div className={style.cartWrapper}>
                <div className={style.Title}>
                    <h1>Shopping Cart {cartItems}</h1>
                </div>
                {data[0]?.items?.length > 0 && <div className={style.selectDeselectAll}>
                    <label> <input name="select" type="checkbox" checked={
                        data[0]?.items?.length > 0 &&
                        data[0]?.items.every(item =>
                            selectedItems.includes(item.product._id)
                        )
                    }
                        onChange={(e) => {
                            if (e.target.checked) {
                                setSelectedItems(data[0].items.map(item => item.product._id))
                            }
                            else {
                                setSelectedItems([])
                            }
                        }}
                    />Select all items</label>

                </div>}
                {data[0]?.items?.length > 0 ? (

                    <div className={style.cartitemsContainer}>
                        <div className={style.cartitemsWrapper}>
                            <div className={style.itemListBox}>
                                <div className={style.itemsList}>

                                    {data[0]?.items?.map((item) => (

                                        <div className={style.card} >
                                            <div className={style.cardtop}>
                                                <input onClick={(e) => e.stopPropagation()} className={style.select} name="select"
                                                    checked={selectedItems.includes(item.product._id)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedItems(prev => [...prev, item.product._id])
                                                        }
                                                        else {
                                                            setSelectedItems(prev =>
                                                                prev.filter(id => id !== item.product._id))
                                                        }
                                                    }
                                                    }
                                                    type="checkbox" />
                                                <i className={`pi pi-times ${style.deleteItem}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeItem(item.product._id)
                                                    }}></i>
                                            </div>
                                            <div className={style.itemWrapper}>
                                                <div className={style.item} >
                                                    <div className={style.imgBox}>
                                                        <img className={style.itemImage} src={item.product.image} alt="" />
                                                    </div>
                                                    <div className={style.content} onClick={() => navigate(`/itemsummary/${item.product._id}`)}>
                                                        <h2 className={style.name}>{item.product.productName}</h2>
                                                        <p className={style.description}>{item.product.description}</p>
                                                        <p className={style.gender}>Gender: {item.product.gender}</p>
                                                        <p className={style.color}>Color: Blue</p>
                                                        {(item.product.discount) ? <span className={style.discount}>{(item.product.discount)}% off</span> : ""}
                                                    </div>
                                                </div>
                                                <div className={style.quantityPrice}>

                                                    <div className={style.price}>

                                                        {Number(item.product.discount) > 0 && <span className={style.discountPrice}>PKR {getItemFinalPrice(item.product.discount, item.quantity, item.product.price)} </span>}
                                                        <span className={(item.product.discount) ? style.originalpriceLinethrought : style.originalPrice}>PKR {getItemTotal(item.product.price, item.quantity)}</span>
                                                    </div>
                                                    <span className={style.quantityControl}>
                                                        <button disabled={item.quantity === 1} className={style.decrease} onClick={(e) => decreaseQty(e, item.product._id)}>
                                                            <i className={`pi pi-minus`}></i>
                                                        </button>
                                                        <span className={style.itemQuantity}>{item.quantity}</span>
                                                        <button className={style.increase} onClick={(e) => increaseQty(e, item.product._id)}>
                                                            <i className={"pi pi-plus "}> </i>
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
                                    <button className={style.removeallBtn}
                                        onClick={() => removeAllcartItems()}
                                    ><i className="pi pi-trash" ></i>Remove all</button>
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
                                            <span>Pkr {subtotal} </span>
                                        </div>
                                        <div className={style.discountBox}>
                                            <p className={style.discounttext}>Discount:</p>
                                            <span> -60Pkr</span>
                                        </div>
                                        <div className={style.total}>
                                            <p className={style.totalText}>Total:</p>
                                            <span>Rs {subtotal}</span>
                                        </div>
                                        <button className={style.checkout} onClick={handleCheckOut}>CheckOut</button>
                                        <span className={style.paymentCards}>
                                            <img className={style.Cardsimg} src="/itemsummarypage/paypal.jfif" alt="" />
                                            <img className={style.Cardsimg} src="/itemsummarypage/visa.jfif" alt="" />
                                            <img className={style.Cardsimg} src="/itemsummarypage/mastercard.png" alt="" />
                                            <img className={style.Cardsimg} src="/itemsummarypage/applepay.png" alt="" />
                                        </span>
                                    </div>
                                    {showLoginPopup && (<LoginPopup onLogin={() => setIsLoggedIn(true)} onClose={() => setShowLoginPopup(false)} />)}
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

                }</div>
        </div>
    )
}

export default Cart
