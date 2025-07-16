import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './features/login/login';
//import Register from './features/register/register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
       <Route path="/" element={<Register />} />
    </Routes>
    
  );
}

export default App;
