// Импортируем React
import React from 'react';
// Импортируем стили
import './styles.scss';

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
    if (!data.name.trim()) newErrors.name = 'Имя обязательно';
    if (!data.email.trim()) newErrors.email = 'Email обязателен';
    if (!data.phone.trim()) newErrors.phone = 'Телефон обязателен';
    else if (!/^\+?\d{10,15}$/.test(data.phone)) newErrors.phone = 'Неверный формат телефона';
    
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
            value={data.name}
            onChange={(e) => onDataChange('name', e.target.value)}
            className={errors.name ? 'error' : ''}
            placeholder="Введите имя"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onDataChange('email', e.target.value)}
            className={errors.email ? 'error' : ''}
            placeholder="Введите email"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Телефон:</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onDataChange('phone', e.target.value)}
            className={errors.phone ? 'error' : ''}
            placeholder="Введите телефон"
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <button type="submit" className="submit-btn">
          Добавить участника
        </button>
      </form>
    </div>
  );
};

export default AddParticipantForm;