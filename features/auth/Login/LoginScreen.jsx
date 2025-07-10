import React, { useState } from 'react';
import '../Auth.css';
import { useNavigate } from 'react-router-dom';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5005/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.user) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('email', result.user.email);
        localStorage.setItem('user', JSON.stringify(result.user));
        onLogin(result.user);

        // Check if the user has a profile
        const token = result.token;
        const profileRes = await fetch('http://localhost:5005/profiles/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (profileRes.status === 404) {
          navigate('/add-loner');
        } else {
          navigate('/');
        }
      } else {
        alert(result.message || 'Invalid credentials');
      }
    } catch (err) {
      alert('Error logging in');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login to your account</h2>
        <p>Enter your email below to login</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">Login</button>

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
}
