
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  rightIcon?: string;
  isOffline?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = true, 
  rightIcon = 'settings',
  isOffline = false
}) => {
  const navigate = useNavigate();

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-500 ${isOffline ? 'bg-slate-700' : 'bg-[#0d3359]'} text-white px-4 py-3 flex items-center justify-between shadow-lg`}>
      <div className="flex items-center gap-3">
        {showBack && (
          <button onClick={() => navigate(-1)} className="p-1 -ml-1">
            <span className="material-symbols-outlined text-white">arrow_back_ios_new</span>
          </button>
        )}
        <div>
          <h1 className="text-xs font-extrabold tracking-tight uppercase leading-none">{title}</h1>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`w-1.5 h-1.5 ${isOffline ? 'bg-amber-400' : 'bg-green-400'} rounded-full animate-pulse`}></span>
            <span className="text-[9px] font-bold opacity-90 uppercase tracking-widest">
              {isOffline ? 'Modo Offline' : 'Sistema Activo'}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-xl">{rightIcon}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
