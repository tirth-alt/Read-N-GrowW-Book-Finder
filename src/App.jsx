import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Search from './pages/Search'
import Genre from './pages/Genre'

import Favorites from './pages/Favorites'
import About from './pages/About'
import { FavoritesProvider } from './context/FavoritesContext'
import './index.css'
import React from 'react'


export default function App() {
  return (
    <FavoritesProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  </FavoritesProvider>
  )
}

