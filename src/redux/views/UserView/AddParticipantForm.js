// Импортируем React
import React, { useState } from 'react';
// Импортируем стили
import './form-styles.scss';

/**
 * Компонент формы добавления участника для Redux версии
 * Использует локальное состояние и валидацию
 */
const AddParticipantForm = ({ onAddParticipant, onDataChange, data }) => {
  // Локальное состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  /**
   * Валидация формы
   */
  const validateForm = () => {
    const newErrors = {};
    if (!data.firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!data.creativeNumber.trim()) newErrors.creativeNumber = 'Творческий номер обязателен';
    if (!data.phone.trim()) newErrors.phone = 'Телефон обязателен';
    else if (!/^\+?\d{10,15}$/.test(data.phone)) newErrors.phone = 'Неверный формат телефона. Используйте +375 (XX) XXX-XX-XX';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onAddParticipant();
    }
  };

  return (
    <div className="add-participant-form">
      <h2>Добавить участника</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => onDataChange('firstName', e.target.value)}
            className={errors.firstName ? 'error' : ''}
            placeholder="Введите имя участника"
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Творческий номер:</label>
          <input
            type="text"
            value={data.creativeNumber}
            onChange={(e) => onDataChange('creativeNumber', e.target.value)}
            className={errors.creativeNumber ? 'error' : ''}
            placeholder="Описание творческого номера"
          />
          {errors.creativeNumber && <span className="error-message">{errors.creativeNumber}</span>}
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onDataChange('phone', e.target.value)}
            className={errors.phone ? 'error' : ''}
            placeholder="+375 (XX) XXX-XX-XX"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Порядок выступления:</label>
          <input
            type="number"
            value={data.performanceOrder || ''}
            onChange={(e) => onDataChange('performanceOrder', e.target.value)}
            className={errors.performanceOrder ? 'error' : ''}
            placeholder="Номер в программе"
            min="1"
          />
          {errors.performanceOrder && <span className="error-message">{errors.performanceOrder}</span>}
        </div>

        <div className="form-group">
          <label>Режиссерские заметки:</label>
          <textarea
            value={data.directorNotes || ''}
            onChange={(e) => onDataChange('directorNotes', e.target.value)}
            className={errors.directorNotes ? 'error' : ''}
            placeholder="Заметки режиссера о участнике"
            rows="3"
          />
          {errors.directorNotes && <span className="error-message">{errors.directorNotes}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Добавить участника
        </button>
      </form>
    </div>
  );
};

export default AddParticipantForm;