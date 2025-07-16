import { useState } from 'react';
import './login.css';

//use navigate to go to register from thr login to switch the routes

function Login() {
  const [form, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted credentials:', form);
  };

  return (
    <div className="login-wrapper">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', color: '#556b2f', marginBottom: '1.5rem' }}>
          Login
        </h2>

        {/* Email field */}
        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="username"
            name="username"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password field */}
        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit button */}
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
