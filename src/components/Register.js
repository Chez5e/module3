import React, { useState } from 'react';

function Register({ onRegister }) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:3002/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email, login, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка регистрации');
      
      onRegister(data.user); // Передаём пользователя в App.js
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>Регистрация</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        placeholder="ФИО"
        value={fullName}
        onChange={e => setFullName(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, padding: 8, width: 200 }}
      />

      <input
        placeholder="Телефон"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, padding: 8, width: 200 }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, padding: 8, width: 200 }}
      />

      <input
        placeholder="Логин"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, padding: 8, width: 200 }}
      />

      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, padding: 8, width: 200 }}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

export default Register;
