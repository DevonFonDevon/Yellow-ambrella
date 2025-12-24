// Импорт необходимых модулей React для создания компонента
import React, { useState } from 'react';
// Импорт стилей для компонента страницы входа
import './LoginPage.css';

/**
 * Компонент страницы входа и регистрации
 * Предоставляет формы для аутентификации и регистрации пользователей
 * @returns {JSX.Element} Компонент страницы входа/регистрации
 */
function LoginPage() {
  // Состояние для хранения введенного логина
  const [username, setUsername] = useState('');
  // Состояние для хранения введенного пароля
  const [password, setPassword] = useState('');
  // Состояние для подтверждения пароля (только для регистрации)
  const [confirmPassword, setConfirmPassword] = useState('');
  // Состояние для переключения между формами
  const [isLoginMode, setIsLoginMode] = useState(true);

  /**
   * Обработчик события входа в систему
   * В текущей реализации просто выводит введенные данные в alert
   * В будущем может быть заменен на реальную логику аутентификации
   */
  const handleLogin = () => {
    // Пример: просто alert для демонстрации
    alert(`Вход: ${username}, Пароль: ${password}`);
  };

  /**
   * Обработчик события регистрации
   * В текущей реализации просто выводит введенные данные в alert
   * В будущем может быть заменен на реальную логику регистрации
   */
  const handleRegister = () => {
    // Пример: просто alert для демонстрации
    alert(`Регистрация: ${username}, Пароль: ${password}`);
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