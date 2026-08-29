import style from "./Categorypage.module.css"
import api from "../../Api/Axios";
import { Rating } from 'primereact/rating';

import { useState, useRef, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

function Categorypage() {

    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const menuRef = useRef(null);
    const { search } = useLocation()
    const categoryId = new URLSearchParams(search).get("categoryId")


    const navigate = useNavigate()
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState([])
    const [products, setProducts] = useState([])

    const updateButtons = () => {
        const el = menuRef.current;
        if (!el) return;
        // scrollWidth is the overall width of the content without overflow & client width is the width that is show like max-width:1100px
        const maxScrollLeft = el.scrollWidth - el.clientWidth;// this gives the remaining space 

        setShowPrev(el.scrollLeft > 5); //  this becomes true if start. bcz it checks does user start scroll? value 5 is minimum value because when user scroll scroll gies minimum 100
        setShowNext(el.scrollLeft < maxScrollLeft - 5);
        // console.log(el.scrollLeft)
    };

    const handleNext = () => {
        menuRef.current?.scrollBy({
            left: 300,
            behavior: "smooth"
        });
    };

    const handlePrev = () => {
        menuRef.current?.scrollBy({
            left: -300,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        const el = menuRef.current;
        if (!el) return;
        const handleScroll = () => {
            updateButtons();
        };

        el.addEventListener("scroll", handleScroll);
        updateButtons();
        return () => el.removeEventListener("scroll", handleScroll);
    }, []);



    const fetchData = async () => {
        try {
            const response = await api.get(`/category/categoryData?categoryId=${categoryId}`)

            console.log(response.data.subcategory)
            setCategory(response.data.category)
            setSubCategory(response.data.subcategory)
            setProducts(response.data.products)

        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }
    useEffect(() => {
        fetchData()
    }, [categoryId])



    return (
        <div className={style.container}>
            <div
                className={style.topSection}
                style={{
                    backgroundImage: `linear-gradient(
                     rgba(0,0,0,0.4),
                     rgba(0,0,0,0.4)
                     ),url(${category?.Image}
                     )`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className={style.contentWrapper}>
                    <h1 className={style.categoryTitle}>{category?.name}</h1>
                    <p className={style.text}>Discover new and trending products</p>
                </div>
            </div>
            <div className={style.middleSection}>
                <div className={style.middleContentWrappper}>
                    <h3 className={style.middleContentTitle}>Source by subcategory</h3>
                    <div className={style.categorySlider}>
                        <i
                            onClick={handlePrev}
                            className={`pi pi-angle-left ${style.leftNavBtn} ${!showPrev ? style.hidden : ""} `}
                        />

                        <ul ref={menuRef} className={style.subCategoryList}>
                            {subCategory.map((item) => (

                                <li className={style.subCategoryitems} >
                                    <Link className={style.subCategoryitemslink} to={(`/subcategorypage?subcategoryId=${item._id}`)}  >{item.name}</Link>
                                </li>

                            ))}

                        </ul>
                        <i
                            onClick={handleNext}
                            className={`pi pi-angle-right ${style.rightNavBtn} ${!showNext ? style.hidden : ""} `}
                        />
                    </div>
                </div>
            </div>
            <div className={style.itemContainer}>
                <div className={style.itemWrapper}>
                    {products.map((item) => (

                        <div className={style.card} onClick={() => navigate(`/itemsummary/${item._id}`)}>
                            <div className={style.ItemImg}>
                                <img src={item.image} alt={item.productName} />
                            </div>
                            <div className={style.ItemDesc}>
                                <p className={style.name}>{item.productName}</p>
                                <Rating className={style.ratingstarcolor} value={item.rating} readOnly cancel={false} />
                                <p className={style.description}>{item.description}</p>
                                {item.discount && <span className={style.discount}>{item.discount}% off</span>
                                }
                                <span className={style.price}>PKR {item.price}</span>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div >
    )
}

export default Categorypage
