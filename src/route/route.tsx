import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";
import Home from "../components/pages/home/home";
import Navbar from "../widget/navbar";
import Footer from "../widget/footer";
import About from "../components/pages/about/about";
import Contact from "../components/pages/contact/contact";
import TermsOfUse from "../components/pages/termofuse/termOfUse";
import TermCondition from "../components/pages/termCondition/termCondition";
import ProductDetails from "../components/pages/home/productDetails";
import Categories from "../components/pages/categories/categories";
import Cart from "../components/pages/cart/cart";
import Search from "../components/pages/search/search";
import Account from "../components/pages/account/account";
import Checkout from "../components/pages/checkout/checkout";
import Auth from "../components/admin/auth";
import ParentDetail from "../components/admin/parentDetail";
import ProductCreate from "../components/admin/productCreate";
import ProductList from "../components/admin/showProductData";
import AllOrder from "../components/admin/allOrder";
import ScrollToTop from "../components/extra/scrollToTop";

const AccessComponent = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/termofuse" element={<TermsOfUse />} />
            <Route path="/term&condition" element={<TermCondition />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/categories/:id" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<Account />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />

          </Route>
          {/* Private Route */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/admin" element={<ParentDetail />} />
            <Route path="/admin/create" element={<ProductCreate />} />
            <Route path="/admin/data" element={<ProductList />} />
            <Route path="/admin/order" element={<AllOrder />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};
export default AccessComponent;
