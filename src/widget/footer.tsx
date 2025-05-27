import React from 'react'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div ><footer className="text-gray-600 body-font bg-darkIvory font-playfair">
    <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
      <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left xl:mx-8">
      <div className="w-64 flex-shrink-0 mx-auto">
    <img src={logo} className="w-auto h-10 mx-auto md:mx-0 brightness-0" alt="Company Logo" />
    <p className="mt-2 text-sm text-gray-500">
    The Shining One, where innovation seamlessly blends with unmatched style.
    </p>
  </div>

        <div className="container py-4 flex flex-wrap mx-auto items-center">
      <span className="inline-flex lg:mr-auto  w-full justify-center md:justify-start md:w-auto">
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
      
      <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
        <div className="lg:w-1/3 md:w-1/3 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">SHOP</h2>
          <nav className="list-none mb-10">
            <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/">Product</Link>
            </li>
            <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/cart">Cart</Link>
            </li>
            <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/about">About Us</Link>
            </li>
            <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/admin/data">Admin</Link>
            </li>
          </nav>
        </div>
        <div className="lg:w-1/3 md:w-1/3 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">LEGAL</h2>
          <nav className="list-none mb-10">
          <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/termofuse">Terms of Use</Link>
            </li>
            <li>
              <Link className="text-gray-600 hover:text-gray-800" to="/term&condition">Terms & Conditions</Link>
            </li>
          
          </nav>
        </div>
        <div className="lg:w-1/3 md:w-1/3 w-full px-4">
          <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">CUSTOMER CARE</h2>
          <nav className="list-none mb-10">
            <li>
              <a className="text-gray-600 hover:text-gray-800">+1 703-925-3351</a>
            </li>
            <li>
              <a className="text-gray-600 hover:text-gray-800">kashikatheshiningone@gmail.com</a>
            </li>
          </nav>
        </div>
      </div>
    </div>
  </footer></div>
  )
}

export default Footer