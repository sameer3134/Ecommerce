import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../Admin/firebase/setup";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

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
        <>
      <p className="text-gray-600 text-center mb-4">No order has been made yet </p>
      <Link to="/" className="bg-stone-800 px-4 py-2 rounded-lg text-white">Browse Products</Link>
      </>) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="border p-5 rounded-lg shadow-md bg-white">
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Order ID: <span className="text-gray-700">{order.id}</span>
              </h2>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  order.orderStatus === "Pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {order.orderStatus}
              </span>
            </div>
  
            {/* Order Items */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex flex-wrap items-center space-x-4">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-medium">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.qty}</p>
                    <p className="text-gray-900 font-semibold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
  
            {/* Order Details */}
            <div className="mt-4 text-gray-800 text-sm sm:text-base">
              <p><strong>Total Amount:</strong> ${order.totalAmount}</p>
              <p><strong>Payment Mode:</strong> {order.paymentMode}</p>
              <p><strong>Order Date:</strong> {new Date(order.timestamp.seconds * 1000).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default Order;
