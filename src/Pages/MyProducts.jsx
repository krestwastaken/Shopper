import { useState, useEffect } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom";

export default function MyProducts() {
    const [ products, setProducts ] = useState([]);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        const fetchMyProducts = async () => {
            setLoading(true);
            try{
                const token = localStorage.getItem('authToken');
                console.log('Token:', token);
                if (!token) {
                    setError('Authentication token not found. Please log in.');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5000/my-products', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send token to authenticate
                    },
                });
                setProducts(response.data);
                setError(null);
            }catch (err) {
                console.error('Full error details:', err);
                setError(
                    err.response?.data?.message || 'Error occured while fetching products.'
                );
                }finally {
                    setLoading(false);
                }                
            };
            
        fetchMyProducts();
    }, []);

    const toggleProductStatus = async ( productId ) => {
        try{
            const token = localStorage.getItem('authToken');
            const response = await axios.put(
                `http://localhost:5000/products/${productId}/toggle-status`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProducts((prevProducts) => 
                prevProducts.map((product) =>
                    product._id === productId ? { ...product, active: !product.active } : product
                )
            );

            alert(response.data.message);

        } catch (err) {
            setError(
                err.response?.data?.message || 'Error toggling product status.'
            );
        }
    };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">My Products</h1>
      {loading && <p>Loading your products...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 ">
        {products.length > 0 ? (
          products.map((product) => (
            <div
                key={product._id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition flex items-start space-x-4"
            >
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                    <h2 className="text-xl font-medium">{product.title}</h2>
                    <p className="text-gray-600 py-2">{product.description}</p>
                    <p className="text-lilac font-semibold">Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Status: {product.active ? "Active" : "Inactive"}</p>
                    <button
                        className={`mt-2 py-1 px-4 rounded-lg ${
                            product.active
                            ? "bg-red-100 text-red-600 hover:bg-red-300 transition"
                            : "bg-purple-100 text-lilac hover:bg-purple-300 transition"
                        }`}
                        onClick={() => toggleProductStatus(product._id)}
                    >
                        {product.active ? "Deactivate" : "Activate"}
                    </button>
                </div>
            </div>
            ))
        ) : (
          !loading && (
            <div className="text-center">
              <p className="text-gray-600">You haven't added any products yet.</p>
              <NavLink to="/add-product">
                <button className="mt-4 py-2 px-6 bg-lilac text-white rounded-lg hover:bg-purple-600 transition">
                  Add Product
                </button>
              </NavLink>
            </div>
          )
        )}
      </div>
    </div>
  )
}
