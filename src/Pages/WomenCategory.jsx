import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

export default function WomenCategory() {
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/products?category=women")
    return data;
  };

  const { data: womenProducts = [], isLoading, error } = useQuery({
    queryKey: ['womens-products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div className='text-center mt-8'>Loading women's clothing products...</div>;
  if (error) return <div className='text-center mt-8 text-red-500'>Error fetching women's clothing products</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className='text-3xl font-medium text-center text-gray-800 mb-10'>Women's</h1>
      {womenProducts.length === 0 ? (
        <p className='mb-12 text-center text-gray-800 text-sm'>No products found.</p>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {womenProducts.filter(product => product.category === 'women')
            .map(item => (
              <div key={item._id} 
                className="bg-white shadow-md rounded-lg hover:shadow-lg overflow-hidden flex flex-col items-center text-center transition-shadow"
              >
                <img src={item.image} alt={item.title}  
                  className='w-full h-56 object-contain'
                />  
                <NavLink className="py-2 px-4  transition cursor-pointer" 
                  to={`/product/${item._id}`}
                >
                  <h3 className='text-sm font-medium text-gray-800 mb-2 truncate w-36 hover:text-lilac'>
                    {item.title}
                  </h3>           
                </NavLink>
                <p className='text-gray-600 text-sm mb-4'>
                  Price: ${item.price}
                </p>
                
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
