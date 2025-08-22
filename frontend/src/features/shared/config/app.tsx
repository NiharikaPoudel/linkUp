import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../../../login/Login';
import Register from '../../../register/Register';
import Home from '../../../home/Home';
import ProfilePage from '../../../profilepage/ProfilePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};

export default App;
