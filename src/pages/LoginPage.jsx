import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [form, setForm] = useState({ login: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3002/login', form);
      setMessage(res.data.message);
      // после успешного входа ведём на страницу карточек
      setTimeout(() => navigate('/cards'), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка сервера');
    }
  };

  return (
    <div style={{
      maxWidth: 400, margin: '50px auto', padding: 20,
      border: '1px solid #ddd', borderRadius: 8, textAlign: 'center'
    }}>
      <h1>Вход</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          name="login"
          placeholder="Логин"
          value={form.login}
          onChange={handleChange}
          required
          style={{ padding: 10 }}
        />
        <input
          name="password"
          type="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
          style={{ padding: 10 }}
        />
        <button type="submit" style={{
          padding: 10, marginTop: 10, background: '#4CAF50',
          color: '#fff', border: 'none', cursor: 'pointer'
        }}>
          Войти
        </button>
      </form>
      {message && <p style={{ marginTop: 15 }}>{message}</p>}
    </div>
  );
}
