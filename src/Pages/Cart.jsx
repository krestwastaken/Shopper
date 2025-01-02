import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiShoppingBag2Line } from 'react-icons/ri';

export default function Cart() {
  const [cart, setCart] = useState([]);

  // Fetch cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id); // Filter out the item with the matching id
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Update localStorage
    window.dispatchEvent(new Event('storage')); // Notify changes
  };

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col py-20">
        <RiShoppingBag2Line size={100} className="text-gray-600 mb-6"/>
        <p className="text-2xl text-gray-600 mb-4">Oops!</p>
        <p className="text-lg text-gray-600">Your cart is empty. Go add something!</p>
        <NavLink to="/" >
          <button className="bg-lilac text-white py-3 px-6 rounded-md mt-4 hover:bg-purple-700 transition">
            Browse Products
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100">
      {/* Main Cart Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-4">
          <h1 className="text-3xl font-medium mb-4">Cart</h1>

          {/* Cart Items List */}
          {cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4 mb-4">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Product Details */}
              <div className="flex-1 ml-4">
                <NavLink to={`/product/${item._id}`} className="hover:text-lilac">
                  <h3 className="text-md font-normal">{item.title} x{item.quantity}</h3>
                </NavLink>
                <p className="text-gray-600 text-sm">${item.price} each</p>
              </div>

              {/* Product Price */}
              <p className="text-lg font-semibold text-gray-800">
                ${item.price * item.quantity}
              </p>

              {/* Remove Button */}
              <button
                className="ml-4 bg-white text-red-500 font-semibold px-2 py-1 rounded-md hover:bg-red-100 transition"
                onClick={() => removeFromCart(item._id)}
              >
                REMOVE
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-lg shadow p-4">
          <h4 className="text-lg font-medium mb-4">CART SUMMARY</h4>
          <div className="flex items-center justify-between text-gray-800">
            <span className="text-sm">Subtotal</span>
            <span>
              $
              {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </span>
          </div>
        </div>

        {/* CHECKOUT */}
        <NavLink to="/checkout">
          <div className="flex justify-center mt-4">
            <button className="bg-lilac text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition">
              CHECKOUT
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
