import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function SignUp(){
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer', //Default to buyer  
    });

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        try{
            const response = await axios.post('http://localhost:5000/signup', formData);
            console.log(response.data);
            alert('User registered successfullly!');
        }catch (error) {
            console.error('Error registering user:', error.response?.data || error.message);
        }
    };

    // if (!formData.username || !formData.email || !formData.password) {
    //     alert("Please fill in all fields!");
    //     return;
    // }
    
    return (
        <div className="add-product-form">
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" type="text" placeholder="Username" onChange={handleChange} value={formData.username}/>
                <input name="email" type="email" placeholder="E-mail" onChange={handleChange} value={formData.email}/>
                <input name="password" type="password" placeholder="Password" onChange={handleChange} value={formData.password}/>

                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                </select>
                
                <br/>

                <button type="submit" className="product-button">Sign Up</button>
                <br/>
                <p>Already have an account? <NavLink to='/login'>Login here</NavLink></p>
            </form>
        </div>
    )
}