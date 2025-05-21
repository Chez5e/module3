import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const fetchCards = () => {
    setLoading(true);
    fetch('http://localhost:3002/cards')
      .then(res => res.json())
      .then(data => {
        setCards(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin('');
    try {
      const res = await fetch('http://localhost:3002/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка входа');
      setUser(data.user);
      fetchCards();
    } catch (e) {
      setErrorLogin(e.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorRegister('');
    try {
      const res = await fetch('http://localhost:3002/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phone, email, login, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Ошибка регистрации');
      setUser(data.user);
      fetchCards();
    } catch (e) {
      setErrorRegister(e.message);
    }
  };

  const logout = () => {
    setUser(null);
    setCards([]);
    setLogin('');
    setPassword('');
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(to right, #f8f9fa, #e9ecef)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      padding: 40,
    },
    form: {
      background: 'white',
      padding: 30,
      borderRadius: 12,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      width: '100%',
      maxWidth: 350,
      marginBottom: 20,
    },
    input: {
      width: '100%',
      padding: 10,
      marginBottom: 15,
      borderRadius: 8,
      border: '1px solid #ced4da',
      fontSize: 14,
    },
    button: {
      width: '100%',
      padding: 10,
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: 8,
      cursor: 'pointer',
      fontSize: 16,
    },
    altButton: {
      marginTop: 10,
      backgroundColor: '#6c757d',
    },
    error: {
      color: 'red',
      marginBottom: 10,
    },
    card: {
      background: 'white',
      borderRadius: 12,
      padding: 20,
      margin: 10,
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      maxWidth: 400,
      textAlign: 'left',
    },
    cardList: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: 20,
    },
    logout: {
      marginTop: 20,
      backgroundColor: '#dc3545',
    }
  };

  if (!user) {
    return (
      <div style={styles.container}>
        <h2>{showRegister ? 'Регистрация' : 'Вход'}</h2>
        {showRegister ? (
          <form style={styles.form} onSubmit={handleRegister}>
            {errorRegister && <p style={styles.error}>{errorRegister}</p>}
            <input style={styles.input} placeholder="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            <input style={styles.input} placeholder="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input style={styles.input} placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required />
            <input style={styles.input} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" style={styles.button}>Зарегистрироваться</button>
            <button type="button" style={{ ...styles.button, ...styles.altButton }} onClick={() => setShowRegister(false)}>Уже есть аккаунт?</button>
          </form>
        ) : (
          <form style={styles.form} onSubmit={handleLogin}>
            {errorLogin && <p style={styles.error}>{errorLogin}</p>}
            <input style={styles.input} placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required />
            <input style={styles.input} type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" style={styles.button}>Войти</button>
            <button type="button" style={{ ...styles.button, ...styles.altButton }} onClick={() => setShowRegister(true)}>Зарегистрироваться</button>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Привет, {user.login} 👋</h1>
      <button style={{ ...styles.button, ...styles.logout }} onClick={logout}>Выйти</button>

      <h2 style={{ marginTop: 30 }}>📚 Карточки книг</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : cards.length === 0 ? (
        <p>Карточек пока нет...</p>
      ) : (
        <div style={styles.cardList}>
          {cards.map((c) => (
            <div key={c.id} style={styles.card}>
              <h3>{c.title}</h3>
              <p><strong>Автор:</strong> {c.author}</p>
              <p><strong>Тип:</strong> {c.type}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
