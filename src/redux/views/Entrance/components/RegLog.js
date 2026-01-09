// Импортируем React
import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// Импортируем стили
import './styles.scss';

/**
 * Компонент представления для входа/регистрации
 * Получает все данные и функции через props от контейнера
 */
const RegLog = ({
  username,
  password,
  confirmPassword,
  isLoginMode,
  loading,
  error,
  onUsernameChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onLogin,
  onRegister,
  onToggleMode
}) => {
  return (
    <Container maxWidth="sm" className="login-page">
      <Paper elevation={6} sx={{ p: 4, mt: 6 }}>
        <Stack spacing={2}>
          <Typography variant="h4" component="h1">
            {isLoginMode ? 'Добро пожаловать' : 'Создание аккаунта'}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {isLoginMode 
              ? 'Введите логин и пароль, чтобы начать' 
              : 'Заполните форму для создания нового аккаунта'
            }
          </Typography>

          {error && (
            <Alert severity="error">
              {error}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Имя пользователя"
              value={username}
              onChange={onUsernameChange}
              disabled={loading}
              placeholder="Введите имя пользователя"
              fullWidth
            />

            <TextField
              label="Пароль"
              type="password"
              value={password}
              onChange={onPasswordChange}
              disabled={loading}
              placeholder="Введите пароль"
              fullWidth
            />

            {!isLoginMode && (
              <TextField
                label="Подтвердите пароль"
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                disabled={loading}
                placeholder="Подтвердите пароль"
                fullWidth
              />
            )}

            <Button
              variant="contained"
              size="large"
              onClick={isLoginMode ? onLogin : onRegister}
              disabled={loading}
            >
              {loading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="body2">
              {isLoginMode 
                ? 'Нет аккаунта?' 
                : 'Уже есть аккаунт?'
              }
            </Typography>
            <Button
              variant="text"
              onClick={onToggleMode}
              disabled={loading}
              className="toggle-mode-btn"
            >
              {isLoginMode ? 'Создать аккаунт' : 'Войти'}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default RegLog;
