// Импорт необходимых модулей React
import React, { useState } from 'react';
// Импорт стилей приложения
import './App.css';
// Импорт компонентов для управления участниками
import ParticipantCard from './components/ParticipantCard';
import AddParticipantForm from './components/AddParticipantForm';
import ParticipantTable from './components/ParticipantTable';
// Импорт компонента страницы входа
import LoginPage from './components/LoginPage';
// Импорт хука аутентификации
import { useAuth } from './hooks/useAuth';

/**
 * Главный компонент приложения
 * Управляет аутентификацией и отображением основного интерфейса
 * @returns {JSX.Element} Главный компонент приложения
 */
function App() {
  // Используем хук аутентификации
  const { isAuthenticated, loading, logout } = useAuth();
  // список участников
  const [participants, setParticipants] = useState([]);
  // следующий ID для нового чувака
  const [nextId, setNextId] = useState(1);

  /**
   * Добавление нового участника
   * @param {Object} newParticipant - Данные нового участника
   */
  function addParticipant(newParticipant) {
    const participantWithId = { ...newParticipant, id: nextId };
    setParticipants([...participants, participantWithId]);
    setNextId(nextId + 1);
  }

  /**
   * Обновление данных участника
   * @param {number} id - ID участника
   * @param {Object} updatedData - Обновленные данные участника
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
   * @param {number} id - ID участника для удаления
   */
  function deleteParticipant(id) {
    setParticipants(participants.filter(function(p) {
      return p.id !== id;
    }));
  }

  /**
   * Обработчик успешного входа
   * Вызывается из компонента LoginPage при успешной аутентификации
   */
  function handleLogin() {
    // Можно добавить дополнительные действия при входе
    console.log('Пользователь успешно вошел в систему');
  }

  /**
   * Обработчик выхода из системы
   * Вызывает функцию logout из хука аутентификации
   */
  function handleLogout() {
    logout();
  }

  // Пока идет загрузка, показываем загрузочный экран
  if (loading) {
    return (
      <div className="App">
        <h1>Загрузка...</h1>
      </div>
    );
  }

  // Если пользователь не авторизован, показываем страницу входа
  if (!isAuthenticated()) {
    return (
      <div className="App">
        <LoginPage onLogin={handleLogin} />
      </div>
    );
  }

  // Если пользователь авторизован, показываем основное приложение
  return (
    <div className="App">
      {/* Заголовок приложения с кнопкой выхода */}
      <div className="app-header">
        <h1>Участники фестиваля</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Выйти
        </button>
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

// Экспорт компонента для использования в других модулях
export default App;
