import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const LoginContext = createContext(null);
function LoginProvider({ children }) {
  const [login, setLogin] = useState("");

  useEffect(() => {
    fetchLogin();
  }, []);
  function fetchLogin() {
    axios.get("/api/member/login").then((response) => setLogin(response.data));
  }
  function isAuthenticated() {
    return login !== "";
  }
  function hasAccess(userId) {
    return login.id === userId;
  }
  function isAdmin() {
    if (login.auth) {
      return login.auth.some((elem) => elem.name === "admin");
    }
    return false;
  }
  return (
    <LoginContext.Provider
      value={{ login, fetchLogin, isAuthenticated, hasAccess, isAdmin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
