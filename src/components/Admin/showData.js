import React, { useEffect, useState } from "react";
import { db } from "./firebase/setup";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

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
      const isAuthenticated = localStorage.getItem("adminAuth");
      if (!isAuthenticated) {
          navigate("/auth"); // Redirect to Auth page if not authenticated
      }
  }, [navigate]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 pt-5">Product List</h1>
      <table className="w-full border-collapse border border-gray-300">
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
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to={`/admin`}>Add Product</Link>
    </div>
  );
};

export default ProductList;
