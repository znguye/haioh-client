//Purpose: Handles authentication-related operations such as login, logout, and registration.
const BASE_URL = 'http://localhost:5005'

export const login = async (email, password) => {
  return await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json());
};

export const signup = async (email, password) => {
  return await fetch(`${BASE_URL}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json());
};

// Utility functions for token management
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return token && token !== 'null' && token !== 'undefined';
};