import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CartState } from "../../../context/Context";
import useData from "../../redux/customHook/useData";

const ProductDetails = () => {
  const { data } = useData(); // Fetch data using your custom hook
  const { id } = useParams(); // Get the product ID from the URL
  const { state: { cart }, dispatch } = CartState();
  const [product, setProduct] = useState(null); // State to hold the product
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  // Use useEffect to find the product once data is available
  useEffect(() => {
      const foundProduct = data?.find((p) => p.id === id);
      setProduct(foundProduct); // Set the product in stat
    console.log("m",data)
  }, [data, id]); // Re-run when `data` or `id` changes

  // Filter related products (excluding the current product)
  const relatedProducts = data?.data ? data.data.filter((p) => p.id !== product.id).slice(0, 4) : [];

  return (
    <section className="text-gray-600 body-font overflow-hidden bg-lightIvory">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Product Image */}
          <img alt="ecommerce" className="lg:w-1/2 w-full h-auto object-cover object-center rounded" src={product?.image} />
          
          {/* Product Info */}
          <div className="lg:w-1/2 text-left w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">{product?.brand}</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>
            <p className="leading-relaxed">{product?.description}</p>

            {/* Size Selection */}
            <div className=" mt-6 mb-3 font-semibold">SIZE:-</div>
            <div className="flex items-center pb-5 border-b-2 border-gray-100 mb-5">
              
              <div className="flex">
  {product?.sizes &&
    Object.entries(product.sizes).map(([size, inStock]) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        disabled={inStock === 0}
        className={`rounded border py-1 px-2 mx-1 ${
          selectedSize === size ? "bg-gray-800 text-white" : "border-gray-300 text-gray-700"
        } ${inStock === 0 ? "opacity-50 cursor-not-allowed bg-gray-400" : ""}`}
      >
        {size}
      </button>
    ))}
</div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-medium">Quantity:</span>
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={() => {
                  const maxStock = product?.sizes ? product.sizes[selectedSize] || 1 : 1;
                  setQuantity((prev) => Math.min(prev + 1, maxStock));
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="title-font font-medium text-2xl text-gray-900 mt-6">$ {product?.price}</div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { ...product, qty: quantity, size: selectedSize },
                });
              }}
              className="rounded border text-white bg-red-800 py-2 mt-4 w-full hover:bg-red-900"
            >
              Add To Cart
            </button>

            {/* Additional Information */}
            <div className="mt-6 rounded-md">
              <h3 className="text-lg font-semibold text-stone-800">Additional Information:</h3>
              <p className="text-stone-600">{product?.additionalInfo}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 mb-6 mx-1">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts?.map((relProduct) => (
              <div key={relProduct.id} className="border p-4 bg-darkIvory rounded-lg shadow-lg">
                <Link to={`/product/${relProduct.id}`}>
                  <img src={relProduct.image} alt={relProduct.name} className="w-full h-48 object-cover mb-4 rounded" />
                </Link>
                <h3 className="text-lg font-medium">{relProduct.name}</h3>
                <p className="text-gray-600">{relProduct.brand}</p>
                <p className="text-gray-900 font-bold mt-2">$ {relProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default ProductDetails;