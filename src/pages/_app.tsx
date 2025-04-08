import { ThemeProvider } from '../context/ThemeContext';
import '../styles/globals.css';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<ThemeProvider>{mounted && <Component {...pageProps} />}</ThemeProvider>
	);
}

export default MyApp;
