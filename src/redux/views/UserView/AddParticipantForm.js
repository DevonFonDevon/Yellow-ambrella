// Импортируем React
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Импортируем стили
import './form-styles.scss';

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
    if (!data.firstName.trim()) newErrors.firstName = 'Имя обязательно';
    if (!data.creativeNumber.trim()) newErrors.creativeNumber = 'Творческий номер обязателен';
    if (!data.phone.trim()) newErrors.phone = 'Телефон обязателен';
    else if (!/^\+?\d{10,15}$/.test(data.phone)) newErrors.phone = 'Неверный формат телефона. Используйте +375 (XX) XXX-XX-XX';
    if (!data.duration || data.duration <= 0) newErrors.duration = 'Продолжительность должна быть больше 0 минут';

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
    <Paper className="add-participant-form" elevation={4} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Добавить участника
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Имя"
            value={data.firstName}
            onChange={(e) => onDataChange('firstName', e.target.value)}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName}
            placeholder="Введите имя участника"
            fullWidth
          />

          <TextField
            label="Творческий номер"
            value={data.creativeNumber}
            onChange={(e) => onDataChange('creativeNumber', e.target.value)}
            error={Boolean(errors.creativeNumber)}
            helperText={errors.creativeNumber}
            placeholder="Выберите или введите творческий номер"
            inputProps={{ list: 'creative-options' }}
            fullWidth
          />
          <datalist id="creative-options">
            <option value="Вокал" />
            <option value="Хореография" />
            <option value="СДМ" />
            <option value="Выход ведущих" />
          </datalist>

          <TextField
            label="Телефон"
            type="tel"
            value={data.phone}
            onChange={(e) => onDataChange('phone', e.target.value)}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            placeholder="+375 (XX) XXX-XX-XX"
            fullWidth
          />

          <TextField
            label="Продолжительность номера (мин)"
            type="number"
            value={data.duration}
            onChange={(e) => onDataChange('duration', e.target.value)}
            error={Boolean(errors.duration)}
            helperText={errors.duration}
            placeholder="В минутах"
            inputProps={{ min: 1 }}
            fullWidth
          />

          <TextField
            label="Порядок выступления"
            type="number"
            value={data.performanceOrder || ''}
            onChange={(e) => onDataChange('performanceOrder', e.target.value)}
            error={Boolean(errors.performanceOrder)}
            helperText={errors.performanceOrder}
            placeholder="Номер в программе"
            inputProps={{ min: 1 }}
            fullWidth
          />

          <TextField
            label="Режиссерские заметки"
            value={data.directorNotes || ''}
            onChange={(e) => onDataChange('directorNotes', e.target.value)}
            error={Boolean(errors.directorNotes)}
            helperText={errors.directorNotes}
            placeholder="Заметки режиссера о участнике"
            multiline
            rows={3}
            fullWidth
          />

          <Button type="submit" variant="contained" size="large">
            Добавить участника
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default AddParticipantForm;
