// Импортируем React
import React, { useState } from 'react';
// Импортируем стили
import './form-styles.scss';

/**
 * Компонент формы редактирования участника для Redux версии
 * Использует локальное состояние и валидацию
 */
const EditParticipantForm = ({ participant, onUpdateParticipant, onCancel }) => {
  // Локальное состояние для данных участника
  const [formData, setFormData] = useState({
    firstName: participant.firstName || '',
    lastName: participant.lastName || '',
    creativeNumber: participant.creativeNumber || '',
    phone: participant.phone || '',
    performanceOrder: participant.performanceOrder || '',
    directorNotes: participant.directorNotes || ''
  });

  // Локальное состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  /**
   * Валидация формы
   */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!formData.lastName.trim()) newErrors.lastName = 'Фамилия обязательна';
    if (!formData.creativeNumber.trim()) newErrors.creativeNumber = 'Творческий номер обязателен';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обязателен';
    else if (!/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Неверный формат телефона';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Обработчик изменения данных формы
   */
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    // Очищаем ошибку для этого поля при вводе
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onUpdateParticipant(participant.id, formData);
    }
  };

  return (
    <div className="edit-participant-form">
      <h3>Редактировать участника</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Имя:</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className={errors.firstName ? 'error' : ''}
              placeholder="Введите имя"
            />
            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
          </div>

          <div className="form-group">
            <label>Фамилия:</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className={errors.lastName ? 'error' : ''}
              placeholder="Введите фамилию"
            />
            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Творческий номер:</label>
            <input
              type="text"
              value={formData.creativeNumber}
              onChange={(e) => handleInputChange('creativeNumber', e.target.value)}
              className={errors.creativeNumber ? 'error' : ''}
              placeholder="Описание творческого номера"
            />
            {errors.creativeNumber && <span className="error-message">{errors.creativeNumber}</span>}
          </div>

          <div className="form-group">
            <label>Телефон:</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'error' : ''}
              placeholder="Введите телефон"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Порядок выступления:</label>
            <input
              type="number"
              value={formData.performanceOrder}
              onChange={(e) => handleInputChange('performanceOrder', e.target.value)}
              className={errors.performanceOrder ? 'error' : ''}
              placeholder="Номер в программе"
              min="1"
            />
            {errors.performanceOrder && <span className="error-message">{errors.performanceOrder}</span>}
          </div>

          <div className="form-group">
            <label>Режиссерские заметки:</label>
            <textarea
              value={formData.directorNotes}
              onChange={(e) => handleInputChange('directorNotes', e.target.value)}
              className={errors.directorNotes ? 'error' : ''}
              placeholder="Заметки режиссера о участнике"
              rows="3"
            />
            {errors.directorNotes && <span className="error-message">{errors.directorNotes}</span>}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Сохранить изменения
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancel}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditParticipantForm;