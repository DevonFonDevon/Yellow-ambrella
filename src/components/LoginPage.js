// Импорт необходимых модулей React для создания компонента
import React, { useState } from 'react';
// Импорт стилей для компонента страницы входа
import './LoginPage.css';
// Импорт хука аутентификации
import { useAuth } from '../hooks/useAuth';

/**
 * Компонент страницы входа и регистрации
 * Предоставляет формы для аутентификации и регистрации пользователей
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onLogin - Функция для обработки успешного входа
 * @returns {JSX.Element} Компонент страницы входа/регистрации
 */
function LoginPage({ onLogin }) {
  // Состояние для хранения введенного логина
  const [username, setUsername] = useState('');
  // Состояние для хранения введенного пароля
  const [password, setPassword] = useState('');
  // Состояние для подтверждения пароля (только для регистрации)
  const [confirmPassword, setConfirmPassword] = useState('');
  // Состояние для переключения между формами
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // Используем хук аутентификации
  const { register, login } = useAuth();

  /**
   * Обработчик события входа в систему
   * Вызывает функцию login из хука аутентификации
   */
  const handleLogin = () => {
    if (!username || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    // Вызываем функцию входа из хука аутентификации
    const success = login(username, password);
    if (success && onLogin) {
      onLogin();
      // Принудительно обновляем страницу для отображения основного интерфейса
      window.location.reload();
    }
  };

  /**
   * Обработчик события регистрации
   * Проверяет валидность данных и вызывает функцию регистрации из хука
   */
  const handleRegister = () => {
    if (!username || !password || !confirmPassword) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    if (password.length < 6) {
      alert('Пароль должен быть не менее 6 символов');
      return;
    }
    
    // Вызываем функцию регистрации из хука аутентификации
    const success = register(username, password);
    if (success) {
      // После успешной регистрации переключаемся на форму входа
      setIsLoginMode(true);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
    }
  };

  /**
   * Переключение между режимами входа и регистрации
   */
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    // Очищаем поля при переключении
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="login-page">
      {/* Заголовок страницы */}
      <h1>{isLoginMode ? 'Добро пожаловать' : 'Создание аккаунта'}</h1>
      
      {/* Подзаголовок с инструкцией */}
      <p>
        {isLoginMode
          ? 'Введите логин и пароль, чтобы начать'
          : 'Заполните форму для создания нового аккаунта'
        }
      </p>
      
      {/* Форма входа/регистрации */}
      <div className="login-form">
        {/* Поле ввода логина */}
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        
        {/* Поле ввода пароля */}
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Поле подтверждения пароля (только для регистрации) */}
        {!isLoginMode && (
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        
        {/* Кнопка действия */}
        <button onClick={isLoginMode ? handleLogin : handleRegister}>
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </div>
      
      {/* Ссылка для переключения между формами */}
      <p className="signup-link">
        {isLoginMode
          ? 'Нет аккаунта? '
          : 'Уже есть аккаунт? '
        }
        <button
          className="toggle-mode-btn"
          onClick={toggleMode}
        >
          {isLoginMode ? 'Создать аккаунт' : 'Войти'}
        </button>
      </p>
    </div>
  );
}

// Экспорт компонента для использования в других модулях
export default LoginPage;