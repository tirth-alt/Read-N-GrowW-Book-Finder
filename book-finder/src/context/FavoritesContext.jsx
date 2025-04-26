import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('book-finder-favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('book-finder-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = (book) => {
    if (!favorites.some(fav => fav.id === book.id)) {
      setFavorites([...favorites, book])
    }
  }

  const removeFavorite = (bookId) => {
    setFavorites(favorites.filter(book => book.id !== bookId))
  }

  const isFavorite = (bookId) => {
    return favorites.some(book => book.id === bookId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  return useContext(FavoritesContext)
}