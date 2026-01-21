
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
    <div className="flex flex-col min-h-screen pb-32 bg-[#f8fafc] dark:bg-background-dark">
      <Header title="Sigma Alimentos" showBack={false} isOffline={isOffline} />
      
      {isOffline && (
        <div className="bg-[#D8203E] text-white text-[10px] font-black text-center py-1.5 uppercase tracking-widest shadow-inner">
          <div className="flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[14px]">wifi_off</span>
            TRABAJANDO FUERA DE LÍNEA
          </div>
        </div>
      )}

      <div className="relative overflow-hidden bg-[#0d3359] pt-8 pb-12 px-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex items-start justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/10 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 bg-[#22c3b6] rounded-full animate-pulse"></span>
              <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest">Vendedor Activo</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white leading-tight">Andrés Oropeza Vera</h2>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#22c3b6] text-sm">badge</span>
                  <span className="text-xs font-bold text-white/60">ID: 284910</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#22c3b6] text-sm">local_shipping</span>
                  <span className="text-xs font-bold text-white/60">Ruta: V-102</span>
                </div>
              </div>
            </div>
          </div>
          <Link to="/profile" className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-white active:scale-90 transition-transform">
            <span className="material-symbols-outlined text-2xl">person_outline</span>
          </Link>
        </div>
      </div>

      <main className="px-5 -mt-6 relative z-20 space-y-4">
        {/* Acción Principal: Toma de Pedidos */}
        <Link 
          to="/order-entry" 
          className="block bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-white/5 overflow-hidden active:scale-[0.98] transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 rounded-2xl bg-[#22c3b6]/10 text-[#22c3b6] flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl">add_shopping_cart</span>
            </div>
            <span className="material-symbols-outlined text-slate-300">arrow_forward_ios</span>
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight">Nueva Venta</h3>
            <p className="text-sm text-slate-500 mt-1 italic">Iniciar toma de pedido con asistente IA</p>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          {/* Alta de Clientes */}
          <Link 
            to="/client-creation" 
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col gap-4 shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-[#0d3359] dark:text-blue-400 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">person_add</span>
            </div>
            <div>
              <h4 className="font-black text-slate-800 dark:text-white leading-tight">Alta Clientes</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Nuevos prospectos</p>
            </div>
          </Link>

          {/* Alta de Productos */}
          <Link 
            to="/product-creation" 
            className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-white/5 flex flex-col gap-4 shadow-md active:scale-[0.98] transition-all"
          >
            <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">inventory</span>
            </div>
            <div>
              <h4 className="font-black text-slate-800 dark:text-white leading-tight">Alta Productos</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Catálogo de stock</p>
            </div>
          </Link>
        </div>

        {/* Botón de Sincronización (Mantenido por utilidad operativa básica) */}
        <button 
          onClick={() => alert("Sincronizando datos...")}
          className="w-full bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-white/5 flex items-center justify-between shadow-md active:scale-[0.98] transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">sync</span>
            </div>
            <div className="text-left">
              <h4 className="font-black text-slate-800 dark:text-white leading-tight">Sincronizar</h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Subir cambios locales</p>
            </div>
          </div>
          <div className="w-2 h-2 bg-[#D8203E] rounded-full animate-pulse mr-2"></div>
        </button>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Dashboard;
