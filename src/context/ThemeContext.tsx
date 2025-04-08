import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
	isDark: false,
	toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// проверка только на клиенте
		if (typeof window !== 'undefined') {
			const savedTheme = localStorage.getItem('theme');
			const prefersDark = window.matchMedia(
				'(prefers-color-scheme: dark)',
			).matches;
			setIsDark(savedTheme ? savedTheme === 'dark' : prefersDark);
		}
	}, []);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const root = document.documentElement;
			if (isDark) {
				root.classList.add('dark');
				root.classList.remove('light');
				localStorage.setItem('theme', 'dark');
			} else {
				root.classList.add('light');
				root.classList.remove('dark');
				localStorage.setItem('theme', 'light');
			}
		}
	}, [isDark]);

	const toggleTheme = () => {
		setIsDark((prev) => !prev);
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
