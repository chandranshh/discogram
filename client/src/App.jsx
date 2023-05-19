import React from "react";
import Form from "./modules/Form/Form";
import Dashboard from "./modules/Dashboard/Dashboard";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/users/register" element={<Form />} />
      <Route spath="/users/login" element={<Form />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
