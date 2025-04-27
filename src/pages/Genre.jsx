import { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import './Genre.css';

const GENRES = [
  { name: 'Fantasy', query: 'fantasy' },
  { name: 'Science Fiction', query: 'science fiction' },
  { name: 'Mystery', query: 'mystery' },
  { name: 'Romance', query: 'romance' },
  { name: 'Biography', query: 'biography' },
  { name: 'History', query: 'history' }
];

export default function Genre() {
  const [genreBooks, setGenreBooks] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreBooks = async () => {
      const booksByGenre = {};
      
      for (const genre of GENRES) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${genre.query}&orderBy=newest&maxResults=15`
          );
          const data = await response.json();
          booksByGenre[genre.name] = data.items || [];
        } catch (error) {
          console.error(`Error fetching ${genre.name} books:`, error);
          booksByGenre[genre.name] = [];
        }
      }
      
      setGenreBooks(booksByGenre);
      setLoading(false);
    };

    fetchGenreBooks();
  }, []);

  if (loading) {
    return <div className="loading">Loading recommendations...</div>;
  }

  return (
    <div className="genre-page">
      <h1>Genre Recommendations</h1>
      <p>Discover top books in each genre</p>
      
      {GENRES.map((genre) => (
        <section key={genre.name} className="genre-section">
          <h2>{genre.name}</h2>
          <div className="books-grid">
            {genreBooks[genre.name]?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}