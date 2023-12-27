import { useState } from 'react';
import './Nullstyle.css'
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = () : void => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin}/>} />
        <Route path='/main' element={isLoggedIn ? <Main/> : <Login handleLogin={handleLogin}/>} />
      </Routes>
    </Router>
  )
}

export default App
