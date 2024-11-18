import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function Product() {
  const { id } = useParams(); // Retrieves the product ID from the URL
  
  console.log("Product ID from URL:", id);

  const fetchProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/products/${id}`);
    return data;
  }

  const { data: product, isLoading, error} = useQuery ({
    queryKey: ['product', id],
    queryFn: fetchProduct
  });

  function addToCart() {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = currentCart.findIndex(item => item.id === product.id);

    if (existingProductIndex >= 0) {
      // Product is already in the cart, increase the quantity
      currentCart[existingProductIndex].quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(currentCart)); // Update localStorage
    window.dispatchEvent(new Event('storage')); //Trigger storage event. Udate cart count

    // alert(`${product.title} added to cart!`);
  }

  if (isLoading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>Error fetching product details, kindly refresh</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: '300px' }} />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
      <button className="product-button" onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );  
}