import style from "./ActionButton.module.css"
import { countCartContext } from "../../Api/countCartItems"
import { Link } from "react-router-dom"
import { useContext } from "react";
function ActionButton() {
    const { count } = useContext(countCartContext)

    return (
        <div>
            <div className={style.action}>

                <Link to="/" className={style.actionLink}>
                    <i className={`pi pi-inbox ${style.actionIcon}`}></i>
                </Link>
                <Link to="/cart" className={style.actionLink}>
                    <i className={`${count > 0 ? style.colorcartIcon : style.actionIcon}  pi pi-shopping-cart `}></i>
                    <p className={count > 0 ? style.cartItems : style.simplecartItems}>{`${count > 0 ? count : ""}`}</p>
                </Link>
                <Link to="/" className={`${style.actionLink} ${style.LoginRegister}`}>
                    <i className={`pi pi-user ${style.actionIcon}`}></i>
                    <span className={style.LoginRegisterText}>Sign in / <span >Register</span></span>
                </Link>
            </div>
        </div>
    )
}

export default ActionButton
