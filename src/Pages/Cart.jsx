import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Fetch cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id); // Filter out the item with the matching id
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty. Go add something!</p>
          <button className='product-button'>
            <Link to="/" className='link'>
              Browse Products
            </Link>
          </button>
        </div>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className='cart-list'>
              <img src={item.image} alt={item.title} style={{ width: '150px' }} />
              
              <br/>
              
                x{item.quantity } {item.title} - ${item.price * item.quantity} 
              
              <br />

              <button className='cart-button'
               onClick={() => removeFromCart(item.id)}
              >Remove</button>

              <button className='cart-button1'>
                <Link to={`/product/${item.id}`} className='link'>
                  View Product
                </Link>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
