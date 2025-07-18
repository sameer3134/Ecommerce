import React, { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../../admin/firebase/setup";
import Address from "../account/address";
import { CartState } from "../../context/context";
import { useLocation } from "react-router-dom";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface AddressType {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  country: string;
  state: string;
  city: string;
  pincode: string;
  streetAddress: string;
  timestamp?: Date;
  userId?: string;
}

const Checkout = () => {
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<AddressType | null>(null);
  const [paymentMode, setPaymentMode] = useState("");
  const location = useLocation()
  const note = location.state?.note || ""; // fallback to empty string

  console.log("Note from cart:", note);
  const { state: { cart } } = CartState();
  const totalPrice = cart.reduce((acc, item) => acc + Number(item.price) * item.qty, 0);
  // Get logged-in user details
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, []);

  // Get address from Address Component
  const handleAddressSubmit = async (savedAddress: AddressType): Promise<void> => {
    setAddress(savedAddress);
  };

  // Handle Payment Mode Selection
  const handlePaymentChange = (mode: string): void => {
    setPaymentMode(mode);
  };

  // Handle Order Submission
  const handleOrderSubmit = async (skipPaymentCheck = false) => {
    if (!user) {
      alert("Please log in to place an order!");
      return;
    }
    if (!address) {
      alert("Please enter your shipping address!");
      return;
    }
    const { firstName, lastName, mobile, pincode } = address;
    if (!firstName || !lastName || !mobile || !pincode) {
  alert("Please complete all required address fields: First Name, Last Name, Mobile, and Pincode.");
  return;
    }
    if (!paymentMode && !skipPaymentCheck) {
      alert("Please select a payment method!");
      return;
    }

    if (paymentMode === "PayPal" && !skipPaymentCheck) {
      // Don't place order yet; wait for PayPal payment
      return;
    }

    const orderData = {
      userId: user.uid,
      email: user.email,
      address,
      items: cart,
      totalAmount: totalPrice.toFixed(2),
      paymentMode,
      orderStatus: "Processing", // Default status
      timestamp: serverTimestamp(),
      note: note
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      // Reduce inventory for each item
      for (const item of cart) {
        const productRef = doc(db, "products", item.id);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          const currentSizes = productData.sizes || {};

          const updatedSizes = {
            ...currentSizes,
            [item.size]: Math.max((currentSizes[item.size] || 0) - item.qty, 0),
          };

          await updateDoc(productRef, { sizes: updatedSizes });
        }
      }
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order!");
    }
  };
  const onApprove = async (data: any, actions: any) => {
    const details = await actions.order.capture();
    console.log("PayPal payment successful:", details);
    handleOrderSubmit(true); // Save order to Firestore
  };
  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            // value: totalPrice.toFixed(2).toString(),
            value: 0.01
          },
        },
      ],
    });
  };


  return (

    <div className="container mx-auto px-5 py-6 bg-lightIvory">
      <PayPalScriptProvider options={{
    clientId: "AUTvAKvLt_fJolIso18EI9TynNNWYkP143HmvUEAUQp4pPQUzxoq9JGd915JmPDMxrugOgYquVDxuXPH",
    currency: "USD",
    intent: "capture"
  }}>
      <div className="relative z-10 pt-20">
        <h1 className="text-3xl font-playfair italic text-stone-600 mb-4">Checkout</h1>
      </div>

      {/* Address Section */}
      <Address onAddressSubmit={handleAddressSubmit} />

      {/* Order Summary */}
      <div className="mt-6 border bg-darkIvory border-gray-300 p-4 rounded-lg text-left text-stone-900">
        <h2 className="text-2xl font-medium text-stone-900">Your Order</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between border-b py-2">
            <span>{item.name} (x{item.qty})</span>
            <span>${Number(item.price) * item.qty}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4 text-lg font-semibold">
          <span>Total Amount:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment Mode Selection */}
      <div className="mt-6">
        <h2 className="text-2xl font-medium text-left text-stone-900">Mode of Payment</h2>
        <div className="flex flex-col gap-4 mt-4">
          {/* Cash on Delivery */}
          <label
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${paymentMode === "Cash on Delivery" ? "bg-green-100 border-green-500" : "bg-gray-100"
              }`}
          >
            <input
              type="radio"
              name="paymentMode"
              value="Cash on Delivery"
              className="hidden"
              checked={paymentMode === "Cash on Delivery"}
              onChange={() => handlePaymentChange("Cash on Delivery")}
            />
            {/* Cash Icon */}
            <svg
              className="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span className="text-green-600 font-medium">Cash on Delivery</span>
          </label>

          {/* PayPal */}
          <label
            className={`flex items-center gap-3 p-3 border rounded cursor-pointer ${paymentMode === "PayPal" ? "bg-blue-100 border-blue-500" : "bg-gray-100"
              }`}
          >
            <input
              type="radio"
              name="paymentMode"
              value="PayPal"
              className="hidden"
              checked={paymentMode === "PayPal"}
              onChange={() => handlePaymentChange("PayPal")}
            />
            {/* PayPal Icon */}
            <svg
              className="w-6 h-6 text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.5 21h2.4c.4 0 .7-.3.8-.6l1.2-5.8v-.2c0-.2.2-.4.4-.4h2.4c3.1 0 5.4-1.3 6.3-4.7.4-1.6.3-2.9-.3-3.8-.6-1-1.7-1.5-3.1-1.5h-7c-.3 0-.6.2-.7.5L6.2 16.2c-.1.5.3.9.8.9h2.4l.7-3.6v-.2c0-.2.2-.4.4-.4h1.9c.9 0 1.6-.1 2.2-.4s1-.7 1.2-1.4c.2-.6.2-1.1.1-1.5-.1-.3-.3-.5-.7-.6-.3-.1-.8-.1-1.5-.1H9.5c-.3 0-.6.2-.7.5L7.5 21z" />
            </svg>

            <span className="text-blue-600 font-medium">PayPal</span>
          </label>
        </div>

      </div>

      {/* Place Order Button */}
      {/* <button
        onClick={handleOrderSubmit}
        className="w-full bg-slate-800 text-white py-3 rounded mt-6"
      >
        Place Order
      </button> */}
      {paymentMode === "PayPal" && (
        <div className="mt-4 z-10 relative">
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={createOrder}
            onApprove={onApprove}
            onError={(err) => {
              console.error("PayPal Checkout Error:", err);
              alert("PayPal payment failed. Please try again.");
            }}
          />
        </div>
      )}
      {paymentMode === "Cash on Delivery" && (
        <button
          onClick={() => handleOrderSubmit()}
          className="w-full bg-slate-800 text-white py-3 rounded mt-6"
        >
          Place Order
        </button>
      )}
      </PayPalScriptProvider>
      
    </div>
  );
};

export default Checkout;
