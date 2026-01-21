
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavigationMap: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-screen bg-slate-100 dark:bg-slate-900 relative">
      <header className="absolute top-0 inset-x-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 flex justify-between items-center shadow-md">
        <button onClick={() => navigate(-1)} className="text-[#22c3b6] p-2 bg-[#22c3b6]/10 rounded-full active:scale-90">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="text-center">
          <h2 className="text-sm font-extrabold uppercase">Sigma en Ruta</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Gps Activo</p>
        </div>
        <button className="p-2 text-slate-500"><span className="material-symbols-outlined">settings</span></button>
      </header>

      <main className="flex-1 relative overflow-hidden">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 map-grid-light opacity-50"></div>
        
        {/* Animated Path Mock */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 800">
           <path d="M 200 700 L 200 400 L 300 400 L 300 200" fill="none" stroke="#22c3b6" strokeWidth="12" strokeLinecap="round" strokeDasharray="10 20" />
           <circle cx="300" cy="200" r="10" fill="#D8203E" />
           <circle cx="200" cy="700" r="8" fill="#0d3359" className="animate-pulse" />
        </svg>

        <div className="absolute top-20 left-4 right-4 z-40 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-2xl flex items-center gap-4 animate-bounce-subtle">
          <div className="flex-1">
            <p className="text-[#22c3b6] text-xs font-bold uppercase">Siguiente Paso</p>
            <p className="text-lg font-extrabold leading-tight">En 200m gire a la derecha</p>
            <p className="text-sm text-slate-500">Calle Reforma Oriente</p>
          </div>
          <div className="w-14 h-14 bg-[#22c3b6]/10 text-[#22c3b6] flex items-center justify-center rounded-lg">
            <span className="material-symbols-outlined text-4xl">turn_right</span>
          </div>
        </div>

        <div className="absolute right-4 top-1/2 flex flex-col gap-3 z-40">
          <button className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-xl flex items-center justify-center font-bold text-xl active:scale-90">+</button>
          <button className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-xl flex items-center justify-center font-bold text-xl active:scale-90">-</button>
          <button className="w-12 h-12 bg-[#22c3b6] text-white rounded-xl shadow-xl flex items-center justify-center active:scale-90">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>
      </main>

      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/30 to-transparent">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-2xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Destino Actual</p>
              <h3 className="text-xl font-extrabold">Abarrotes "La Bendición"</h3>
              <span className="inline-block px-2 py-0.5 mt-1 bg-[#22c3b6]/20 text-[#22c3b6] text-[10px] font-bold rounded uppercase">ID: 4099238</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-[#22c3b6]">4 min</p>
              <p className="text-xs text-slate-500 font-bold">850m restantes</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link to="/order-entry" className="w-full bg-[#22c3b6] h-14 rounded-xl flex items-center justify-center gap-2 text-white font-bold shadow-lg shadow-[#22c3b6]/30 active:scale-95 transition-all">
              <span className="material-symbols-outlined">check_circle</span> LLEGUÉ AL CLIENTE
            </Link>
            <button className="w-full h-14 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center gap-2 font-bold text-sm text-slate-600 dark:text-slate-300 active:scale-95">
              <span className="material-symbols-outlined text-[#D8203E]">warning</span> REPORTAR INCIDENCIA
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NavigationMap;
