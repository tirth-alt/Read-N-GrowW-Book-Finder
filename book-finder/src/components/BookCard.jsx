import React from 'react'
import { useFavorites } from '../context/FavoritesContext'
import './BookCard.css' 

export default function BookCard({ book }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(book.id)

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(book.id)
    } else {
      addFavorite(book)
    }
  }

  return (
    <div className="book-card">
      {book.volumeInfo.imageLinks?.thumbnail && (
        <img 
          src={book.volumeInfo.imageLinks.thumbnail} 
          alt={book.volumeInfo.title}
          className="book-cover"
        />
      )}
      <h3>{book.volumeInfo.title}</h3>
      <p>{book.volumeInfo.authors?.join(', ')}</p>
      <button 
        className={`favorite-btn ${favorite ? 'active' : ''}`}
        onClick={toggleFavorite}
      >
        {favorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  )
}