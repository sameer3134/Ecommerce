import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { CartState } from "../../context/context";
import { auth } from "../../admin/firebase/setup";

import LoginModal from "../account/loginModal";

const Cart = () => {
  const { state: { cart }, dispatch } = CartState();
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [note, setNote] = useState("");

    const navigate= useNavigate()

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + Number(item?.price) * item?.qty, 0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleCheckout=()=>{
    if(user){
       navigate("/checkout", { state: { note } });
    }else{
      setIsLoginOpen(true)
    }
  }

  return (
    <div className="container font-playfair mx-auto px-4 py-8 text-stone-800 bg-lightIvory">
      <h1 className="text-3xl font-bold mb-8 text-center lg:text-left">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product List */}
        <div className="w-full lg:w-2/3">
         {cart.length > 0 ? (
            cart.map((prod) => (
              <div
                key={`${prod.id}-${prod.size}`} // Unique key for each cart item
                className="flex flex-col sm:flex-row items-center justify-between gap-4 p-1 bg-darkIvory rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-4 border border-gray-100"
              >
                {/* Product Image */}
                <img
                  src={prod?.image}
                  alt={prod?.name}
                  className="w-auto h-20 sm:w-auto sm:h-32 rounded-lg object-cover"
                />

                {/* Product Details */}
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-lg font-semibold text-gray-800">{prod?.name}</p>
                  <p className="text-gray-600">$ {prod?.price}</p>
                  <p className="text-sm text-gray-500">Size: {prod?.size}</p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-2">
                  <select
                    value={prod.qty}
                    onChange={(e) => {
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: { id: prod.id, size: prod.size, qty: Number(e.target.value) },
                      });
                    }}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {(() => {
                      const stock = prod.sizes[prod.size] || 0; // Get stock for the selected size
                      const maxOptions = Math.min(stock, 10); // Limit options to 10 or stock
                      return stock > 0
                        ? [...Array(maxOptions)].map((_, index) => (
                            <option key={`${prod.id}-${prod.size}-${index}`} value={index + 1}>
                              {index + 1}
                            </option>
                          ))
                        : <option key={`${prod.id}-outofstock`} value={0} disabled>Out of Stock</option>;
                    })()}
                  </select>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })}
                  className="text-red-600 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <div className="text-left py-20">
              <p className="text-xl font-medium mt-4 text-stone-600">Your cart is empty</p>
              <Link className="text-2xl font-medium mt-4 underline text-stone-800" to="/">
                Continue Shopping
              </Link>
            </div>
          )}
<textarea
  placeholder="Type Packaging Request..."
  value={note}
  onChange={(e) => setNote(e.target.value)}
  className="w-full mt-4 p-2 border rounded-md"
/>

        </div>

        {/* Cart Summary */}
        {cart.length > 0 && (
          <div className="w-full lg:w-1/3 p-6 bg-darkIvory rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-stone-600">Subtotal ({cart.length} items)</p>
                <p className="font-semibold">$ {totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-stone-600">Shipping</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold">$ {totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <button
              className="w-full mt-6 py-3 rounded-md text-white font-semibold bg-red-800 hover:bg-red-900 transition-colors duration-200"
              disabled={cart.length === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
      {isLoginOpen && <LoginModal reset={()=>{setIsLoginOpen(false)}}/>}
    </div>
  );
};

export default Cart;