//Purpose: Handles authentication-related operations such as login, logout, and registration.

export const login = async (email, password) => {
  return await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json());
};