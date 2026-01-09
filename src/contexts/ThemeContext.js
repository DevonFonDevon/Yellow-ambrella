// Импортируем React
import React, { createContext, useContext, useState, useEffect } from 'react';

// Создаем контекст темы
const ThemeContext = createContext();

// Провайдер темы
export const ThemeProvider = ({ children }) => {
  // Состояние темы: 'light' или 'dark'
  const [theme, setTheme] = useState(() => {
    // Получаем сохраненную тему из localStorage или по умолчанию 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Функция переключения темы
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Сохраняем тему в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('theme', theme);
    // Применяем класс к body для глобальной темы
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Хук для использования темы
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;