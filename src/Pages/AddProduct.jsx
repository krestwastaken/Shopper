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
            const response = await axios.post('http://localhost:5000/products', product);
            alert('Product added successfully');
            console.log('Product add:', response.data);
            setProduct({
                title: '', description: '', price: '', stock: '', category: '', image: ''
            })
        }catch(error){
            console.log('Error adding Product:', error.response ? error.response.data : error.message);
            alert('Error adding product');
        }
    };
        
  return (
    <div className="add-product-form">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input 
                 type="text"
                 name="title"
                 value={product.title}
                 onChange={handleInputChange}
                 required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea 
                 name="description"
                 value={product.description}
                 onChange={handleInputChange}
                 required
                />
            </div>
            <div>
                <label>Price:</label>
                <input 
                 type="number"
                 name="price"
                 value={product.price}
                 onChange={handleInputChange}
                 required
                />
            </div>
            <div>
                <label>Category:</label>
                <select 
                 name="category"
                 value={product.category}
                 onChange={handleInputChange}
                 required>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    {/* <option value="electronics">Electronics</option> */}
                </select>
            </div>
            <div>
                <label>Stock:</label>
                <input 
                 type="number"
                 name="stock"
                 value={product.stock}
                 onChange={handleInputChange}
                 required
                />
            </div>
            <div>
                <label>Image URL:</label>
                <input 
                 type="url" name="image" value={product.image} required
                 placeholder="https://example.com/image.jpg" onChange={handleInputChange}
                />
            </div>
            <button type="submit">
                Add Product
            </button>
        </form>
    </div>
  )
}
