import style from "./ActionButton.module.css"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { CartContext } from "../../CartContext/CreateContext";
function ActionButton() {
    const { state } = useContext(CartContext)

    return (
        <div>
            <div className={style.action}>

                <Link to="/" className={style.actionLink}>
                    <i className={`pi pi-inbox ${style.actionIcon}`}></i>
                </Link>
                <Link to="/cart" className={style.actionLink}>
                    <i className={`${state.cartItems.length > 0 ? style.colorcartIcon : style.actionIcon}  pi pi-shopping-cart `}></i>
                    <p className={state.cartItems.length > 0 ? style.cartItems : style.simplecartItems}>{`${state.cartItems.length > 0 ? state.cartItems.length : ""}`}</p>
                </Link>
                <Link to="/" className={`{style.actionLink} ${style.LoginRegister}`}>
                    <i className={`pi pi-user ${style.actionIcon}`}></i>
                    <span className={style.LoginRegisterText}>Sign in / <span >Register</span></span>
                </Link>
            </div>
        </div>
    )
}

export default ActionButton
