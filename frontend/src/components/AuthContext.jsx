
import React, { createContext, useContext, useState , useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    console.log(isAuthenticated); // This will log the updated value of isAuthenticated
  }, [isAuthenticated]); // This effect will run whenever isAuthenticated changes

  const signup = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
