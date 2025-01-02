import React, { useState, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import './Navbar.css'

import Footer from '../Footer/Footer'
import Title from '../company-name/Title'

// Icons
import { IoIosSearch } from 'react-icons/io';
import { IoIosContact } from 'react-icons/io';
import { CiHeart } from 'react-icons/ci';
import { RiShoppingBag2Line } from 'react-icons/ri';

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };
    window.addEventListener('storage', updateCartCount);

    //Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserRole(user.role);
      setIsLoggedIn(true);
    }

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUserRole(null);
    setShowDropdown(false);
    navigate('/login');
  }

  return(
    <div className='flex flex-col min-h-screen'>

      {/* Header: Centralized */}
      <header className='bg-white shadow-md sticky top-0 z-50'>
        <nav className='flex justify-between items-center px-6 py-8 '>
          <Title/>
          <div className='flex-grow flex justify-center space-x-8'>
            <NavLink to='/' className={({ isActive }) =>
              `hover:text-lilac ${isActive ? 'text-lilac font-semibold' : 'text-gray-800'}`
            }>
              Home
            </NavLink>

            {userRole === 'buyer' && (
              <>
                <NavLink to='/men' className={({ isActive }) =>
                  `hover:text-lilac ${isActive ? 'text-lilac font-semibold' : 'text-gray-800'}`
                }>
                  Men
                </NavLink>
                <NavLink to='/women' className={({ isActive }) => 
                  `hover:text-lilac ${isActive ? 'text-lilac font-semibold' : 'text-gray-800'}`
                }>
                  Women
                </NavLink>
              </>
            )}
           
            
            {userRole === 'seller' && (
              <>
                <NavLink to='/addProduct' className={({ isActive }) => 
                  `hover:text-lilac ${isActive ? 'text-lilac font-semibold' : 'text-gray-800'}`
                }>
                  Add Products
                </NavLink>
                <NavLink to='/my-products' className={({ isActive }) => 
                  `hover:text-lilac ${isActive ? 'text-lilac font-semibold' : 'text-gray-800'}`
                }>
                  My Products
                </NavLink>
              </>
            )}
          </div>

          {/* Right-Aligned Icons */}
          <div className='flex items-center space-x-6'>  
            {userRole === 'buyer' && (
              <>
                <NavLink to='/wishList'
                  className={({ isActive }) => 
                    isActive ? 'text-lilac' : 'text-gray-800'
                  }
                >
                  <CiHeart size={21} className='hover:text-lilac transition'/>
                </NavLink>
                
                <NavLink to='/cart'
                  className={({ isActive }) => 
                    isActive ? 'text-lilac' : 'text-gray-800'
                  }
                >
                  <div className='relative inline-block'>
                    <RiShoppingBag2Line size={20} className='hover:text-lilac transition'/>
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-lilac w-5 h-5 rounded-full text-white text-sm flex justify-center items-center" >
                        {cartCount}
                      </span>
                    )}
                  </div>              
                </NavLink>
              </>
            )}

            <div className='relative'>
              <IoIosContact 
                size={20}
                className='cursor-pointer hover:text-lilac transition'
                onClick={() => setShowDropdown((prev) => !prev)}
              />
              {showDropdown && (
                <div className='absolute right-0 mt-2 w-40 bg-white border rounded shadow-md'>
                  {isLoggedIn ? (
                    <button 
                      className='block w-full text-left px-4 py-2 hover:bg-gray-200'
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink
                      to='/login'
                      className='block w-full text-left px-4 py-2 hover:bg-gray-200'
                      onClick={()=> setShowDropdown(false)}
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              )}
            </div>            
          </div>
        </nav>
      </header>
     
      <main className='flex-grow p-4'>
        <Outlet/>
      </main>

      <Footer/>
    </div>
  )
}
