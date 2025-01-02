import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

export default function SignUp(){
    const [ formData, setFormData ] = useState({
        username: '',
        email: '',
        password: '',
        role: 'buyer', //Default to buyer
        name: '',  
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();

    function handleChange(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        console.log('Form data submitted:', formData);
        try{
            const response = await axios.post('http://localhost:5000/signup', formData);
            if (response.status === 201) {
                console.log(response.data);
                alert('User registered successfullly!');
                navigate('/login');
            }
        }catch (error) {
            const errorMessage =
                error.response?.data?.message || "An error occured during registration. Please try aagain";
                setErrorMsg(errorMessage);
            console.error('Error registering user:', errorMessage);
        }
    };
    
    return (
        <div className="min-h-screen flex justify-center bg-gray-100 rounded-md">
            <div className="w-full max-w-md bg-white shadow-md rounded-md p-6 mt-10 mb-10">
                <h1 className="text-2xl text-center mb-6 font-semibold text-gray-800">
                    Signup
                </h1>
                <form onSubmit={handleSubmit}>

                    {/* Input fields */}
                    <div className="space-y-4">
                        <input name="name" type="text" placeholder="Name"
                            onChange={handleChange} 
                            value={formData.name}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300"
                        />
                        <input name="username" type="text" placeholder="Username" 
                            onChange={handleChange} 
                            value={formData.username}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300"
                        />
                        <input name="email" type="email" placeholder="E-mail" 
                            onChange={handleChange} 
                            value={formData.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300"
                        />
                        <input name="password" type="password" placeholder="Password" 
                            onChange={handleChange} 
                            value={formData.password}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300"
                        />

                        <select name="role" value={formData.role} onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300"
                        >
                            <option value="buyer">Buyer</option>
                            <option value="seller">Seller</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {errorMsg && <div className='mt-4 text-red-600 text-sm font-medium'>
                            {errorMsg}
                        </div>
                    }

                    {/* Actions */}
                    <button type="submit" 
                        className="w-full mt-6 bg-lilac text-white py-2 rounded-md hover:bg-purple-600 transition"
                    >
                        Sign Up
                    </button>                  
                    
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?{' '} 
                        <NavLink to='/login'
                            className='text-lilac hover:text-purple-600 hover:underline'
                        >
                            Login here
                        </NavLink>
                    </p>
                </form>
            </div>
        </div>        
    )
}