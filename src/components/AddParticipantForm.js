import React, { useState } from 'react';

function AddParticipantForm({ onAddParticipant }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [creativeNumber, setCreativeNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errors, setErrors] = useState({});

  // валидация формы
  function validateForm() {
    var newErrors = {};
    if (!firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!lastName.trim()) newErrors.lastName = 'Фамилия обязательна';
    if (!creativeNumber.trim()) newErrors.creativeNumber = 'Творческий номер обязателен';
    if (!phoneNumber.trim()) newErrors.phoneNumber = 'Номер телефона обязателен';
    else if (!/^\+?\d{10,15}$/.test(phoneNumber)) newErrors.phoneNumber = 'Неверный формат номера телефона';
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    var validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    var newParticipant = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      creativeNumber: creativeNumber.trim(),
      phoneNumber: phoneNumber.trim(),
    };
    onAddParticipant(newParticipant); // передаем в App.addParticipant
    setFirstName('');
    setLastName('');
    setCreativeNumber('');
    setPhoneNumber('');
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} className="add-participant-form">
      <h2>Добавить участника</h2>
      <div>
        <label>Имя:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div>
        <label>Фамилия:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>
      <div>
        <label>Творческий номер:</label>
        <input
          type="text"
          value={creativeNumber}
          onChange={(e) => setCreativeNumber(e.target.value)}
          required
        />
        {errors.creativeNumber && <span className="error">{errors.creativeNumber}</span>}
      </div>
      <div>
        <label>Номер телефона:</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </div>
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddParticipantForm;