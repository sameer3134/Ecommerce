import React, { useEffect, useState } from "react";
import { auth, logout, onAuthStateChanged } from "../../admin/firebase/setup";
import { User } from "firebase/auth";
import LoginModal from "./loginModal";
import Order from "./order";
import Address from "./address";

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isShowDetail, setIsShowDetail] = useState("address");

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  return (
    <div className="flex flex-col  min-h-screen space-y-4 relative z-10 pt-20 bg-lightIvory">
      {user ? (
      <>
      <div className="container p-5 flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <span className="ml-3 text-3xl">Dashboard</span>
      </div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
          {/* Welcome Message and Logout Button */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <a className="flex title-font font-medium items-center text-gray-900">
              <span className="ml-3 text-xl">
                Welcome, {user.displayName || user.email}
              </span>
            </a>
        
          </div>
    
          {/* Order and Shipping Address Buttons */}
          <div className="flex items-center space-x-4">
          <button
              onClick={logout}
              className="inline-flex items-center bg-red-800 border-0 py-1 px-3 text-white hover:bg-gray-200 hover:text-red-800 rounded text-base transition-colors"
            >
              Logout
            </button>
          </div>
        
        </div>
        <div className="text-left px-7 space-x-2">
        <button onClick={()=>{setIsShowDetail("order")}} className={`inline-flex items-center   py-1 px-3 ${isShowDetail == "order" ? "text-red-800 bg-white border border-red-800" : "bg-gray-600 text-white"}  hover:bg-gray-200 hover:text-red-800 rounded text-base transition-colors`}>
              Order
            </button>
            <button onClick={()=>{setIsShowDetail("address")}} className={`inline-flex items-center   py-1 px-3 ${isShowDetail == "address" ? "text-red-800 bg-white border border-red-800" : "bg-gray-600 text-white"} hover:bg-gray-200 hover:text-red-800 rounded text-base transition-colors`}>
              Shipping Address
            </button>
            </div>
            <div>
                {isShowDetail == "order" ? <Order/> : <Address/>}
            </div>
      </header>
    </> ) : (
        // If not logged in, show login/register options
        <>
            <p className="text-lg items-center justify-center font-medium text-gray-900">Your are not logged in</p>
            <button onClick={()=>{setIsLoginOpen(true)}} className="bg-red-500 text-white px-6 py-2 rounded">
            LogIn
          </button>
        </>
      )}
            {isLoginOpen && <LoginModal  reset={()=>{setIsLoginOpen(false)}}/>}
    </div>
  );
};

export default Account;
