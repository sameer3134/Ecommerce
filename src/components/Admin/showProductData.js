import React, { useEffect, useState } from "react";
import { db } from "./firebase/setup";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { reload } from "firebase/auth";
import UpdateProduct from "./updateProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/auth"); // Redirect to Auth page if not authenticated
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleLogOut = () => {
    console.log("WFf")
    sessionStorage.removeItem("adminAuth")
    navigate("/auth")
  }

  return (
    <div className="p-4 ">
      <h1 className="text-xl text-black font-bold mb-4 pt-5">Product List</h1>
      <table className="w-full text-black border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Sizes & Quantity</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.brand}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">${product.price}</td>
              <td className="border p-2">
                {product.sizes &&
                  Object.entries(product.sizes).map(([size, quantity]) => (
                    <div key={size}>{size}: {quantity}</div>
                  ))}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(product.id)}
                  className=" text-white px-2 py-1 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M5 6h14l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6z" />
                  </svg>

                </button>
                <button
                  onClick={() => setSelectedProductId(product.id)}
                  className=" text-white px-2 py-1 ml-2 rounded"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleLogOut} className="bg-red-800 px-2 py-2 text-white m-2">Admin Log out</button>
      <Link to={`/admin/create`} className="bg-red-800 px-2 py-2 text-white">Add Product</Link>
      {selectedProductId && (
        <UpdateProduct productId={selectedProductId} closeUpdate={() => setSelectedProductId(null)} />
      )}
    </div>
  );
};

export default ProductList;
