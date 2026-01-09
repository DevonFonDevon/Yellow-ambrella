// Импортируем редюсеры
import { combineReducers } from 'redux';
import postsReducer from './PostsReducer';
import userReducer from './userReducer';

/**
 * Root reducer - объединяет все редюсеры в один
 * @returns {Object} Объединенный reducer
 */
const rootReducer = combineReducers({
  posts: postsReducer,  // Состояние для участников
  auth: userReducer     // Состояние для аутентификации
});

export default rootReducer;