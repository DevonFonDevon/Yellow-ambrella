// Импортируем React
import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// Импортируем компонент карточки
import ParticipantCard from './ParticipantCard';
// Импортируем стили
import './styles.scss';

/**
 * Компонент сетки участников, распределенных по колонкам
 */
const ParticipantGrid = ({ participants, onEdit, onDelete }) => {
  // Сортируем участников по порядку выступления
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.performanceOrder && b.performanceOrder) {
      return a.performanceOrder - b.performanceOrder;
    }
    if (a.performanceOrder && !b.performanceOrder) return -1;
    if (!a.performanceOrder && b.performanceOrder) return 1;
    return a.id - b.id;
  });

  // Разделяем участников на колонки по 3 человека в каждой
  const columns = [];
  const columnSize = 3;
  
  for (let i = 0; i < sortedParticipants.length; i += columnSize) {
    columns.push(sortedParticipants.slice(i, i + columnSize));
  }

  return (
    <div className="participants-grid">
      {columns.map((column, columnIndex) => {
        // Определяем диапазон порядковых номеров для заголовка колонки
        const firstOrder = column[0]?.performanceOrder || (columnIndex * columnSize + 1);
        const lastOrder = column[column.length - 1]?.performanceOrder || (columnIndex * columnSize + column.length);
        
        return (
          <div key={columnIndex} className="grid-column">
            <div className="column-header">
              <Chip label={`Колонка ${columnIndex + 1}`} color="primary" size="small" />
              <Divider flexItem sx={{ mx: 1 }} />
              <Box>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {firstOrder} - {lastOrder}
                </Typography>
              </Box>
            </div>
            {column.map((participant) => (
              <ParticipantCard
                key={participant.id}
                participant={participant}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ParticipantGrid;
