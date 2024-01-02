import { useState, useEffect } from 'react';
import './Nullstyle.css';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(() => {
    const storedToken = localStorage.getItem('token');
    return !!storedToken;
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        try {
          const response = await axios.post('http://localhost:8000/verifyToken', { token: storedToken });

          if (response.data.success) {
            setLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            setLoggedIn(false);
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          setLoggedIn(false);
        }
      } else {
        setLoggedIn(false);
      }
    };

    checkAuthentication();
  }, []); 

  const handleLogin = (token: string): void => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  // const handleLogout = (): void => {
  //   localStorage.removeItem('token');
  //   setLoggedIn(false);
  // };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Login handleLogin={handleLogin} />}
        />
        <Route
          path="/main"
          element={isLoggedIn ? <Main /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
