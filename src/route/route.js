import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import Navbar from "../widgets/navbar";
import Home from "../components/pages/home/home";
import ProductDetails from "../components/pages/home/productDetails";
import Footer from "../widgets/footer";
import Cart from "../components/pages/cart/cart";
import Detail from "../components/Admin/detail";
import ShowData from "../components/Admin/showData";
import Auth from "../components/Admin/auth";
import About from "../components/pages/about/about";
import Contact from "../components/pages/contact/contact";
import TermsOfUse from "../components/pages/legal/termOfUse";
import ScrollToTop from "../components/Extra/scrollToTop";
import TermCondiition from "../components/pages/legal/termCondiition";
import Search from "../components/pages/search/search";
import Account from "../components/pages/account/account";
import Checkout from "../components/pages/checkout/checkout";


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
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/account" element={<Account />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<Detail />} />
          <Route path="/admin/data" element={<ShowData />} />
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
