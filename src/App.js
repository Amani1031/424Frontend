
import { ProtectedRoute } from "./utils/ProtectedRoute";
import { fakeAuth } from "./utils/FakeAuth";
import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { Landing } from "./Landing";
import { NavLink } from "react-router-dom";

import { useAuth } from "./context/AuthProvider";
import { AuthProvider } from "./context/AuthProvider";

export const AuthContext = React.createContext(null);

const App = () => {
  const [token, setToken] = React.useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  return (
    <>
      <Navigation token={token} onLogout={handleLogout} />
      {token ? (
        <button onClick={handleLogout}>Sign Out</button>
      ) : (
        <button onClick={handleLogin}>Sign In</button>
      )}

      <AuthContext.Provider value={token}>
        <h1>React Router</h1>
          <Routes>
            <Route index element={<Landing />} />
            <Route
              path="home"
              element={
                <ProtectedRoute user={token}>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="landing" element={<Landing />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </AuthContext.Provider>
    </>
  );
};

const Navigation = ({ token, onLogout }) => (
  <nav>
    <NavLink to="/landing">Landing</NavLink>
    <NavLink to="/home">Home</NavLink>
    {token && (
      <button type="button" onClick={onLogout}>
        Sign Out
      </button>
    )}
  </nav>
);

export default App;
