
import React, { useState } from 'react';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';
import { saveData } from '../services/dbService';
import { Client } from '../types';

const ClientCreation: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    rfc: '',
    channel: 'Detalle',
    address: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.id || !formData.name) return alert("ID y Nombre son obligatorios");
    
    setLoading(true);
    try {
      await saveData('clients', {
        ...formData,
        id: formData.id || Date.now().toString()
      });
      alert("Cliente guardado localmente con éxito.");
      setFormData({ id: '', name: '', rfc: '', channel: 'Detalle', address: '' });
    } catch (err) {
      alert("Error al guardar cliente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-32">
      <Header title="Alta de Cliente" rightIcon="person_add" isOffline={isOffline} />
      
      <main className="p-4 space-y-6">
        <div className="mb-4">
          <h2 className="text-xl font-extrabold text-[#0d3359] dark:text-white">Nuevo Registro</h2>
          <p className="text-sm text-slate-500">Registre un nuevo prospecto o cliente de contado.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm">
            <label className="block text-[10px] font-bold text-[#0d3359] dark:text-[#22c3b6] uppercase tracking-widest mb-2">Número de Cliente / Código *</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">pin</span>
              <input 
                required
                value={formData.id}
                onChange={e => setFormData({...formData, id: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-0 font-bold focus:ring-2 ring-[#22c3b6]" 
                placeholder="Ej: 10029384" 
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Información del Negocio</h3>
            <div>
              <label className="text-[10px] text-slate-500 font-bold mb-1 block">Nombre Comercial *</label>
              <input 
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-0 text-sm uppercase focus:ring-2 ring-[#22c3b6]" 
                placeholder="NOMBRE DE LA TIENDA" 
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-slate-500 font-bold mb-1 block">RFC (Opcional)</label>
                <input 
                  value={formData.rfc}
                  onChange={e => setFormData({...formData, rfc: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-0 text-sm uppercase focus:ring-2 ring-[#22c3b6]" 
                  placeholder="RFC12345" 
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold mb-1 block">Canal</label>
                <select 
                  value={formData.channel}
                  onChange={e => setFormData({...formData, channel: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-0 text-sm focus:ring-2 ring-[#22c3b6]"
                >
                  <option>Detalle</option>
                  <option>Mayoreo</option>
                  <option>Horeca</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] text-slate-500 font-bold mb-1 block">Dirección completa</label>
              <input 
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-lg border-0 text-sm focus:ring-2 ring-[#22c3b6]" 
                placeholder="Calle, Número, Colonia..." 
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b pb-2">Geolocalización</h3>
            <button type="button" className="w-full py-3 bg-slate-50 dark:bg-slate-800 rounded-lg flex items-center justify-center gap-2 border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 font-bold text-sm active:bg-[#22c3b6]/10">
              <span className="material-symbols-outlined">my_location</span> CAPTURAR COORDENADAS
            </button>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-[#0d3359] h-14 rounded-xl text-white font-bold shadow-lg shadow-[#0d3359]/20 active:scale-95 transition-all disabled:opacity-50"
          >
            {loading ? 'GUARDANDO...' : 'GUARDAR CLIENTE'}
          </button>
        </form>
      </main>

      <BottomNav />
    </div>
  );
};

export default ClientCreation;
