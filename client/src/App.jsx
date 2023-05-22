import React from "react";
import Form from "./modules/Form/Form";
import Dashboard from "./modules/Dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, auth = false }) => {
  const isLoggedIn = localStorage.getItem("user:token") !== null || false;

  if (!isLoggedIn && auth) {
    return <Navigate to={"/"} />;
  } else if (isLoggedIn && ["/"].includes(window.location.pathname)) {
    return <Navigate to={"/dashboard"} />;
  }
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute auth={true}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
