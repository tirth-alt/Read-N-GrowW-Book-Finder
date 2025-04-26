// import { useState } from 'react'
// import BookCard from '../components/BookCard'
// import { useFavorites } from '../context/FavoritesContext'
// import './Search.css'
// import React from 'react'

// const API_KEY = "AIzaSyDayBudKyjdGQGrccsIejPT0eUk_uRPedU";

// export default function Search() {
//   const [query, setQuery] = useState('')
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(false)
//   const { isFavorite } = useFavorites()

//   const searchBooks = async () => {
//     if (!query) return
//     setLoading(true)
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${API_KEY}`
//       )
//       const data = await response.json()
//       const booksWithFavorites = data.items?.map(book => ({
//         ...book,
//         isFavorite: isFavorite(book.id)
//       })) || []
//       setBooks(booksWithFavorites)
//     } catch (error) {
//       console.error('Error fetching books:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

  
// }

import { useState } from 'react';
import BookCard from '../components/BookCard';
import { useFavorites } from '../context/FavoritesContext';
import './Search.css';

export default function Search() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isFavorite } = useFavorites();

  const searchBooks = async () => {
    if (!query.trim()) return; // Check for empty query
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      alert('Failed to fetch books. Please try again.'); // User feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h1>Search Books</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for books..."
          onKeyDown={(e) => e.key === 'Enter' && searchBooks()} // Add Enter key support
        />
        <button onClick={searchBooks} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {loading && <p>Loading...</p>}
      
      <div className="books-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}