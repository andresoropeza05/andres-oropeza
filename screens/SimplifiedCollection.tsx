
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

interface SimplifiedCollectionProps {
  isOffline: boolean;
}

const SimplifiedCollection: React.FC<SimplifiedCollectionProps> = ({ isOffline }) => {
  const location = useLocation();
  const totalAmount = location.state?.total || 4520;
  
  const [cash, setCash] = useState<string>("");
  const [transfer, setTransfer] = useState<string>("");

  const cashVal = parseFloat(cash) || 0;
  const transferVal = parseFloat(transfer) || 0;
  const totalReceived = cashVal + transferVal;
  const pending = totalAmount - totalReceived;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display">
      <Header title="Cobranza Simplificada" rightIcon="account_circle" isOffline={isOffline} />
      
      <header className="p-6 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-white/5">
        <span className="text-[10px] font-bold text-[#22c3b6] uppercase tracking-[0.2em]">Cliente</span>
        <h2 className="text-xl font-bold">ABARROTES "LA BENDICIÓN"</h2>
        <div className="flex gap-2 text-sm text-slate-500 mt-1">
          <span>ID: 4099238</span>
          <span>•</span>
          <span>Folio: #77281</span>
        </div>
      </header>

      <main className="p-4 space-y-6 pb-48">
        <div className="bg-[#22c3b6] p-6 rounded-2xl shadow-xl text-white relative overflow-hidden">
          <p className="text-xs opacity-70 font-semibold uppercase">Total del Pedido</p>
          <p className="text-4xl font-bold mt-1">${totalAmount.toLocaleString()}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center gap-4 focus-within:ring-2 ring-[#22c3b6]/50">
            <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl">payments</span>
            </div>
            <div className="flex-1">
              <p className="font-bold">Efectivo</p>
              <p className="text-xs text-slate-500 uppercase">Cobro Manual</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-400 font-bold">$</span>
              <input 
                type="number"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                className="w-24 text-right bg-transparent border-0 focus:ring-0 font-bold text-xl text-[#22c3b6]" 
                placeholder="0.00" 
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">account_balance</span>
              </div>
              <div className="flex-1">
                <p className="font-bold">Transferencia</p>
                <p className="text-xs text-slate-500 uppercase">SPEI / INTERBANCARIA</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 font-bold">$</span>
                <input 
                  type="number"
                  value={transfer}
                  onChange={(e) => setTransfer(e.target.value)}
                  className="w-24 text-right bg-transparent border-0 focus:ring-0 font-bold text-xl text-[#22c3b6]" 
                  placeholder="0.00" 
                />
              </div>
            </div>
            <input className="w-full h-11 px-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-sm border-0 focus:ring-2 ring-[#22c3b6]" placeholder="Folio de Rastreo (Opcional)" />
          </div>
        </div>

        <div className="bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Recibido:</span>
            <span className="font-bold">${totalReceived.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
            <span className="font-bold">Saldo Pendiente:</span>
            <div className="text-right font-bold">
              <p className={`text-2xl ${pending > 0 ? 'text-red-500' : 'text-green-500'}`}>
                {pending > 0 ? `-$${pending.toLocaleString()}` : '$0.00'}
              </p>
              <p className="text-[10px] uppercase">{pending > 0 ? 'Falta por cubrir' : 'Cubierto'}</p>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 p-4 pb-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-white/10">
        <Link 
          to="/receipt-ticket" 
          className={`w-full h-16 rounded-xl flex items-center justify-center gap-3 text-white font-bold shadow-lg transition-all ${pending <= 0 ? 'bg-[#22c3b6] shadow-[#22c3b6]/30' : 'bg-slate-400 opacity-50 pointer-events-none'}`}
        >
          <span className="material-symbols-outlined">check_circle</span> CONFIRMAR PAGO E IMPRIMIR
        </Link>
      </div>
    </div>
  );
};

export default SimplifiedCollection;
