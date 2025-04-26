import { Link } from 'react-router-dom'
import './Navbar.css' // Add this import
import React from 'react'

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">Read N GrowW</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/search" className="nav-link">Search</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
        <Link to="/about" className="nav-link">About</Link>
      </div>
    </nav>
  )
}