import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Timeline from './components/Timeline';
import Playground from './components/Playground';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
} 

export default AppRoutes;
