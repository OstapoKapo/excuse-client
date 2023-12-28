import { useState, useEffect } from 'react';
import './Nullstyle.css';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



function App() {
  const initialLoggedInState = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setLoggedIn] = useState<boolean>(initialLoggedInState);


  const handleLogin = (): void => {
    setLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/main" element={isLoggedIn ? <Main /> : <Login  handleLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;