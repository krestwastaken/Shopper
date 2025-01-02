import React, { useState } from "react";

export default function Checkout() {
  const [shippingInfo, setShippingInfo] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const handlePlaceOrder = () => {
    // Validate information
    // Send data to the server
    console.log("Order placed:", { shippingInfo, billingInfo, paymentMethod, cart });
  };

  return (
    <div className="checkout-page p-6 bg-gray-100">
      <h1 className="text-3xl font-medium mb-6 text-center">Checkout</h1>
      
      {/* Cart Summary */}
      <div className="cart-summary bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-medium mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between items-center border-b pb-4 mb-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-md" />
            <div>
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
            </div>
            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="text-right">
          <p className="font-medium">Subtotal: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</p>
          <p className="font-medium">Shipping: $5.00</p>
          <p className="font-bold">Total: ${(cart.reduce((total, item) => total + item.price * item.quantity, 0) + 5).toFixed(2)}</p>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="shipping-info bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
        <form>
          {/* Add form fields for shipping details */}
        </form>
      </div>

      {/* Payment Method */}
      <div className="payment-method bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-xl font-medium mb-4">Payment Method</h2>
        <form>
          {/* Add radio buttons or dropdown for payment options */}
        </form>
      </div>

      {/* Place Order */}
      <div className="text-center">
        <button
          className="bg-lilac text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
