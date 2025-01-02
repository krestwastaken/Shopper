import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Title() {
  return (
    <h1 className='font-bold text-3xl sm:text-2x1'>
        <NavLink to='/'>WeSell.</NavLink>
    </h1>
  )
}
