
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const Profile: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const [syncing, setSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  const startSync = () => {
    setSyncing(true);
    setSyncProgress(0);
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <Header title="Configuración Vendedor" rightIcon="manage_accounts" isOffline={isOffline} />
      
      <main className="p-6 space-y-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#0d3359] dark:text-white">Perfil de Usuario</h2>
          <p className="text-sm text-slate-500">Gestione la información del vendedor actual y sincronización.</p>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Nombre Completo', val: 'ANDRES OROPEZA VERA', icon: 'person' },
            { label: 'ID Empleado', val: '284910', icon: 'badge' },
            { label: 'Ruta Asignada', val: 'RUTA-MEX-502', icon: 'local_shipping' },
            { label: 'Centro de Venta', val: 'TOLUCA ORIENTE', icon: 'storefront' }
          ].map(f => (
            <div key={f.label}>
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 ml-1">{f.label}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">{f.icon}</span>
                <input className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl font-semibold focus:ring-2 ring-[#22c3b6]" defaultValue={f.val} />
              </div>
            </div>
          ))}

          <div className="pt-6 space-y-4">
            <button 
              onClick={startSync}
              className="w-full bg-[#0d3359] h-14 rounded-xl text-white font-bold shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span className={`material-symbols-outlined ${syncing ? 'animate-spin' : ''}`}>sync</span> 
              {syncing ? 'SINCRONIZANDO...' : 'GUARDAR Y SINCRONIZAR'}
            </button>
            <button className="w-full bg-white dark:bg-slate-800 border-2 border-[#D8203E]/20 h-14 rounded-xl text-[#D8203E] font-bold flex items-center justify-center gap-2 active:scale-95">
              <span className="material-symbols-outlined">logout</span> CERRAR SESIÓN
            </button>
          </div>
        </div>
      </main>

      {syncing && (
        <div className="fixed inset-0 z-[100] bg-[#0d3359]/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden p-8 animate-in zoom-in-95 duration-200">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#22c3b6]/10 rounded-full flex items-center justify-center text-[#22c3b6]">
                <span className="material-symbols-outlined text-4xl animate-spin">sync</span>
              </div>
            </div>
            <h3 className="text-xl font-extrabold text-center mb-1">Sincronización</h3>
            <p className="text-sm text-slate-500 text-center mb-8">
              Enviando datos de ruta para:<br/>
              <span className="font-bold text-[#0d3359] dark:text-[#22c3b6]">ANDRES OROPEZA VERA</span>
            </p>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span>Subiendo pedidos ({syncProgress}%)</span>
                  <span className={syncProgress === 100 ? "text-green-600" : ""}>
                    {syncProgress === 100 ? 'Listo' : 'En proceso'}
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300" 
                    style={{ width: `${syncProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => { if(syncProgress === 100) setSyncing(false); }}
              disabled={syncProgress < 100}
              className={`w-full mt-10 h-14 rounded-xl text-white font-bold transition-all ${
                syncProgress === 100 ? 'bg-success' : 'bg-slate-300 pointer-events-none'
              }`}
            >
              {syncProgress === 100 ? 'FINALIZAR' : 'ESPERE...'}
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Profile;
