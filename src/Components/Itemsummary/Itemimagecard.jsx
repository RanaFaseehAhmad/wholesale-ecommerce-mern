import style from "./Itemimagecard.module.css"

function Itemimagecard({ item }) {

    return (

        <div className={style.imgContent} >
            <div className={style.imageWrapper}>

                <div className={style.imgMain}>
                    <img src={item?.image} />
                </div>
                <div className={style.imgGallery}>
                    <img src="images/item-detail page/image 36.png" alt="" />
                    <img src="images/item-detail page/image 38.png" alt="" />
                    <img src="images/item-detail page/image 39.png" alt="" />
                    <img src="images/item-detail page/image 40.png" alt="" />
                </div>
            </div>

        </div>

    )
}

export default Itemimagecard
