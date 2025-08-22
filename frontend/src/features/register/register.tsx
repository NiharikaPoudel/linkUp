import React, { useState } from 'react';
import axiosInstance from '../shared/config/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    bio: '',
    province: '',
    skills: '',
    experience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...form, skills: form.skills.split(',') };
      const res = await axiosInstance.post('/auth/register', data);
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err: any) {
      alert(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <input placeholder="Username" name="username" onChange={handleChange} required />
      <input placeholder="Email" name="email" onChange={handleChange} required />
      <input type="password" placeholder="Password" name="password" onChange={handleChange} required />
      <textarea placeholder="Bio" name="bio" onChange={handleChange}></textarea>
      <input placeholder="Province" name="province" onChange={handleChange} />
      <input placeholder="Skills (comma separated)" name="skills" onChange={handleChange} />
      <input placeholder="Experience" name="experience" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
