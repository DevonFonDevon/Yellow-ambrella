import React, { useState } from 'react';

function AddParticipantForm({ onAddParticipant }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [creativeNumber, setCreativeNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  // валидация формы
  function validateForm() {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!lastName.trim()) newErrors.lastName = 'Фамилия обязательна';
    if (!creativeNumber.trim()) newErrors.creativeNumber = 'Творческий номер обязателен';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Номер телефона обязателен';
    else if (!/^\+?\d{10,15}$/.test(phoneNumber)) newErrors.phoneNumber = 'Неверный формат номера телефона';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    var newParticipant = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      creativeNumber: creativeNumber.trim(),
      phoneNumber: phoneNumber.trim(),
      performanceOrder: performanceOrder.trim(),
      directorNotes: directorNotes.trim(),
    };
    onAddParticipant(newParticipant); // передаем в App.addParticipant
    setFirstName('');
    setLastName('');
    setCreativeNumber('');
    setPhoneNumber('');
    setPerformanceOrder('');
    setDirectorNotes('');
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="add-participant-form">
      <h2>Добавить участника</h2>
      <div className="form-row">
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? 'error' : ''}
            placeholder="Введите имя участника"
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="form-group">
          <label>Фамилия:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? 'error' : ''}
            placeholder="Введите фамилию участника"
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="form-group">
          <label>Номер телефона:</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={errors.phoneNumber ? 'error' : ''}
            placeholder="+375 (XX) XXX-XX-XX"
          />
          {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Творческий номер:</label>
          <input
            type="text"
            value={creativeNumber}
            onChange={(e) => setCreativeNumber(e.target.value)}
            className={errors.creativeNumber ? 'error' : ''}
            placeholder="Описание творческого номера"
          />
          {errors.creativeNumber && <span className="error">{errors.creativeNumber}</span>}
        </div>
        <div className="form-group">
          <label>Порядок выступления:</label>
          <input
            type="number"
            value={performanceOrder}
            onChange={(e) => setPerformanceOrder(e.target.value)}
            className={errors.performanceOrder ? 'error' : ''}
            placeholder="Номер в программе"
            min="1"
          />
          {errors.performanceOrder && <span className="error">{errors.performanceOrder}</span>}
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Режиссерские заметки:</label>
          <textarea
            value={directorNotes}
            onChange={(e) => setDirectorNotes(e.target.value)}
            className={errors.directorNotes ? 'error' : ''}
            placeholder="Заметки режиссера о участнике"
            rows="3"
          />
          {errors.directorNotes && <span className="error">{errors.directorNotes}</span>}
        </div>
      </div>
      <button type="submit">Добавить участника</button>
    </form>
  );
}

export default AddParticipantForm;