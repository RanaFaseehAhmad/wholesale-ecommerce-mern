import style from "./NavbarSection.module.css"
import 'primeicons/primeicons.css';

import { Link, useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";

import { ProductContext } from "../../Api/ProductsApi";
import { SearchContext } from "../../DataContext/CreateContext";


function NavbarSection() {

    const { products } = useContext(ProductContext)
    const { setInput, input } = useContext(SearchContext)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    // console.log(open)
    // console.log("category selected is", input)

    const CategoryFilter = products.map((data) => data.category)

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
                                CategoryFilter.map((data, index) =>
                                    <li key={index} onClick={() => setInput(data)} className={style.dropDownItem}>

                                        <Link to={`/categorypage?query=${encodeURIComponent(data)}`} className={style.dropDownLink}  >{data} </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </li>
                <li><Link className={style.navMenuList} to="">Hot offers</Link></li>
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
