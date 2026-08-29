import style from "./SectionEight.module.css"
import { Link } from "react-router-dom"

function SectionEight() {
    return (
        
            <div className={style.SectionCountry}>
                <h1 className={style.CountryTitle}>Suppliers by region</h1>
                <div className={style.CountryLists}>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/arab emirates.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Arab Emirates</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/australia.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Australia</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/america.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>United States</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/china.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>China</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/denmark.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Denmark</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/france.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>France</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/great britain.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Great Britain</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/italy.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Italy</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/russia.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Russia</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                    <div className={style.CountryList}>
                        <div className={style.CountryImg}>
                            <img src="/MainSectionCountry/uae.png" alt="" />
                        </div>
                        <div className={style.CountryDesc}>
                            <p className={style.CountryName}>Arab Emirated</p>
                            <p className={style.CountryInfo}>Shopname.ae</p>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}

export default SectionEight
