import { createContext, useState } from "react";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {

  const [authenticated, setAuthenticated] = useState(false);

  function login() {
    setAuthenticated(true);
  }

  function logout() {
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}