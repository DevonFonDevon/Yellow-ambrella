// Импорт необходимых модулей React для создания компонента
import React, { useState } from 'react';
// Импорт стилей для компонента страницы входа
import './LoginPage.css';
// Импорт хука аутентификации
import { useAuth } from '../hooks/useAuth';
// Импорт React Router для перехода между страницами
import { useNavigate } from 'react-router-dom';

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
  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({});
  
  // Используем хук аутентификации
  const { register, login } = useAuth();
  // Используем хук навигации для перехода между страницами
  const navigate = useNavigate();

  /**
   * Валидация формы
   */
  const validateForm = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = 'Имя пользователя обязательно';
    if (!password.trim()) newErrors.password = 'Пароль обязателен';
    if (!isLoginMode) {
      if (!confirmPassword.trim()) newErrors.confirmPassword = 'Подтверждение пароля обязательно';
      else if (password !== confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
      if (password.length < 6) newErrors.password = 'Пароль должен быть не менее 6 символов';
    }
    return newErrors;
  };

  /**
   * Обработчик события входа в систему
   * Вызывает функцию login из хука аутентификации
   */
  const handleLogin = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Вызываем функцию входа из хука аутентификации
    const success = login(username, password);
    if (success) {
      // Используем React Router для перехода на главную страницу
      navigate('/');
    }
  };

  /**
   * Обработчик события регистрации
   * Проверяет валидность данных и вызывает функцию регистрации из хука
   */
  const handleRegister = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
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
      setErrors({});
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
    setErrors({});
  };

  return (
    <div className="login-page">
      {/* Форма входа/регистрации */}
      <form onSubmit={(e) => { e.preventDefault(); isLoginMode ? handleLogin() : handleRegister(); }} className="login-form">
        <h2>{isLoginMode ? 'Добро пожаловать' : 'Создание аккаунта'}</h2>
        
        <div className="form-row">
          <div className="form-group">
            <label>Имя пользователя:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={errors.username ? 'error' : ''}
              placeholder="Введите имя пользователя"
            />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? 'error' : ''}
              placeholder="Введите пароль"
            />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
        </div>
        
        {!isLoginMode && (
          <div className="form-row">
            <div className="form-group">
              <label>Подтвердите пароль:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'error' : ''}
                placeholder="Подтвердите пароль"
              />
              {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
            </div>
          </div>
        )}
        
        <button type="submit">
          {isLoginMode ? 'Войти' : 'Зарегистрироваться'}
        </button>
      </form>
      
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