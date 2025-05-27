import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useData from '../../redux/customhook/useData';
import { ProductType } from '../home/product';

const Categories = () => {
  const { data } = useData();
  const typedData = data as ProductType[];
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    if (!typedData || !id) return;

    const filteredProducts = typedData.filter(
      (p) => p?.category?.toLowerCase() === id.toLowerCase()
    );
    setRelatedProducts(filteredProducts);
  }, [typedData, id]);

  return (
    <div className='pt-20'>
    <section className="px-5 py-6 body-font">
      <div className="container mx-auto">
        <div className="text-left mb-6">
          <h1 className="sm:text-3xl font-playfair italic text-2xl font-medium title-font text-stone-600 mb-4">
            Products
          </h1>
        </div>
      </div>

      <div className="container mx-auto">
        {relatedProducts.length > 0 ? (
          <div className="flex flex-wrap -m-4 font-playfair">
            {relatedProducts.map((product) => (
              <div key={product.id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link
                  to={`/product/${product.id}`}
                  className="block relative h-auto rounded overflow-hidden"
                >
                  <img
                    alt={product.name}
                    className="object-cover object-center w-full h-full block"
                    src={product.image}
                  />
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
    </div>
  );
};

export default Categories;
