import style from "./Footer.module.css"
import { Link } from "react-router-dom"

function Footer() {
    return (
        <footer>
            <div className={style.FooterMain}>

                <div className={style.FooterBrand}>
                    <div className={style.FooterLogo}>
                        <div className={style.LogoImg}>
                            <img src="/HeaderImages/logo-symbol.png" alt="" />
                        </div>
                        <div className={style.LogoText}>
                            <img src="/HeaderImages/Brand.png" alt="" />
                        </div>
                    </div>
                    <div className={style.FooterLogoDesc}>
                        Best information about the company goes here, but now lorem ipsem is
                    </div>
                    <div className={style.LogoSocial}>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-linkedin"></i>
                        <i className="fa-solid fa-camera"></i>
                    </div>
                </div>


                    <div className={style.FooterAbout}>
                        <h1 className={style.AboutHeading}>About</h1>
                        <ul className={style.AboutMenu}>
                            <li><Link className={style.MenuList} >About us</Link></li>
                            <li><Link className={style.MenuList} >Find store</Link></li>
                            <li><Link className={style.MenuList} >Categories</Link></li>
                            <li><Link className={style.MenuList} >Blogs</Link></li>
                        </ul>
                    </div>
                    <div className={style.FooterPartnership}>
                        <h1 className={style.PartnershipHeading}>Partnership</h1>
                        <ul className={style.PartnershipMenu}>
                            <li><Link className={style.PartnershipList} >About us</Link></li>
                            <li><Link className={style.PartnershipList} >Find store</Link></li>
                            <li><Link className={style.PartnershipList} >Categories</Link></li>
                            <li><Link className={style.PartnershipList} >Blogs</Link></li>
                        </ul>
                    </div>
                    <div className={style.FooterInformation}>
                        <h1 className={style.InformationHeading}>Information</h1>
                        <ul className={style.InformationMenu}>
                            <li><Link className={style.InformationList} >About us</Link></li>
                            <li><Link className={style.InformationList} >Find store</Link></li>
                            <li><Link className={style.InformationList} >Categories</Link></li>
                            <li><Link className={style.InformationList} >Blogs</Link></li>
                        </ul>
                    </div>
                    <div className={style.FooterUser}>
                        <h1 className={style.UserHeading}> For User</h1>
                        <ul className={style.UserMenu}>
                            <li><Link className={style.UserList} >About us</Link></li>
                            <li><Link className={style.UserList} >Find store</Link></li>
                            <li><Link className={style.UserList} >Categories</Link></li>
                            <li><Link className={style.UserList} >Blogs</Link></li>
                        </ul>
                    </div>
                    <div className={style.FooterGetApp}>
                        <h1 className={style.GetAppHeading}> Get app</h1>
                        <div className={style.GetAppImg}>
                            <img src="/footer/Group.png" alt="" />
                            <img src="/footer/market-button.png" alt="" />
                        </div>
                    </div>
                </div>


            {/* </div> */}
            <div className={style.FooterCopyright}>
                <p className={style.CopyrightText}>@ 2025 Ecommerce</p>
                <div className={style.CopyrightOption}>

                </div>
            </div>

        </footer>
    )
}

export default Footer
