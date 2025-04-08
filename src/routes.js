import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import StatisticsPage from './pages/StatisticsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/statistics" element={<StatisticsPage />} />
  </Routes>
);

export default AppRoutes;
