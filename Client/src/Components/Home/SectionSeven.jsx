// import { Link } from "react-router-dom"
import style from "./SectionSeven.module.css"

function SectionSeven() {
    return (
        
            <div className={style.SectionServices}>
                <h1 className={style.ServicesTitle}>Our extra services</h1>
                <div className={style.ServicesItems}>
                    <div className={style.ServicesItem}>
                        <div className={style.ServicesItemImg}>
                            <img src="/MainSectionServices/image 108.png" alt="" />
                        </div>
                        <div className={style.ServicesItemIcon}>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <div className={style.ServicesItemDesc}>
                            <p>Source from industry Hubs</p>
                        </div>
                    </div>
                    <div className={style.ServicesItem}>
                        <div className={style.ServicesItemImg}>
                            <img src="/MainSectionServices/image 104.png" alt="" />
                        </div>
                        <div className={style.ServicesItemIcon}>
                            <i className="fa-solid fa-box-archive"></i>
                        </div>
                        <div className={style.ServicesItemDesc}>
                            <p className={style.ServicesItemInfo}>Customize Your products</p>
                        </div>
                    </div>
                    <div className={style.ServicesItem}>
                        <div className={style.ServicesItemImg}>
                            <img src="/MainSectionServices/image 106.png" alt="" />
                        </div>
                        <div className={style.ServicesItemIcon}>
                            <i className="fa-solid fa-right-long"></i>
                        </div>
                        <div className={style.ServicesItemDesc}>
                            <p className={style.ServicesItemInfo}>Fast, reliable shipping by ocean or air</p>
                        </div>
                    </div>
                    <div className={style.ServicesItem}>
                        <div className={style.ServicesItemImg}>
                            <img src="/MainSectionServices/image 107.png" alt="" />
                        </div>
                        <div className={style.ServicesItemIcon}>
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <div className={style.ServicesItemDesc}>
                            <p className={style.ServicesItemInfo}>Product monitering and inspection</p>
                        </div>
                    </div>

                </div>
            </div>

        
    )
}

export default SectionSeven
