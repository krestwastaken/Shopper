import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function WomenCategory() {
  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/products?category=women")
    return data;
  };

  const { data: womenProducts = [], isLoading, error } = useQuery({
    queryKey: ['womens-products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading women's clothing products...</div>;
  if (error) return <div>Error fetching women's clothing products</div>;

  return (
    <div>
      <h1>Women's Products</h1>
      {womenProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className='product-grid'>
          {womenProducts.filter(product => product.category === 'women')
            .map(item => (
              <div key={item._id} className="product-list">
                <img src={item.image} alt={item.title} style={{ width: '150px' }} />  
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <button className='button'><Link className='link' to={`/product/${item._id}`}>View Details</Link></button>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}
