
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

interface DashboardProps {
  isOffline: boolean;
  toggleOffline: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ isOffline, toggleOffline }) => {
  return (
    <div className="flex flex-col min-h-screen pb-32 bg-[#f8fafc] dark:bg-background-dark font-manrope">
      <Header title="Sigma Mobile" showBack={false} isOffline={isOffline} />
      
      {isOffline && (
        <div className="bg-[#D8203E] text-white text-[10px] font-black text-center py-1.5 uppercase tracking-widest animate-pulse">
          Modo Sin Conexión Activado
        </div>
      )}

      {/* Hero Section / User Info */}
      <div className="bg-[#0d3359] pt-8 pb-14 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-[#22c3b6] opacity-10 blur-[60px] rounded-full"></div>
        <div className="relative z-10">
          <p className="text-[#22c3b6] text-[10px] font-bold uppercase tracking-widest mb-1">Bienvenido de nuevo</p>
          <h2 className="text-2xl font-black text-white leading-tight">Andrés Vera</h2>
          <div className="flex gap-4 mt-4">
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
              <p className="text-[8px] text-white/50 uppercase font-bold">Ruta Actual</p>
              <p className="text-sm font-bold text-white">MEX-V102</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/10">
              <p className="text-[8px] text-white/50 uppercase font-bold">Clientes</p>
              <p className="text-sm font-bold text-white">12 / 18</p>
            </div>
          </div>
        </div>
      </div>

      <main className="px-5 -mt-8 relative z-20 space-y-6">
        {/* Acceso rápido - Toma de Pedido */}
        <Link 
          to="/order-entry" 
          className="block bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-[#22c3b6] text-white flex items-center justify-center shadow-lg shadow-[#22c3b6]/40">
              <span className="material-symbols-outlined text-4xl">add_shopping_cart</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-slate-800 dark:text-white">Nueva Venta</h3>
              <p className="text-xs text-slate-500 font-medium italic">Asistente de Pedidos Sigma AI</p>
            </div>
            <span className="material-symbols-outlined text-[#22c3b6]">arrow_forward_ios</span>
          </div>
        </Link>

        {/* Grid de acciones secundarias */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/route-planning" className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-md active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 mb-4 flex items-center justify-center">
              <span className="material-symbols-outlined">map</span>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white">Mi Ruta</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Navegación GPS</p>
          </Link>
          
          <Link to="/sales-history" className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-md active:scale-95 transition-all">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 mb-4 flex items-center justify-center">
              <span className="material-symbols-outlined">history</span>
            </div>
            <h4 className="font-bold text-slate-800 dark:text-white">Historial</h4>
            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Ventas del día</p>
          </Link>
        </div>

        {/* Otros servicios */}
        <div className="grid grid-cols-2 gap-4">
          <Link to="/client-creation" className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
             <span className="material-symbols-outlined text-[#0d3359] dark:text-[#22c3b6]">person_add</span>
             <span className="text-xs font-bold uppercase">Alta Cliente</span>
          </Link>
          <Link to="/product-creation" className="bg-slate-100 dark:bg-slate-800/50 p-4 rounded-2xl flex items-center gap-3">
             <span className="material-symbols-outlined text-[#0d3359] dark:text-[#22c3b6]">inventory_2</span>
             <span className="text-xs font-bold uppercase">Catálogo</span>
          </Link>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
