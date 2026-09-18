import style from "./Cart.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartCount, ClearSelectedItems, SetselectedItems } from "../../Features/cart/cartSlice";
import Signin from "../../Components/SignIn/Signin";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { guestUserItems, loginUserCartItems, increaseLoginQtyMutation, decreaseLoginQtyMutation, removeLoginItem, removeAllLoginItem, handleOrder } from "../../Api/productApi";
import { Toast } from "primereact/toast";



function Cart() {
      const toast = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [guestCart, setGuestCart] = useState(
        () => JSON.parse(localStorage.getItem("guestCart")) || []
    );

    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated)
    const selectedIds = useSelector((state) => state.cart.selectedItems)
    console.log("selectedIds", selectedIds)


    const productIds = guestCart.map(item => item.productId)

    const { data: guestData,
        isLoading: guestLoading,
        isError: guestError
    } = useQuery({
        queryKey: ["guestCart", productIds],
        queryFn: () => guestUserItems(productIds),
        enabled: !isLoggedIn && productIds.length > 0
    });
    const { data: loginData,
        isLoading: loginLoading,
        isError: loginError } = useQuery({
            queryKey: ["cart"],
            queryFn: loginUserCartItems,
            enabled: isLoggedIn
        });

    const loginCartItems = loginData?.result?.[0]?.items || [];
    console.log("login cart items", loginCartItems)
    const guestProducts = guestData?.result || [];

    const guestcartItems = guestProducts.map(product => {
        const guestItem = guestCart.find(item => item.productId === product._id)
        return {
            product,
            quantity: guestItem?.quantity || 1
        }
    })

    const cartItems = isLoggedIn ? loginCartItems : guestcartItems
    console.log("cartItems", cartItems)




    const increaseQtyMutation = useMutation({
        mutationFn: increaseLoginQtyMutation,
        onSuccess: (data) => {
            console.log("login item quantity increased", data);
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
        },
        onError: (error) => {
            console.log(error.response?.data?.message)
        }
    })

    const increaseQty = (e, productId) => {
        console.log("increase")
        e.stopPropagation()
        console.log("3. increaseQty called", productId);
        console.log("4. isLoggedIn:", isLoggedIn);
        if (!isLoggedIn) {
            const updatedGuestCart = guestCart.map(item => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            });
            setGuestCart(updatedGuestCart);
            localStorage.setItem(
                "guestCart",
                JSON.stringify(updatedGuestCart)
            );
            return
        }
        else {
            console.log("5. calling mutation");
            increaseQtyMutation.mutate(productId)
        }
    }

    const decreaseQtyMutation = useMutation({
        mutationFn: decreaseLoginQtyMutation,
        onSuccess: (data) => {
            console.log("dcrease quantity successfuly", data);
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
        },
        onError: (error) => {
            console.log(error.response?.data?.message)
        }
    })

    const decreaseQty = (e, productId) => {
        e.stopPropagation()
        console.log("decrease", productId)
        if (!isLoggedIn) {
            const updatedGuestCart = guestCart.map(item => {
                if (item.productId === productId) {
                    return {
                        ...item,
                        quantity: Math.max(1, item.quantity - 1)
                    }
                }
                return item
            });
            setGuestCart(updatedGuestCart)
            localStorage.setItem(
                "guestCart",
                JSON.stringify(updatedGuestCart)
            );
            return
        }
        else {
            decreaseQtyMutation.mutate(productId)
        }
    }


    const removeItem = useMutation({
        mutationFn: removeLoginItem,
        onSuccess: (data) => {
            console.log("remove item", data);
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
        },
        onError: (error) => {
            console.log(error.response?.data?.message)
        }
    })

    const handleRemoveItem = (productId) => {
        console.log("remove item:", productId)
        dispatch(SetselectedItems(
            selectedIds.filter(item => item !== productId)
        ))
        if (!isLoggedIn) {
            const updatedCart = guestCart.filter(item =>
                item.productId !== productId
            )
            setGuestCart(updatedCart)
            localStorage.setItem("guestCart", JSON.stringify(updatedCart))
            return
        }

        removeItem.mutate(productId)


    }

    const removeAllLoginMutation = useMutation({
        mutationFn: removeAllLoginItem,
        onSuccess: (data) => {
            console.log("remove all cartitems", data)
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
        },
        onError: (error) => {
            console.log(error.response?.data?.message)
        }
    })

    const removeAllcartItems = () => {
        dispatch(ClearSelectedItems())
        if (!isLoggedIn) {
            localStorage.removeItem("guestCart")
            setGuestCart([])
            return
        }
        removeAllLoginMutation.mutate();
    }



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


    const subtotal = cartItems
        .filter((items) => selectedIds.includes(items.product._id))
        .reduce((acc, item) => acc + getItemFinalPrice(
            item.product.discount,
            item.quantity,
            item.product.price
        ), 0)

    // console.log(cartItemsCount)
    // console.log("selectedItems", selectedIds)

    // set total CartItems Quantity in the  redux dispatch
    const count = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    )

    useEffect(() => {
        dispatch(cartCount(count))
    }, [count, dispatch])

    //get total items from the redux to show in the cart
    const totalItems = useSelector(state => state.cart.count)
    // console.log(totalItems)

    //map cartItems to give full selected products
    const selectedProduct = cartItems.filter(item => {
        return selectedIds.includes(item.product._id)
    })
    // console.log("selectedProduct", selectedProduct)

    // selcted items quantity count
    const selectedItemsCount = selectedProduct.reduce(
        (total, item) => total + item.quantity,
        0
    )

    const handleCheckOut = () => {
        if (!isLoggedIn) {
            setShowLoginPopup(true)

        }
        else {
            if (selectedIds.length === 0) {
                toast.current.show({
                    severity: "warn",
                    summary: "Select Item",
                    detail: "Please select at least one item first.",
                    life: 3000
                });

                return;
            }
            else {
                navigate("/checkout")
            }

        }
    }

    // console.log(cartItems)
    const onClose = () => {
        setShowLoginPopup(false)
    }

    return (
        <div className={style.container}>
            <Toast className={style.toast} ref={toast} />
            <div className={style.cartWrapper}>
                <div className={style.Title}>
                    <h1>Shopping Cart {totalItems}</h1>
                </div>
                {cartItems?.length > 0 && <div className={style.selectDeselectAll}>
                    <label> <input name="select" type="checkbox" checked={
                        cartItems?.length > 0 &&
                        cartItems.every(item =>
                            selectedIds.includes(item.product._id)
                        )
                    }
                        onChange={(e) => {
                            if (e.target.checked) {
                                dispatch(SetselectedItems(
                                    cartItems.map(items => {
                                        return items.product._id
                                    })

                                ))
                            }
                            else {
                                dispatch(ClearSelectedItems())

                            }
                        }}
                    />Select all items</label>

                </div>}
                {cartItems?.length > 0 ? (

                    <div className={style.cartitemsContainer}>
                        <div className={style.cartitemsWrapper}>
                            <div className={style.itemListBox}>
                                <div className={style.itemsList}>

                                    {cartItems.map((item) => (

                                        <div key={item.product._id} className={style.card} >
                                            <div className={style.cardtop}>
                                                <input onClick={(e) => e.stopPropagation()} className={style.select} name="select"
                                                    checked={selectedIds.some(itemId => itemId === item.product._id)}

                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            dispatch(
                                                                SetselectedItems([
                                                                    ...selectedIds,
                                                                    item.product._id
                                                                ])
                                                            );
                                                        }
                                                        else {

                                                            dispatch(SetselectedItems(
                                                                selectedIds.filter(selectedItem => selectedItem !== item.product._id)))

                                                        }
                                                    }
                                                    }
                                                    type="checkbox" />
                                                <i className={`pi pi-times ${style.deleteItem}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveItem(item.product._id)
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
                                        <h3 className={style.couponTitle}>Order summary ({selectedItemsCount}) items</h3>
                                        <div className={style.selectedItemsImg}>
                                            {selectedProduct?.map(item => (
                                                <img key={item.product._id} src={item.product.image} alt="" />

                                            ))}
                                        </div>
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
                                    {showLoginPopup && (
                                        <div className={style.overlay} >
                                            <div className={style.popupWrapper}>
                                                <span className={style.removePopup}><i onClick={onClose} className="pi pi-times"></i></span>
                                                <Signin redirectTo="/cart" onClose={onClose} />
                                            </div>
                                        </div>

                                    )}
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
