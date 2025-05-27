import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase/setup";
import { OrderType } from "../pages/account/order";

const AllOrder = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const q = collection(db, "orders");
      const querySnapshot = await getDocs(q);
      const ordersData = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Document ID
        ...doc.data(),
      }));
      setOrders(ordersData as OrderType[]);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to update order status
  const updateOrderStatus = async (orderId : string, currentStatus: string ) => {
    let newStatus = "";
    if (currentStatus === "Pending") newStatus = "Dispatched";
    else if (currentStatus === "Dispatched") newStatus = "Delivered";
    else return;

    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { orderStatus: newStatus });

      // Update state to reflect change
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, orderStatus: newStatus } : order
        )
      );

      alert(`Order status updated to ${newStatus}!`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
const displayDate = (timestamp: any) => {
  if (timestamp?.toDate) {
    return timestamp.toDate().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  } else if (timestamp instanceof Date) {
    return timestamp.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  } else {
    return "Invalid Date";
  }
};
  return (
    <div className="p-6 text-black relative z-10 pt-20">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Order ID</th>
              <th className="p-3 text-left">Customer</th>
              <th className="p-3 text-left">Timestamp</th>
              <th className="p-3 text-left">Total (₹)</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Payment</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b hover:bg-gray-100 text-left cursor-pointer"
                onClick={() => setSelectedOrder(order as OrderType)}
              >
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.address.firstName} {order.address.lastName}</td>
                <td className="p-2">                     {displayDate(order.timestamp)}</td>
                <td className="p-3">₹{order.totalAmount}</td>
                <td className="p-3">{order.orderStatus}</td>
                <td className="p-3">{order.paymentMode}</td>
                <td className="p-3">
                  {order.orderStatus !== "Delivered" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateOrderStatus(order.id, order.orderStatus);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md"
                    >
                      {order.orderStatus === "Pending" ? "Mark as Dispatched" : "Mark as Delivered"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center mt-10 items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <p><strong>Customer:</strong> {selectedOrder?.address.firstName} {selectedOrder.address.lastName}</p>
            <p><strong>Email:</strong> {selectedOrder?.address.email}</p>
            <p><strong>Mobile:</strong> {selectedOrder.address.mobile}</p>
            <p>
              <strong>Address:</strong> {selectedOrder.address.streetAddress}, {selectedOrder.address.city}, {selectedOrder.address.state}, {selectedOrder.address.country} - {selectedOrder.address.pincode}
            </p>
            <p><strong>Total Amount:</strong> ₹{selectedOrder.totalAmount}</p>
            <p><strong>Payment Mode:</strong> {selectedOrder.paymentMode}</p>
            <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
             <p><strong>Note:</strong> {selectedOrder.note}</p>
                    <p><strong>Timestamp:</strong>  {displayDate(selectedOrder.timestamp)}</p>

            <h3 className="text-lg font-semibold mt-4">Items:</h3>
            {selectedOrder.items.map((item, index) => (
              <div key={index} className=" flex flex-wrap border rounded-md mb-2">
                <div className="w-1/2">
               <img src={item.image} className="w-20 h-auto mx-auto"/>
               </div>
                   <div className="w-1/2 my-auto">
                    <p><strong>{item.name}</strong> (Size: {item.size})</p>
                <p>Qty: {item.qty} | ₹{item.price}</p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setSelectedOrder(null)}
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
