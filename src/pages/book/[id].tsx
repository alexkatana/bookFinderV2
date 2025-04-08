import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../../styles/BookDetail.module.css';

interface BookDetails {
	volumeInfo: {
		title: string;
		authors?: string[];
		publisher?: string;
		publishedDate?: string;
		description?: string;
		imageLinks?: {
			thumbnail?: string;
			large?: string;
		};
	};
}

const BookDetailPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [book, setBook] = useState<BookDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		if (!id) return;

		// проверка книги в избранном
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		setIsFavorite(favorites.includes(id));

		// загрузка данных о книге
		const fetchBookDetails = async () => {
			try {
				const response = await axios.get(
					`https://www.googleapis.com/books/v1/volumes/${id}`,
				);
				setBook(response.data);
			} catch (error) {
				console.error('Error fetching book details:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchBookDetails();
	}, [id]);

	const toggleFavorite = () => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		let updatedFavorites;

		if (isFavorite) {
			updatedFavorites = favorites.filter((favId: string) => favId !== id);
		} else {
			updatedFavorites = [...favorites, id];
		}

		localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
		setIsFavorite(!isFavorite);
	};

	if (loading) {
		return <div className={styles.loading}>Загрузка...</div>;
	}

	if (!book) {
		return <div className={styles.error}>Книга не найдена</div>;
	}

	const { title, authors, publisher, publishedDate, description, imageLinks } =
		book.volumeInfo;

	return (
		<div className={styles.container}>
			<Link href='/' className={styles.backLink}>
				← Назад к поиску
			</Link>

			<div className={styles.bookContainer}>
				<div className={styles.imageContainer}>
					<img
						src={
							imageLinks?.thumbnail?.replace('zoom=1', 'zoom=2') ||
							'/images/placeholder-large.png'
						}
						alt={`Обложка книги "${title}"`}
						className={styles.bookImage}
					/>
				</div>

				<div className={styles.detailsContainer}>
					<h1 className={styles.title}>{title}</h1>

					{authors && (
						<p className={styles.authors}>
							<span className={styles.label}>Авторы:</span> {authors.join(', ')}
						</p>
					)}

					{publisher && (
						<p className={styles.publisher}>
							<span className={styles.label}>Издательство:</span> {publisher}
						</p>
					)}

					{publishedDate && (
						<p className={styles.publishedDate}>
							<span className={styles.label}>Год издания:</span> {publishedDate}
						</p>
					)}

					{description && (
						<div className={styles.description}>
							<h2 className={styles.descriptionTitle}>Описание</h2>
							<p>{description}</p>
						</div>
					)}

					<button
						onClick={toggleFavorite}
						className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ''}`}
					>
						{isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookDetailPage;
