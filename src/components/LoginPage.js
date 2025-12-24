import React, { useState } from 'react';
import './LoginPage.css'; // Предполагаем, что создадим CSS файл

function LoginPage() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Пример: просто alert
    alert(`Логин: ${login}, Пароль: ${password}`);
  };

  return (
    <div className="login-page">
      <h1>Добро пожаловать</h1>
      <p>Введите логин и пароль, чтобы начать</p>
      <div className="login-form">
        <input
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <p className="signup-link">Первый раз тут - <a href="#">Создать аккаунт</a></p>
    </div>
  );
}

export default LoginPage;