import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Electronics() {
    const [electronicProducts, setElectronicProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        axios.get("https://fakestoreapi.com/products/category/electronics")
            .then(response => {
                setElectronicProducts(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching electronic products:', error);
                setLoading(false);
            });
    },  []);

    if (loading) {
        return <p>Loading electronic products...</p>;
    }

    return (
        <div>
            <h1>Electronics</h1>
            {electronicProducts.length === 0 ? (
                <p>Product not found</p>
            ) : (
                <div className="product-grid">

                </div>
            )}
        </div>
    )
}

export default Electronics