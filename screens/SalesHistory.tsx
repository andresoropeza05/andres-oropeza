
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

const SalesHistory: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const [history, setHistory] = useState([
    { id: '#F-88293', status: 'Sincronizado', color: 'green', time: '14:20 PM', client: 'ABARROTES "LA CHIQUITA"', amount: 4250.80, kgs: 12.5 },
    { id: '#F-88292', status: 'Pendiente', color: 'amber', time: '13:45 PM', client: 'CARNICERÍA SAN JOSÉ', amount: 8920.00, kgs: 45.0 },
    { id: '#F-88291', status: 'Sincronizado', color: 'green', time: '12:10 PM', client: 'SUPER EXPRESS S.A.', amount: 1140.25, kgs: 5.2 }
  ]);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    setDeleteId(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <Header title="Historial de Ventas" rightIcon="filter_list" isOffline={isOffline} />
      
      <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-xl pl-10 pr-4 py-2.5 text-sm" placeholder="Buscar por folio o cliente..." />
        </div>
      </div>

      <main className="p-4 space-y-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pedidos Realizados Hoy</h3>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-white/10 overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
          {history.length === 0 ? (
            <div className="p-10 text-center text-slate-400">
              <span className="material-symbols-outlined text-5xl mb-2 opacity-20">receipt_long</span>
              <p className="text-sm">No hay registros de venta hoy</p>
            </div>
          ) : (
            history.map(item => (
              <div key={item.id} className="p-4 active:bg-slate-50 dark:active:bg-slate-800 transition-colors relative overflow-hidden group">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black">{item.id}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      item.color === 'green' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">{item.time}</span>
                    {item.status === 'Pendiente' && (
                      <button 
                        onClick={() => setDeleteId(item.id)}
                        className="text-[#D8203E] opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      >
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold text-sm leading-tight">{item.client}</p>
                    <p className="text-[11px] text-slate-500">Facturado al contado</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-[#0d3359] dark:text-[#22c3b6]">${item.amount.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500 font-semibold">{item.kgs} Kg</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Modal de confirmación para eliminar de historial */}
      {deleteId && (
        <div className="fixed inset-0 z-[110] bg-[#0d3359]/60 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-center mb-2">¿Eliminar Pedido?</h3>
            <p className="text-slate-500 text-sm text-center mb-6">Esta venta {deleteId} se eliminará permanentemente. Esta acción no se puede deshacer.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-600 dark:text-slate-300"
              >
                Cerrar
              </button>
              <button 
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3 bg-[#D8203E] text-white rounded-xl font-bold"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-24 right-4 z-40">
        <div className="bg-[#0d3359] text-white pl-4 pr-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2">
          <span className="material-symbols-outlined">analytics</span>
          <div>
            <p className="text-[9px] font-bold uppercase opacity-80 leading-none">Total Día</p>
            <p className="text-sm font-black">
              ${history.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default SalesHistory;
