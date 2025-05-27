import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { onAuthStateChanged,User } from "firebase/auth";
import LoginModal from "../components/pages/account/loginModal";
import { auth } from "../components/admin/firebase/setup";
import { CartState } from "../components/context/context";
import { ProductType } from "../components/pages/home/product";
import useData from "../components/redux/customhook/useData";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { state: { cart } } = CartState();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { title: "PRODUCT", href: "/" },
    { title: "ABOUT", href: "/about" },
    { title: "CONTACT", href: "/contact" },
  ];
 const data = useData();
  const [prod, setProd] = useState<ProductType[]>([]); // Store original products

  useEffect(() => {
    if (data.data) {
      setProd(data.data as ProductType[]);
    } else {
      setProd([]);
    }
  }, [data]);


  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const categories = Array.from(new Set(prod.map((p) => p.category)));

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser)
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  return (
    <>
      {/* Top Navbar for Larger Screens */}
      <nav className="bg-darkIvory font-playfair shadow-md fixed top-0 w-full z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">
      
      {/* Left Section: Account and Search */}
      <div className="flex items-center space-x-4">
        {user ? (
          <Link to="/account" className="flex items-center space-x-2">
            <div className="border rounded-lg border-gray-900 px-2">
              <p className="text-lg text-gray-700 font-medium">Hi, {user?.displayName || user?.email}</p>
            </div>
          </Link>
        ) : (
          <button className="flex-shrink-0" onClick={() => setIsLoginOpen(true)}>
            <svg className="w-7 h-7 text-black hover:text-gray-700 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z"/>
            </svg>
          </button>
        )}
        
        <Link to="/search" className="hidden md:block">
          <svg className="w-6 h-6 text-black hover:text-gray-700 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
          </svg>
        </Link>
      </div>

      {/* Middle Section: Logo and Navigation Links */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="flex-shrink-0 flex md:hidden ">
          <img src={logo} className="w-36 h-auto brightness-0 ml-12" alt="Company Logo" />
        </Link>
        <div className="hidden md:flex md:space-x-8">
          {navLinks.slice(0,2).map((link, index) => (
            <Link key={index} to={link.href} className="text-gray-700 hover:text-stone-600 px-3 py-2 rounded-md text-sm font-medium">
              {link.title}
            </Link>
          ))}
          <Link to="/" className="flex-shrink-0">
          <img src={logo} className="w-36 h-auto brightness-0" alt="Company Logo" />
        </Link>
        {navLinks.slice(2).map((link, index) => (
            <Link key={index} to={link.href} className="text-gray-700 hover:text-stone-600 px-3 py-2 rounded-md text-sm font-medium">
              {link.title}
            </Link>
          ))}
          <div className="relative">
            <button onMouseOver={() => setIsCategoriesOpen(!isCategoriesOpen)} className="text-gray-700 hover:text-stone-600 px-3 py-2 rounded-md text-sm font-medium">
              CATEGORIES
            </button>
            {isCategoriesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-lightIvory text-stone-700 shadow-lg rounded-md">
                {categories.map((category, index) => (
                  <Link key={index} to={`/categories/${category.toLowerCase()}`} onClick={() => setIsCategoriesOpen(false)} className="block px-4 py-2 text-stone-700 hover:bg-gray-100">
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Section: Cart */}
      <div className="flex items-center">
        <Link to="/cart" className="relative hidden md:block text-gray-700 hover:text-stone-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-800 text-white text-xs rounded-full px-1 py-0.5">
              {cart.length}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button type="button" className="md:hidden p-2 text-gray-700 hover:text-stone-600 focus:outline-none" onClick={toggleMenu} aria-label="Toggle navigation">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  </div>

  {/* Mobile Menu */}
  <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} bg-lightIvory shadow-md`}>
    <div className="px-2 pt-2 pb-3 space-y-1">
      {navLinks.map((link, index) => (
        <Link key={index} to={link.href} className="text-gray-700 hover:text-stone-600 block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
          {link.title}
        </Link>
      ))}
        <span className="inline-flex lg:mr-auto pt-5  w-full justify-center md:justify-start md:w-auto">
              <a className="text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                </svg>
              </a>
              <Link className="ml-3 text-gray-500" target='_blank' to="https://www.instagram.com/kashikatheshiningone?igsh=MTRqYmc2YWxuMXF0aw%3D%3D&utm_source=qr ">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                </svg>
              </Link>
            </span>
    </div>
  </div>
</nav>


      {/* Bottom Navigation Bar for Mobile */}
      <div className="md:hidden fixed bottom-0 w-full shadow-md border-t border-white text-white bg-stone-800 z-50">
        <div className="flex justify-around items-center py-2">
          {/* <Link className="flex flex-col items-center  hover:text-stone-400" onClick={toggleSidebar}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h18M3 10h18M3 16h18" />
            </svg>
            <span className="text-xs">Categories</span>
          </Link> */}

          <Link to="/" className="flex flex-col items-center  hover:text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M6.938 15h10.124a2 2 0 100-4H6.938a2 2 0 100 4z" />
            </svg>
            <span className="text-xs">Product</span>
          </Link>

          <Link to="/search" className="flex flex-col items-center   hover:text-stone-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="text-xs">Search</span>
          </Link>

          <Link to="/cart" className="relative flex flex-col items-center  hover:text-stone-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-800 text-white text-xs rounded-full px-1.5 py-0.5">
                {cart.length}
              </span>
            )}
            <span className="text-xs">Cart</span>
          </Link>
        </div>
      </div>
      <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
        <div className="w-64 bg-lightIvory h-full shadow-lg p-5">
          <button className="text-gray-700 hover:text-red-600 right-0" onClick={toggleSidebar}>X</button>
          <nav className="mt-5">
            {categories.map((category, index) => (
              <Link key={index} to={`/categories/${category.toLowerCase()}`} onClick={toggleSidebar} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                {category}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {isLoginOpen && <LoginModal reset={() => { setIsLoginOpen(false) }} />}
    </>
  );
};

export default Navbar;
