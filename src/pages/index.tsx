import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import SearchBar from '../components/searchbar/searchbar';
import BookList from '../components/booklist/booklist';
import Spinner from '../components/spinner/spinner';
import styles from '../styles/Home.module.css';

const Home = () => {
	const [books, setBooks] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const router = useRouter();

	useEffect(() => {
		const savedResults = sessionStorage.getItem('searchResults');
		const savedQuery = sessionStorage.getItem('searchQuery');

		if (savedResults) {
			setBooks(JSON.parse(savedResults));
		}
		if (savedQuery) {
			setSearchQuery(savedQuery);
		}
	}, []);

	const handleSearch = async (query: string) => {
		if (!query.trim()) return;

		setSearchQuery(query);
		setLoading(true);
		setError(null);

		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`,
			);
			const items = response.data.items || [];
			setBooks(items);
			sessionStorage.setItem('searchResults', JSON.stringify(items));
			sessionStorage.setItem('searchQuery', query);
		} catch (err) {
			setError('Ошибка при выполнении запроса');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>bookfinder by katana</h1>
			<SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
			{loading && <Spinner />}
			{error && <p className={styles.error}>{error}</p>}
			<BookList books={books} />
		</div>
	);
};

export default Home;
