// Импортируем React и хуки Redux
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
// Импортируем React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Импортируем контекст темы
import { useTheme as useAppTheme } from './contexts/ThemeContext';
// Импортируем контейнеры
import { RegLogContainer } from './redux/views/Entrance/containers';
import UserViewContainer from './redux/views/UserView/App';
// Импортируем стили
import './App.css';
import { initializeAuth } from './redux/Actions/UserActions';

/**
 * Главный компонент приложения с Redux
 */
function App() {
  // Используем хук для получения состояния аутентификации из Redux
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(state => state.auth);
  const { theme: appTheme } = useAppTheme();

  React.useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const muiTheme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: appTheme === 'dark' ? 'dark' : 'light',
        primary: {
          main: '#f2a900'
        },
        secondary: {
          main: '#2e7d32'
        }
      },
      shape: {
        borderRadius: 10
      }
    });
  }, [appTheme]);

  // Пока идет загрузка, показываем загрузочный экран
  if (loading) {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Box
          className="App"
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2
          }}
        >
          <CircularProgress color="primary" />
          <Typography variant="h6">Загрузка...</Typography>
        </Box>
      </MuiThemeProvider>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Главная страница - если не авторизован, перенаправляем на login */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <UserViewContainer />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Страница входа */}
          <Route
            path="/login"
            element={
              !isAuthenticated ? (
                <RegLogContainer />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
        </Routes>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
