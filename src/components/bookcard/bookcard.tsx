import Link from 'next/link';
import styles from './BookCard.module.css';

interface BookCardProps {
  book: {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publishedDate?: string;
      description?: string;
      imageLinks?: {
        thumbnail?: string;
      };
    };
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { title, authors, publishedDate, description, imageLinks } = book.volumeInfo;
  const imageUrl = imageLinks?.thumbnail || '../../../public/images/template_01';

  return (
    <Link href={`/book/${book.id}`} passHref legacyBehavior>
      <div className={styles.bookCard}>
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            alt={`Обложка книги "${title}"`}
            className={styles.image}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '../../../public/images/template_01';
            }}
          />
        </div>
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          {authors && <p className={styles.authors}>{authors.join(', ')}</p>}
          {publishedDate && <p className={styles.publishedDate}>{publishedDate}</p>}
          {description && (
            <p className={styles.description}>
              {description.length > 100 ? `${description.slice(0, 100)}...` : description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default BookCard;