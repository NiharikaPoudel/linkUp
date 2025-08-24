import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './register.css';
import axios from '../shared/config/axiosInstance'; 

export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    qualification: '',
    professionalField: '',
    address: '',
    contactNumber: '',
    bio: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/register', formData);
      alert('Registered Successfully');
      console.log(res.data);

      // Redirect to login
      window.location.href = '/login';
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>

        <input
          onChange={handleChange}
          name="username"
          value={formData.username}
          placeholder="Username"
          type="text"
          required
        />

        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          placeholder="Email"
          type="email"
          required
        />

        <input
          onChange={handleChange}
          name="password"
          value={formData.password}
          placeholder="Password"
          type="password"
          required
        />

        <input
          onChange={handleChange}
          name="qualification"
          value={formData.qualification}
          placeholder="Qualification"
          type="text"
          required
        />

        <input
          onChange={handleChange}
          name="professionalField"
          value={formData.professionalField}
          placeholder="Professional Field"
          type="text"
          required
        />

        <input
          onChange={handleChange}
          name="address"
          value={formData.address}
          placeholder="Address"
          type="text"
          required
        />

        <input
          onChange={handleChange}
          name="contactNumber"
          value={formData.contactNumber}
          placeholder="Contact Number"
          type="text"
          required
        />

        <input
          onChange={handleChange}
          name="bio"
          value={formData.bio}
          placeholder="Add your bio"
          type="text"
          required
        />

        <button type="submit">Register</button>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}