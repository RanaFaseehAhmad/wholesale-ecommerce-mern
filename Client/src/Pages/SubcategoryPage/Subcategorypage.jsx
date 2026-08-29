import style from "./Subcategorypage.module.css"
import 'primeicons/primeicons.css';
import api from "../../Api/Axios";

import Subcategorypagefilter from "../../Components/SubcategoryPage/Subcategoryfilter"
import { Rating } from 'primereact/rating';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";


function Subcategorypage() {

  const navigate = useNavigate()
  const { search } = useLocation();
  const searchQuery = new URLSearchParams(search).get("query");
  const subcategoryId = new URLSearchParams(search).get("subcategoryId");
  console.log(searchQuery);
  console.log(subcategoryId);

  const [layoutType, setLayoutType] = useState("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [finalfilterResult, setFinalfilterResult] = useState([])
  const [data, setData] = useState([])
  const [allData, setAllData] = useState([])
  const initialFilter = {
    country: "",
    rating: 0,
    brand: "",
    features: [],
    min: "",
    max: "",
    condition: ""
  };
  const [filter, setFilter] = useState(initialFilter)
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(null)

  const filterapplied =
    !!filter.country ||
    filter.rating !== 0 ||
    !!filter.brand ||
    filter.features.length > 0 ||
    !!filter.min ||
    !!filter.max ||
    !!filter.condition;
  const [isfilterApplied, setIsfilterApplied] = useState(filterapplied)


  const fetchData = async () => {
    try {
      const response = await api.get("/products/FiltersubCategory/filter", {
        params: {
          searchQuery: searchQuery || undefined,
          subcategoryId: subcategoryId || undefined,
          filter: (JSON.stringify(filter)),
          pageLimit: 5,
          page: page
        }
      })
      // console.log("products are", response.data.result)
      setData(response.data.result)
      // console.log(response.data.result)
      setTotalPages(response.data.totalPages)
      setTotalProducts(response.data.totalProducts)
      setAllData(prev => {
        if (prev.length === 0) {
          return response.data.result
        }
        return prev
      })
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  useEffect(() => {
    fetchData()
  }, [subcategoryId, filter, page, searchQuery])


  const fetchAllData = async () => {
    try {
      const response = await api.get("/products/FiltersubCategory/filter", {
        params: {
          searchQuery: searchQuery || undefined,
          subcategoryId: subcategoryId || undefined,
          filter: (JSON.stringify(filter)),
          pageLimit: 10000,
          page: 1
        }
      })
      setAllData(response.data.result)
    } catch (error) {
      console.log(error.response?.data?.message)
    }
  }
  useEffect(() => {
    fetchAllData();
    setPage(1);
  }, [subcategoryId, searchQuery]);


  const showFilter = () => {
    setIsFilterOpen((prev) => !prev)
  }

  useEffect(() => {
    setPage(1)
  }, [filter])

  const clearAllFilter = () => {
    setFilter(initialFilter);
    setPage(1)
  }

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
    }
  }
  const handleNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  return (
    <div className={style.container}>
      <Subcategorypagefilter allData={allData} isFilterOpen={isFilterOpen} clearAllFilter={clearAllFilter} data={data} filter={filter} setFilter={setFilter} />
      <div className={style.itemList}>
        <div className={style.header}>
          <div className={style.headerTop}>
            <i className={`pi pi- filter ${style.filter} ${isFilterOpen ? style.filteractive : ""}`} onClick={showFilter}></i>
            <button disabled={!isfilterApplied}
              onClick={clearAllFilter} className={` ${isfilterApplied ? style.activeclearFilter: style.clearFilter}`}>Reset filter</button>
            <p className={style.listitemsContent}>Showing {totalProducts} products from global suppliers for "{data[0]?.subcategory?.name}"</p>
            <div className={style.layout}>
              <i className={`pi pi-objects-column ${layoutType === "grid" ? style.gridViewselected : style.gridView}`} onClick={() => setLayoutType("grid")} ></i>
              <i className={`pi pi-bars ${layoutType === "list" ? style.listViewselected : style.listView} `} onClick={() => setLayoutType("list")}></i>
            </div>
          </div>
          <div className={style.headerBanner}>
            <div className={style.bannerContent}>
              <i className={`pi pi-truck  ${style.truckIcon} `}></i>
              <p className={style.bannerText}><span className={style.freeShipping}>FREE shipping</span> capped at PKR 6,241</p>
            </div>
          </div>
          <div className={layoutType === "list" ? style.listContainer : style.gridContainer}>
            {

              data.map((item) => (
                <div key={item._id} className={style.card}
                  onClick={() => navigate(`/itemsummary/${item._id}`)}
                >
                  <div className={style.ItemImg}>
                    <img src={item.image} alt="" />
                  </div>
                  <div className={style.ItemDesc}>
                    <p className={style.name}>{item.productName}</p>

                    <p className={style.description}>{item.description}</p>
                    <span className={style.price}>PKR {item.price}</span>
                    {item.discount && <span className={style.discount}>🔥{item.discount}% OFF</span>}
                    <Rating className={style.ratingstarcolor} value={item.rating} readOnly cancel={false} />
                  </div>
                </div>
              ))
            }

          </div>
          <div className={style.pagination}>
            <button
              onClick={handlePrev} disabled={page === 1}
              className={`pi pi-angle-left ${page > 1 ? style.activeNav : style.leftNavBtn} `}></button>

            {
              Array.from({ length: totalPages }).map((_, index) => (
                <button key={index + 1} className={index + 1 === page ? style.Activepaginator : style.paginator} onClick={() => {
                  setPage(index + 1)
                }}>{index + 1}</button>
              ))

            }
            <button
              onClick={handleNext} disabled={page === totalPages}
              className={`pi pi-angle-right ${page < totalPages ? style.activeNav : style.rightNavBtn}  `}
            ></button>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Subcategorypage
