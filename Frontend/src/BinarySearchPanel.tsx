import React, { useState } from 'react';
import { ArrowLeft, Save, Search, CheckCircle2 } from 'lucide-react';
import { ejecutarBusqueda } from './services/algorithmService';

interface BinarySearchPanelProps {
  onBack: () => void;
}

export const BinarySearchPanel: React.FC<BinarySearchPanelProps> = ({ onBack }) => {
  const [tamano, setTamano] = useState<string>('');
  const [elementosInput, setElementosInput] = useState<string>('');
  const [arregloGuardado, setArregloGuardado] = useState<number[]>([]);

  const [objetivo, setObjetivo] = useState<string>('');
  
  const [resultado, setResultado] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Guardar Tamaño
  const handleGuardarTamano = () => {
    const num = parseInt(tamano);
    if (isNaN(num) || num <= 0) {
      setError('Por favor ingresa un número entero válido y mayor a 0 para el tamaño.');
      return;
    }
    setError(null);
  };

  // Guardar Elementos y Ordenar
  const handleGuardarElementos = () => {
    const tamNum = parseInt(tamano);
    if (!tamNum || isNaN(tamNum) || tamNum <= 0) {
      setError('Primero debes ingresar y guardar un tamaño válido mayor a 0.');
      return;
    }

    if (!elementosInput.trim()) {
      setError('El campo de elementos no puede estar vacío.');
      return;
    }

    const items = elementosInput.split(',').map((item) => item.trim()).filter((item) => item !== '');

    // Validar que todos los elementos sean valores numéricos
    const hayInvalidos = items.some((item) => isNaN(Number(item)));
    if (hayInvalidos) {
      setError('Has ingresado un valor no numérico. Solo se permiten números separados por comas.');
      return;
    }

    const valores = items.map(Number);

    if (valores.length !== tamNum) {
      setError(`Se esperaban ${tamNum} elementos según el tamaño ingresado, pero ingresaste ${valores.length}.`);
      return;
    }

    const ordenado = [...valores].sort((a, b) => a - b);
    setArregloGuardado(ordenado);
    setError(null);
  };

  // Ejecutar Búsqueda contra Backend
  const handleBuscar = async () => {
    if (arregloGuardado.length === 0) {
      setError('Primero debes ingresar y guardar los elementos del arreglo.');
      return;
    }
    
    if (!objetivo.trim()) {
      setError('Por favor ingresa el valor que deseas buscar.');
      return;
    }

    const valBuscar = parseFloat(objetivo);
    if (isNaN(valBuscar)) {
      setError('El elemento a buscar debe ser un número válido.');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const data = await ejecutarBusqueda({
        tam: arregloGuardado.length,
        arreglo: arregloGuardado,
        objetivo: valBuscar,
      });

      const pos = data.posicion !== undefined ? data.posicion : data;

      if (pos !== undefined && pos !== -1) {
        setResultado(`El elemento ${valBuscar} está en la posición ${pos}.`);
      } else {
        setResultado(`El elemento ${valBuscar} no se encuentra en el arreglo.`);
      }
    } catch {
      setError('Error al comunicar con el backend. Verifica que Spring Boot esté activo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <header className="text-center mt-2">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Método de Búsqueda Binaria
        </h1>
        <div className="flex items-center justify-center gap-3 text-cyan-400">
          <span className="h-[1px] w-12 bg-cyan-500/40"></span>
          <p className="text-sm font-medium text-slate-300">
            Laboratorio 2 - Algoritmos de Búsqueda
          </p>
          <span className="h-[1px] w-12 bg-cyan-500/40"></span>
        </div>
      </header>

      {/* Mensaje de Error */}
      {error && (
        <div className="max-w-3xl mx-auto w-full bg-red-500/10 border border-red-500/40 text-red-400 p-3.5 rounded-xl text-center text-sm font-medium my-2 animate-fade-in">
          {error}
        </div>
      )}

      {/* Estructura Principal */}
      <main className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-4">
        
        {/* SECCIÓN IZQUIERDA: Entradas + Array Ordenado */}
        <div className="flex flex-col gap-6">
          
          {/* Inputs de Entrada */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 flex flex-col gap-5">
            {/* Tam. del Arreglo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-base font-semibold text-slate-300 whitespace-nowrap">
                Tam. del Arreglo
              </label>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="number"
                  value={tamano}
                  onChange={(e) => setTamano(e.target.value)}
                  placeholder="Ej. 6"
                  className="w-full sm:w-64 bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-4 py-3 text-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  onClick={handleGuardarTamano}
                  className="p-3 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-colors shrink-0"
                  title="Guardar Tamaño"
                >
                  <Save className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Elementos */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label className="text-base font-semibold text-slate-300 whitespace-nowrap">
                Elementos
              </label>
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={elementosInput}
                  onChange={(e) => setElementosInput(e.target.value)}
                  placeholder="Ej. 1, 3, 7, 9, 12, 15"
                  className="w-full sm:w-64 bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-4 py-3 text-lg text-white focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <button
                  onClick={handleGuardarElementos}
                  className="p-3 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-colors shrink-0"
                  title="Guardar Elementos"
                >
                  <Save className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Caja Array Ordenado con Scroll Horizontal */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 min-h-[160px] flex flex-col justify-between">
            <div className="w-full overflow-x-auto pb-3 custom-scrollbar">
              <div className="flex items-center gap-2.5 min-w-max my-auto py-2 px-1">
                {arregloGuardado.length > 0 ? (
                  arregloGuardado.map((val, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2.5 bg-cyan-500/10 border border-cyan-500/40 rounded-xl text-cyan-300 font-mono text-xl font-bold shrink-0"
                    >
                      {val}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 italic text-base mx-auto">
                    1 3 7 9 12 15
                  </span>
                )}
              </div>
            </div>
            <span className="text-sm font-bold text-slate-300 tracking-wider text-center mt-2">
              Array Ordenado
            </span>
          </div>

        </div>

        {/* SECCIÓN DERECHA: Búsqueda (X) + Resultado */}
        <div className="flex flex-col gap-6 justify-between">
          
          {/* Elemento a Buscar (X) + Buscar */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <label className="text-base font-semibold text-slate-300 whitespace-nowrap">
              Elemento a Buscar
            </label>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="number"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="X"
                className="w-full sm:w-28 bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-4 py-3 text-center text-lg text-white focus:outline-none focus:border-cyan-400 font-bold transition-colors"
              />
              <button
                onClick={handleBuscar}
                disabled={cargando}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 disabled:opacity-50 text-base shrink-0"
              >
                <Search className="w-5 h-5" />
                {cargando ? '...' : 'Buscar'}
              </button>
            </div>
          </div>

          {/* Caja Grande de Resultado */}
          <div className="bg-[#11162b] p-8 rounded-2xl border border-cyan-500/30 flex-1 min-h-[180px] flex items-center justify-center text-center">
            {resultado ? (
              <div className="flex items-center gap-3 text-emerald-400 font-medium">
                <CheckCircle2 className="w-8 h-8 shrink-0" />
                <p className="text-xl font-semibold">{resultado}</p>
              </div>
            ) : (
              <p className="text-slate-400 text-base italic">
                El elemento X está en la posición Y.
              </p>
            )}
          </div>

        </div>

      </main>

      {/* Botón Atrás */}
      <footer className="flex justify-end w-full max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 active:scale-95 text-base"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          Atrás
        </button>
      </footer>
    </div>
  );
};