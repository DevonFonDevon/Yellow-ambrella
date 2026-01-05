// Импортируем React и хуки Redux
import React from 'react';
import { useSelector } from 'react-redux';
// Импортируем React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Импортируем контейнеры
import { RegLogContainer } from './redux/views/Entrance/containers';
import UserViewContainer from './redux/views/UserView/App';
// Импортируем стили
import './App.css';

/**
 * Главный компонент приложения с Redux
 */
function App() {
  // Используем хук для получения состояния аутентификации из Redux
  const { isAuthenticated, loading } = useSelector(state => state.auth);

  // Пока идет загрузка, показываем загрузочный экран
  if (loading) {
    return (
      <div className="App">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Главная страница - если не авторизован, перенаправляем на login */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <UserViewContainer />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Страница входа */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated ? (
              <RegLogContainer />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
