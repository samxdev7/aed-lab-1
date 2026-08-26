import React, { useState } from 'react';
import { ArrowLeft, Check, UserPlus, DollarSign, Search } from 'lucide-react';

interface Exercise6PanelProps {
  onBack: () => void;
}

type ActionType = 'alta' | 'modificar' | 'listarUno';

export const Exercise6Panel: React.FC<Exercise6PanelProps> = ({ onBack }) => {
  const [arraySize, setArraySize] = useState<string>('5');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');

  // Campos de formulario para Vendedores
  const [sellerId, setSellerId] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [totalSales, setTotalSales] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <header className="text-center mt-2">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          Arreglos Ordenados
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2 mb-1">
          Ejercicio 6: Registro de Vendedores
        </h1>
        <p className="text-sm font-medium text-slate-400">
          Registro y Control de Vendedores
        </p>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        
        {/* 1. Ingresar Tamaño de Arreglo */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-purple-400 font-semibold text-sm">
              Ingresar Tamaño del Arreglo:
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={arraySize}
                onChange={(e) => {
                  setArraySize(e.target.value);
                  setIsSizeSet(false);
                }}
                className="w-20 bg-[#0a0d18] border border-purple-500/40 rounded-xl px-3 py-1.5 text-center text-white font-bold text-lg focus:outline-none focus:border-purple-400 transition-all"
                placeholder="0"
              />
              <button
                onClick={() => setIsSizeSet(true)}
                className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                  isSizeSet
                    ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                    : 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500 hover:text-white'
                }`}
                title="Establecer Tamaño"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isSizeSet && (
            <span className="text-xs text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
              Tamaño definido: <strong className="text-white">{arraySize}</strong> elementos
            </span>
          )}
        </div>

        {/* 2. Opciones de Acción */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Selecciona una Operación
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {[
              { id: 'alta', label: '1. Dar de alta a Vendedor', icon: UserPlus },
              { id: 'modificar', label: '2. Modificar total de ventas', icon: DollarSign },
              { id: 'listarUno', label: '3. Imprimir registro de Vendedor', icon: Search },
            ].map((action) => {
              const Icon = action.icon;
              const isSelected = selectedAction === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id as ActionType)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold border transition-all duration-200 justify-center ${
                    isSelected
                      ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] scale-[1.02]'
                      : 'bg-[#0a0d18] text-slate-300 border-purple-500/20 hover:border-purple-500/50 hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="operation"
                    checked={isSelected}
                    onChange={() => {}}
                    className="accent-purple-400 cursor-pointer"
                  />
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Panel Dinámico según la acción seleccionada */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* 1. Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-purple-400" /> Registrar Nuevo Vendedor
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">ID / Número Vendedor:</label>
                  <input
                    type="text"
                    value={sellerId}
                    onChange={(e) => setSellerId(e.target.value)}
                    placeholder="Eje: VEN-01"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Total de Ventas ($):</label>
                  <input
                    type="number"
                    value={totalSales}
                    onChange={(e) => setTotalSales(e.target.value)}
                    placeholder="Eje: 1250.00"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400">Nombre del Vendedor:</label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  placeholder="Eje: Roberto Gómez"
                  className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <button className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm">
                Guardar Vendedor
              </button>
            </div>
          )}

          {/* 2. Modificar Total de Ventas */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <DollarSign className="w-5 h-5 text-purple-400" /> Modificar Total de Ventas
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">ID del Vendedor:</label>
                  <input
                    type="text"
                    placeholder="Eje: VEN-01"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Nuevo Total Ventas ($):</label>
                  <input
                    type="number"
                    placeholder="Eje: 1800.00"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <button className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm">
                Actualizar Ventas
              </button>
            </div>
          )}

          {/* 3. Imprimir Registro de Vendedor Determinado */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Search className="w-5 h-5 text-purple-400" /> Imprimir Registro de Vendedor
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingrese ID Vendedor (Eje: VEN-01)"
                  className="flex-1 bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                />
                <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
                  Buscar
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Botón Atrás (Omitido Salir por Atrás) */}
      <footer className="flex justify-end w-full max-w-4xl mx-auto mt-2">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          Atrás
        </button>
      </footer>
    </div>
  );
};