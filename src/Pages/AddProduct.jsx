import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
    const [product, setProduct] = useState({
        title: '',
        description: '',
        price: '',
        category: 'men',
        stock: '',
        image:''
    });

    const handleInputChange = (e) => {
        const { name, value }= e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const token = localStorage.getItem('authToken');
            console.log('Token being sent:', token);

            if (!token) {
                console.error('You are not logged in, please log in to add a product.');
                return;
            }

            const response = await axios.post('http://localhost:5000/products', product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            alert('Product added successfully');
            console.log('Product added:', response.data);
            setProduct({
                title: '', 
                description: '', 
                price: '', 
                stock: '', 
                category: 'men', 
                image: '',
            });

        }catch(error){
            console.log('Error adding Product:', error.response ? error.response.data : error.message);
            alert(
                error.response?.data?.message ||
                'An unexpected error occured while adding the product.'
            );
        }
    };
        
  return (
    <div className="min-h-screen flex  justify-center bg-gray-100 rounded-md">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 mt-10 mb-10">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add New Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium text-gray-700">
                        Title:
                    </label>
                    <input 
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Description:
                    </label>
                    <textarea 
                        name="description"
                        value={product.description}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Price:
                    </label>
                    <input 
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Category:
                    </label>
                    <select 
                        name="category"
                        value={product.category}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                        <option value="men">Men</option>
                        <option value="women">Women</option>                            
                    </select>
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Stock:
                    </label>
                    <input 
                        type="number"
                        name="stock"
                        value={product.stock}
                        onChange={handleInputChange}
                        required
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>
                <div>
                    <label className="block font-medium text-gray-700">
                        Image URL:
                    </label>
                    <input 
                        type="url" 
                        name="image" 
                        value={product.image} 
                        required
                        placeholder="https://example.com/image.jpg" 
                        onChange={handleInputChange}
                        className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-lilac text-white py-3 rounded-md hover:bg-purple-600 transition"
                >
                    Add Product
                </button>
            </form>
        </div>        
    </div>
  )
}
