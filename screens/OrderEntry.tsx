
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { parseVoiceOrder } from '../services/geminiService';
import { getAllData } from '../services/dbService';

interface OrderEntryProps {
  isOffline: boolean;
}

const OrderEntry: React.FC<OrderEntryProps> = ({ isOffline }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const localProducts = await getAllData<Product>('products');
        const combined = [...localProducts];
        MOCK_PRODUCTS.forEach(mp => {
          if (!combined.find(p => p.id === mp.id)) {
            combined.push(mp);
          }
        });
        setCart(combined);
      } catch (err) {
        setCart(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(p => 
      p.id === id ? { ...p, qty: Math.max(0, p.qty + delta) } : p
    ));
  };

  const total = cart.reduce((acc, p) => acc + (p.price * p.qty), 0);
  const totalUnits = cart.reduce((acc, p) => acc + p.qty, 0);

  const handleSimulatedVoiceCapture = async () => {
    const simulatedText = "Agregame 3 jamones virginia y 2 yoghurts de piña";
    setTranscript(simulatedText);
    setIsProcessing(true);
    
    try {
      const parsed = await parseVoiceOrder(simulatedText);
      setCart(prev => {
        const newCart = [...prev];
        parsed.forEach((item: any) => {
          const productIndex = newCart.findIndex(p => 
            p.name.toLowerCase().includes(item.name.toLowerCase())
          );
          if (productIndex !== -1) {
            newCart[productIndex].qty += item.quantity;
          }
        });
        return newCart;
      });
      
      setTimeout(() => {
        setIsProcessing(false);
        setIsAssistantOpen(false);
        setTranscript("");
      }, 1200);
    } catch (error) {
      setIsProcessing(false);
      alert("Error en procesamiento de voz");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-50">
      <div className="w-12 h-12 border-4 border-[#22c3b6] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 font-bold text-slate-400 animate-pulse">Cargando Catálogo Sigma...</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background-dark font-manrope">
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-white/10">
        <div className="flex items-center justify-between px-5 py-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center">
            <h1 className="text-sm font-black uppercase tracking-widest text-[#0d3359] dark:text-white">Toma de Pedido</h1>
            <p className="text-[10px] font-bold text-[#22c3b6] uppercase">Venta en Ruta</p>
          </div>
          <button 
            onClick={() => setIsAssistantOpen(true)}
            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#0d3359] text-white shadow-lg shadow-[#0d3359]/30 active:scale-90 transition-all"
          >
            <span className="material-symbols-outlined">mic</span>
          </button>
        </div>
      </header>

      <main className="p-5 space-y-4 pb-48">
        {/* Search */}
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#22c3b6] transition-colors">search</span>
          <input className="w-full bg-white dark:bg-slate-800 border-0 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium shadow-sm focus:ring-2 ring-[#22c3b6]/50 outline-none" placeholder="Buscar producto Sigma..." />
        </div>

        {/* Product List */}
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.id} className={`bg-white dark:bg-slate-900 rounded-3xl p-5 border transition-all duration-300 ${item.qty > 0 ? 'border-[#22c3b6] shadow-lg shadow-[#22c3b6]/10' : 'border-transparent shadow-sm'}`}>
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 pr-4">
                    <h3 className="text-base font-black text-slate-800 dark:text-slate-100 leading-tight">{item.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">CÓDIGO: {item.id}</span>
                      {item.qty > 0 && (
                        <span className="bg-[#22c3b6] text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                          En Carrito
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-[#22c3b6]">${item.price.toFixed(2)}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Por {item.unit}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-2xl p-1.5 border border-slate-100 dark:border-white/5">
                    <button 
                      onClick={() => updateQty(item.id, -1)}
                      className="w-10 h-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl text-slate-400 active:scale-75 transition-transform shadow-sm"
                    >
                      <span className="material-symbols-outlined text-xl">remove</span>
                    </button>
                    <span className="w-12 text-center text-lg font-black">{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item.id, 1)}
                      className="w-10 h-10 flex items-center justify-center bg-[#22c3b6] rounded-xl text-white active:scale-75 transition-transform shadow-md shadow-[#22c3b6]/20"
                    >
                      <span className="material-symbols-outlined text-xl">add</span>
                    </button>
                  </div>
                  
                  {item.qty > 0 && (
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Subtotal</p>
                      <p className="text-xl font-black text-[#0d3359] dark:text-white">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Persistent Bottom Summary */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 border-t border-slate-200 dark:border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.05)] rounded-t-[3rem] z-50">
        <div className="flex items-center justify-between mb-6 px-2">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Pedido</p>
            <p className="text-3xl font-black text-[#0d3359] dark:text-[#22c3b6] tracking-tighter">${total.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Unidades</p>
            <p className="text-lg font-black text-slate-800 dark:text-white">{totalUnits}</p>
          </div>
        </div>
        <Link 
          to="/simplified-collection" 
          state={{ total }}
          className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-lg transition-all active:scale-95 shadow-2xl ${total > 0 ? 'bg-[#22c3b6] shadow-[#22c3b6]/40' : 'bg-slate-300 pointer-events-none'}`}
        >
          <span className="material-symbols-outlined">payments</span> FINALIZAR VENTA
        </Link>
      </div>

      {/* AI Assistant Modal */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-[100] bg-[#0d3359]/60 backdrop-blur-xl flex items-end p-4 animate-in fade-in duration-300">
          <div className="w-full bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-1000 ${isProcessing ? 'bg-[#22c3b6] scale-110 shadow-[0_0_40px_#22c3b6]' : 'bg-slate-100 animate-pulse text-[#0d3359]'}`}>
                <span className={`material-symbols-outlined text-4xl ${isProcessing ? 'text-white animate-spin' : ''}`}>
                  {isProcessing ? 'data_thresholding' : 'mic'}
                </span>
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-center text-slate-800 dark:text-white mb-2">
              {isProcessing ? 'Procesando Pedido...' : 'Te escucho...'}
            </h3>
            <p className="text-slate-500 text-center text-sm font-medium px-4 mb-8 italic">
              {transcript || '"Agrégame 5 jamones virginia y 2 quesos panela"'}
            </p>

            {!isProcessing ? (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setIsAssistantOpen(false)} className="py-4 rounded-2xl font-bold bg-slate-100 text-slate-500 active:scale-95 transition-all">Cancelar</button>
                <button onClick={handleSimulatedVoiceCapture} className="py-4 rounded-2xl font-bold bg-[#22c3b6] text-white shadow-lg active:scale-95 transition-all">Simular Voz</button>
              </div>
            ) : (
              <div className="flex justify-center space-x-2">
                 <div className="w-2 h-2 bg-[#22c3b6] rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-[#22c3b6] rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-[#22c3b6] rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderEntry;
