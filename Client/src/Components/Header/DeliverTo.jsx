import style from "./DeliverTo.module.css"

function DeliverTo() {
    return (
        <div>
            <div className={style.navbarDetail}>
                <div className={style.navbarPayment}>
                    <select className={style.paymentCurreny} name="">
                        <option value="" className="" id="" aria-label="select currency">English, USD</option>
                        <option value="" className="" id="" aria-label="select currency">English, Pkr</option>
                    </select>

                </div>
                <div className={style.navbarShipto}>
                    <p>Ship to</p>
                    <select className={style.shipCountry} name="" id="">
                        <option value="" className={style.countryFlag} id="" aria-label="select country"> </option>
                        <option value="" className="" id="" aria-label="select counrty"></option>
                    </select>
                </div>
            </div>
        </div>
    )
}

export default DeliverTo
