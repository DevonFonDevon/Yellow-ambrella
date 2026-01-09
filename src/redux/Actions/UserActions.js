// Импортируем константы
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SET_CURRENT_USER,
  CLEAR_AUTH_ERROR,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING
} from './ActionTypes';

const USERS_STORAGE_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

const getUsers = () => JSON.parse(localStorage.getItem(USERS_STORAGE_KEY) || '[]');
const saveUsers = (users) => localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

const getCurrentUserFromStorage = () => {
  const savedUser = localStorage.getItem(CURRENT_USER_KEY);
  return savedUser ? JSON.parse(savedUser) : null;
};

const setCurrentUserToStorage = (user) => {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};

/**
 * Action creator для входа пользователя
 * @param {Object} userData - Данные пользователя
 * @returns {Object} Action объект
 */
export const loginUser = (userData) => (dispatch) => {
  dispatch(setAuthLoading(true));
  const users = getUsers();
  const user = users.find((entry) => (
    entry.username === userData.username && entry.password === userData.password
  ));

  if (!user) {
    dispatch(setAuthError('Неверный логин или пароль'));
    dispatch(setAuthLoading(false));
    return;
  }

  const updatedUser = { ...user, lastLogin: new Date().toISOString() };
  const updatedUsers = users.map((entry) => entry.id === user.id ? updatedUser : entry);
  saveUsers(updatedUsers);
  setCurrentUserToStorage(updatedUser);
  dispatch(clearAuthError());
  dispatch({
    type: LOGIN_USER,
    payload: updatedUser
  });
  dispatch(setAuthLoading(false));
};

/**
 * Action creator для выхода пользователя
 * @returns {Object} Action объект
 */
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(setAuthLoading(true));
    setCurrentUserToStorage(null);
    dispatch({
      type: LOGOUT_USER
    });
    dispatch(setAuthLoading(false));
  };
};

/**
 * Action creator для регистрации пользователя
 * @param {Object} userData - Данные нового пользователя
 * @returns {Object} Action объект
 */
export const registerUser = (userData) => {
  return (dispatch) => {
    dispatch(setAuthLoading(true));
    const users = getUsers();
    const existingUser = users.find((user) => user.username === userData.username);

    if (existingUser) {
      dispatch(setAuthError('Пользователь с таким именем уже существует'));
      dispatch(setAuthLoading(false));
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username: userData.username,
      password: userData.password,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    users.push(newUser);
    saveUsers(users);
    dispatch(clearAuthError());
    dispatch({
      type: REGISTER_USER,
      payload: newUser
    });
    dispatch(setAuthLoading(false));
  };
};

/**
 * Action creator для установки текущего пользователя
 * @param {Object} user - Данные пользователя
 * @returns {Object} Action объект
 */
export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};

/**
 * Action creator для очистки ошибок аутентификации
 * @returns {Object} Action объект
 */
export const clearAuthError = () => {
  return {
    type: CLEAR_AUTH_ERROR
  };
};

export const setAuthError = (message) => {
  return {
    type: SET_AUTH_ERROR,
    payload: message
  };
};

export const setAuthLoading = (isLoading) => {
  return {
    type: SET_AUTH_LOADING,
    payload: isLoading
  };
};

export const initializeAuth = () => (dispatch) => {
  dispatch(setAuthLoading(true));
  const storedUser = getCurrentUserFromStorage();
  dispatch(setCurrentUser(storedUser));
  dispatch(setAuthLoading(false));
};
