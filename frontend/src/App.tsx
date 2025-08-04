import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/login/login';
import Register from './features/register/register';
import Home from './features/home/homepage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />  {/* Add this */}
    </Routes>
  );
}

export default App;
