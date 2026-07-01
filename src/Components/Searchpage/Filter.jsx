import style from "./Filter.module.css"
import { useRef, useEffect, useState, useMemo } from "react";
import 'primeicons/primeicons.css';

function Filter({ results, setFilterItems, filterItems }) {
    const [showPrev, setShowPrev] = useState(false);
    const [showNext, setShowNext] = useState(true);
    const menuRef = useRef(null);

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

    const uniqueTags = useMemo(() => {
        const tags = results.flatMap((item) => item.tags || []);
        return [...new Set(tags)];
    }, [results]);

    // console.log("tags are ", uniqueTags)

    const filterAttr = (item) => {
        setFilterItems(item)
    }
    const resetfilter = () => {
        setFilterItems([])
    }

    return (
        <div className={style.filterContainer}>
            <div className={style.filterWrapper}>
                <p className={style.filterTitle}>Attributes:</p>
                <div className={style.attributesSection}>
                    <div className={style.buttons}>
                        <i
                            onClick={handlePrev}
                            className={`pi pi-angle-left ${style.leftNavBtn} ${!showPrev ? style.hidden : ""} `}
                        />
                        <i
                            onClick={handleNext}
                            className={`pi pi-angle-right ${style.rightNavBtn} ${!showNext ? style.hidden : ""} `}
                        />
                    </div>

                    <ul ref={menuRef} className={style.attributesList}>
                        {uniqueTags.map((att) => (

                            <li className={`${filterItems === att ? style.selectedattributeItem : style.attributeItem}`} onClick={() => filterAttr(att)}>{att}</li>
                        ))}
                    </ul>
                </div>
                <button onClick={resetfilter} className={`${filterItems.length > 0 ? style.activeResetfilter : style.resetfilter}`}>Reset </button>
            </div>
        </div>
    )
}

export default Filter
