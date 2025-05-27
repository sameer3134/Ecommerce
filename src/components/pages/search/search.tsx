import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductType } from '../home/product';
import useData from '../../redux/customhook/useData';

const Search = () => {
  const data = useData();
  const [prod, setProd] = useState<ProductType[]>([]); // Store original products
  const [searchQuery, setSearchQuery] = useState(''); // Track search input

  useEffect(() => {
    if (data.data) {
      setProd(data.data as ProductType[]);
    } else {
      setProd([]);
    }
  }, [data]);

  // Filter products based on searchQuery
  const filteredProducts = prod.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Search Section */}
      <section className="text-gray-600 body-font relative z-10 pt-20">
        <div className="container px-5 py-10 mx-auto flex flex-wrap">
          <div className="lg:w-2/3 mx-auto">
            <div className="flex items-center w-full py-2 px-10 relative mb-4 border-b border-gray-300">
              {/* Search Icon */}
              <svg
                className="w-6 h-6 text-gray-500 absolute left-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"
                />
              </svg>

              {/* Input Field */}
              <input
                type="text"
                id="search-field"
                name="search-field"
                placeholder="Start search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
                className="w-full pl-12 pr-4 bg-transparent border-none text-gray-700 text-lg focus:outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="px-5 py-6 body-font">
        <div className="container mx-auto">
          <div className="text-left mb-6">
            <h1 className="sm:text-3xl font-playfair italic text-2xl font-medium title-font text-stone-600 mb-4">
              Products
            </h1>
          </div>
        </div>

        {/* Product Grid */}
        <div className="container mx-auto">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-wrap -m-4 font-playfair">
              {filteredProducts.map((product) => (
                <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <Link to={`/product/${product.id}`} className="block relative h-auto rounded overflow-hidden">
                    <img alt={product.name} className="object-cover object-center w-full h-full block" src={product.image} />
                  </Link>
                  <div className="mt-4 text-left text-stone-600">
                    <h2 className="title-font text-lg font-medium">{product.name}</h2>
                    <p className="mt-1">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-stone-500 text-lg">No products found.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Search;
