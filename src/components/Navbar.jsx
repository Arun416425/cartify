import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);
  return (
    <nav>
        <h1>Cartify</h1>
        <div>
            <Link to={'/'}>Home</Link>
            <Link to={'/cart'}>Cart 🛒({cartItems.length})</Link>
        </div>
    </nav>
  )
}

export default Navbar;