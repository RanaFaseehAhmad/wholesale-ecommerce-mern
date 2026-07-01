import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Layout from "./Layout/Layout";

import ProductProvider from "./Api/ProductsApi"
import { SearchProvider } from "./DataContext/CreateContext";
import Marketing from "./Pages/Marketing/Marketing";
import Itemsummary from "./Pages/ItemSummary/Itemsummary";
import Cart from "./Pages/Cart/Cart";
import Searchpage from "./Pages/SearchPage/Searchpage";
import Categorypage from "./Pages/CategoryPage/Categorypage";
import Subcategorypage from "./Pages/SubcategoryPage/Subcategorypage";

function App() {
  return (
    <>
      <ProductProvider>
        <SearchProvider>
          <BrowserRouter>

            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/searchpage" element={<Searchpage />} />
                <Route path="/categorypage" element={<Categorypage />} />
                <Route path="/subcategorypage" element={<Subcategorypage />} />


                <Route path="/marketing/:type" element={<Marketing />} />
                <Route path="/itemsummary/:id" element={<Itemsummary />} />
                <Route path="/cart" element={<Cart />} />

              </Route >





            </Routes>
          </BrowserRouter>
        </SearchProvider>
      </ProductProvider>



    </>
  );
}

export default App;
