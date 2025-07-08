import React, { useState } from 'react';
import '../../auth/Auth.css';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        // Store the token in localStorage
        if (result.token) {
          localStorage.setItem('token', result.token);
        }
        onLogin(result.user);
      } else {
        alert(result.message || 'Invalid credentials');
      }
    } catch (err) {
      alert('Error logging in');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>

        <h2>Login to your account</h2>
        <p>Enter your email below to login to your account</p>

        {/* <div className="form-group"> */}
          <label>Email</label>
          <input
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {/* </div> */}
        
        {/* <div className="form-group"> */}
          <label className="password-label">
          Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {/* </div> */}
        
        <p href="#" className="forgot-link">Forgot your password?</p>

        <button type="submit" className="login-btn">Login</button>
        {/* <button 
            type="button" 
            className="google-btn"
            onClick={() => alert('Google Sign Up not implemented yet')}
        >
            Sign Up with Google
        </button> */}

        <p className="signup-text">
          Don’t have an account? <a href="/signup">Sign up</a>
        </p>
      </form>
    </div>
  );
};
