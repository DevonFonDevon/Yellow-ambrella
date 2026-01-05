// Импортируем константы
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SET_CURRENT_USER,
  CLEAR_AUTH_ERROR
} from './ActionTypes';

/**
 * Action creator для входа пользователя
 * @param {Object} userData - Данные пользователя
 * @returns {Object} Action объект
 */
export const loginUser = (userData) => {
  return {
    type: LOGIN_USER,
    payload: userData
  };
};

/**
 * Action creator для выхода пользователя
 * @returns {Object} Action объект
 */
export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

/**
 * Action creator для регистрации пользователя
 * @param {Object} userData - Данные нового пользователя
 * @returns {Object} Action объект
 */
export const registerUser = (userData) => {
  return {
    type: REGISTER_USER,
    payload: userData
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