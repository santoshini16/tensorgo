import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <GoogleOAuthProvider clientId="703719578001-v649p2i2vfe0sv88drv7jfr9m7c9i59k.apps.googleusercontent.com">
    <Router>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/home" element={<Dashboard/>} />
      <Route path="/" element={<Navigate to="/signup"/>} />
    </Routes>
  </Router>
  </GoogleOAuthProvider>
  );
}

export default App;

