import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // Состояние для хранения ответа от сервера
  const [response, setResponse] = useState(null);
  // Состояние для отображения загрузки
  const [loading, setLoading] = useState(false);
  // Состояние для хранения ошибок
  const [error, setError] = useState(null);

  const makeR = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = process.env.REACT_APP_API_URL; // Динамическое получение URL
      const res = await fetch(`${apiUrl}/chat/get-or-create`, {
        method: 'GET', // Или 'POST', если требуется
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Редактируйте <code>src/App.js</code> и сохраните для перезагрузки.
          </p>
          <button onClick={makeR}>Нажми меня</button>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Узнать React
          </a>

          {/* Отображение состояния загрузки */}
          {loading && <p>Загрузка...</p>}

          {/* Отображение ошибки, если она есть */}
          {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

          {/* Отображение ответа от сервера */}
          {response && (
              <div style={{ marginTop: '20px', textAlign: 'left' }}>
                <h3>Ответ от сервера:</h3>
                <pre>{JSON.stringify(response, null, 2)}</pre>
              </div>
          )}
        </header>
      </div>
  );
}

export default App;