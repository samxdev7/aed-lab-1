import React, { useState } from 'react';
import { ArrowLeft, Check, UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';

interface Exercise4PanelProps {
  onBack: () => void;
}

type ActionType = 'alta' | 'baja' | 'modificar' | 'listarTodos' | 'listarUno';

export const Exercise4Panel: React.FC<Exercise4PanelProps> = ({ onBack }) => {
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');

  // Campos de formulario ficticios para el frontend
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [empYears, setEmpYears] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <header className="text-center mt-2">
        <span className="text-xs uppercase tracking-widest text-purple-400 font-bold bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
          Arreglos Ordenados
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2 mb-1">
          Ejercicio 4: Registro de Empleados
        </h1>
        <p className="text-sm font-medium text-slate-400">
          Registro y Control de Empleados
        </p>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        
        {/* 1. Ingresar Tamaño de Arreglo (Boceto: Ing. tam. Arreglo [ 7 ] [G]) */}
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

        {/* 2. Opciones de Acción (Boceto: Radio buttons) */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Selecciona una Operación
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { id: 'alta', label: 'Dar de Alta', icon: UserPlus },
              { id: 'baja', label: 'Dar de Baja', icon: UserMinus },
              { id: 'modificar', label: 'Mod. años de Antigüedad', icon: Edit3 },
              { id: 'listarTodos', label: 'Listar Todos', icon: Users },
              { id: 'listarUno', label: 'Listar Uno', icon: UserCheck },
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
          
          {/* Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-purple-400" /> Registrar Nuevo Empleado
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">ID / Código:</label>
                  <input
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    placeholder="Eje: EMP-01"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Antigüedad (Años):</label>
                  <input
                    type="number"
                    value={empYears}
                    onChange={(e) => setEmpYears(e.target.value)}
                    placeholder="Eje: 3"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400">Nombre Completo:</label>
                <input
                  type="text"
                  value={empName}
                  onChange={(e) => setEmpName(e.target.value)}
                  placeholder="Eje: Juan Pérez"
                  className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>
              <button className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm">
                Guardar Empleado
              </button>
            </div>
          )}

          {/* Dar de Baja */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Eliminar / Dar de Baja Empleado
              </h3>
              <div>
                <label className="text-xs text-slate-400">Ingrese ID del Empleado:</label>
                <input
                  type="text"
                  placeholder="Eje: EMP-01"
                  className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-400"
                />
              </div>
              <button className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm">
                Dar de Baja
              </button>
            </div>
          )}

          {/* Modificar Antigüedad */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-purple-400" /> Modificar Años de Antigüedad
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">ID del Empleado:</label>
                  <input
                    type="text"
                    placeholder="Eje: EMP-01"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Nuevos Años:</label>
                  <input
                    type="number"
                    placeholder="Eje: 5"
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
              <button className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm">
                Actualizar Antigüedad
              </button>
            </div>
          )}

          {/* Listar Todos los Empleados */}
          {selectedAction === 'listarTodos' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Users className="w-5 h-5 text-purple-400" /> Lista General de Empleados
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-[#0a0d18] text-purple-400">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">Posición</th>
                      <th className="p-2.5">ID</th>
                      <th className="p-2.5">Nombre</th>
                      <th className="p-2.5 rounded-r-lg">Antigüedad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-500/10">
                    <tr className="hover:bg-purple-500/5">
                      <td className="p-2.5 font-mono text-purple-400">[0]</td>
                      <td className="p-2.5">EMP-01</td>
                      <td className="p-2.5 font-medium text-white">Carlos Mendoza</td>
                      <td className="p-2.5">4 años</td>
                    </tr>
                    <tr className="hover:bg-purple-500/5">
                      <td className="p-2.5 font-mono text-purple-400">[1]</td>
                      <td className="p-2.5">EMP-02</td>
                      <td className="p-2.5 font-medium text-white">Ana Gutiérrez</td>
                      <td className="p-2.5">2 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Listar Empleado Determinado */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-purple-400" /> Buscar Empleado Determinado
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingrese ID (Eje: EMP-01)"
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

      {/* Botón Atrás (6. Salir) */}
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