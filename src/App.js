
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
  
  return (
    <>
    <AuthProvider>
        <Navigation />
      
        <h1>React Router</h1>

        <Routes>
          <Route index element={<Home />} />
          <Route path="landing" element={
              <ProtectedRoute>
                <Landing />
              </ProtectedRoute>
            }
          />
          <Route path="home" element={<Home />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </AuthProvider>
    </>
  );
};

const Navigation = () => {
  const { value } = useAuth();
  return (
    <nav>
    <NavLink to="/home">Home</NavLink>
    <NavLink to="/landing">Landing</NavLink>
    {value.token && (
      <button type="button" onClick={value.onLogout}>
        Sign Out
      </button>
    )}
  </nav>
)};

export default App;
