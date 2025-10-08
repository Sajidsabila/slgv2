import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { urlLink } from "../config/config";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      localStorage.removeItem("user");
      return null;
    }
  });
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (data) => {
    setUser(data); 
    return true; 
  };

  const logout = () => {
    try{
     const response = axios.get(`${urlLink.url}/api/method/logout`, {withCredentials: true});
   }catch(e){
       console.log(e);
   }finally{
     setUser(null);
      localStorage.clear();
      return true;
   }
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
