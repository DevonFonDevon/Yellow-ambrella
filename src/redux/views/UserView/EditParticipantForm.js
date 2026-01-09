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
    creativeNumber: participant.creativeNumber || '',
    phone: participant.phone || '',
    performanceOrder: participant.performanceOrder || '',
    directorNotes: participant.directorNotes || '',
    duration: participant.duration || ''
  });

  // Локальное состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  /**
   * Валидация формы
   */
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!formData.creativeNumber.trim()) newErrors.creativeNumber = 'Творческий номер обязателен';
    if (!formData.phone.trim()) newErrors.phone = 'Телефон обязателен';
    else if (!/^\+?\d{10,15}$/.test(formData.phone)) newErrors.phone = 'Неверный формат телефона';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Продолжительность должна быть больше 0 минут';

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
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={errors.firstName ? 'error' : ''}
            placeholder="Введите имя участника"
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label>Творческий номер:</label>
          <input
            type="text"
            value={formData.creativeNumber}
            onChange={(e) => handleInputChange('creativeNumber', e.target.value)}
            className={errors.creativeNumber ? 'error' : ''}
            placeholder="Выберите или введите творческий номер"
            list="creative-options-edit"
          />
          <datalist id="creative-options-edit">
            <option value="Вокал" />
            <option value="Хореография" />
            <option value="СДМ" />
            <option value="Выход ведущих" />
          </datalist>
          {errors.creativeNumber && <span className="error-message">{errors.creativeNumber}</span>}
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className={errors.phone ? 'error' : ''}
            placeholder="+375 (XX) XXX-XX-XX"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label>Продолжительность номера (мин):</label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => handleInputChange('duration', e.target.value)}
            className={errors.duration ? 'error' : ''}
            placeholder="В минутах"
            min="1"
          />
          {errors.duration && <span className="error-message">{errors.duration}</span>}
        </div>

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