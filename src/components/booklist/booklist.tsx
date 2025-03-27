import React from 'react';
import BookCard from '../bookcard/bookcard';
import styles from './BookList.module.css';
import { useTheme } from '../../context/ThemeContext';
interface BookListProps {
  books: any[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
    const { isDark } = useTheme();
  
    return (
    <div className={styles.bookList}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;