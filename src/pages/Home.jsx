import { useFavorites } from '../context/FavoritesContext'
import BookCard from '../components/BookCard'
import './Home.css'

export default function Home() {
  const { favorites } = useFavorites()
  
  return (
    <div className="home-page">
      <h1>Welcome to Read N GrowW</h1>
      <h3>Your personal library</h3>
      <p>Maintain reading list | Discover new books | Save your favorites.. </p>
      <br />
      
      {favorites.length > 0 && (
        <div className="favorites-section">
          <h2>Your Favorite Books</h2>
          <div className="books-grid">
            {favorites.slice(0, 4).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  ) 
}