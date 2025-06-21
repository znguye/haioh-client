// This page is responsible for managing the role context in the application.

import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('loner');

  useEffect(() => {
    const storedRole = localStorage.getItem('yakrush-role');
    if (storedRole === 'loner' || storedRole === 'matchmaker') {
      setRole(storedRole);
    }
  }, []);

  const toggleRole = () => {
    const newRole = role === 'loner' ? 'matchmaker' : 'loner';
    setRole(newRole);
    localStorage.setItem('yakrush-role', newRole);
  };

  return (
    <RoleContext.Provider value={{ role, toggleRole }}>
      {children}
    </RoleContext.Provider>
  );
}