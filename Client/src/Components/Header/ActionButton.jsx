import style from "./ActionButton.module.css"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logOut, } from "../../Features/auth/authSlice.js";
import { cartCount } from "../../Features/cart/cartSlice.js";

function ActionButton() {
    const dispatch = useDispatch()

    const handlelogOut = () => {
        dispatch(logOut())
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        dispatch(cartCount(0))
    }
    const user = useSelector(state => state.auth.user);
    const isloggedin = useSelector(state => state.auth.isAuthenticated)
    const cartItems = useSelector(state => state.cart.count)
    console.log(isloggedin)
    return (
        <div>
            <div className={style.action}>

                <Link to="/" className={style.actionLink}>
                    <i className={`pi pi-inbox ${style.actionIcon}`}></i>
                </Link>
                <Link to="/cart" className={style.actionLink}>
                    <i className={`${cartItems > 0 ? style.colorcartIcon : style.actionIcon}  pi pi-shopping-cart `}></i>
                    <p className={cartItems > 0 ? style.cartItems : style.simplecartItems}>{`${cartItems ? cartItems : ""}`}</p>
                </Link>
                {!isloggedin ? (
                    <Link to="/login" className={`${style.actionLink} ${style.LoginRegister}`}>
                        <i className={`pi pi-user ${style.actionIcon}`}></i>
                        <span className={style.LoginRegisterText}>
                            Sign in / <span>Register</span>
                        </span>
                    </Link>
                ) : (
                    <div className={`${style.actionLink} ${style.LoginRegister}`}>
                        <i className={`pi pi-user ${style.HoveractionIcon}`}></i>
                        <span>Hi,{user.name}</span>

                        {/* Hover dropdown */}
                        <div className={style.userDropdown}>
                            <span className={style.userName}>
                                Hi, {user.name}
                            </span>
                            <button className={style.dropdownItem}>
                                <i className="pi pi-user"></i>
                                My Store
                            </button>

                            <button className={style.dropdownItem}>
                                <i className="pi pi-shopping-bag"></i>
                                My Orders
                            </button>

                            <button onClick={handlelogOut} className={style.dropdownItem}>
                                <i className="pi pi-sign-out"></i>
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActionButton
