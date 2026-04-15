import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { urlLink } from "../config/config";

const AuthContextAdmin = createContext(null);

export const AuthProviderAdmin = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = sessionStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (e) {
      sessionStorage.removeItem("user");
      return null;
    }
  });
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const login = (data) => {
    setUser(data); 
    return true; 
  };

  const logout = () => {
    try{
     const response = axios.get(${urlLink.url}/api/method/logout, {withCredentials: true});
   }catch(e){
       console.log(e);
   }finally{
     setUser(null);
      sessionStorage.clear();
      return true;
   }
  };
  return (
    <AuthContextAdmin.Provider value={{ user, login, logout }}>
      {children}
    </AuthContextAdmin.Provider>
  );
};
export const useAuthAdmin = () => {
  const context = useContext(AuthContextAdmin);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProviderAdmin");
  }
  return context;
};