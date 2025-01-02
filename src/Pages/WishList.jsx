import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiHeart } from "react-icons/ci";

export default function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const handleStorageChange = () => {
      const updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(updatedWishlist);

      const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(updatedCart);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function removeFromWishlist(id) {
    const updatedWishlist = wishlist.filter((item) => item._id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  function addToCart(item) { //change the itemExists variable to increase the number of items in the cart instead
    const itemExists = cart.find((cartItem) => cartItem._id === item._id);
    if (itemExists) {
      alert("Item is already in the cart!");
      return;
    }

    const updatedCart = [...cart, { ...item, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  }

  if (wishlist.length === 0) {
    return (
      <div className="flex justify-center items-center flex-col py-20">
        <CiHeart size={100} className="text-gray-500 mb-6" />
        <p className="text-2xl text-gray-600 mb-4">Wishlist is empty</p>
        <p className="text-md text-gray-600 mb-6">Please add your favorite items</p>
        <NavLink to="/">
          <button className="bg-lilac text-white py-3 px-6 rounded-md hover:bg-purple-700 transition">
            Browse Products
          </button>
        </NavLink>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-medium text-center text-gray-800 mb-6">Wishlist</h1>

      {/* Wishlist Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
          >
            {/* Product Image */}
            <div className="w-full h-48 rounded-md overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 mt-4">
              <NavLink to={`/product/${item._id}`} className="hover:text-lilac">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              </NavLink>
              <p className="text-gray-600 text-sm mt-2">Price: ${item.price}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex justify-between">
              <button
                className="bg-white text-red-500 px-4 py-2 rounded-md hover:bg-red-100 transition"
                onClick={() => removeFromWishlist(item._id)}
              >
                Remove
              </button>
              <button
                className="bg-lilac text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
                onClick={() => addToCart(item)}
              >
                Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
