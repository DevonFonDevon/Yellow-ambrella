// Импортируем React
import React, { useState } from 'react';
// Импортируем стили
import './styles.scss';

/**
 * Компонент карточки участника для Redux версии
 */
const ParticipantCard = ({ participant, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Обработчик редактирования
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Обработчик сохранения изменений
   */
  const handleSave = (updatedData) => {
    onEdit(participant.id, updatedData);
    setIsEditing(false);
  };

  /**
   * Обработчик отмены редактирования
   */
  const handleCancel = () => {
    setIsEditing(false);
  };

  /**
   * Обработчик удаления
   */
  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этого участника?')) {
      onDelete(participant.id);
    }
  };

  return (
    <div className="participant-card">
      <div className="card-header">
        <h3>{participant.firstName}</h3>
        {participant.performanceOrder && (
          <span className="order-badge">
            №{participant.performanceOrder}
          </span>
        )}
      </div>

      <div className="card-content">
        <div className="info-row">
          <strong>Творческий номер:</strong>
          <span>{participant.creativeNumber}</span>
        </div>

        <div className="info-row">
          <strong>Телефон:</strong>
          <span>{participant.phone}</span>
        </div>

        {participant.directorNotes && (
          <div className="info-row">
            <strong>Заметки режиссера:</strong>
            <span className="director-notes">{participant.directorNotes}</span>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button 
          className="edit-btn" 
          onClick={handleEdit}
          disabled={isEditing}
        >
          Редактировать
        </button>
        <button 
          className="delete-btn" 
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>

      {isEditing && (
        <div className="edit-overlay">
          <h4>Редактирование участника</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const updatedData = {
              firstName: formData.get('firstName'),
              creativeNumber: formData.get('creativeNumber'),
              phone: formData.get('phone'),
              performanceOrder: formData.get('performanceOrder'),
              directorNotes: formData.get('directorNotes')
            };
            handleSave(updatedData);
          }}>
            <div className="form-row">
              <div className="form-group">
                <label>Имя:</label>
                <input
                  type="text"
                  name="firstName"
                  defaultValue={participant.firstName}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Творческий номер:</label>
                <input
                  type="text"
                  name="creativeNumber"
                  defaultValue={participant.creativeNumber}
                  required
                />
              </div>
              <div className="form-group">
                <label>Телефон:</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={participant.phone}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Порядок выступления:</label>
                <input
                  type="number"
                  name="performanceOrder"
                  defaultValue={participant.performanceOrder || ''}
                  min="1"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Режиссерские заметки:</label>
              <textarea
                name="directorNotes"
                defaultValue={participant.directorNotes || ''}
                rows="3"
                placeholder="Заметки режиссера о участнике"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-btn">
                Сохранить
              </button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ParticipantCard;