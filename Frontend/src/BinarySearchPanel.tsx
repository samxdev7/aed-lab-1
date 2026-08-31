import React, { useState } from 'react';
import { ArrowLeft, Search, Save, CheckCircle2 } from 'lucide-react';
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

  // Guardar tamaño
  const handleGuardarTamano = () => {
    const num = parseInt(tamano);
    if (isNaN(num) || num <= 0) {
      setError('Por favor ingresa un tamaño válido mayor a 0');
      return;
    }
    setError(null);
  };

  // Guardar elementos y validar
  const handleGuardarElementos = () => {
    const tamNum = parseInt(tamano);
    const valores = elementosInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .map(Number);

    if (valores.some(isNaN)) {
      setError('Ingresa solo números separados por comas');
      return;
    }

    if (tamNum && valores.length !== tamNum) {
      setError(`Debes ingresar exactamente ${tamNum} elementos (tienes ${valores.length})`);
      return;
    }

    // Ordenar para garantizar que sea un array ordenado
    const ordenado = [...valores].sort((a, b) => a - b);
    setArregloGuardado(ordenado);
    setError(null);
  };

  // Ejecutar Búsqueda Binaria contra el Backend
  const handleBuscar = async () => {
    if (arregloGuardado.length === 0) {
      setError('Primero debes ingresar y guardar los elementos del arreglo');
      return;
    }
    const valObjetivo = parseFloat(objetivo);
    if (isNaN(valObjetivo)) {
      setError('Ingresa un número válido a buscar');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const data = await ejecutarBusqueda({
        tam: arregloGuardado.length,
        arreglo: arregloGuardado,
        objetivo: valObjetivo,
      });

      // Asumiendo que el backend retorna { posicion: number } o un mensaje/índice
      if (data.posicion !== undefined && data.posicion !== -1) {
        setResultado(`El elemento ${valObjetivo} está en la posición ${data.posicion}.`);
      } else if (typeof data === 'number' && data !== -1) {
        setResultado(`El elemento ${valObjetivo} está en la posición ${data}.`);
      } else {
        setResultado(`El elemento ${valObjetivo} no se encuentra en el arreglo.`);
      }
    } catch (err: any) {
      setError('Error al comunicar con el backend');
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
        <div className="max-w-3xl mx-auto w-full bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-xl text-center text-sm">
          {error}
        </div>
      )}

      {/* Contenido Principal */}
      <main className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto py-4">
        
        {/* Columna Izquierda: Configuración de Entradas */}
        <div className="flex flex-col gap-4 bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30">
          
          {/* Tam. del Arreglo */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Tam. del Arreglo
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={tamano}
                onChange={(e) => setTamano(e.target.value)}
                placeholder="Ej. 6"
                className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleGuardarTamano}
                className="p-2.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-colors"
                title="Guardar Tamaño"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Elementos */}
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Elementos (separados por coma)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={elementosInput}
                onChange={(e) => setElementosInput(e.target.value)}
                placeholder="Ej. 1, 3, 7, 9, 12, 15"
                className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleGuardarElementos}
                className="p-2.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-colors"
                title="Guardar Elementos"
              >
                <Save className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Elemento a Buscar */}
          <div className="mt-2 pt-4 border-t border-slate-700/50">
            <label className="block text-sm font-semibold text-slate-300 mb-1">
              Elemento a Buscar (X)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="Ej. 12"
                className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleBuscar}
                disabled={cargando}
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                {cargando ? '...' : 'Buscar'}
              </button>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Previsualización y Resultados */}
        <div className="flex flex-col gap-4">
          
          {/* Caja: Array Ordenado */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 flex-1 flex flex-col justify-center items-center text-center">
            <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase mb-2">
              Array Ordenado
            </span>
            <div className="flex flex-wrap justify-center gap-2 my-2">
              {arregloGuardado.length > 0 ? (
                arregloGuardado.map((val, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/40 rounded-lg text-cyan-300 font-mono text-lg font-bold"
                  >
                    {val}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic text-sm">
                  Sin elementos registrados
                </span>
              )}
            </div>
          </div>

          {/* Caja: Resultado de la búsqueda */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 min-h-[100px] flex items-center justify-center text-center">
            {resultado ? (
              <div className="flex items-center gap-3 text-emerald-400 font-medium">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <p className="text-lg">{resultado}</p>
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">
                El resultado de la búsqueda se mostrará aquí
              </p>
            )}
          </div>

        </div>
      </main>

      {/* Botón Atrás */}
      <footer className="flex justify-end w-full max-w-4xl mx-auto">
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