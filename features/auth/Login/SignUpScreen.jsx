import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../Auth.css';
import { signup, setToken } from '../../../services/authService.js';

export default function SignUpScreen({ onSignUp }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const result = await signup(email, password);

      if (result && result.user) {
        if (result.token) {
          setToken(result.token);
          localStorage.setItem('token', result.token);
        }

        localStorage.setItem('email', result.user.email);
        localStorage.setItem('user', JSON.stringify(result.user));
        onSignUp(result.user);
        navigate('/add-loner');
      } else {
        alert(result.message || 'Sign up failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error signing up');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignUp}>
        <h2>Create a new account</h2>
        <p>Enter your email below to get started</p>

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
          placeholder="••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-btn">Sign Up</button>

        <p className="signup-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
