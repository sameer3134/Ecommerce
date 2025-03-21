import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Admin/firebase/setup";
import { Link } from "react-router-dom";

const Order = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchOrders(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const q = query(collection(db, "orders"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Your Orders
      </h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <svg
            className="w-20 h-20 text-gray-400 mb-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18M3 6h18M3 9h18M3 12h18M3 15h18M3 18h18M3 21h18"
            ></path>
          </svg>
          <p className="text-gray-600 text-lg mb-4">No orders placed yet</p>
          <Link
            to="/"
            className="bg-stone-800 px-5 py-2 text-white rounded-lg hover:bg-stone-700 transition-all"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border p-5 rounded-lg shadow-md bg-white hover:shadow-lg transition-all"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order ID: <span className="text-gray-700">{order.id.slice(-6)}</span>
                </h2>
                <span
                  className={`text-sm px-3 py-1 rounded-full font-medium ${
                    order.orderStatus === "Processing"
                      ? "bg-yellow-100 text-yellow-700"
                      : order.orderStatus === "Dispatched"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Order Items */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center space-x-4 border rounded-md p-3 hover:bg-gray-100 transition-all"
                  >
                    <img
                      src={item.image || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-600">Qty: {item.qty}</p>
                      <p className="text-gray-900 font-semibold">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details */}
              <div className="mt-4 text-gray-800 text-sm sm:text-base space-y-1">
                <p>
                  <strong>Total Amount:</strong> <span className="font-semibold text-gray-900">₹{order.totalAmount}</span>
                </p>
                <p>
                  <strong>Payment Mode:</strong>{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.paymentMode === "Cash on Delivery"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.paymentMode}
                  </span>
                </p>
                <p>
                  <strong>Order Date:</strong>{" "}
                  <span className="text-gray-700">
                    {new Date(order.timestamp.seconds * 1000).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
