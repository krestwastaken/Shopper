import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'


export default function Navbar() {
  const[menu, setMenu] = useState('shop')
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };
    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);


  return(
    <div className='root-layout'>
      <header>
        <nav>
          <h1>SHOPPER</h1>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/men'>Men</NavLink>
          <NavLink to='/women'>Women</NavLink>
          <NavLink to='/addProduct'>Add Products</NavLink>
          {/* <NavLink to='/electronics'>Electronics</NavLink> */}
        </nav>
      </header>
      <div className="nav-login-cart">
        {/* <Link to='/login'><button>Login</button></Link> */}
        <NavLink to='/cart'><img src={cart_icon} alt=''/></NavLink>
        <div className="nav-cart-count">{cartCount}</div>
      </div>
      <main>
        <Outlet/>
      </main>
    </div>
  )

  // return (
  //   <div className='navbar'>
  //       <div className='nav-logo'>
  //           <img src={logo} alt='Shopping bags'/>
  //           <p>SHOPPER</p>
  //       </div>
  //       <ul className="nav-menu">
  //           <li onClick={()=>{setMenu('shop')}}><Link style={{textDecoration: 'none'}} to='/'>Shop</Link>{menu ==='shop' ? <hr/> :<></>}</li>
  //           <li onClick={()=>{setMenu('men')}}><Link style={{textDecoration: 'none'}} to='/men'>Men</Link>{menu ==='men' ? <hr/> :<></>}</li>
  //           <li onClick={()=>{setMenu('women')}}><Link style={{textDecoration: 'none'}} to='/women'>Women</Link>{menu ==='women' ? <hr/> :<></>}</li>
  //           <li onClick={()=>{setMenu('addProduct')}}><Link style={{textDecoration: 'none'}} to='/addProduct'>Add Product</Link>{menu === 'addProduct' ? <hr/> : <></>}</li>
  //           <li onClick={()=>{setMenu('electronics')}}><Link style={{textDecoration: 'none'}} to='/electronics'>Electronics</Link>{menu ==='electronics' ? <hr/> :<></>}</li>
  //           <hr/>
  //       </ul>
  //       <div className="nav-login-cart">
  //         <Link to='/login'><button>Login</button></Link>
  //         <Link to='/cart'><img src={cart_icon} alt=''/></Link>
  //         <div className="nav-cart-count">{cartCount}</div>
  //       </div>
  //   </div>
  // )
}
