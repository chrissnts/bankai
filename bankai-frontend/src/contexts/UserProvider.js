import React, { useState } from 'react';
import UserContext from './UserContext';

export default function UserProvider({ children }) {
  
  const [user, setUser] = useState({ 
    id: 0,
    fullName: 'Visitante',
    email: 'visitante@gmail.com',
  });

  const [token, setToken] = useState('');

  return (
    <UserContext.Provider value={{user, setUser, token, setToken}}>
      {children}
    </UserContext.Provider>
  );
}