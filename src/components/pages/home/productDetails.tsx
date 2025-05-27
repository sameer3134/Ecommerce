import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useData from "../../redux/customhook/useData";
import { CartState } from "../../context/context";
import { ProductType, SizeType } from "./product";

const ProductDetails = () => {
  const { data } = useData();
  const { id } = useParams();
  console.log(id)
  const {
    state: { cart },
    dispatch,
  } = CartState();

  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedSize, setSelectedSize] = useState<SizeType>("M");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);
  const [defaultImage, setDefaultImage] = useState<string | undefined>();

  useEffect(() => {
    const foundProduct = data?.find((p) => p.id === id);
    setProduct((foundProduct || null) as ProductType);
    setRelatedProducts(
      (data?.filter((p) => p.id !== foundProduct?.id).slice(0, 4) || []) as ProductType[]
    );
    if (foundProduct) {
      setDefaultImage(foundProduct.image);
    }
  }, [data, id]);

  return (
    <section className="text-gray-600 body-font bg-lightIvory">
      <div className="container px-4 md:px-24 py-12 mt-10 mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Product Images */}
          <div className="w-full lg:w-1/2 flex flex-col lg:flex-row">
            {/* Thumbnails */}
            <div className="flex lg:flex-col gap-2 mx-2 overflow-x-auto lg:overflow-visible mb-4 lg:mb-0">
              {["image", "imagetwo", "imagethree", "imagefour"].map((imgKey, i) => (
                product?.[imgKey as keyof ProductType] && (
                  <img
                    key={i}
                    alt="product"
                    src={product?.[imgKey as keyof ProductType] as string}
                    onClick={() =>
                      setDefaultImage(product?.[imgKey as keyof ProductType] as string)
                    }
                    className={`h-20 w-20 lg:h-24 lg:w-24 rounded cursor-pointer border-2 ${
                      defaultImage === product?.[imgKey as keyof ProductType]
                        ? "border-gray-700"
                        : ""
                    }`}
                  />
                )
              ))}
            </div>

            {/* Main Image */}
            <div className="w-full">
              <img
                alt="ecommerce"
                className="w-auto h-[600px] object-cover rounded mx-0 lg:mx-auto"
                src={defaultImage}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full text-left lg:w-1/2 mt-6 lg:mt-0">
            <h2 className="text-sm text-gray-500">{product?.brand}</h2>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product?.name}</h1>
            <p className="text-gray-700 mb-4">{product?.description}</p>

            {/* Size Selection */}
            <div className="mb-4 text-left">
              <h3 className="font-semibold mb-2">Size:</h3>
              <div className="flex flex-wrap gap-2">
                {product?.sizes &&
                  Object.entries(product.sizes).map(([size, inStock]) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size as SizeType)}
                      disabled={inStock === 0}
                      className={`px-3 py-1 rounded border ${
                        selectedSize === size
                          ? "bg-gray-800 text-white"
                          : "border-gray-300 text-gray-700"
                      } ${inStock === 0 ? "opacity-50 cursor-not-allowed bg-gray-300" : ""}`}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-lg">Quantity:</span>
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={() => {
                  const maxStock = product?.sizes?.[selectedSize] ?? 1;
                  setQuantity((prev) => Math.min(prev + 1, maxStock));
                }}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
              >
                +
              </button>
            </div>

            {/* Price */}
            <div className="text-2xl font-semibold text-gray-900 mb-4">
              $ {product?.price}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                if (!product || !selectedSize) return;
                dispatch({
                  type: "ADD_TO_CART",
                  payload: { ...product, qty: quantity, size: selectedSize },
                });
              }}
              className="w-full py-3 bg-red-700 hover:bg-red-800 text-white font-semibold rounded"
            >
              Add To Cart
            </button>

            {/* Additional Info */}
            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold text-gray-800">Additional Information:</h3>
              <p className="text-gray-600">{product?.additionalInfo}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts?.map((relProduct) => (
              <div key={relProduct.id} className="border p-2 rounded-lg bg-darkIvory shadow">
                <Link to={`/product/${relProduct.id}`}>
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-auto mx-auto h-64 object-cover rounded mb-3"
                  />
                </Link>
                <h3 className="text-lg font-medium">{relProduct.name}</h3>
                <p className="text-sm text-gray-500">{relProduct.brand}</p>
                <p className="text-gray-900 font-bold mt-1">$ {relProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
