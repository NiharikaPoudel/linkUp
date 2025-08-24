import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Login from '../../login/Login';
import Register from '../../register/register';
import Home from '../../home/home';
import ProfilePage from '../../profilepage/ProfilePage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/home' element = {<Home/>} />
      <Route path="/profilepage/:id" element={<ProfilePage />} />

    </Routes>
  );
};

export default App;
