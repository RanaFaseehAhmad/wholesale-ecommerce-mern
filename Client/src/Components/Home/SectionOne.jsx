import style from "./SectionOne.module.css"
import api from "../../Api/Axios";
import { Link } from "react-router-dom"

import { useState, useContext } from "react";
import { SearchContext } from "../../DataContext/CreateContext";
import { useEffect } from "react";


function SectionOne() {

    const { setInput, input } = useContext(SearchContext)
    const [index, setIndex] = useState(0)
    const [category, setCategory] = useState([])
    // console.log(products)
    // console.log(input)

    const cateogryFunc = async () => {
        try {
            const response = await api.get("/category")
            // console.log(response.data)
            setCategory(response.data.category)

        } catch (error) {
            console.log(error.response?.data?.message)
        }
    }

    useEffect(() => {
        cateogryFunc()
    }, [])

    const handleNext = () => {
        setIndex((prev) => (prev === category.length - 1 ? 0 : prev + 1))
    }

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? category.length - 1 : prev - 1)
        )

    }

    // console.log(index)
    return (

        <div className={style.SectionMain}>

            <ul className={style.MainMenu}>
                {
                    category.map((data, _id) => (
                        <li key={_id} onClick={() => setInput(data)}>
                            <Link className={style.MainMenuList} to={`/categorypage?categoryId=${encodeURIComponent(data._id)}`}>{data.name}</Link>
                            <span className="pi pi-angle-right"></span>
                        </li>

                    ))
                }
            </ul>

            <div className={style.MainBanner}>
                <div className={style.BannerImgBox}>
                    <img className={style.Bannerimg} src={category[index]?.Image} alt="" />
                    <div className={style.BannerText}>
                        <p>Latest trending</p>
                        <h5 >{category[index]?.name}</h5>
                        <Link to="">

                            <button className={style.BannerBtn} type="button">Learn more</button>
                        </Link>
                    </div>
                    <div className={style.bannerNavBtn}>

                        <span onClick={handlePrev} className={`pi pi-angle-left ${style.leftNavBtn}`}></span>
                        <span onClick={handleNext} className={`pi pi-angle-right ${style.rightNavBtn}`}></span>
                    </div>
                </div>
            </div>


            <div className={style.MainSideBlock}>
                <div className={style.SideBlockLogin}>
                    <div className={style.SideBlockLoginBox}>
                        <div className={style.SideBlockLoginImg}>
                            <img src="/MainSectionBanner/Avatar.png" alt="" />
                        </div>
                        <div className={style.SideBlockLoginText}>
                            <p>Hi, user</p>
                            <p>let's get started</p>
                        </div>
                    </div>
                    <div className={style.SideBlockBtn}>
                        <button className={style.SideBlockJoinBtn}>Join now</button>
                        <button className={style.SideBlockLoginBtn}>Login</button>
                    </div>
                </div>
                <div className={style.SideBlockAd}>
                    <p>Get Us $10 off</p>
                    <p>with a new</p>
                    <p>supplier</p>
                </div>
                <div className={style.SideBlockAd2}>
                    <p>Send quotes with</p>
                    <p>supplier</p>
                    <p>preferences</p>
                </div>
            </div>

        </div >

    )
}

export default SectionOne
