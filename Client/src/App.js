import { BrowserRouter, Routes, Route } from "react-router-dom";
import api from "./Api/Axios.js";
import Home from "./Pages/Home/Home";
import Layout from "./Layout/Layout";

import Marketing from "./Pages/Marketing/Marketing";
import Itemsummary from "./Pages/ItemSummary/Itemsummary";
import Cart from "./Pages/Cart/Cart";
import Searchpage from "./Pages/SearchPage/Searchpage";
import Categorypage from "./Pages/CategoryPage/Categorypage";
import Subcategorypage from "./Pages/SubcategoryPage/Subcategorypage";
import Loginpage from "./Pages/LoginPage/Loginpage";
import Resetpassword from "./Pages/ResetPassword/Resetpassword";
import { useEffect } from "react";
import { initializeAuth, setCountryCode } from "./Features/auth/authSlice.js";
import { cartCount } from "./Features/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "./Pages/CheckOut/Checkout.jsx";
import { useQuery } from "@tanstack/react-query";
import { loginUserCartItems } from "./Api/productApi.js";



function App() {

  const isloggedIn = useSelector((state) => state.auth.isAuthenticated)
  const dispatch = useDispatch();


  useEffect(() => {

    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken")

      if (!accessToken) return;

      try {
        const response = await api.get("/auth/me");

        console.log(response.data);
        dispatch(setCountryCode(response.data.user.countryCode))

        dispatch(
          initializeAuth(response.data.user)
        );

      } catch (error) {

        console.log("AUTH ERROR:", error.response?.data);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    };

    checkAuth();

  }, [dispatch]);

  const { data } = useQuery({
    queryFn: loginUserCartItems,
    queryKey: ['cart'],
    enabled: isloggedIn
  })
  console.log("sign in ", data?.result?.[0]?.items)
  const currentCartItems = data?.result?.[0]?.items ?? []

  const guestCartItems = JSON.parse(localStorage.getItem("guestCart") || "[]")
  const cartItems = isloggedIn ? currentCartItems : guestCartItems

  const countItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )


  useEffect(() => {

    dispatch(cartCount(countItems));

  }, [countItems, dispatch]);


  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/searchpage" element={<Searchpage />} />
            <Route path="/categorypage" element={<Categorypage />} />
            <Route path="/subcategorypage" element={<Subcategorypage />} />

            <Route path="/marketing/:type" element={<Marketing />} />
            <Route path="/itemsummary/:productId" element={<Itemsummary />} />
            <Route path="/cart" element={<Cart />} />

          </Route >
          <Route path="/login" element={<Loginpage />} />
          <Route path="/login/signIn" element={<Loginpage />} />
          <Route path="/login/create-account" element={<Loginpage />} />
          <Route path="/login/create-account/buyer" element={<Loginpage />} />
          <Route path="/login/create-account/seller" element={<Loginpage />} />
          <Route path="/login/forgotPassword" element={<Resetpassword />} />
          <Route path="/checkout" element={<Checkout />} />

        </Routes>
      </BrowserRouter>




    </>
  );
}

export default App;
