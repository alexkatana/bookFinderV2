import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from './Spinner.module.css';

const Spinner: React.FC = () => {
  const { isDark } = useTheme();
  
  return (
    <div className={`${styles.spinner} ${isDark ? 'dark' : ''}`} />
  );
};

export default Spinner;