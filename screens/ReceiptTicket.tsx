
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';

const ReceiptTicket: React.FC<{ isOffline: boolean }> = ({ isOffline }) => {
  const location = useLocation();
  const totalAmount = location.state?.total || 373.00;
  const [isBluetoothPrinting, setIsBluetoothPrinting] = useState(false);

  // Datos basados fielmente en la imagen proporcionada
  const ticketData = {
    ventaNo: "K1536120",
    fecha: "19/01/2026 14:16:38",
    ruta: "0000400920",
    agente: "214880 / OROPEZA VERA, ANDRES",
    cliente: "0008105625 / MI TIENDA",
    direccion: "CALLE REPUBLICA DE PANAMA 2 511 TEHUACAN",
    items: [
      { clave: "988", pzas: 1, kgs: 2.13, precio: 166.00, descPor: 0.00, desc: 0.00, total: 166.00, descr: "MULTIEMPAQUE 8 X SALCHICHA PA" },
      { clave: "9111", pzas: 1, kgs: 0.33, precio: 16.00, descPor: 0.00, desc: 0.00, total: 16.00, descr: "YOGHURT BEBER PIÑA 330 G YPT" },
      { clave: "9112", pzas: 1, kgs: 0.33, precio: 16.00, descPor: 0.00, desc: 0.00, total: 16.00, descr: "YOGHURT BEBER FRESA 330 G YP" },
      { clave: "9261", pzas: 2, kgs: 0.66, precio: 16.00, descPor: 0.00, desc: 0.00, total: 32.00, descr: "YOGHURT BEBER DURAZNO 330 G Y" },
      { clave: "9422", pzas: 2, kgs: 0.94, precio: 22.00, descPor: 0.00, desc: 0.00, total: 44.00, descr: "YOGHURT BEBER LICUADO MZA PER" },
      { clave: "9442", pzas: 2, kgs: 0.61, precio: 16.50, descPor: 0.00, desc: 0.00, total: 33.00, descr: "YOG DISFRUTA BEBER FRESA 307" },
      { clave: "9443", pzas: 2, kgs: 0.61, precio: 16.50, descPor: 0.00, desc: 0.00, total: 33.00, descr: "YOG DISFRUTA BEBER MANGO 307" },
      { clave: "9444", pzas: 2, kgs: 0.61, precio: 16.50, descPor: 0.00, desc: 0.00, total: 33.00, descr: "YOG DISFRUTA BEBER BLUEBERRY" },
    ],
    preciosSugeridos: [
      { clave: "988", descr: "MULTIEMPAQUE 8 X SALCHICHA P", precio: 27.00, um: "PZA" },
      { clave: "9111", descr: "YOGHURT BEBER PIÑA 330 G YP", precio: 20.00, um: "PZA" },
      { clave: "9112", descr: "YOGHURT BEBER FRESA 330 G YP", precio: 20.00, um: "PZA" },
      { clave: "9261", descr: "YOGHURT BEBER DURAZNO 330 G", precio: 20.00, um: "PZA" },
      { clave: "9422", descr: "YOGHURT BEBER LICUADO MZA PE", precio: 27.50, um: "PZA" },
      { clave: "9442", descr: "YOG DISFRUTA BEBER FRESA 307", precio: 20.50, um: "PZA" },
      { clave: "9443", descr: "YOG DISFRUTA BEBER MANGO 307", precio: 20.50, um: "PZA" },
      { clave: "9444", descr: "YOG DISFRUTA BEBER BLUEBERRY", precio: 20.50, um: "PZA" }
    ]
  };

  const handleBluetoothPrint = () => {
    setIsBluetoothPrinting(true);
    setTimeout(() => {
      setIsBluetoothPrinting(false);
      alert("Enviado a impresora Bluetooth con éxito.");
    }, 2000);
  };

  const generateTxtContent = () => {
    let txt = `          Sigma  Delicious Food\n                 for a Better Life\n`;
    txt += `SIGMA ALIMENTOS COMERCIAL, SA DE CV\n`;
    txt += `       Av. Gomez Morin 1111\n`;
    txt += `Col. Carrizalejo, Garza Garcia N.L.\n`;
    txt += `CP 66254 Tel (01)55 864 SIGMA (74462)\n`;
    txt += `        RFC:SAC991222G1A\n\n`;
    txt += `Numero de Venta # ${ticketData.ventaNo}\n`;
    txt += `          PEDIDO VAB\n`;
    txt += `        METODO DE PAGO\n`;
    txt += `          (CONTADO)\n\n`;
    txt += `Fecha    : ${ticketData.fecha}\n`;
    txt += `Ruta     : ${ticketData.ruta}\n`;
    txt += `Agente   : ${ticketData.agente}\n`;
    txt += `Cliente  : ${ticketData.cliente}\n`;
    txt += `Direccion: ${ticketData.direccion}\n\n`;
    txt += `CLAVE   PRODUCTO\n`;
    txt += `PZAS KGS PRECIO %DESC DESC TOTAL\n`;
    txt += `--------------------------------\n`;
    ticketData.items.forEach(item => {
      txt += `${item.clave.padEnd(8)} ${item.descr}\n`;
      txt += `${item.pzas.toString().padStart(4)} ${item.kgs.toFixed(2).padStart(4)} ${item.precio.toFixed(2).padStart(6)} ${item.descPor.toFixed(2).padStart(5)} ${item.desc.toFixed(2).padStart(4)} ${item.total.toFixed(2).padStart(6)}\n`;
    });
    txt += `--------------------------------\n`;
    txt += `Total Piezas   : 13\n`;
    txt += `Total Kgs      : 6.23\n\n`;
    txt += `Subtotal       : $ ${totalAmount.toFixed(2)}\n`;
    txt += `Total          : $ ${totalAmount.toFixed(2)}\n\n`;
    txt += `Resumen de Operaciones\n`;
    txt += `Total Venta         : $ ${totalAmount.toFixed(2)}\n`;
    txt += `Total a Pagar       : $ ${totalAmount.toFixed(2)}\n\n`;
    txt += `Desglose de Formas de Pago\n`;
    txt += `Efectivo            : $ ${totalAmount.toFixed(2)}\n\n`;
    txt += `PRODUCTO DESCRIPCION   PRECIO SUG UM\n`;
    ticketData.preciosSugeridos.forEach(p => {
      txt += `${p.clave.padEnd(5)} ${p.descr.padEnd(18)} ${p.precio.toFixed(2).padStart(6)} ${p.um}\n`;
    });
    txt += `\n        Firma Cliente\n\n`;
    return txt;
  };

  const shareAsTxt = async () => {
    const text = generateTxtContent();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ticket Sigma ${ticketData.ventaNo}`,
          text: text,
        });
      } catch (err) {
        console.error("Error al compartir:", err);
      }
    } else {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ticket_${ticketData.ventaNo}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-200 dark:bg-slate-900 font-display">
      <Header title="Ticket de Venta" rightIcon="receipt" isOffline={isOffline} />
      
      <main className="p-4 flex-1 pb-48 overflow-y-auto no-scrollbar">
        <div className="bg-white text-slate-900 p-6 thermal-font text-[9px] shadow-2xl max-w-[320px] mx-auto leading-[1.15] rounded-sm border border-slate-300">
          
          {/* Logo y Encabezado */}
          <div className="text-center mb-4">
            <div className="flex justify-center items-center gap-2 mb-1">
              <span className="font-bold text-lg italic">Sigma</span>
              <div className="text-[7px] text-left leading-tight">
                Delicious Food<br/>for a Better Life
              </div>
            </div>
            <p className="font-bold uppercase text-[9px]">SIGMA ALIMENTOS COMERCIAL, SA DE CV</p>
            <p>Av. Gomez Morin 1111</p>
            <p>Col. Carrizalejo, Garza Garcia N.L.</p>
            <p>CP 66254 Tel (01)55 864 SIGMA (74462)</p>
            <p>RFC:SAC991222G1A</p>
          </div>

          <div className="text-center mb-4 space-y-1 uppercase">
            <p className="font-bold">Numero de Venta # {ticketData.ventaNo}</p>
            <p className="font-bold">PEDIDO VAB</p>
            <div className="border border-black p-1 inline-block text-[8px] mx-auto font-bold mt-1">
              METODO DE PAGO<br/>(CONTADO)
            </div>
          </div>

          {/* Info Transacción */}
          <div className="space-y-0.5 mb-4 uppercase">
            <div className="flex"><span className="w-16">Fecha</span><span>: {ticketData.fecha}</span></div>
            <div className="flex"><span className="w-16">Ruta</span><span>: {ticketData.ruta}</span></div>
            <div className="flex"><span className="w-16">Agente</span><span>: {ticketData.agente}</span></div>
            <div className="flex"><span className="w-16">Cliente</span><span>: {ticketData.cliente}</span></div>
            <div className="flex items-start"><span className="w-16 shrink-0">Direccion</span><span className="leading-tight">: {ticketData.direccion}</span></div>
          </div>

          {/* Detalle de Productos */}
          <div className="border-t border-dotted border-black pt-2 mb-4">
            <div className="grid grid-cols-12 font-bold mb-1">
              <span className="col-span-3">CLAVE</span>
              <span className="col-span-9">PRODUCTO</span>
            </div>
            <div className="grid grid-cols-12 font-bold mb-2 text-[8px] border-b border-dotted border-black pb-1">
              <span className="col-span-2">PZAS</span>
              <span className="col-span-2">KGS</span>
              <span className="col-span-2">PRECIO</span>
              <span className="col-span-2">%DESC</span>
              <span className="col-span-2">DESC</span>
              <span className="col-span-2 text-right">TOTAL</span>
            </div>

            <div className="space-y-3">
              {ticketData.items.map((item, i) => (
                <div key={i} className="leading-tight">
                  <div className="grid grid-cols-12 mb-0.5">
                    <span className="col-span-3 font-bold">{item.clave}</span>
                    <span className="col-span-9 font-bold">{item.descr}</span>
                  </div>
                  <div className="grid grid-cols-12 text-[8px]">
                    <span className="col-span-2">{item.pzas}</span>
                    <span className="col-span-2">{item.kgs.toFixed(2)}</span>
                    <span className="col-span-2">{item.precio.toFixed(2)}</span>
                    <span className="col-span-2">{item.descPor.toFixed(2)}</span>
                    <span className="col-span-2">{item.desc.toFixed(2)}</span>
                    <span className="col-span-2 text-right font-bold">{item.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resumen de Venta */}
          <div className="border-t border-dotted border-black pt-2 space-y-1 uppercase">
            <div className="flex justify-between"><span>Total Piezas</span><span className="font-bold">: 13</span></div>
            <div className="flex justify-between"><span>Total Kgs</span><span className="font-bold">: 6.23</span></div>
            <div className="flex justify-between mt-1"><span>Subtotal</span><span>: $ {totalAmount.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-[11px] pt-1 border-t-2 border-black border-dotted">
              <span>TOTAL</span><span>: $ {totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Resumen de Operaciones (Imagen 1) */}
          <div className="mt-4 border-t border-dotted border-black pt-2 uppercase">
            <p className="font-bold mb-1">Resumen de Operaciones</p>
            <div className="space-y-0.5">
              <div className="flex justify-between"><span>Total Venta</span><span>: $ {totalAmount.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Total Devolucion BE</span><span>: $ 0.00</span></div>
              <div className="flex justify-between"><span>Total Devolucion ME</span><span>: $ 0.00</span></div>
              <div className="flex justify-between"><span>Total Bonif / Cupones</span><span>: $ 0.00</span></div>
              <div className="flex justify-between"><span>Total Desc. Punto Venta</span><span>: $ 0.00</span></div>
              <div className="flex justify-between font-bold mt-1 border-t border-dotted border-black pt-1">
                <span>Total a Pagar</span><span>: $ {totalAmount.toFixed(2)}</span>
              </div>
            </div>
            <p className="text-[7px] mt-1 normal-case text-center">trescientos setenta y tres pesos 00/100 M.N.</p>
          </div>

          {/* Formas de Pago */}
          <div className="mt-4 border-t border-dotted border-black pt-2 uppercase">
            <p className="font-bold mb-1">Desglose de Formas de Pago</p>
            <div className="space-y-0.5">
              <div className="flex justify-between"><span>Efectivo</span><span>: $ {totalAmount.toFixed(2)}</span></div>
              <div className="flex justify-between opacity-50"><span>Cheque</span><span>: $ 0.00</span></div>
              <div className="flex justify-between opacity-50"><span>Transferencia Electronica</span><span>: $ 0.00</span></div>
              <div className="flex justify-between opacity-50"><span>Tarjeta de Credito</span><span>: $ 0.00</span></div>
              <div className="flex justify-between opacity-50"><span>Tarjeta de Debito</span><span>: $ 0.00</span></div>
            </div>
          </div>

          {/* Precios Sugeridos (Imagen 1 Final) */}
          <div className="mt-6 border-t border-dotted border-black pt-2 uppercase">
            <div className="grid grid-cols-12 font-bold mb-2">
              <span className="col-span-2">CLAVE</span>
              <span className="col-span-6">PRODUCTO DESCRIPCION</span>
              <span className="col-span-2 text-center">PRECIO</span>
              <span className="col-span-2 text-right">UM</span>
            </div>
            <div className="space-y-1.5">
              {ticketData.preciosSugeridos.map((p, idx) => (
                <div key={idx} className="grid grid-cols-12 text-[8px] leading-tight items-start">
                  <span className="col-span-2 font-bold">{p.clave}</span>
                  <span className="col-span-6 pr-1">{p.descr}</span>
                  <span className="col-span-2 text-center font-bold">{p.precio.toFixed(2)}</span>
                  <span className="col-span-2 text-right">{p.um}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="border-t border-black w-40 mx-auto mb-1"></div>
            <p className="font-bold">Firma Cliente</p>
          </div>

          <div className="mt-10 text-[7px] text-center opacity-40 italic">
            {ticketData.ventaNo} / {new Date().getFullYear()}0119-SIGMA-MOBILE-V3
          </div>
        </div>
      </main>

      {/* Botones de Acción */}
      <div className="fixed bottom-0 inset-x-0 p-4 pb-10 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-white/10 space-y-3 z-40">
        <button 
          onClick={shareAsTxt}
          className="w-full bg-[#0d3359] text-white h-14 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl"
        >
          <span className="material-symbols-outlined">share</span> COMPARTIR TICKET (.TXT)
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={handleBluetoothPrint}
            disabled={isBluetoothPrinting}
            className="h-14 rounded-2xl bg-[#22c3b6] text-white font-black flex items-center justify-center gap-2 text-sm active:scale-95 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">{isBluetoothPrinting ? 'sync' : 'bluetooth'}</span> 
            {isBluetoothPrinting ? 'IMPRIMIENDO...' : 'IMPRIMIR BT'}
          </button>
          <Link 
            to="/" 
            className="h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black flex items-center justify-center text-sm active:scale-95"
          >
            NUEVA VENTA
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTicket;
