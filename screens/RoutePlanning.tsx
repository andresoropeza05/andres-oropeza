
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { MOCK_CLIENTS } from '../constants';

const RoutePlanning: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const [clients, setClients] = useState(MOCK_CLIENTS);

  const removeClient = (id: string) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <Header title="Planificación de Ruta" rightIcon="sync" isOffline={isOffline} />
      
      <section className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-[#D8203E] uppercase">Vendedor Activo</span>
          <h2 className="text-lg font-bold">ANDRES OROPEZA VERA</h2>
          <p className="text-xs text-slate-500">Ruta: MEX-502</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Clientes Hoy</p>
          <p className="text-2xl font-black text-[#22c3b6]">{clients.length}</p>
        </div>
      </section>

      <main className="p-4 space-y-6">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-xl flex justify-between">
          {['L', 'M', 'M', 'J', 'V', 'S'].map((d, i) => (
            <button key={i} className={`flex flex-col items-center justify-center w-12 h-14 rounded-xl transition-all ${i === 2 ? 'bg-[#22c3b6] text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
              <span className="text-[10px] font-bold opacity-60">D{i+1}</span>
              <span className="text-lg font-black">{d}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-[11px] font-bold text-slate-500 uppercase">Lista de Visitas</h3>
            <button className="text-[11px] text-[#D8203E] font-bold uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">auto_fix_high</span> Optimizar
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/10 divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
            {clients.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <p>No hay más visitas programadas</p>
              </div>
            ) : (
              clients.map((client, idx) => (
                <div key={client.id} className="p-4 flex items-center justify-between active:bg-slate-50 transition-colors group">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-6 h-6 bg-[#0d3359] text-white text-[11px] flex items-center justify-center rounded-full font-black">
                        {idx + 1}
                      </span>
                      <h4 className="text-sm font-bold uppercase truncate">{client.name}</h4>
                    </div>
                    <p className="text-xs text-slate-500 ml-8 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">pin_drop</span> {client.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => removeClient(client.id)}
                      className="p-2.5 text-slate-300 hover:text-[#D8203E] transition-colors"
                      title="Omitir visita"
                    >
                      <span className="material-symbols-outlined text-xl">person_remove</span>
                    </button>
                    <Link to="/navigation-map" className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-white/5 text-[#22c3b6] active:scale-90">
                      <span className="material-symbols-outlined">directions</span>
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-3">Vista de Mapa</h3>
          <div className="relative h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl map-grid-light dark:opacity-30 border border-slate-200 overflow-hidden shadow-inner">
            {clients.map((c, i) => (
              <div 
                key={c.id}
                className="absolute w-6 h-6 bg-[#0d3359] rounded-full border-2 border-white flex items-center justify-center shadow-lg"
                style={{ top: `${20 + i * 15}%`, left: `${20 + i * 10}%` }}
              >
                <span className="text-[9px] font-black text-white">{i + 1}</span>
              </div>
            ))}
            <div className="absolute top-[30%] left-[45%] w-4 h-4 bg-blue-600 rounded-full border-2 border-white animate-pulse"></div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-24 right-4 z-40">
        <Link to="/navigation-map" className="flex items-center gap-2 bg-[#0d3359] text-white pl-4 pr-6 py-3.5 rounded-full shadow-xl border-2 border-white/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-xl">navigation</span>
          <div className="text-left">
            <p className="text-[9px] font-bold uppercase opacity-70 leading-none">Siguiente Parada</p>
            <p className="text-sm font-black">Iniciar GPS</p>
          </div>
        </Link>
      </div>

      <BottomNav />
    </div>
  );
};

export default RoutePlanning;
