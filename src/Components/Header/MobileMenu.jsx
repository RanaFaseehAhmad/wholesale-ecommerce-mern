import style from "./MobileMenu.module.css"

function MobileMenu() {
    return (
        <div>
            <div className={style["mobile-view__menu"]}>
                <img className={style.menubar} src="/NavbarImages/menu.png" alt="" />
                <ul className={style["dropdown-menu__mobile-view"]}>
                    <li className={style["mens-category-list__mobile-view"]}>Men's wear
                        <i className="fa-solid fa-angle-right"></i>

                        <ul className={style["mens-extend-menu__mobile-view"]}>
                            <li className={style["category-list__mobile-view"]}>mens-shirts</li>
                            <li className={style["category-list__mobile-view"]}>mens-shoes</li>
                            <li className={style["category-list__mobile-view"]}>mens-watches</li>
                        </ul>
                    </li>
                    <li className={style["womens-category-list__mobile-view"]}>Women's wear
                        <i className="fa-solid fa-angle-right"></i>
                        <ul className={style["womens-extend-menu__mobile-view"]}>
                            <li className={style["category-list__mobile-view"]}>womens-dresses</li>
                            <li className={style["category-list__mobile-view"]}>womens-jewellery</li>
                            <li className={style["category-list__mobile-view"]}>womens-shoes</li>
                            <li className={style["category-list__mobile-view"]}>womens-watches</li>
                            <li className={style["category-list__mobile-view"]}>womens-bags</li>
                        </ul>
                    </li>
                    <li className={style["category-list__mobile-view"]}>smartphones</li>
                    <li className={style["category-list__mobile-view"]}>laptops</li>
                    <li className={style["category-list__mobile-view"]}>furniture</li>
                    <li className={style["category-list__mobile-view"]}>fragrances</li>
                    <li className={style["category-list__mobile-view"]}>groceries</li>
                    <li className={style["category-list__mobile-view"]}>home-decoration</li>
                </ul>
            </div>
        </div>
    )
}

export default MobileMenu
