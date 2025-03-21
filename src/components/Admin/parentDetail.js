import React from 'react'
import { Link } from 'react-router-dom'

const ParentDetail = () => {
  return (
    <div><section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -mx-4 -mb-10 text-center">
        <div class="sm:w-1/2 mb-10 px-4">
          <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">Product Inventory</h2>
   <Link to='/admin/data' class="flex mx-auto mt-6 text-white bg-stone-800 w-28 border-0 py-2 px-5 focus:outline-none rounded">Click here</Link>
        </div>
        <div class="sm:w-1/2 mb-10 px-4">
          <h2 class="title-font text-2xl font-medium text-gray-900 mt-6 mb-3">All Orders</h2>
     <Link to='/admin/order' class="flex mx-auto mt-6 text-white bg-stone-800 w-28 border-0 py-2 px-5 focus:outline-none rounded">Click here</Link>
        </div>
      </div>
    </div>
  </section></div>
  )
}

export default ParentDetail