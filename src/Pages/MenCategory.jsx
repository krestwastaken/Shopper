import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function MenCategory() {

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:5000/products?category=men")
    return data;
  };

  const {data: menProducts = [], isLoading, error} = useQuery({
    queryKey: ['mens-products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading men's clothing products...</div>;
  if (error) return <div>Error fetching men's clothing products</div>;

  return (
    <div>
      <h1>Men's Products</h1>
      {menProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className='product-grid'>
          {menProducts.filter(product => product.category === 'men')
            .map(item => (
              <div key={item._id} className="product-list">
                <img src={item.image} alt={item.title} style={{ width: '150px' }} />  
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <button className='button'>
                  <Link className='link' to={`/product/${item._id}`}>View Details</Link>
                </button>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}