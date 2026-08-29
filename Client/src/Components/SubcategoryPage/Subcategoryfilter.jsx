import style from "./Subcategoryfilter.module.css"
import { Rating } from 'primereact/rating';
import { useEffect } from "react";
import { useState } from "react";
function Subcategoryfilter({ allData, isFilterOpen, clearAllFilter, filter, setFilter }) {

    const [isfilterexpand, setIsfilterexpand] = useState(false)
    const [price, setPrice] = useState({
        min: "",
        max: ""
    })
    const handlePrice = (e) => {
        e.preventDefault()
        setFilter(prev => ({
            ...prev,
            min: price.min,
            max: price.max

        }))
    }

    const handleFilter = (type, value, inputType) => {
        setFilter(prev => {
            if (inputType === "radio") {
                return {
                    ...prev,
                    [type]: prev[type] ===value? "":value
                }
            }
            const currentValue = prev[type] || []
            return {
                ...prev,
                [type]: currentValue.includes(value) ?
                    currentValue.filter(item => item !== value) :
                    [...currentValue, value]
            }
        })
    }
    useEffect(() => {
        console.log(filter)
    }, [handleFilter])
    const brands = [...new Set(allData.map(item => item.brand))];
    return (
        <div className={`${style.filterSidebar} ${isFilterOpen ? style.filterSidebarOver : ""}`}>
            <div className={style.filterSection}>
                <div className={style.filterHeader}>
                    <h1 className={style.filterTitle}>Country</h1>

                </div>
                <ul className={style.filterList}>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="Pakistan" onClick={(e) => handleFilter("country", e.target.value, "radio")} />
                        Pakistan</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="America" onClick={(e) => handleFilter("country", e.target.value, "radio")} />
                        America</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="England" onClick={(e) => handleFilter("country", e.target.value, "radio")} />
                        England</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="UAE" onClick={(e) => handleFilter("country", e.target.value, "radio")} />
                        UAE</label></li>
                    <li><label><input className={style.filterListitems} type="radio" name="Country" value="Australlia" onClick={(e) => handleFilter("country", e.target.value, "radio")} />
                        Australlia</label></li>

                </ul>
            </div>
            <div className={style.filterSection}>
                <div className={style.filterHeader}>
                    <h1 className={style.filterTitle}>Store reviews</h1>
                </div>
                <div className={style.rating}>
                    <label>
                        <input type="radio" name="rating" checked={filter.rating === "3"} value="3" onClick={(e) => handleFilter("rating", e.target.value, "radio")} />
                        3.0 & up
                    </label>
                    <label>
                        <input type="radio" name="rating" checked={filter.rating === "4"} value="4" onClick={(e) => handleFilter("rating", e.target.value, "radio")} />
                        4.0 & up
                    </label>
                    <label>
                        <input type="radio" name="rating" checked={filter.rating === "4.5"} value="4.5" onClick={(e) => handleFilter("rating", e.target.value, "radio")} />
                        4.5 & up
                    </label>
                    <label>
                        <input type="radio" name="rating" checked={filter.rating === "5"} value="5" onClick={(e) => handleFilter("rating", e.target.value, "radio")} />
                        5
                    </label>
                </div>
            </div>
            <div className={style.filterSection}>
                <div className={style.filterHeader}>
                    <h1 className={style.filterTitle}>Brands</h1>

                </div>
                <ul className={style.filterList}>

                    {brands.map((brand, index) => (

                        <li key={brand}><label><input className={style.filterListitems} type="radio" checked={filter.brand === brand} name="Brand" value={brand} onClick={(e) => handleFilter("brand", e.target.value, "radio")} />
                            {brand}
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
                        <li><label><input className={style.filterListitems} type="checkbox" name="features" value="Metallic" onChange={(e) => handleFilter("features", e.target.value)} />
                            Metallic</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="features" value=" Plastic cover" onChange={(e) => handleFilter("features", e.target.value)}
                        />
                            Plastic cover</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="features" value="8Gb Ram" onChange={(e) => handleFilter("features", e.target.value)}
                        />
                            8Gb Ram</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="features" value="Super power" onChange={(e) => handleFilter("features", e.target.value)}
                        />Super power</label></li>
                        <li><label><input className={style.filterListitems} type="checkbox" name="features" value="Large Memory" onChange={(e) => handleFilter("features", e.target.value)}
                        />
                            Large Memory</label></li>

                    </ul>
                </div>
                <div className={style.filterSection}>
                    <div className={style.filterHeader}>
                        <h1 className={style.filterTitle}>Price</h1>
                    </div>
                    <div className={style.filterBody}>
                        <form onSubmit={handlePrice}>
                            {/* <div className={style.priceBody}> */}
                            <label>
                                <input type="number" placeholder="Min"
                                    onChange={(e) => setPrice(prev => ({
                                        ...prev,
                                        min: e.target.value
                                    }))}
                                />
                            </label>
                            <span className={style.priceDash}> - </span>
                            <label>
                                <input type="number" placeholder="Max"
                                    onChange={(e) => setPrice(prev => ({
                                        ...prev,
                                        max: e.target.value
                                    }))}
                                />
                            </label>
                            {/* </div> */}
                            <button className={style.priceBtn} type="submit">OK</button>
                        </form>

                    </div>
                </div>

                <div className={style.filterSection}>
                    <div className={style.filterHeader}>
                        <h1 className={style.filterTitle}>Condition</h1>

                    </div>
                    <ul className={style.filterList}>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Any" onClick={(e) => handleFilter("condition", e.target.value, "radio")} />
                            Any</label></li>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Refurbished" onClick={(e) => handleFilter("condition", e.target.value, "radio")} />
                            Refurbished</label></li>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Brand new" onClick={(e) => handleFilter("condition", e.target.value, "radio")} />
                            Brand new</label></li>
                        <li><label><input className={style.filterListitems} type="radio" name="condition" value="Old items" onClick={(e) => handleFilter("condition", e.target.value, "radio")} />
                            Old items</label></li>

                    </ul>
                </div>
            </div>
            <div className={style.filterBtn}>
                <button className={style.clearAll} onClick={clearAllFilter}>Clear all</button>
            </div>
            <button className={style.filterView} onClick={() => setIsfilterexpand(!isfilterexpand)}>{isfilterexpand === true ? "View less" : "View all filters"}</button>

        </div >
    )
}

export default Subcategoryfilter
