// Импортируем React и хуки Redux
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
// Импортируем actions
import { addParticipant, updateParticipant, deleteParticipant } from '../../Actions/PostActions';
import { logoutUser } from '../../Actions/UserActions';
// Импортируем хук темы
import { useTheme } from '../../../contexts/ThemeContext';
// Импортируем компоненты
import AddParticipantForm from './AddParticipantForm';
import ParticipantGrid from './ParticipantGrid';
// Импортируем стили
import './styles.scss';
import './form-styles.scss';

/**
 * Контейнер для основного приложения с участниками
 * Подключает компонент к Redux store
 */
const UserViewContainer = ({ currentUser }) => {
  // Используем хук для получения состояния из Redux
  const dispatch = useDispatch();
  const { participants } = useSelector(state => state.posts);

  // Используем хук темы
  const { theme, toggleTheme } = useTheme();

  // Состояние для показа формы
  const [showForm, setShowForm] = useState(false);
  // Состояние для набора колонок
  const [columnLayoutInput, setColumnLayoutInput] = useState('3,3,3');

  /**
   * Обработчик добавления участника
   */
  const handleAddParticipant = (participantData) => {
    dispatch(addParticipant(participantData));
  };

  /**
   * Обработчик изменения данных участника
   */
  const handleUpdateParticipant = (id, updatedData) => {
    dispatch(updateParticipant(id, updatedData));
  };

  /**
   * Обработчик удаления участника
   */
  const handleDeleteParticipant = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого участника?')) {
      dispatch(deleteParticipant(id));
    }
  };

  /**
   * Обработчик выхода
   */
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  /**
   * Подсчет общего времени программы
   */
  const calculateTotalTime = () => {
    const totalMinutes = participants.reduce((sum, participant) => {
      const duration = parseInt(participant.duration) || 0;
      return sum + duration;
    }, 0);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes, totalMinutes };
  };

  const totalTime = calculateTotalTime();
  const columnLayout = columnLayoutInput
    .split(',')
    .map((value) => Number.parseInt(value.trim(), 10))
    .filter((value) => Number.isFinite(value) && value > 0);
  const columnSlots = columnLayout.reduce((sum, value) => sum + value, 0);
  const layoutHint = columnLayout.length
    ? `Сумма мест: ${columnSlots}. Если участников больше, добавятся новые колонки по ${columnLayout[columnLayout.length - 1]} мест.`
    : 'Введите размеры колонок через запятую, например 3,3,4.';

  return (
    <div className="app">
      <AppBar position="static" color="default" elevation={1} className="app-header">
        <Toolbar sx={{ gap: 2, flexWrap: 'wrap' }}>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            Участники концертной программы
          </Typography>
          {currentUser && (
            <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
              Пользователь: {currentUser.username}
            </Typography>
          )}
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Скрыть форму' : 'Добавить участника'}
          </Button>
          <Tooltip title={theme === 'light' ? 'Темная тема' : 'Светлая тема'}>
            <IconButton onClick={toggleTheme} color="primary">
              {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
          </Tooltip>
          <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Выход
          </Button>
        </Toolbar>
      </AppBar>

      <Paper className="program-info" elevation={0} sx={{ p: 2, mt: 2, mb: 2, border: '1px dashed', borderColor: 'divider' }}>
        <Typography variant="body1">
          Общее время программы: {totalTime.hours} ч {totalTime.minutes} мин ({totalTime.totalMinutes} мин)
        </Typography>
      </Paper>

      <Paper className="column-controls" elevation={0} sx={{ p: 2, mt: 2, mb: 2, border: '1px dashed', borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Настройка колонок
        </Typography>
        <Box className="column-controls__content">
          <TextField
            label="Набор колонок"
            value={columnLayoutInput}
            size="small"
            onChange={(event) => setColumnLayoutInput(event.target.value)}
            helperText={layoutHint}
            placeholder="3,3,4"
            fullWidth
          />
        </Box>
      </Paper>

      {showForm && (
        <AddParticipantForm
          onAddParticipant={handleAddParticipant}
        />
      )}

      <Box>
        <ParticipantGrid
          participants={participants}
          onEdit={handleUpdateParticipant}
          onDelete={handleDeleteParticipant}
          columnLayout={columnLayout}
        />
      </Box>

    </div>
  );
};

export default UserViewContainer;
