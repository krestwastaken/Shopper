import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/products');
    return data;
  };

  const { data: products , isLoading, error } = useQuery({
    queryKey: ['products'], // Use an object with queryKey and queryFn properties
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className='text-center mt-8'>Loading...</div>;
  if (error) return <div className='text-center mt-8 text-red-500'>Error fetching products</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className='text-3xl font-medium text-center text-gray-800'>Our Products</h1>
      <p className='mb-12 text-center text-gray-800 text-sm'>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {products.map((product) => 
          <div key={product._id} 
            className="bg-white shadow-md rounded-lg hover:shadow-lg overflow-hidden flex flex-col items-center text-center transition-shadow"
          >
            <img src={product.image} 
              alt={product.title} 
              className='w-full h-56 object-contain' 
            />
            <NavLink className="py-2 px-4  transition cursor-pointer" 
              to={`/product/${product._id}`}
            >
              <h3 className='text-sm font-medium text-gray-800 mb-2 truncate w-36 hover:text-lilac'>
                {product.title}
              </h3>
            </NavLink>
            
            <p className='text-gray-600 text-sm mb-4'>
              Price: ${product.price}
            </p>            
          </div>
        )}
      </div>
    </div>
  );
}
