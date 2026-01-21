
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import { parseVoiceOrder } from '../services/geminiService';
import { getAllData } from '../services/dbService';

interface OrderEntryProps {
  isOffline: boolean;
}

const OrderEntry: React.FC<OrderEntryProps> = ({ isOffline }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const localProducts = await getAllData<Product>('products');
        // Combinamos productos locales con los mocks, evitando duplicados por ID
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

  const clearCart = () => {
    setCart(cart.map(p => ({ ...p, qty: 0 })));
    setShowClearConfirm(false);
  };

  const total = cart.reduce((acc, p) => acc + (p.price * p.qty), 0);
  const totalUnits = cart.reduce((acc, p) => acc + p.qty, 0);

  const handleSimulatedVoiceCapture = async () => {
    const simulatedText = "Dame 10 jamones virginia y 5 salchichas viena por favor";
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
      }, 1500);
    } catch (error) {
      setIsProcessing(false);
      alert("Error al procesar el pedido con IA");
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen bg-white">
    <div className="w-8 h-8 border-4 border-[#22c3b6] border-t-transparent rounded-full animate-spin"></div>
  </div>;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-space">
      <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22c3b6]/10 text-[#22c3b6] hover:bg-[#22c3b6]/20 transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <h1 className="text-lg font-bold leading-tight">Toma de Pedido</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#22c3b6] rounded-full animate-pulse"></span>
                <p className="text-[10px] font-bold text-[#22c3b6] uppercase tracking-widest">Asistente Sigma AI</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {total > 0 && (
              <button 
                onClick={() => setShowClearConfirm(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-[#D8203E] hover:bg-red-100 transition-colors"
              >
                <span className="material-symbols-outlined text-xl">delete_sweep</span>
              </button>
            )}
            <button 
              onClick={() => setIsAssistantOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0d3359] text-white shadow-lg hover:shadow-[#0d3359]/30 active:scale-90 transition-all"
            >
              <span className="material-symbols-outlined">mic</span>
            </button>
          </div>
        </div>
        <div className="bg-[#22c3b6]/5 dark:bg-[#22c3b6]/10 px-4 py-3 flex items-center justify-between border-b border-[#22c3b6]/10">
          <div>
            <span className="text-[10px] font-black text-[#22c3b6]/60 uppercase">CLIENTE ACTIVO</span>
            <div className="flex items-center gap-2">
              <span className="bg-[#22c3b6] text-white text-[10px] font-black px-1.5 py-0.5 rounded leading-none">#4099238</span>
              <h2 className="text-sm font-bold truncate max-w-[180px]">ABARROTES "LA BENDICIÓN"</h2>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">RUTA</span>
            <span className="text-xs font-black text-[#0d3359] dark:text-white">MEX-V102</span>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-3 pb-48">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#22c3b6] transition-colors">search</span>
          <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 ring-[#22c3b6]/30 transition-all outline-none" placeholder="Buscar por nombre o código..." />
        </div>

        <div className="grid gap-3">
          {cart.map(item => (
            <div key={item.id} className={`p-4 bg-white dark:bg-slate-900 rounded-2xl border transition-all ${item.qty > 0 ? 'border-[#22c3b6] shadow-sm' : 'border-slate-200 dark:border-white/10'}`}>
              <div className="flex justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-black text-[#22c3b6] bg-[#22c3b6]/10 px-1.5 py-0.5 rounded-full">{item.id}</span>
                    <h3 className="font-bold text-sm leading-tight text-slate-800 dark:text-slate-100">{item.name}</h3>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Unidad: {item.unit}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-[#22c3b6]">${item.price.toFixed(2)}</p>
                  {item.qty > 0 && <p className="text-[10px] font-bold text-slate-500 mt-1">${(item.price * item.qty).toLocaleString()} Subtotal</p>}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-100 dark:border-white/5">
                  <button 
                    onClick={() => updateQty(item.id, -1)}
                    className="w-9 h-9 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-600 dark:text-slate-300 flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
                  <div className="px-1 text-center min-w-[3.5rem]">
                    <span className="font-black text-lg block leading-none">{item.qty}</span>
                  </div>
                  <button 
                    onClick={() => updateQty(item.id, 1)}
                    className="w-9 h-9 bg-[#22c3b6] rounded-lg shadow-sm text-white flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
                {item.qty > 0 && (
                  <button onClick={() => updateQty(item.id, -item.qty)} className="text-[#D8203E] bg-red-50 p-2 rounded-lg transition-colors active:scale-90">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 border-t border-slate-200 dark:border-white/10 shadow-2xl rounded-t-[2.5rem] z-40">
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Items</p>
            <p className="text-lg font-black text-[#0d3359] dark:text-white">{cart.filter(p => p.qty > 0).length}</p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-white/5">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Unds</p>
            <p className="text-lg font-black text-[#0d3359] dark:text-white">{totalUnits}</p>
          </div>
          <div className="text-center p-3 bg-[#22c3b6]/10 rounded-2xl border border-[#22c3b6]/20">
            <p className="text-[9px] font-black text-[#22c3b6] uppercase tracking-widest mb-1">Total</p>
            <p className="text-lg font-black text-[#22c3b6]">${total.toLocaleString()}</p>
          </div>
        </div>
        <Link 
          to="/simplified-collection" 
          state={{ total }}
          className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 text-white font-black text-lg shadow-xl transition-all active:scale-[0.98] ${total > 0 ? 'bg-[#22c3b6] shadow-[#22c3b6]/30' : 'bg-slate-300 pointer-events-none'}`}
        >
          <span className="material-symbols-outlined text-2xl">point_of_sale</span> FINALIZAR VENTA
        </Link>
      </footer>
      {/* ... (Modals omitted for brevity, same as previous) ... */}
    </div>
  );
};

export default OrderEntry;
