// Импортируем константы
import {
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER,
  SET_CURRENT_USER,
  CLEAR_AUTH_ERROR,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING
} from '../Actions/ActionTypes';

// Начальное состояние для пользователя
const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

/**
 * Редюсер для управления состоянием аутентификации
 * @param {Object} state - Текущее состояние
 * @param {Object} action - Action объект
 * @returns {Object} Новое состояние
 */
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      // Устанавливаем пользователя после входа
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null
      };

    case LOGOUT_USER:
      // Очищаем данные пользователя после выхода
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };

    case REGISTER_USER:
      // Регистрация пользователя (в реальном приложении здесь была бы логика регистрации)
      return {
        ...state,
        loading: false,
        error: null
      };

    case SET_CURRENT_USER:
      // Устанавливаем текущего пользователя
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload,
        loading: false
      };

    case CLEAR_AUTH_ERROR:
      // Очищаем ошибки аутентификации
      return {
        ...state,
        error: null
      };

    case SET_AUTH_ERROR:
      // Устанавливаем сообщение об ошибке аутентификации
      return {
        ...state,
        error: action.payload,
        loading: false
      };

    case SET_AUTH_LOADING:
      // Управляем состоянием загрузки
      return {
        ...state,
        loading: action.payload
      };

    default:
      return state;
  }
};

export default userReducer;
