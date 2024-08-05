import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./login/Login.tsx"
import Register from "./register/Register.tsx"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App
