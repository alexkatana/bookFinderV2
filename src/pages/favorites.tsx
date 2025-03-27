import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useTheme } from './../context/ThemeContext';
import Spinner from '../components/spinner/spinner';
import styles from '../styles/Favorites.module.css';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
}

const FavoritesPage = () => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      const books: Book[] = [];

      for (const id of favorites) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/books/v1/volumes/${id}`
          );
          books.push(response.data);
        } catch (error) {
          console.error(`Error fetching book ${id}:`, error);
        }
      }

      setFavoriteBooks(books);
      setLoading(false);
    };

    fetchFavorites();
  }, []);

  const removeFromFavorites = (id: string) => {
    const updatedFavorites = favoriteBooks.filter((book) => book.id !== id);
    localStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites.map((book) => book.id))
    );
    setFavoriteBooks(updatedFavorites);
  };

  if (loading) {
    return (
      <div className={`${styles.loadingContainer} ${isDark ? styles.dark : ''}`}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={`${styles.topContainer} ${isDark ? styles.dark : ''}`}>
      <div className={styles.headerContent}>
        <Link href="/" className={styles.backLink}>
          ← Назад к поиску
        </Link>
        <h1 className={styles.title}>Избранные книги</h1>
      </div>

      <div className={styles.mainContent}>
        {favoriteBooks.length === 0 ? (
          <p className={styles.empty}>Список избранного пуст</p>
        ) : (
          <div className={styles.booksGrid}>
            {favoriteBooks.map((book) => (
              <div key={book.id} className={`${styles.bookCard} ${isDark ? styles.darkCard : ''}`}>
                <div className={styles.bookImageContainer}>
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail ||
                      '/placeholder-book.png'
                    }
                    className={styles.bookImage}
                    alt={`Обложка книги "${book.volumeInfo.title}"`}
                  />
                </div>
                
                <div className={styles.bookContent}>
                  <h3 className={styles.bookTitle}>{book.volumeInfo.title}</h3>
                  
                  {book.volumeInfo.authors && (
                    <p className={styles.bookAuthors}>
                      {book.volumeInfo.authors.join(', ')}
                    </p>
                  )}
                  
                  {book.volumeInfo.publishedDate && (
                    <p className={styles.bookPublishedDate}>
                      {book.volumeInfo.publishedDate}
                    </p>
                  )}
                  
                  <button
                    onClick={() => removeFromFavorites(book.id)}
                    className={styles.removeButton}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;