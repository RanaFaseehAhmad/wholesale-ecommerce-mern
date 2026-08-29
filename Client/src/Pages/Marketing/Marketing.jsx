import style from "./Marketing.module.css"
import api from "../../Api/Axios";
import { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Marketing() {

    const menuRef = useRef(null);
    const navigate = useNavigate();

    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);

    const updateButtons = () => {
        const el = menuRef.current;
        // scrollWidth is the overall width of the content without overflow & client width is the width that is show like max-width:1100px
        const maxScrollLeft = el.scrollWidth - el.clientWidth;// this gives the remaining space 

        setShowPrev(el.scrollLeft > 5); //  this becomes true if start. bcz it checks does user start scroll? value 5 is minimum value because when user scroll scroll gies minimum 100
        setShowNext(el.scrollLeft < maxScrollLeft - 5);
        // console.log(el.scrollLeft)
    };


    const handleNext = () => {
        menuRef.current.scrollBy({
            left: 500,
            behavior: "smooth"
        });
    }
    const handlePrev = () => {
        menuRef.current.scrollBy({
            left: -500,
            behavior: "smooth"
        });
    }

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
            const response = await api.get("/products/top-deals")
            console.log(response.data.category)
            console.log(response.data.products)
            setProducts(response.data.products)
            // setFilter(response.data.products)
            setCategory(response.data.category)
        } catch (error) {
            console.log(error.response?.data)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])



    const filter = selectedCategory ?
        products.filter((products) => products.category === selectedCategory) : products


    const selectItem = (id) => {
        navigate(`/Itemsummary/${id}`)
    }

    return (
        <div>
            <div className={style.banner}>
                <div className={style.titlebanner}>
                    <h1 className={style.title}>Deals & Offers</h1>
                    <span className={style.titleinfo}>Score the lowest prices on Alibaba.com</span>
                </div>

                <div className={style.infobanner}>
                    <div className={style.spanbackground}>
                        <span className={style.bannertext}>
                            <span className={style.maintitle}>FREE shipping </span>
                            on your first order
                        </span>
                    </div>
                </div>
            </div>

            <div className={style.maincontent}>
                <div className={style.categoryWrapper}>
                    <div className={style.cateoryMenuwrapper}>
                        <div className={style.categoryContainer}>
                            <div className={style.navbtn}>

                                <span
                                    onClick={handlePrev}
                                    className={`pi pi-angle-left ${style.leftNavBtn} ${!showPrev ? style.hidden : ""} `}
                                />
                                <span
                                    onClick={handleNext}
                                    className={`pi pi-angle-right ${style.rightNavBtn} ${!showNext ? style.hidden : ""} `}
                                />
                            </div>
                            <ul ref={menuRef} className={style.cateoryMenu}>
                                {
                                    category.map((disCategory, index) => (

                                        <li onClick={() => setSelectedCategory(disCategory._id)} key={index} className={style.menuitems}>{disCategory.name}</li>
                                    ))
                                }

                            </ul>
                        </div>
                    </div>
                </div>

                <div className={style.listWrapper}>
                    <div className={style.listContainer}>
                        {
                            filter.map((data) => (
                                <div className={style.Item} onClick={() => selectItem(data._id)} >
                                    <div className={style.ItemImg}>
                                        <img src={data.image} alt="" />
                                    </div>
                                    <div className={style.ItemDesc}>
                                        <p className={style.name}>{data.productName}</p>

                                        <p className={style.description}>{data.description}</p>
                                        <span className={style.discount}>🔥{data.discount}% OFF</span>
                                        <span className={style.price}>PKR {data.price}</span>
                                        <span className={style.rating}>⭐️ {data.rating}</span>
                                    </div>
                                </div>
                            ))
                        }

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Marketing
