import Header from "../Components/Header/Header"
import NavbarSection from "../Components/Navbar/NavbarSection"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
// import CountProvider from "../Api/countCartItems"

function Layout() {
    return (
        // <CountProvider>
            <div>
                <Header />
                <NavbarSection />
                <Outlet />
                <Footer />
            </div>
        // </CountProvider>
    )
}

export default Layout
