import { useContext } from 'react';
import { RoleContext } from './RoleContext.jsx';

export default function useRole() {
  return useContext(RoleContext);
}
