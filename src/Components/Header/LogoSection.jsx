import style from "./LogoSection.module.css"
import { Link } from "react-router-dom"

function LogoSection() {
    return (
        <div>
            <div className={style.brandLogo}>
                <Link className={style.logo} to="/" >
                    <img className={style.logoSymbol} src="/HeaderImages/logo-symbol.png" alt="Logo-Symbol" />
                    <img className={style.logoImg} src="/HeaderImages/Brand.png" alt="Brand" />
                </Link>
                <i className={`pi pi-bars ${style.menubar}`}  />
            </div>
        </div>
    )
}

export default LogoSection
