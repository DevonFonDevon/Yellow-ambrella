// Хук для управления аутентификацией пользователей
import { useState, useEffect } from 'react';

/**
 * Объект с данными об аккаунтах пользователей
 * Структура: массив объектов пользователей с уникальными ID
 */
const USER_DATA_STRUCTURE = {
  id: 'string',           // Уникальный идентификатор пользователя
  username: 'string',     // Имя пользователя (уникальное)
  password: 'string',     // Пароль (в реальном приложении должен быть захеширован)
  createdAt: 'string',    // Дата создания аккаунта в формате ISO
  lastLogin: 'string'     // Дата последнего входа (опционально)
};

/**
 * Хук для управления аутентификацией
 * Предоставляет функции для входа, регистрации и выхода из системы
 * @returns {Object} Объект с состоянием аутентификации и методами управления
 */
export const useAuth = () => {
  // Состояние текущего пользователя (хранится в state корневого компонента через хук)
  const [currentUser, setCurrentUser] = useState(null);
  // Состояние загрузки
  const [loading, setLoading] = useState(true);

  /**
   * Загрузка пользователя из localStorage при инициализации
   * Организует хранение информации об авторизованном пользователе в state
   */
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Получение всех пользователей из localStorage
   * @returns {Array} Массив пользователей
   */
  const getUsers = () => {
    return JSON.parse(localStorage.getItem('users') || '[]');
  };

  /**
   * Сохранение пользователей в localStorage
   * @param {Array} users - Массив пользователей
   */
  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  /**
   * Регистрация нового пользователя
   * @param {string} username - Имя пользователя
   * @param {string} password - Пароль
   * @returns {boolean} Успешность регистрации
   */
  const register = (username, password) => {
    // Получаем всех пользователей из localStorage
    const users = getUsers();
    
    // Проверяем, существует ли уже пользователь с таким именем
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      alert('Пользователь с таким именем уже существует');
      return false;
    }

    // Создаем нового пользователя с полной структурой данных
    const newUser = {
      id: Date.now().toString(),
      username: username,
      password: password, // В реальном приложении пароль должен быть захеширован
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    // Сохраняем пользователя в localStorage
    users.push(newUser);
    saveUsers(users);
    
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
    const users = getUsers();
    
    // Ищем пользователя с совпадающими учетными данными
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      // Обновляем время последнего входа
      user.lastLogin = new Date().toISOString();
      
      // Обновляем пользователя в localStorage
      const updatedUsers = users.map(u => u.id === user.id ? user : u);
      saveUsers(updatedUsers);
      
      // Сохраняем текущего пользователя в state корневого компонента
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
   * Очищает state корневого компонента и localStorage
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

  /**
   * Получение текущего пользователя
   * @returns {Object|null} Данные текущего пользователя или null
   */
  const getCurrentUser = () => {
    return currentUser;
  };

  return {
    currentUser,
    loading,
    register,
    login,
    logout,
    isAuthenticated,
    getCurrentUser
  };
};