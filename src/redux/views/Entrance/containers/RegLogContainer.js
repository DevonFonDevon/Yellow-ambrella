// Импортируем React и хуки Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Импортируем actions
import { loginUser, registerUser } from '../../../Actions/UserActions';
// Импортируем компонент представления
import RegLog from '../components/RegLog';

/**
 * Контейнер для компонента входа/регистрации
 * Подключает компонент к Redux store
 */
const RegLogContainer = () => {
  // Используем хук для получения состояния из Redux
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(state => state.auth);

  // Локальное состояние для формы
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);

  /**
   * Обработчик входа
   */
  const handleLogin = () => {
    if (!username || !password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Отправляем action в Redux
    dispatch(loginUser({ username, password }));
  };

  /**
   * Обработчик регистрации
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

    // Отправляем action в Redux
    dispatch(registerUser({ username, password }));
    // После регистрации переключаемся на форму входа
    setIsLoginMode(true);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  /**
   * Переключение между режимами
   */
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <RegLog
      username={username}
      password={password}
      confirmPassword={confirmPassword}
      isLoginMode={isLoginMode}
      loading={loading}
      error={error}
      onUsernameChange={(e) => setUsername(e.target.value)}
      onPasswordChange={(e) => setPassword(e.target.value)}
      onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
      onLogin={handleLogin}
      onRegister={handleRegister}
      onToggleMode={toggleMode}
    />
  );
};

export default RegLogContainer;