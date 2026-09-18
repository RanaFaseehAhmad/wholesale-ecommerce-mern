import Header from "../Components/Header/Header"
import NavbarSection from "../Components/Navbar/NavbarSection"
import { Outlet, useLocation } from "react-router-dom"
import Footer from "../Components/Footer/Footer"



function Layout() {
    const location = useLocation()
    const hideNavbar = location.pathname === "/auth/checkout"
    return (

        <div>
            <Header />

            {!hideNavbar && <NavbarSection />}


            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
