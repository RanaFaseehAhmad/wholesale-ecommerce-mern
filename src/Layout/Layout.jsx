import Header from "../Components/Header/Header"
import NavbarSection from "../Components/Navbar/NavbarSection"
import { Outlet } from "react-router-dom"
import Footer from "../Components/Footer/Footer"
import {CartProvider} from "../CartContext/CreateContext"

function Layout() {
    return (
        <CartProvider>
            <div>
                <Header />
                <NavbarSection />
                <Outlet />
                <Footer />
            </div>
        </CartProvider>
    )
}

export default Layout
