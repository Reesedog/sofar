import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timeline from './components/Timeline';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timeline />} />
      </Routes>
    </Router>
  );
} 

export default AppRoutes;
