import React, { useState } from 'react';
import { ArrowLeft, Check, UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';

interface Exercise1PanelProps {
  onBack: () => void;
}

type ActionType = 'alta' | 'baja' | 'modificar' | 'listarTodos' | 'listarUno';

export const Exercise1Panel: React.FC<Exercise1PanelProps> = ({ onBack }) => {
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');

  // Campos de formulario ficticios para el frontend
  const [studentName, setStudentName] = useState('');
  const [studentSemesters, setStudentSemesters] = useState('');
  const [studentAverage, setStudentAverage] = useState('');

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <header className="text-center mt-2">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Arreglos
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2 mb-1">
          Ejercicio 1: Registro de Alumnos
        </h1>
        <p className="text-sm font-medium text-slate-400">
          Registro y Control de Alumnos de Escuela
        </p>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        
        {/* 1. Ingresar Tamaño de Arreglo */}
        <div className="bg-[#11162b] border border-cyan-500/30 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-semibold text-sm">
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
                className="w-20 bg-[#0a0d18] border border-cyan-500/40 rounded-xl px-3 py-1.5 text-center text-white font-bold text-lg focus:outline-none focus:border-cyan-400 transition-all"
                placeholder="0"
              />
              <button
                onClick={() => setIsSizeSet(true)}
                className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                  isSizeSet
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500 hover:text-white'
                }`}
                title="Establecer Tamaño"
              >
                <Check className="w-5 h-5" />
              </button>
            </div>
          </div>

          {isSizeSet && (
            <span className="text-xs text-cyan-300 bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20">
              Tamaño definido: <strong className="text-white">{arraySize}</strong> elementos
            </span>
          )}
        </div>

        {/* 2. Opciones de Acción */}
        <div className="bg-[#11162b] border border-cyan-500/30 rounded-2xl p-4">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
            Selecciona una Operación
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { id: 'alta', label: 'Dar de Alta', icon: UserPlus },
              { id: 'baja', label: 'Dar de Baja', icon: UserMinus },
              { id: 'modificar', label: 'Mod. Semestres y Promedio', icon: Edit3 },
              { id: 'listarUno', label: 'Listar Alumno Determinado', icon: UserCheck },
              { id: 'listarTodos', label: 'Listar Todos', icon: Users },
            ].map((action) => {
              const Icon = action.icon;
              const isSelected = selectedAction === action.id;
              return (
                <button
                  key={action.id}
                  onClick={() => setSelectedAction(action.id as ActionType)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-xs font-semibold border transition-all duration-200 justify-center ${
                    isSelected
                      ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)] scale-[1.02]'
                      : 'bg-[#0a0d18] text-slate-300 border-cyan-500/20 hover:border-cyan-500/50 hover:text-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="operation"
                    checked={isSelected}
                    onChange={() => {}}
                    className="accent-cyan-400 cursor-pointer"
                  />
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Panel Dinámico según la acción seleccionada */}
        <div className="bg-[#11162b] border border-cyan-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* 1. Dar de Alta a un alumno */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-cyan-400" /> Dar de Alta a un Alumno
              </h3>
              <div>
                <label className="text-xs text-slate-400">Nombre Completo:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ej: Ana María Gómez"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Semestres Cursados:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={studentSemesters}
                    onChange={(e) => { 
                        const val = Number(e.target.value);
                        if (val < 0) setStudentSemesters('0');
                        else if (val > 100) setStudentSemesters('100');
                        else setStudentSemesters(e.target.value);
                    }}
                    placeholder="Ej: 4"
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Calificación Promedio Total:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={studentAverage}
                    onChange={(e) => { 
                        const val = Number(e.target.value);
                        if (val < 0) setStudentAverage('0');
                        else if (val > 100) setStudentAverage('100');
                        else setStudentAverage(e.target.value);
                    }}
                    placeholder="Ej: 100"
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
              <button className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm">
                Guardar Alumno
              </button>
            </div>
          )}

          {/* 2. Dar de Baja a un alumno */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Dar de Baja a un Alumno
              </h3>
              <div>
                <label className="text-xs text-slate-400">Ingrese Nombre Completo del Alumno:</label>
                <input
                  type="text"
                  placeholder="Ej: Ana María Gómez"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-400"
                />
              </div>
              <button className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm">
                Dar de Baja
              </button>
            </div>
          )}

          {/* 3. Modificar número de semestre cursados y promedio total */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-cyan-400" /> Modificar Semestres y Promedio
              </h3>
              <div>
                <label className="text-xs text-slate-400">Nombre del Alumno:</label>
                <input
                  type="text"
                  placeholder="Ej: Ana María Gómez"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Nuevos Semestres:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    onChange={(e) => { 
                        const val = Number(e.target.value);
                        if (val < 0) setStudentSemesters('0');
                        else if (val > 100) setStudentSemesters('100');
                        else setStudentSemesters(e.target.value);
                    }}
                    placeholder="Ej: 5"
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400">Nuevo Promedio:</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    onChange={(e) => { 
                        const val = Number(e.target.value);
                        if (val < 0) setStudentAverage('0');
                        else if (val > 100) setStudentAverage('100');
                        else setStudentAverage(e.target.value);
                    }}
                    placeholder="Ej: 100"
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
              <button className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm">
                Actualizar Datos
              </button>
            </div>
          )}

          {/* 4. Listar nombre, numero de semestre cursado y promedio de un alumno determinado */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-cyan-400" /> Consultar Alumno Determinado
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingrese Nombre del Alumno"
                  className="flex-1 bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
                  Buscar
                </button>
              </div>
            </div>
          )}

          {/* 5. Listar todos los registros */}
          {selectedAction === 'listarTodos' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Users className="w-5 h-5 text-cyan-400" /> Todos los Registros
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-[#0a0d18] text-cyan-400">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">Posición</th>
                      <th className="p-2.5">Nombre Completo</th>
                      <th className="p-2.5">Semestres Cursados</th>
                      <th className="p-2.5 rounded-r-lg">Promedio Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-500/10">
                    <tr className="hover:bg-cyan-500/5">
                      <td className="p-2.5 font-mono text-cyan-400">[0]</td>
                      <td className="p-2.5 font-medium text-white">Ana María Gómez</td>
                      <td className="p-2.5">4 semestres</td>
                      <td className="p-2.5">100</td>
                    </tr>
                    <tr className="hover:bg-cyan-500/5">
                      <td className="p-2.5 font-mono text-cyan-400">[1]</td>
                      <td className="p-2.5 font-medium text-white">Carlos Mendoza</td>
                      <td className="p-2.5">2 semestres</td>
                      <td className="p-2.5">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Botón Atrás (6. Salir) */}
      <footer className="flex justify-end w-full max-w-4xl mx-auto mt-2">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          Salir
        </button>
      </footer>
    </div>
  );
};