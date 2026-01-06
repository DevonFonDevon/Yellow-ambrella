// Импортируем React
import React, { useState } from 'react';
// Импортируем библиотеку DnD
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// Импортируем стили
import './styles.scss';

/**
 * Компонент карточки участника для Redux версии с поддержкой drag-and-drop
 */
const ParticipantCard = ({ participant, onEdit, onDelete }) => {
  // Используем хуки DnD
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: participant.id });

  // Стили для перетаскивания
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab'
  };
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
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="participant-card"
    >
      <div className="card-header">
        <h3>{participant.firstName}</h3>
        {participant.performanceOrder && (
          <span className="performance-order">
            Порядок: {participant.performanceOrder}
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
            <strong>Заметки:</strong>
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
                  className="form-input"
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
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Телефон:</label>
                <input
                  type="tel"
                  name="phone"
                  defaultValue={participant.phone}
                  required
                  className="form-input"
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
                  className="form-input"
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
                className="form-textarea"
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