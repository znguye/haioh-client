// This page is responsible for exporting the RoleContext and providing the role state and toggle function to the rest of the application.

import { useState, useEffect } from 'react';
import { RoleContext } from './RoleContext';

export default function RoleProvider({ children }){
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('yakrush-role');
    if (storedRole === 'loner' || storedRole === 'matchmaker') {
      setRole(storedRole);
    } else {
      // Default to 'loner' if no valid role is found
      setRole('loner');
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