
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Recognition from './components/Recognition';
import Translation from './components/Translation';
import LearningCenter from './components/LearningCenter';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Router>
      <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900">
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        
        <main className={`flex-1 transition-all duration-300 overflow-y-auto ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <div className="container mx-auto p-4 md:p-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<Navigate to={`/${AppRoute.DASHBOARD}`} />} />
              <Route path={`/${AppRoute.DASHBOARD}`} element={<Dashboard />} />
              <Route path={`/${AppRoute.RECOGNITION}`} element={<Recognition />} />
              <Route path={`/${AppRoute.TRANSLATION}`} element={<Translation />} />
              <Route path={`/${AppRoute.LEARNING}`} element={<LearningCenter />} />
              <Route path="*" element={<div className="flex items-center justify-center h-full">404 - Not Found</div>} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
