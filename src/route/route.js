import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import Navbar from "../widgets/navbar";
import Home from "../components/pages/home/home";
import ProductDetails from "../components/pages/home/productDetails";
import Footer from "../widgets/footer";
import Cart from "../components/pages/cart/cart";
import ShowData from "../components/Admin/showProductData";
import Auth from "../components/Admin/auth";
import About from "../components/pages/about/about";
import Contact from "../components/pages/contact/contact";
import TermsOfUse from "../components/pages/legal/termOfUse";
import ScrollToTop from "../components/Extra/scrollToTop";
import TermCondiition from "../components/pages/legal/termCondiition";
import Search from "../components/pages/search/search";
import Account from "../components/pages/account/account";
import Checkout from "../components/pages/checkout/checkout";
import ProductCreate from "../components/Admin/productCreate";
import AllOrder from "../components/Admin/allOrder";
import ParentDetail from "../components/Admin/parentDetail";
import Categories from "../components/pages/categories/categories";


const AccessComponent = () => {

  return (
    <>
      <Router>
      <ScrollToTop />
        <Navbar/>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/termofuse" element={<TermsOfUse />} />
          <Route path="/term&condition" element={<TermCondiition />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/categories/:id" element={<Categories />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* for Admin Use */}
          <Route path="/auth" element={<Auth />} />

          <Route path="/admin" element={<ParentDetail />} />
          <Route path="/admin/create" element={<ProductCreate />} />
          {/* product data */}
          <Route path="/admin/data" element={<ShowData />} />   
          <Route path="/admin/order" element={<AllOrder />} />
          </Route>
          {/* Private Route */}
          <Route path="/" element={<PrivateRoute />}>
      
          </Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
};
export default AccessComponent;
