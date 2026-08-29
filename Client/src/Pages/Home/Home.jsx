import style from "./Home.module.css"
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary"

import SectionOne from "../../Components/Home/SectionOne"
import SectionTwo from "../../Components/Home/SectionTwo"
// import SectionThree from "../../Components/Home/SectionThree"
// import SectionFour from "../../Components/Home/SectionFour"
// import SectionFive from "../../Components/Home/SectionFive"
import SectionSix from "../../Components/Home/SectionSix"
import SectionSeven from "../../Components/Home/SectionSeven"
import SectionEight from "../../Components/Home/SectionEight"
import NewsLetter from "../../Components/Home/NewsLetter"


function Home() {
    return (

        <div className={style.main}>
            <ErrorBoundary fallback={<div>Something went in Section Decor Main</div>}>
                <SectionOne />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Something went wrong in Section Sale </div>}>
                <SectionTwo />
            </ErrorBoundary>
            {/* <ErrorBoundary fallback={<div>Something went wrong in Section Decor</div>}>
                <SectionThree />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Something went wrong in Section Consumer</div>}>
                <SectionFour />
            </ErrorBoundary> */}
            {/* <ErrorBoundary fallback={<div>Something went wrong in Section Inquiry</div>}>
                <SectionFive />
            </ErrorBoundary> */}
            <ErrorBoundary fallback={<div>Something went wrong in Section Recommended items</div>}>
                <SectionSix />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Something went wrong in Section Services</div>}>
                <SectionSeven />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Something went wrong in Section Country</div>}>
                <SectionEight />
            </ErrorBoundary>
            <ErrorBoundary fallback={<div>Something went wrong in Newsletter</div>}>
                <NewsLetter />
            </ErrorBoundary>

            
        </div>
    )
}

export default Home
