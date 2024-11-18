import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
// import styles from '../Style/LoginSignup'

export default function LoginSignup() {
  const [formData, setFormData] = useState ({
    email: '',
    password: '',
  })
  const [errorMsg, setErrorMsg] = useState(null);

  function handleChange(e){
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/login', formData);

      if (response.status === 200) {
        console.log('Login successful:', response.data);
        alert('Login successful!');

        localStorage.setItem('authToken', response.data.token);
      }
    }catch (error){
      const errorMessage = error.response?.data?.message || 'An error occured, try again.'
      setErrorMsg(errorMessage);
      console.error('Login failed:', errorMessage);
    }
  } 

  return (
    <div className="add-product-form">
      <div className="loginsingup-container">
        <h1> Login </h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input type="email" placeholder='E-mail Address'
              name='email' onChange={handleChange}
              value={formData.email}
            />
            <input type="password" placeholder='Password' 
              name='password' onChange={handleChange}
              value={formData.password}
            />
          </div>
          <button className="product-button" type='submit'>Login</button>
          <p className='loginsignup-login'>Don't have an account?
            <NavLink to='/signup'>Sign Up here</NavLink>
          </p>
        </form>
      </div>
    </div>
  )
}
