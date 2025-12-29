
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hand, 
  ArrowLeftRight, 
  GraduationCap, 
  Settings, 
  Menu,
  ChevronLeft
} from 'lucide-react';
import { AppRoute } from '../types';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: AppRoute.DASHBOARD },
    { name: 'Sign Recognition', icon: <Hand size={20} />, path: AppRoute.RECOGNITION },
    { name: 'Translation', icon: <ArrowLeftRight size={20} />, path: AppRoute.TRANSLATION },
    { name: 'Learning Module', icon: <GraduationCap size={20} />, path: AppRoute.LEARNING },
    { name: 'Settings', icon: <Settings size={20} />, path: AppRoute.SETTINGS },
  ];

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen glass border-r z-50 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-20'
      } flex flex-col`}
    >
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center text-white font-bold">I</div>
            <h1 className="text-xl font-bold text-indigo-900">IsharaVaani</h1>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 hover:bg-slate-200 rounded-md transition-colors text-slate-600"
        >
          {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={`/${item.path}`}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
              }
            `}
          >
            <div className="shrink-0">{item.icon}</div>
            {isOpen && <span className="font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-200">
        <div className={`flex items-center gap-3 p-3 ${isOpen ? 'bg-indigo-50' : ''} rounded-xl`}>
          <img 
            src="https://picsum.photos/seed/user1/100/100" 
            alt="User" 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
          />
          {isOpen && (
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate">Guest User</p>
              <p className="text-xs text-indigo-600 font-medium">Standard Member</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
