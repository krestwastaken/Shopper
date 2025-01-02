import React, { useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom'

export default function LoginSignup() {
  const [formData, setFormData] = useState ({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  function handleChange(e){
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/login', formData);

      if (response.status === 200) {
        console.log('Login successful:', response.data);

        //Store token & user data in local storage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            id: response.data.user.id,
            username: response.data.user.username,
            email: response.data.user.email,
            role: response.data.user.role,
          })
        );

        //Redirect to Homepage
        navigate('/');
      }
    }catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occured, try again.'
      setErrorMsg(errorMessage);
      console.error('Login failed:', errorMessage);
    }
  } 

  return (
    <div className="min-h-screen flex bg-gray-100 justify-center rounded-md">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-6 mt-10 mb-10">
        <h1 className='text-2xl font-semibold text-center text-gray-800 mb-6'> 
          Login 
        </h1>
        <form onSubmit={handleSubmit}>

          {/* Input Fields */}
          <div className="space-y-4">
            <input type="email" placeholder='E-mail Address'
              name='email' onChange={handleChange}
              value={formData.email}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300'
            />
            <input type="password" placeholder='Password' 
              name='password' onChange={handleChange}
              value={formData.password}
              className='w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-purple-300'
            />
          </div>

          {/* Error Message */}
          {errorMsg && <div className='mt-4 text-red-600 text-sm font-medium'>
              {errorMsg}
            </div>
          }

          {/* Submit Button */}
          <button 
            className="w-full mt-6 bg-lilac text-white py-2 rounded-md hover:bg-purple-600 transition" 
            type='submit'
          >
            Login
          </button>

          <p className='text-center text-gray-600 mt-4'>
            Don't have an account?{' '}
            <NavLink to='/signup' 
              className='text-lilac hover:text-purple-600 hover:underline'
            >
              Sign Up here
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  )
}
