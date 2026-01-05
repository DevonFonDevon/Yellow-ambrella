// Импортируем необходимые модули
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers';

/**
 * Создаем store с помощью configureStore
 * @returns {Object} Redux store
 */
const store = configureStore({
  reducer: rootReducer,
  // В production режиме middleware по умолчанию включены
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорируем проверку serializable для localStorage
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export default store;