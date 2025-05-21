// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    login: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3002/register', form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Ошибка сервера');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
      <h1 style={{ textAlign: 'center' }}>Регистрация</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="fullName" placeholder="ФИО" value={form.fullName} onChange={handleChange} required style={{ padding: 10 }} />
        <input name="phone" placeholder="Телефон" value={form.phone} onChange={handleChange} required style={{ padding: 10 }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: 10 }} />
        <input name="login" placeholder="Логин" value={form.login} onChange={handleChange} required style={{ padding: 10 }} />
        <input name="password" type="password" placeholder="Пароль" value={form.password} onChange={handleChange} required style={{ padding: 10 }} />
        <button type="submit" style={{ padding: 10, marginTop: 10, background: '#4CAF50', color: '#fff', border: 'none' }}>
          Зарегистрироваться
        </button>
      </form>
      {message && <p style={{ marginTop: 15, textAlign: 'center' }}>{message}</p>}
    </div>
  );
}
