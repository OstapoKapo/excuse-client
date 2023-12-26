import './Nullstyle.css'
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/main' element={<Main/>} />
      </Routes>
    </Router>
  )
}

export default App
