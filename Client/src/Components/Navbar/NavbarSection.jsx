import style from "./NavbarSection.module.css"
import 'primeicons/primeicons.css';
import api from "../../Api/Axios.js";

import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react";

import { SearchContext } from "../../DataContext/CreateContext";


function NavbarSection() {

    const { setInput, input } = useContext(SearchContext)
    const [category, setCategory] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get("/category")
                setCategory(response.data.category)
            } catch (error) {
                console.log(error.response?.data?.message)
            }
        };
        fetchCategories()
    }, [])

    return (

        <nav className={style.navbar} >
            <ul className={style.navMenu}>
                <li className={style.navItem} >
                    <div className={style.navMenuwrapper}
                        onMouseEnter={() => setOpen(true)}
                        onMouseLeave={() => setOpen(false)}
                    >
                        <div className={style.categoryDropDownMenu}>
                            <i
                                className={`pi pi-bars ${style.navMenuIcon}`}
                                onClick={() => setOpen(prev => !prev)}
                                role="button"
                                tabIndex={0}
                                aria-label="Toggle menu"
                            />
                            <p className={style.navDropdownMenu}>All category</p>
                        </div>
                        <ul className={`${style.dropDown} ${open ? style.dropDownOpen : ""}`}>
                            {
                                category.map((category, index) =>
                                    <li key={index} onClick={() => setInput(category.name)} className={style.dropDownItem}>

                                        <Link to={`/categorypage?categoryId=${encodeURIComponent(category._id)}`} className={style.dropDownLink}  >{category.name} </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li><Link className={style.navMenuList} to="/Marketing/Top-Deals">Hot offers</Link></li>
                <li><Link className={style.navMenuList} to="">Order Protection</Link></li>
                <li><Link className={style.navMenuList} to="">Projects</Link></li>
                <li><Link className={style.navMenuList} to="">Menu items</Link></li>
                <li>
                    <Link to="#" className={style.navMenuList} aria-haspopup="true" aria-expanded="false">
                        Help
                    </Link>
                    {/* <img src="../../NavbarImages/vector.png" alt="" /> */}

                </li>
            </ul>

        </nav >


    )
}

export default NavbarSection
