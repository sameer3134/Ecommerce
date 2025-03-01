import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useData from "../../redux/customHook/useData";

const Product = () => {
  const data=useData();
  const [prod, setProd] = useState([]); // ✅ Ensure prod is an array

  useEffect(() => {
    if (data.data) { // ✅ Check if data is an array before setting state
      setProd(data.data);
    } else {
      setProd([]); // ✅ Prevents issues if data is undefined or not an array
    }
    console.log(data.data)
  }, [data]);

  return (
    <div>
      <section className=" px-5 py-6 body-font">
        <div className="container mx-auto">
          <div className="text-left mb-6">
            <h1 className="sm:text-3xl font-playfair italic text-2xl font-medium title-font text-stone-600 mb-4">Products</h1>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container mx-auto">
          <div className="flex flex-wrap -m-4 font-playfair">
            {prod?.map((product) => (
              <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link to={`/product/${product.id}`} className="block relative h-auto rounded overflow-hidden">
                  <img alt={product.name} className="object-cover object-center w-full h-full block" src={product.image} />
                </Link>
                <div className="mt-4 text-left text-stone-600">
                  <h2 className=" title-font text-lg font-medium">{product.name}</h2>
                  <p className="mt-1">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Product;
