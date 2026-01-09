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
const ParticipantGrid = ({ participants, onEdit, onDelete, columnLayout }) => {
  // Сортируем участников по порядку выступления
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.performanceOrder && b.performanceOrder) {
      return a.performanceOrder - b.performanceOrder;
    }
    if (a.performanceOrder && !b.performanceOrder) return -1;
    if (!a.performanceOrder && b.performanceOrder) return 1;
    return a.id - b.id;
  });

  // Разделяем участников на колонки с учетом заданного набора размеров
  const columns = [];
  const defaultColumnSize = 3;
  const normalizedLayout = (columnLayout || [])
    .map((size) => Number.parseInt(size, 10))
    .filter((size) => Number.isFinite(size) && size > 0);
  const fallbackSize = normalizedLayout[normalizedLayout.length - 1] || defaultColumnSize;

  let cursor = 0;
  let layoutIndex = 0;

  while (cursor < sortedParticipants.length) {
    const size = normalizedLayout[layoutIndex] || fallbackSize;
    const slice = sortedParticipants.slice(cursor, cursor + size);
    if (slice.length) {
      columns.push({
        participants: slice,
        startIndex: cursor,
        size
      });
    }
    cursor += size;
    layoutIndex += 1;
  }

  const columnDurations = columns.map((column) => column.participants.reduce((sum, participant) => {
    const duration = Number.parseInt(participant.duration, 10) || 0;
    return sum + duration;
  }, 0));
  const maxDuration = Math.max(0, ...columnDurations);

  return (
    <div className="participants-grid">
      {columns.map((column, columnIndex) => {
        // Определяем диапазон порядковых номеров для заголовка колонки
        const firstOrder = column.participants[0]?.performanceOrder || (column.startIndex + 1);
        const lastOrder = column.participants[column.participants.length - 1]?.performanceOrder || (column.startIndex + column.participants.length);
        const columnDuration = columnDurations[columnIndex];
        const durationPercent = maxDuration ? Math.round((columnDuration / maxDuration) * 100) : 0;
        const isHot = maxDuration > 0 && columnDuration === maxDuration;
        
        return (
          <div key={columnIndex} className={`grid-column${isHot ? ' grid-column--hot' : ''}`}>
            <div className="column-header">
              <Chip label={`Колонка ${columnIndex + 1}`} color="primary" size="small" />
              <Divider flexItem sx={{ mx: 1 }} />
              <Box className="column-meta">
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                  {firstOrder} - {lastOrder}
                </Typography>
                <Typography variant="caption" color="text.secondary" fontWeight={600}>
                  Σ {columnDuration} мин
                </Typography>
                <div className="column-meter" aria-hidden="true">
                  <span style={{ width: `${durationPercent}%` }} />
                </div>
              </Box>
            </div>
            {column.participants.map((participant) => (
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
