// Импортируем React и хуки Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Импортируем actions
import { addParticipant, updateParticipant, deleteParticipant } from '../../Actions/PostActions';
import { logoutUser } from '../../Actions/UserActions';
// Импортируем компоненты
import AddParticipantForm from './AddParticipantForm';
import ParticipantGrid from './ParticipantGrid';
// Импортируем стили
import './styles.scss';
import './form-styles.scss';

/**
 * Контейнер для основного приложения с участниками
 * Подключает компонент к Redux store
 */
const UserViewContainer = () => {
  // Используем хук для получения состояния из Redux
  const dispatch = useDispatch();
  const { participants } = useSelector(state => state.posts);

  // Локальное состояние для формы добавления
  const [newParticipantData, setNewParticipantData] = useState({
    firstName: '',
    creativeNumber: '',
    phone: '',
    performanceOrder: '',
    directorNotes: ''
  });

  // Состояние для показа формы
  const [showForm, setShowForm] = useState(false);

  /**
   * Обработчик добавления участника
   */
  const handleAddParticipant = () => {
    // Валидация происходит в компоненте формы
    // Если форма валидна, данные уже в newParticipantData
    if (newParticipantData.firstName && newParticipantData.creativeNumber && newParticipantData.phone) {
      // Отправляем action в Redux
      dispatch(addParticipant(newParticipantData));
      
      // Очищаем форму только после успешного добавления
      setNewParticipantData({
        firstName: '',
        creativeNumber: '',
        phone: '',
        performanceOrder: '',
        directorNotes: ''
      });
    }
  };

  /**
   * Обработчик изменения данных участника
   */
  const handleUpdateParticipant = (id, updatedData) => {
    dispatch(updateParticipant(id, updatedData));
  };

  /**
   * Обработчик удаления участника
   */
  const handleDeleteParticipant = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого участника?')) {
      dispatch(deleteParticipant(id));
    }
  };

  /**
   * Обработчик изменения данных формы
   */
  const handleFormChange = (field, value) => {
    setNewParticipantData({
      ...newParticipantData,
      [field]: value
    });
  };

  /**
   * Обработчик выхода
   */
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Участники фестиваля</h1>
        <div className="header-actions">
          <button onClick={() => setShowForm(!showForm)} className="add-participant-btn">
            {showForm ? 'Скрыть форму' : 'Добавить участника'}
          </button>
          <button onClick={handleLogout} className="logout-btn">Выход</button>
        </div>
      </div>

      {showForm && (
        <AddParticipantForm
          onAddParticipant={handleAddParticipant}
          onDataChange={handleFormChange}
          data={newParticipantData}
        />
      )}

      <ParticipantGrid
        participants={participants}
        onEdit={handleUpdateParticipant}
        onDelete={handleDeleteParticipant}
      />

    </div>
  );
};

export default UserViewContainer;