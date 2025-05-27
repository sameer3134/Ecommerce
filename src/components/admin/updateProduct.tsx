import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase/setup";
import { ProductFormType } from "./productCreate";
import { SizeType } from "../context/contextTypes";

interface updateProps {
    productId : string,
    closeUpdate:()=> void
}

const UpdateProduct = ({ productId, closeUpdate }: updateProps) => {
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
      "2XL": 0
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            const data = productSnap.data() as ProductFormType;
            setProduct(data);            
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (size: SizeType, value: Number | string) => {
    setProduct({
      ...product,
      sizes: { ...product.sizes, [size]: Number(value) },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, product);
      alert("Product updated successfully!");
      closeUpdate(); // Close update modal after updating
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="fixed inset-0  xl:pb-30 z-10 bg-black bg-opacity-50 flex justify-center items-center p-4">
    <div className="bg-white relative xl:pt-20 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 text-black">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-black" >
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
            {(Object.keys(product.sizes) as SizeType[]).map((size) => (
              <div key={size} className="flex items-center gap-2">
                <label className="font-semibold w-10">{size}</label>
                <input
                  type="number"
                  min="0"
                  value={product?.sizes[size]}
                  onChange={(e) => handleSizeChange(size, e.target.value)}
                  className="p-2 border rounded-md w-full"
                />
              </div>
            ))}
          </div>
        </div>
  
        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeUpdate}
            className="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  </div>
  
  );
};

export default UpdateProduct;
