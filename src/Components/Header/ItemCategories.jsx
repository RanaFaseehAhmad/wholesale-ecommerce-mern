import { Link } from "react-router-dom"
import style from "./ItemCategories.module.css"

function ItemCategories() {
    return (
        <div>
            <ul className={style["header__menubar-menu"]}>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">SmartPhones</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">Clothes and wear</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">Home interior</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">computer and tech</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">Tools, equipments</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">Sports and outdoor</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">Animal and pets</Link></li>
                <li className={style["header__menubarlist"]}><Link className={style["menubar__list"]} to="/">Machinery tools</Link></li>
            </ul>
        </div>
    )
}

export default ItemCategories
