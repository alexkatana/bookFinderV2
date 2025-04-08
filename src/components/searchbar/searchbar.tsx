import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useRouter } from 'next/router';
import styles from './SearchBar.module.css';

interface SearchBarProps {
	onSearch: (query: string) => void;
	initialQuery?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
	onSearch,
	initialQuery = '',
}) => {
	const [query, setQuery] = useState(initialQuery);
	const { isDark, toggleTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleSearch = () => {
		if (query.trim()) {
			onSearch(query);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleThemeToggle = () => {
		if (isMounted) {
			toggleTheme();
		}
	};

	const navigateToFavorites = () => {
		router.push('/favorites');
	};

	return (
		<div className={styles.searchContainer}>
			<div className={styles.searchWrapper}>
				<input
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder='Введите название книги...'
					className={styles.input}
				/>

				<button onClick={handleSearch} className={styles.searchButton}>
					Найти
				</button>

				<button
					onClick={navigateToFavorites}
					className={styles.favoritesButton}
				>
					Избранное
				</button>

				{isMounted && (
					<button
						onClick={handleThemeToggle}
						className={styles.themeButton}
						aria-label={
							isDark
								? 'Переключить на светлую тему'
								: 'Переключить на темную тему'
						}
					>
						{isDark ? '☀️' : '🌙'}
					</button>
				)}
			</div>
		</div>
	);
};

export default SearchBar;
