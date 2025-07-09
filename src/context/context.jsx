import { createContext, useState, useEffect, Children } from "react";

const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    // console.log(user.role);
    setIsLoggedIn(!!user);
  }, []);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [role, setRole] = useState(null);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    localStorage.setItem("role", userData.user.role);
    setUser(userData);
    setIsLoggedIn(true);
    setRole(userData.user.role);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setUser(null);
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <Context.Provider value={{ user, login, logout, isLoggedIn, role }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
