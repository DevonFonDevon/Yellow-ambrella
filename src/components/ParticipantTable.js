import React from 'react';

function ParticipantTable({ participants }) {
  return (
    <div className="participant-table">
      <h2>Таблица участников</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Творческий номер</th>
            <th>Номер телефона</th>
          </tr>
        </thead>
        <tbody>
          {participants.map(function(participant) {
            return (
              <tr key={participant.id}>
                <td>{participant.id}</td>
                <td>{participant.firstName}</td>
                <td>{participant.lastName}</td>
                <td>{participant.creativeNumber}</td>
                <td>{participant.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ParticipantTable;