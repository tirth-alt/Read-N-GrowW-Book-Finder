import { useFavorites } from '../context/FavoritesContext'
import BookCard from '../components/BookCard'
import './Favorites.css' // Add this import
import React from 'react'

export default function Favorites() {
  const { favorites } = useFavorites()
  
  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="no-favorites">No favorites yet. Search for books to add some!</p>
      ) : (
        <div className="books-grid">
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}