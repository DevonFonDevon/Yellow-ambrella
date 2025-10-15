import React, { useState } from 'react';

function ParticipantCard({ participant, onEdit, onDelete }) {
  var [isEditing, setIsEditing] = useState(false);
  var [editData, setEditData] = useState(participant);

  // сохраняем изменения (вызывает App.updateParticipant)
  function handleSave() {
    onEdit(participant.id, editData);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditData(participant);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <div className="participant-card">
        <input
          type="text"
          value={editData.firstName}
          onChange={function(e) { setEditData({ ...editData, firstName: e.target.value }); }}
          placeholder="Имя"
        />
        <input
          type="text"
          value={editData.lastName}
          onChange={function(e) { setEditData({ ...editData, lastName: e.target.value }); }}
          placeholder="Фамилия"
        />
        <input
          type="text"
          value={editData.creativeNumber}
          onChange={function(e) { setEditData({ ...editData, creativeNumber: e.target.value }); }}
          placeholder="Творческий номер"
        />
        <input
          type="tel"
          value={editData.phoneNumber}
          onChange={function(e) { setEditData({ ...editData, phoneNumber: e.target.value }); }}
          placeholder="Номер телефона"
        />
        <button onClick={handleSave}>Сохранить</button>
        <button onClick={handleCancel}>Отмена</button>
      </div>
    );
  }

  return (
    <div className="participant-card">
      <h3>{participant.firstName} {participant.lastName}</h3>
      <p><strong>ID:</strong> {participant.id}</p>
      <p><strong>Творческий номер:</strong> {participant.creativeNumber}</p>
      <p><strong>Номер телефона:</strong> {participant.phoneNumber}</p>
      <button onClick={function() { setIsEditing(true); }}>Редактировать</button>
      <button onClick={function() { onDelete(participant.id); }}>Удалить</button>
    </div>
  );
}

export default ParticipantCard;