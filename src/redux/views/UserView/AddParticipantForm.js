// Импортируем React
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
// Импортируем стили
import './form-styles.scss';
import { ALLOWED_DURATION_WINDOWS, validateParticipant } from './participantValidation';

/**
 * Компонент формы добавления участника для Redux версии
 * Использует локальное состояние и валидацию
 */
const AddParticipantForm = ({ onAddParticipant }) => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      creativeNumber: '',
      phone: '',
      performanceOrder: '',
      directorNotes: '',
      duration: ''
    },
    validate: validateParticipant,
    onSubmit: (values, { resetForm }) => {
      onAddParticipant(values);
      resetForm();
    }
  });

  const durationHint = ALLOWED_DURATION_WINDOWS
    .map((window) => `${window.min}-${window.max}`)
    .join(' или ');

  return (
    <Paper className="add-participant-form" elevation={4} sx={{ p: 3 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Добавить участника
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Имя"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            placeholder="Введите имя участника"
            required
            fullWidth
          />

          <TextField
            label="Творческий номер"
            name="creativeNumber"
            value={formik.values.creativeNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.creativeNumber && formik.errors.creativeNumber)}
            helperText={formik.touched.creativeNumber && formik.errors.creativeNumber}
            placeholder="Выберите или введите творческий номер"
            inputProps={{ list: 'creative-options' }}
            required
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
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.phone && formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            placeholder="+375291234567"
            inputProps={{ pattern: '\\+?\\d{10,15}', title: 'Введите 10-15 цифр, можно с + в начале' }}
            required
            fullWidth
          />

          <TextField
            label="Продолжительность номера (мин)"
            type="number"
            name="duration"
            value={formik.values.duration}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.duration && formik.errors.duration)}
            helperText={formik.touched.duration && formik.errors.duration ? formik.errors.duration : `Окна: ${durationHint} мин`}
            placeholder="В минутах"
            inputProps={{ min: 2, max: 12, step: 1 }}
            required
            fullWidth
          />

          <TextField
            label="Порядок выступления"
            type="number"
            name="performanceOrder"
            value={formik.values.performanceOrder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.performanceOrder && formik.errors.performanceOrder)}
            helperText={formik.touched.performanceOrder && formik.errors.performanceOrder}
            placeholder="Номер в программе"
            inputProps={{ min: 1, step: 1 }}
            fullWidth
          />

          <TextField
            label="Режиссерские заметки"
            name="directorNotes"
            value={formik.values.directorNotes}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.directorNotes && formik.errors.directorNotes)}
            helperText={formik.touched.directorNotes && formik.errors.directorNotes}
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
