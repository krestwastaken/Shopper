import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';

export default function HomePage() {
  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/products ');
    return data;
  };

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products'], // Use an object with queryKey and queryFn properties
    queryFn: fetchProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product._id} className="product-list">
            <img src={product.image} alt={product.title} style={{ width: '150px' }} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button className="button">
              <NavLink className="link" to={`/product/${product._id}`}>View Details</NavLink>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
