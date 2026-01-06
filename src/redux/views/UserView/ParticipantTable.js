// Импортируем React
import React from 'react';
// Импортируем стили
import './styles.scss';

/**
 * Компонент таблицы участников для Redux версии
 */
const ParticipantTable = ({ participants }) => {
  // Сортируем участников по порядку выступления
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.performanceOrder && b.performanceOrder) {
      return a.performanceOrder - b.performanceOrder;
    }
    if (a.performanceOrder) return -1;
    if (b.performanceOrder) return 1;
    return a.id - b.id;
  });

  return (
    <div className="participant-table">
      <h2>Список участников</h2>
      {sortedParticipants.length === 0 ? (
        <p className="no-participants">Нет добавленных участников</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Творческий номер</th>
              <th>Телефон</th>
              <th>Порядок выступления</th>
              <th>Заметки режиссера</th>
            </tr>
          </thead>
          <tbody>
            {sortedParticipants.map((participant) => (
              <tr key={participant.id}>
                <td>{participant.id}</td>
                <td>{participant.firstName}</td>
                <td>{participant.lastName}</td>
                <td>{participant.creativeNumber}</td>
                <td>{participant.phone}</td>
                <td>
                  {participant.performanceOrder ? (
                    <span className="order-cell">№{participant.performanceOrder}</span>
                  ) : (
                    <span className="no-order">Не назначен</span>
                  )}
                </td>
                <td>
                  {participant.directorNotes ? (
                    <div className="notes-cell">
                      {participant.directorNotes}
                    </div>
                  ) : (
                    <span className="no-notes">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ParticipantTable;