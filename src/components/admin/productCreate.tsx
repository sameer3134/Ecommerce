import React, { useEffect, useState } from "react";
import { db } from "./firebase/setup";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../pages/home/product";

export type ProductFormType = Omit<ProductType, "id">;

const ProductCreate = () => {
  const [product, setProduct] = useState<ProductFormType>({
    name: "",
    image: "",
    imagetwo:"",
    imagethree:"",
    imagefour:"",
    brand: "",
    category: "",
    price: "",
    description: "",
    additionalInfo: "",
    sizes: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      "2XL": 0,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/auth");
    }
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSizeChange = (size: keyof ProductType["sizes"], value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      sizes: {
        ...prevProduct.sizes,
        [size]: Number(value),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(product);
    try {
      await addDoc(collection(db, "products"), product);
      alert("Product added successfully!");
      setProduct({
        name: "",
        image: "",
        imagetwo:"",
        imagethree:"",
        imagefour:"",
        brand: "",
        category: "",
        price: "",
        description: "",
        additionalInfo: "",
        sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, "2XL": 0 },
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 pt-12 text-black">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="url"
          name="image"
          placeholder="Product Image URL"
          value={product.image}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
         <input
          type="url"
          name="imagetwo"
          placeholder="Product Image URL"
          value={product.imagetwo}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="url"
          name="imagethree"
          placeholder="Product Image URL"
          value={product.imagethree}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />
        <input
          type="url"
          name="imagefour"
          placeholder="Product Image URL"
          value={product.imagefour}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand Name"
          value={product.brand}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (Rs.)"
          value={product.price}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <textarea
          name="description"
          placeholder="Product Description"
          value={product.description}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
          required
        />

        <textarea
          name="additionalInfo"
          placeholder="Additional Information"
          value={product.additionalInfo}
          onChange={handleChange}
          className="w-full p-2 border rounded-md"
        />

        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Size & Quantity</h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.keys(product.sizes).map((size) => (
              <div key={size} className="flex items-center gap-2">
                <label className="font-semibold w-10">{size}</label>
                <input
                  type="number"
                  min="0"
                  value={product.sizes[size as keyof typeof product.sizes]}
                  onChange={(e) => handleSizeChange(size as keyof ProductType["sizes"], e.target.value)}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Submit Product
        </button>
      </form>
    </div>
  );
};

export default ProductCreate;
