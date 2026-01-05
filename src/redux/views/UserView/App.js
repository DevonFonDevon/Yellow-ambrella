// Импортируем React и хуки Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Импортируем actions
import { addParticipant, updateParticipant, deleteParticipant } from '../../Actions/PostActions';
// Импортируем компоненты
import ParticipantCard from '../../../components/ParticipantCard';
import AddParticipantForm from '../../../components/AddParticipantForm';
import ParticipantTable from '../../../components/ParticipantTable';
// Импортируем стили
import './styles.scss';

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
    name: '',
    email: '',
    phone: ''
  });

  /**
   * Обработчик добавления участника
   */
  const handleAddParticipant = () => {
    if (!newParticipantData.name || !newParticipantData.email || !newParticipantData.phone) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Отправляем action в Redux
    dispatch(addParticipant(newParticipantData));
    
    // Очищаем форму
    setNewParticipantData({
      name: '',
      email: '',
      phone: ''
    });
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

  return (
    <div className="app">
      <h1>Участники фестиваля</h1>
      
      <AddParticipantForm 
        onAddParticipant={handleAddParticipant}
        onDataChange={handleFormChange}
        data={newParticipantData}
      />
      
      <div className="participants-list">
        {participants.map((participant) => (
          <ParticipantCard
            key={participant.id}
            participant={participant}
            onEdit={handleUpdateParticipant}
            onDelete={handleDeleteParticipant}
          />
        ))}
      </div>
      
      <ParticipantTable participants={participants} />
    </div>
  );
};

export default UserViewContainer;