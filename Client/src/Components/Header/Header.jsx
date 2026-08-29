import style from "./Header.module.css"
import "@fortawesome/fontawesome-free/css/all.min.css"

import { Link } from "react-router-dom"

import LogoSection from "./LogoSection"
import SearchItems from "./SearchItems"
import ActionButton from "./ActionButton"
import MobileMenu from "./MobileMenu"
import ItemCategories from "./ItemCategories"
import DeliverTo from "./DeliverTo"



function Header() {
    return (
        <>
            <div className={style.header}>
                <div className={style.headerLeft}>
                    <LogoSection />
                    <SearchItems className={style.searchBar} />
                    <ActionButton />
                </div >

                <div className={style.wrapper}>
                    <DeliverTo />
                    <MobileMenu />

                </div>

            </div >
            <ItemCategories />

        </>
    )
}

export default Header
