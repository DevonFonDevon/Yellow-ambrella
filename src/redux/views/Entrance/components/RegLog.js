// Импортируем React
import React from 'react';
// Импортируем стили
import './styles.scss';

/**
 * Компонент представления для входа/регистрации
 * Получает все данные и функции через props от контейнера
 */
const RegLog = ({
  username,
  password,
  confirmPassword,
  isLoginMode,
  loading,
  error,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onLogin,
  onRegister,
  onToggleMode
}) => {
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

      {/* Отображаем ошибку, если есть */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {/* Форма входа/регистрации */}
      <div className="login-form">
        {/* Поле ввода логина */}
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={onUsernameChange}
          disabled={loading}
        />
        
        {/* Поле ввода пароля */}
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={onPasswordChange}
          disabled={loading}
        />
        
        {/* Поле подтверждения пароля (только для регистрации) */}
        {!isLoginMode && (
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            disabled={loading}
          />
        )}
        
        {/* Кнопка действия */}
        <button 
          onClick={isLoginMode ? onLogin : onRegister}
          disabled={loading}
        >
          {loading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
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
          onClick={onToggleMode}
          disabled={loading}
        >
          {isLoginMode ? 'Создать аккаунт' : 'Войти'}
        </button>
      </p>
    </div>
  );
};

export default RegLog;