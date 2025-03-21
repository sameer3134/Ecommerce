import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useData from '../../redux/customHook/useData';

const Categories = () => {
    const { data } = useData(); // Fetch data using your custom hook
    const { id } = useParams(); // Get the product ID from the URL
    const [relatedProducts, setRelatedProducts] = useState([]);
    console.log(id)
      useEffect(() => {
          const foundProduct = data?.find((p) => p.Categories === id);
          console.log(foundProduct)
        //   setProduct(foundProduct); // Set the product in stat
          setRelatedProducts(data?.filter((p) => p.id !== foundProduct.id).slice(0, 4))
      }, [data, id]); // Re-run when `data` or `id` changes
    console.log(relatedProducts)
  return (
    <div>Categories</div>
  )
}

export default Categories