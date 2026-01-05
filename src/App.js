// Импортируем React и хуки
import React, { useState } from 'react';
// Импортируем стили
import './App.css';
// Импортируем компоненты для управления участниками
import ParticipantCard from './components/ParticipantCard';
import AddParticipantForm from './components/AddParticipantForm';
import ParticipantTable from './components/ParticipantTable';
// Импортируем компонент страницы входа
import LoginPage from './components/LoginPage';
// Импортируем хук аутентификации
import { useAuth } from './hooks/useAuth';
// Импортируем React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

/**
 * Компонент основного приложения
 * Содержит список участников и форму добавления
 */
function MainApp() {
  // Список участников
  const [participants, setParticipants] = useState([]);
  // Следующий ID для нового участника
  const [nextId, setNextId] = useState(1);

  /**
   * Добавление нового участника
   */
  function addParticipant(newParticipant) {
    const participantWithId = { ...newParticipant, id: nextId };
    setParticipants([...participants, participantWithId]);
    setNextId(nextId + 1);
  }

  /**
   * Обновление данных участника
   */
  function updateParticipant(id, updatedData) {
    setParticipants(participants.map(function(p) {
      if (p.id === id) {
        return { ...p, ...updatedData };
      }
      return p;
    }));
  }

  /**
   * Удаление участника
   */
  function deleteParticipant(id) {
    setParticipants(participants.filter(function(p) {
      return p.id !== id;
    }));
  }

  return (
    <div className="App">
      {/* Заголовок приложения с кнопкой выхода */}
      <div className="app-header">
        <h1>Участники фестиваля</h1>
        <LogoutButton />
      </div>
      
      <AddParticipantForm onAddParticipant={addParticipant} />
      <div className="participants-list">
        {participants.map(function(participant) {
          return (
            <ParticipantCard
              key={participant.id}
              participant={participant}
              onEdit={updateParticipant}
              onDelete={deleteParticipant}
            />
          );
        })}
      </div>
      <ParticipantTable participants={participants} />
    </div>
  );
}

/**
 * Компонент кнопки выхода
 */
function LogoutButton() {
  const { logout } = useAuth();

  function handleLogout() {
    logout();
  }

  return (
    <button className="logout-btn" onClick={handleLogout}>
      Выйти
    </button>
  );
}

/**
 * Главный компонент приложения с роутингом
 */
function App() {
  // Используем хук аутентификации
  const { isAuthenticated, loading } = useAuth();

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
            isAuthenticated() ? (
              <MainApp />
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Страница входа */}
        <Route 
          path="/login" 
          element={
            !isAuthenticated() ? (
              <LoginPage />
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
