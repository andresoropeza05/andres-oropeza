
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { saveData } from '../services/dbService';

const ProductCreation: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    unit: 'Kg'
  });
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!formData.id || !formData.name || !formData.price) return alert("Complete todos los campos");
    
    setLoading(true);
    try {
      await saveData('products', {
        id: formData.id,
        name: formData.name,
        price: parseFloat(formData.price),
        qty: 0,
        unit: formData.unit
      });
      alert("Producto guardado en catálogo local");
      setFormData({ id: '', name: '', price: '', unit: 'Kg' });
    } catch (err) {
      alert("Error al guardar producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32 font-epilogue">
      <Header title="Catálogo de Productos" rightIcon="help" isOffline={isOffline} />
      
      <main className="p-4 space-y-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-bold text-[#22c3b6] uppercase border-b pb-2 mb-4">Información Básica</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium pb-2">Código de Producto</p>
              <div className="flex">
                <input 
                  value={formData.id}
                  onChange={e => setFormData({...formData, id: e.target.value})}
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border-0 rounded-l-lg h-12 px-4 uppercase font-bold" 
                  placeholder="Escanea el código" 
                />
                <button className="bg-[#22c3b6] text-white px-4 rounded-r-lg active:scale-95">
                  <span className="material-symbols-outlined">barcode_scanner</span>
                </button>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium pb-2">Nombre del Producto</p>
              <input 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-lg h-12 px-4 uppercase focus:ring-2 ring-[#22c3b6]" 
                placeholder="Ej. Jamón tipo York FUD" 
              />
            </div>
            <div>
              <p className="text-sm font-medium pb-2">Precio de Venta</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <input 
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-0 rounded-lg h-12 pl-8 font-bold" 
                  placeholder="0.00" 
                  type="number" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-white/10">
          <h3 className="text-xs font-bold text-[#22c3b6] uppercase border-b pb-2 mb-4">Peso y Medida</h3>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg mb-4">
            {['Kg', 'Gramos', 'Pza'].map(u => (
              <button 
                key={u}
                onClick={() => setFormData({...formData, unit: u})}
                className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${formData.unit === u ? 'bg-[#22c3b6] text-white shadow-sm' : 'text-slate-500'}`}
              >
                {u}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input className="flex-1 h-14 bg-slate-50 dark:bg-slate-800 border-0 rounded-lg text-center text-xl font-bold focus:ring-2 ring-[#22c3b6]" placeholder="0.000" />
            <span className="font-bold text-lg">{formData.unit}</span>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 inset-x-0 p-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-white/10 z-40">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-[#0d3359] h-14 rounded-xl text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          <span className="material-symbols-outlined">{loading ? 'sync' : 'check_circle'}</span> 
          {loading ? 'GUARDANDO...' : 'GUARDAR PRODUCTO'}
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProductCreation;
