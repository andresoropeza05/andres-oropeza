
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Inicio', icon: 'grid_view' },
    { path: '/profile', label: 'Perfil', icon: 'account_circle' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-[#111921]/95 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 px-12 py-3 pb-8 flex justify-around items-center z-50">
      {navItems.map(item => (
        <Link 
          key={item.path}
          to={item.path} 
          className={`flex flex-col items-center gap-1 transition-colors ${location.pathname === item.path ? 'text-[#22c3b6]' : 'text-slate-400'}`}
        >
          <span className={`material-symbols-outlined text-2xl ${location.pathname === item.path ? 'fill-1' : ''}`}>{item.icon}</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default BottomNav;
