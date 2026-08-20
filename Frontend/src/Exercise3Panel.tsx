import React, { useState } from 'react';
import { ArrowLeft, Check, UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';

interface Exercise3PanelProps {
  onBack: () => void;
}

type ActionType = 'alta' | 'baja' | 'modificar' | 'listarVarones' | 'listarUno';

export const Exercise3Panel: React.FC<Exercise3PanelProps> = ({ onBack }) => {
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');

  // Campos de formulario para el ejercicio de empleados (Nombre, Sexo, Edad)
  const [employeeName, setEmployeeName] = useState('');
  const [employeeGender, setEmployeeGender] = useState<'M' | 'F'>('M');
  const [employeeAge, setEmployeeAge] = useState('');
  const [newAge, setNewAge] = useState<string>('');

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <header className="text-center mt-2">
        <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
          Arreglos desordenados
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight mt-2 mb-1">
          Ejercicio 3: Registro de Empleados
        </h1>
        <p className="text-sm font-medium text-slate-400">
          Gestión de Personal de la Empresa
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
                min="1"
                value={arraySize}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val < 1 && e.target.value !== '') {
                    setArraySize('1');
                  } else {
                    setArraySize(e.target.value);
                  }
                  setIsSizeSet(false);
                }}
                className="w-20 bg-[#0a0d18] border border-cyan-500/40 rounded-xl px-3 py-1.5 text-center text-white font-bold text-lg focus:outline-none focus:border-cyan-400 transition-all"
                placeholder="1"
              />
              <button
                onClick={() => {
                  if (Number(arraySize) > 0) {
                    setIsSizeSet(true);
                  }
                }}
                disabled={!arraySize || Number(arraySize) <= 0}
                className={`p-2 rounded-xl border transition-all flex items-center justify-center ${
                  isSizeSet
                    ? 'bg-cyan-500 text-white border-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]'
                    : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed'
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
              { id: 'modificar', label: 'Actualizar Edad', icon: Edit3 },
              { id: 'listarVarones', label: 'Listar Varones', icon: Users },
              { id: 'listarUno', label: 'Listar Registro', icon: UserCheck },
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
          
          {/* 1. Dar de alta a un empleado */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-cyan-400" /> Dar de Alta a un Empleado
              </h3>
              <div>
                <label className="text-xs text-slate-400">Nombre Completo:</label>
                <input
                  type="text"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Ej: Carlos Eduardo Mendoza"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400">Sexo:</label>
                  <select
                    value={employeeGender}
                    onChange={(e) => setEmployeeGender(e.target.value as 'M' | 'F')}
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="M">Masculino (M)</option>
                    <option value="F">Femenino (F)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400">Edad:</label>
                  <input
                    type="number"
                    min="18"
                    max="99"
                    value={employeeAge}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        setEmployeeAge('');
                        return;
                      }
                      const numVal = Number(val);
                      if (numVal > 99) {
                        setEmployeeAge('99');
                      } else {
                        setEmployeeAge(val);
                      }
                    }}
                    onBlur={() => {
                      if (employeeAge !== '' && Number(employeeAge) < 18) {
                        setEmployeeAge('18');
                      }
                    }}
                    placeholder="Ej: 28"
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
              <button className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm">
                Guardar Empleado
              </button>
            </div>
          )}

          {/* 2. Dar de baja a un empleado */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Dar de Baja a un Empleado
              </h3>
              <div>
                <label className="text-xs text-slate-400">Ingrese Nombre del Empleado:</label>
                <input
                  type="text"
                  placeholder="Ej: Carlos Eduardo Mendoza"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-red-400"
                />
              </div>
              <button className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm">
                Dar de Baja
              </button>
            </div>
          )}

          {/* 3. Actualizar la edad de un empleado determinado */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-cyan-400" /> Actualizar Edad de un Empleado
              </h3>
              <div>
                <label className="text-xs text-slate-400">Nombre del Empleado:</label>
                <input
                  type="text"
                  placeholder="Ej: Carlos Eduardo Mendoza"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nueva Edad:</label>
                <input
                  type="number"
                  min="18"
                  max="99"
                  value={newAge}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === '') {
                      setNewAge('');
                      return;
                    }
                    const numVal = Number(val);
                    if (numVal > 99) {
                      setNewAge('99');
                    } else {
                      setNewAge(val);
                    }
                  }}
                  onBlur={() => {
                    if (newAge !== '' && Number(newAge) < 18) {
                      setNewAge('18');
                    }
                  }}
                  placeholder="Ej: 30"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <button className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm">
                Actualizar Edad
              </button>
            </div>
          )}

          {/* 4. Imprimir todos los registros de los empleados varones */}
          {selectedAction === 'listarVarones' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Users className="w-5 h-5 text-cyan-400" /> Registros de Empleados Varones
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="text-xs uppercase bg-[#0a0d18] text-cyan-400">
                    <tr>
                      <th className="p-2.5 rounded-l-lg">Posición</th>
                      <th className="p-2.5">Nombre Completo</th>
                      <th className="p-2.5">Sexo</th>
                      <th className="p-2.5 rounded-r-lg">Edad</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cyan-500/10">
                    <tr className="hover:bg-cyan-500/5">
                      <td className="p-2.5 font-mono text-cyan-400">[0]</td>
                      <td className="p-2.5 font-medium text-white">Carlos Eduardo Mendoza</td>
                      <td className="p-2.5">Masculino (M)</td>
                      <td className="p-2.5 font-semibold text-white">28 años</td>
                    </tr>
                    <tr className="hover:bg-cyan-500/5">
                      <td className="p-2.5 font-mono text-cyan-400">[2]</td>
                      <td className="p-2.5 font-medium text-white">Alejandro Ruiz</td>
                      <td className="p-2.5">Masculino (M)</td>
                      <td className="p-2.5 font-semibold text-white">35 años</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Imprimir un registro determinado */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-cyan-400" /> Consultar Registro Determinado
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ingrese Nombre del Empleado"
                  className="flex-1 bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all">
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
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold hover:from-cyan-500 hover:to-blue-500 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          Salir
        </button>
      </footer>
    </div>
  );
};