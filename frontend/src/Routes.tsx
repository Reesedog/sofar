import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timeline from './components/Timeline';
import Playground from './components/Playground';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
} 

export default AppRoutes;
