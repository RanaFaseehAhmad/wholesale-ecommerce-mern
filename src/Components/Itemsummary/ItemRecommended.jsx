import style from "./ItemRecommended.module.css"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

function ItemRecommended({ recommendeditem }) {
  const navigate = useNavigate()
  const menuRef = useRef(null);
  const selectItem = (id) => {
    navigate(`/itemsummary/${id}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

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

  return (


    recommendeditem.length >= 1 &&

    (
      <div className={style.container}>
        <div className={style.recommendedWrapper}>

          <div className={style.titleWrapper}>
            <h2 className={style.title}>Other recommendations for your business</h2>
          </div>
          <div className={style.sliderWrapper}>
            <div className={style.itemBox} ref={menuRef}>
              {recommendeditem.length > 5 && (
                <>
                  <div className={style.sliderBtn}>

                    <button onClick={handlePrev} className={style.left}>
                      <i className="pi pi-angle-left"></i>
                    </button>
                    <button button onClick={handleNext} className={style.right}>
                      <i className="pi pi-angle-right"></i>
                    </button>

                  </div>
                </>
              )}

              {/* map here */}
              {recommendeditem.map((item) => (
                <div key={item.id} onClick={() => selectItem(item.id)} className={style.card}>
                  <div className={style.imgWrapper}>
                    <img src={item.image} alt="item image" />
                  </div>
                  <div className={style.info}>
                    <h3 className={style.itemName}>{item.name}</h3>
                    <div className={style.itemPrice}>
                      <span className={style.price}>PKR {item.price}</span>
                      {parseFloat(item.discount) > 0 && <span className={style.discount}>{item.discount}% Off</span>}
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div >
    )


  )
}

export default ItemRecommended
