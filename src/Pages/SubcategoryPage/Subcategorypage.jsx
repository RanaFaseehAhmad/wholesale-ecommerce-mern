import style from "./Subcategorypage.module.css"
import 'primeicons/primeicons.css';

import Subcategorypagefilter from "../../Components/SubcategoryPage/Subcategoryfilter"
import Pagination from "../../Components/Paginator/Pagination";
import { Rating } from 'primereact/rating';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ProductContext } from "../../Api/ProductsApi"


function Subcategorypage() {

  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const { products } = useContext(ProductContext)

  const [layoutType, setLayoutType] = useState("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isfilterApplied, setIsfilterApplied] = useState(false)
  const [finalfilterResult, setFinalfilterResult] = useState([])
  const [brand, setBrand] = useState([]);
  const [ratingvalue, setRatingvalue] = useState(null);
  const [pricerange, setPricerange] = useState(
    {
      min: "",
      max: ""
    }
  );

  const itemsArray = products.flatMap((product) => product.items || [])

  //the searchItem code is for when we search on the subcategory page and it shows result in same page because we search by name
  const searchItem = itemsArray.find((item) =>
    item.name.toLowerCase().trim() === query.toLowerCase().trim()
  );
  // console.log("same page: ", searchItem)

  const result = itemsArray.filter((item) =>
    item.subCategory.includes(query) ||
    item.subCategory.includes(searchItem?.subCategory)
  )
  // console.log("result-item: ", result)

  const min = Number(pricerange?.min || 0);
  const max = Number(pricerange?.max || Infinity);

  const handleApplyFilter = () => {
    const noFiltersSelected =
      !ratingvalue &&
      brand.length === 0 &&
      pricerange.min === "" &&
      pricerange.max === ""; // 

    if (noFiltersSelected) {
      return; // Don't filter
    }
    setIsfilterApplied(true)

    setFinalfilterResult(result.filter((item) => {

      const filterRating = !ratingvalue || item.rating >= ratingvalue
      const filterBrand = !brand?.length || brand.includes(item.brand)
      const filterPrice = item.price >= min && item.price <= max;

      // console.log("filtered brand:", filterBrand)
      return filterRating && filterBrand && filterPrice
    }))
    setIsFilterOpen(false);
  }

  const showFilter = () => {
    setIsFilterOpen((prev) => !prev)
  }



  const clearAllFilter = () => {
    setBrand([])
    setPricerange("")
    setRatingvalue(null)
    setIsfilterApplied(false)
    setIsFilterOpen(false)
    setFinalfilterResult([])
  }


  // console.log("is filter open: ", isFilterOpen)
  // console.log("IS FILTER APPLIED: :", isfilterApplied)
  // console.log("final result", finalfilterResult)

  return (
    <div className={style.container}>
      <Subcategorypagefilter isFilterOpen={isFilterOpen} handleApplyFilter={handleApplyFilter} clearAllFilter={clearAllFilter} result={result} ratingvalue={ratingvalue} setRatingvalue={setRatingvalue} setBrand={setBrand} brandname={brand} setPricerange={setPricerange} pricerange={pricerange} />
      <div className={style.itemList}>
        <div className={style.header}>
          <div className={style.headerTop}>
            <i className={`pi pi-filter ${style.filter} ${isFilterOpen ? style.filteractive : ""}`} onClick={showFilter}></i>
            <button disabled={finalfilterResult.length===0} onClick={clearAllFilter} className={` ${finalfilterResult.length === 0 ? style.clearFilter : style.activeclearFilter}`}>Reset filter</button>
            <p className={style.listitemsContent}>Showing {finalfilterResult.length || result.length} products from global suppliers for "{query}"</p>
            <div className={style.layout}>
              <i className={`pi pi-objects-column ${layoutType === "grid" ? style.gridViewselected : style.gridView}`} onClick={() => setLayoutType("grid")} ></i>
              <i className={`pi pi-bars ${layoutType === "list" ? style.listViewselected : style.listView}`} onClick={() => setLayoutType("list")}></i>
            </div>
          </div>
          <div className={style.headerBanner}>
            <div className={style.bannerContent}>
              <i className={`pi pi-truck  ${style.truckIcon}`}></i>
              <p className={style.bannerText}><span className={style.freeShipping}>FREE shipping</span> capped at PKR 6,241</p>
            </div>
          </div>
          <div className={layoutType === "list" ? style.listContainer : style.gridContainer}>
            {

              (isfilterApplied ? finalfilterResult : result).map((item) => (

                <div className={style.card}
                  onClick={() => navigate(`/itemsummary/${item.id}`)}
                >
                  <div className={style.ItemImg}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={style.ItemDesc}>
                    <p className={style.name}>{item.name}</p>

                    <p className={style.description}>{item.description}</p>
                    <span className={style.price}>PKR {item.price}</span>
                    {item.discount && <span className={style.discount}>🔥{item.discount}% OFF</span>}
                    <Rating className={style.ratingstarcolor} value={item.rating} readOnly cancel={false} />
                  </div>
                </div>
              ))
            }

          </div>
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Subcategorypage
