import style from "./Subcategoryfilter.module.css"
import { Rating } from 'primereact/rating';
import { useState } from "react";
function Subcategoryfilter({ isFilterOpen, handleApplyFilter, clearAllFilter, result, setBrand, brandname, setRatingvalue, ratingvalue, pricerange, setPricerange }) {

    const [isfilterexpand, setIsfilterexpand] = useState(false)

    const brands = [
        ...new Set(
            result.map((item) => item.brand)
        )
    ];
    // console.log("main items:", result)
    // console.log("Price range:", pricerange)

    const selectedbrand = (targetedbrand) => {
        setBrand(((prev) => prev.includes(targetedbrand) ? prev.filter((item) => item !== targetedbrand) : [...prev, targetedbrand]))
    }

    // console.log("is filter expand: ", isfilterexpand)


    return (
        <div className={`${style.filterSidebar} ${ isFilterOpen ? style.filterSidebarOver : ""}`}>
            <div className={style.filterSection}>
                <div className={style.filterHeader}>
                    <h1 className={style.filterTitle}>Country</h1>
                    
                </div>
                <ul className={style.filterList}>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="Pakistan" />
                        Pakistan</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="America" />
                        America</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="England" />
                        England</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="UAE" />
                        UAE</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="Australlia" />
                        Australlia</label></li>

                </ul>
            </div>
            <div className={style.filterSection}>
                <div className={style.filterHeader}>
                    <h1 className={style.filterTitle}>Rating</h1>
                   
                </div>
                <Rating className={style.ratingstarfilter} value={ratingvalue} onChange={(e) => setRatingvalue(e.target.value)} />
            </div>
            <div className={style.filterSection}>
                <div className={style.filterHeader}>
                    <h1 className={style.filterTitle}>Brands</h1>
                    
                </div>
                <ul className={style.filterList}>

                    {brands.map((item, index) => (

                        <li key={index}><label><input className={style.filterListitems} type="checkbox" checked={brandname.includes(item)} name="Brand" value={item} onChange={(e) => selectedbrand(e.target.value)} />
                            {item}
                        </label></li>
                    ))}

                </ul>
            </div>
            <div className={` ${style.viewContainer}  ${isfilterexpand === true ? style.viewMore : style.viewLess}`}>


                <div className={style.filterSection}>
                    <div className={style.filterHeader}>
                        <h1 className={style.filterTitle}>Features</h1>
                       
                    </div>
                    <ul className={style.filterList}>
                        <li><label><input className={style.filterListitems} type="checkbox" name="category" value="Mobile" />
                            Metallic</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="category"
                            value="Electronics" />
                            Plastic cover</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="category"
                            value="Smartphones" />
                            8Gb Ram</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="category"
                            value="Smartphones" />Super power</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="category"
                            value="Smartphones" />
                            Large Memory</label></li>

                    </ul>
                </div>
                <div className={style.filterSection}>

                    <div className={style.filterHeader}>
                        <h1 className={style.filterTitle}>Price Range</h1>
                       
                    </div>
                    <div className={style.filterBody}>

                        <label>
                            Min: <input type="number" value={pricerange.min} placeholder="Min price"
                                onChange={(e) => setPricerange((prev) => ({ ...prev, min: e.target.value === "" ? "" : Number(e.target.value), }))} />
                        </label>
                        <label>
                            Max: <input type="number" value={pricerange.max} placeholder="Max price"
                                onChange={(e) => setPricerange((prev) => ({ ...prev, max: e.target.value === "" ? "" : Number(e.target.value), }))} />
                        </label>
                      
                    </div>
                </div>

                <div className={style.filterSection}>
                    <div className={style.filterHeader}>
                        <h1 className={style.filterTitle}>Condition</h1>
                       
                    </div>
                    <ul className={style.filterList}>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Mobile" />
                            Any</label></li>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Mobile" />
                            Refurbished</label></li>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Mobile" />
                            Brand new</label></li>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Mobile" />
                            Old items</label></li>

                    </ul>
                </div>
            </div>
            <div className={style.filterBtn}>
                <button className={style.clearAll} onClick={clearAllFilter}>Clear all</button>
                <button className={style.showresults} onClick={handleApplyFilter}>Show result</button>
            </div>
            <button className={style.filterView} onClick={() => setIsfilterexpand(!isfilterexpand)}>{isfilterexpand === true ? "View less" : "View all filters"}</button>

        </div >
    )
}

export default Subcategoryfilter
