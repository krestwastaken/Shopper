import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { CiHeart } from 'react-icons/ci';

export default function Product() {
  const { id } = useParams(); // Retrieves the product ID from the URL
  
  console.log("Product ID from URL:", id);

  const fetchProduct = async () => {
    const { data } = await axios.get(`http://localhost:5000/products/${id}`);
    return data;
  }

  const { data: product, isLoading, error} = useQuery ({
    queryKey: ['product', id],
    queryFn: fetchProduct,
    enabled: !!id,
  });

  function addToCart() {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = currentCart.findIndex(item => item.id === String(product.id));

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

  function addToWishList() {
    const currentWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = currentWishlist.some(item => item.id === String(product.id));

    if (isProductInWishlist) {
      alert(`${product.title} is already in your wishlist`);
      return;
    }

    currentWishlist.push({...product});
    localStorage.setItem('wishlist', JSON.stringify(currentWishlist)); // Update localStorage
    window.dispatchEvent(new Event('storage')); // Trigger storage event to update wishlist count
    alert(`${product.title} added to wishlist!`);
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
    <div className="flex gap-8 h-[43rem] md:h-fit sm:flex-col sm:h-fit">
      <div className='basis-1/2 border p-8 h-full md:h-96 sm:w-full sm:h-[35rem] sm:basis-0 rounded-md'>
        <img 
          src={product.image} 
          alt={product.title} 
          className='h-full w-full' 
        />
      </div>

      <div className='basis-1/2 sm:basis-0'>
        <h1 className='text-3xl font-medium mb-4'>
          {product.title}
        </h1>
        <p className='text-gray-700 mb-4'>
          {product.description}
        </p>
        <p className='text-2xl text-red-500 font-medium mb-2'>
          ${product.price}
        </p>
        <p className='text-md text-gray-600 mb-6'>
          Category: {product.category}
        </p>

        <div className='flex space-x-4'>
          <button 
            className="bg-lilac text-white py-2 px-6 rounded-md hover:bg-purple-700 transition" 
            onClick={addToCart}
          >
            ADD TO CART
          </button>
          <button 
            className='bg-gray-300 text-gray-700 py-2 px-6 rounded-md hover:bg-gray-400 transition flex items-center space-x-2' 
            onClick={addToWishList}
          >
            <CiHeart className='text-lg'/>
            <span>WISHLIST</span>
          </button>
        </div>
      </div>
    </div>
  );  
}