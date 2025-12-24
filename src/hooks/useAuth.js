// Хук для управления аутентификацией пользователей
import { useState, useEffect } from 'react';

/**
 * Хук для управления аутентификацией
 * Предоставляет функции для входа, регистрации и выхода из системы
 * @returns {Object} Объект с состоянием аутентификации и методами управления
 */
export const useAuth = () => {
  // Состояние текущего пользователя
  const [currentUser, setCurrentUser] = useState(null);
  // Состояние загрузки
  const [loading, setLoading] = useState(true);

  /**
   * Загрузка пользователя из localStorage при инициализации
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Регистрация нового пользователя
   * @param {string} username - Имя пользователя
   * @param {string} password - Пароль
   * @returns {boolean} Успешность регистрации
   */
  const register = (username, password) => {
    // Получаем всех пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Проверяем, существует ли уже пользователь с таким именем
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('Пользователь с таким именем уже существует');
      return false;
    }

    // Создаем нового пользователя
    const newUser = {
      id: Date.now().toString(),
      username: username,
      password: password, // В реальном приложении пароль должен быть захеширован
      createdAt: new Date().toISOString()
    };

    // Сохраняем пользователя в localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Автоматически входим в систему
    login(username, password);
    return true;
  };

  /**
   * Вход в систему
   * @param {string} username - Имя пользователя
   * @param {string} password - Пароль
   * @returns {boolean} Успешность входа
   */
  const login = (username, password) => {
    // Получаем всех пользователей из localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Ищем пользователя с совпадающими учетными данными
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Сохраняем текущего пользователя
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      alert('Неверный логин или пароль');
      return false;
    }
  };

  /**
   * Выход из системы
   */
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  /**
   * Проверка, авторизован ли пользователь
   * @returns {boolean} Статус аутентификации
   */
  const isAuthenticated = () => {
    return currentUser !== null;
  };

  return {
    currentUser,
    loading,
    register,
    login,
    logout,
    isAuthenticated
  };
};