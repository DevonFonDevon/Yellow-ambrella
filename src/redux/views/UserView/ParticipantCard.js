// Импортируем React
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Импортируем библиотеку DnD
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// Импортируем стили
import './styles.scss';

/**
 * Компонент карточки участника для Redux версии с поддержкой drag-and-drop
 */
const ParticipantCard = ({ participant, onEdit, onDelete }) => {
  // Используем хуки DnD
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: participant.id });

  // Стили для перетаскивания
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab'
  };
  const [isEditing, setIsEditing] = useState(false);

  /**
   * Обработчик редактирования
   */
  const handleEdit = () => {
    setIsEditing(true);
  };

  /**
   * Обработчик сохранения изменений
   */
  const handleSave = (updatedData) => {
    onEdit(participant.id, updatedData);
    setIsEditing(false);
  };

  /**
   * Обработчик отмены редактирования
   */
  const handleCancel = () => {
    setIsEditing(false);
  };

  /**
   * Обработчик удаления
   */
  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этого участника?')) {
      onDelete(participant.id);
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="participant-card"
      elevation={isDragging ? 8 : 2}
    >
      {!isEditing ? (
        <>
          <CardHeader
            title={<Typography variant="h6">{participant.firstName}</Typography>}
            action={
              participant.performanceOrder ? (
                <Chip label={`Порядок: ${participant.performanceOrder}`} color="secondary" size="small" />
              ) : null
            }
          />

          <CardContent>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Творческий номер:</strong> {participant.creativeNumber}
              </Typography>
              <Typography variant="body2">
                <strong>Телефон:</strong> {participant.phone}
              </Typography>
              {participant.duration && (
                <Typography variant="body2">
                  <strong>Продолжительность:</strong> {participant.duration} мин
                </Typography>
              )}
              {participant.directorNotes && (
                <Typography variant="body2" color="text.secondary">
                  <strong>Заметки:</strong> {participant.directorNotes}
                </Typography>
              )}
            </Stack>
          </CardContent>

          <CardActions className="card-actions">
            <Button variant="outlined" onClick={handleEdit}>
              Редактировать
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить
            </Button>
          </CardActions>
        </>
      ) : (
        <CardContent className="edit-mode">
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Редактирование участника
          </Typography>
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const updatedData = {
                firstName: formData.get('firstName'),
                creativeNumber: formData.get('creativeNumber'),
                phone: formData.get('phone'),
                performanceOrder: formData.get('performanceOrder'),
                directorNotes: formData.get('directorNotes'),
                duration: formData.get('duration')
              };
              handleSave(updatedData);
            }}
          >
            <Stack spacing={2}>
              <TextField
                label="Имя"
                name="firstName"
                defaultValue={participant.firstName}
                required
                fullWidth
              />
              <TextField
                label="Творческий номер"
                name="creativeNumber"
                defaultValue={participant.creativeNumber}
                required
                fullWidth
              />
              <TextField
                label="Телефон"
                name="phone"
                type="tel"
                defaultValue={participant.phone}
                required
                fullWidth
              />
              <TextField
                label="Продолжительность номера (мин)"
                name="duration"
                type="number"
                defaultValue={participant.duration || ''}
                inputProps={{ min: 1 }}
                fullWidth
              />
              <TextField
                label="Порядок выступления"
                name="performanceOrder"
                type="number"
                defaultValue={participant.performanceOrder || ''}
                inputProps={{ min: 1 }}
                fullWidth
              />
              <TextField
                label="Режиссерские заметки"
                name="directorNotes"
                defaultValue={participant.directorNotes || ''}
                placeholder="Заметки режиссера о участнике"
                multiline
                rows={3}
                fullWidth
              />
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained">
                  Сохранить
                </Button>
                <Button variant="text" onClick={handleCancel}>
                  Отмена
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

export default ParticipantCard;
