import style from "./Categorypage.module.css"
import { Rating } from 'primereact/rating';

import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ProductContext } from "../../Api/ProductsApi"
function Categorypage() {

    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const menuRef = useRef(null);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const { products } = useContext(ProductContext)
    const navigate = useNavigate()
    // const decodedQuery = decodeURIComponent(query);

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

    const Category = products.find((product) => product.category === query)
    // console.log("this is category", Category)
    const categoryItems = Category?.items || [];
    // console.log("this is category items", categoryItems)
    const filtersubcategory = categoryItems.map(
        (product) => product.subCategory
    );
    const subcategory = [...new Set(filtersubcategory)];

    // console.log("this is subcategory", subcategory)

    return (
        <div className={style.container}>
            <div
                className={style.topSection}
                style={{
                    backgroundImage: `linear-gradient(
                     rgba(0,0,0,0.4),
                     rgba(0,0,0,0.4)
                     ), url(${Category?.categoryimage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className={style.contentWrapper}>
                    <h1 className={style.categoryTitle}>{query}</h1>
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
                            {subcategory.map((item) => (

                                <li className={style.subCategoryitems} onClick={() => navigate(`/subcategorypage/?query=${encodeURIComponent(item)}`)}>{item}</li>

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
                    {categoryItems.map((item) => (

                        <div className={style.card} onClick={() => navigate(`/itemsummary/${item.id}`)}>
                            <div className={style.ItemImg}>
                                <img src={item.image} alt="" />
                            </div>
                            <div className={style.ItemDesc}>
                                <p className={style.name}>{item.name}</p>
                                <Rating className={style.ratingstarcolor} value={item.rating} readOnly cancel={false} />
                                <p className={style.description}>{item.description}</p>
                                {item.discount && <span className={style.discount}>{item.discount}% off</span>}
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
