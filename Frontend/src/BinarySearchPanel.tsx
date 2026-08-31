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
  const [objetivoGuardado, setObjetivoGuardado] = useState<number | null>(null);
  
  const [resultado, setResultado] = useState<string | null>(null);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Guardar Tamaño
  const handleGuardarTamano = () => {
    const num = parseInt(tamano);
    if (isNaN(num) || num <= 0) {
      setError('Por favor ingresa un tamaño válido mayor a 0');
      return;
    }
    setError(null);
  };

  // Guardar Elementos y Ordenar
  const handleGuardarElementos = () => {
    const tamNum = parseInt(tamano);
    if (!tamNum) {
      setError('Primero debes ingresar y guardar el Tamaño del Arreglo');
      return;
    }

    const valores = elementosInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .map(Number);

    if (valores.some(isNaN)) {
      setError('Ingresa solo números separados por comas (Ej: 1, 3, 7, 9)');
      return;
    }

    if (valores.length !== tamNum) {
      setError(`Debes ingresar exactamente ${tamNum} elementos separados por coma`);
      return;
    }

    const ordenado = [...valores].sort((a, b) => a - b);
    setArregloGuardado(ordenado);
    setError(null);
  };

  // Guardar Elemento a Buscar (X)
  const handleGuardarObjetivo = () => {
    const num = parseFloat(objetivo);
    if (isNaN(num)) {
      setError('Ingresa un número válido para el Elemento a Buscar (X)');
      return;
    }
    setObjetivoGuardado(num);
    setError(null);
  };

  // Ejecutar Búsqueda contra Backend
  const handleBuscar = async () => {
    if (arregloGuardado.length === 0) {
      setError('Primero debes ingresar y guardar los elementos del arreglo');
      return;
    }
    
    const valBuscar = objetivoGuardado !== null ? objetivoGuardado : parseFloat(objetivo);
    if (isNaN(valBuscar)) {
      setError('Ingresa y guarda un número válido en Elemento a Buscar');
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
    } catch (err) {
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
        <div className="max-w-3xl mx-auto w-full bg-red-500/10 border border-red-500/40 text-red-400 p-3 rounded-xl text-center text-sm my-2">
          {error}
        </div>
      )}

      {/* Estructura Principal fiel al Boceto */}
      <main className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 my-auto py-4">
        
        {/* SECCIÓN IZQUIERDA: Entradas + Array Ordenado debajo */}
        <div className="flex flex-col gap-6">
          
          {/* Inputs de Entrada */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 flex flex-col gap-4">
            {/* Tam. del Arreglo */}
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-semibold text-slate-300 whitespace-nowrap">
                Tam. del Arreglo
              </label>
              <div className="flex gap-2 w-full max-w-[240px]">
                <input
                  type="number"
                  value={tamano}
                  onChange={(e) => setTamano(e.target.value)}
                  placeholder="Ej. 6"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
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
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-semibold text-slate-300 whitespace-nowrap">
                Elementos
              </label>
              <div className="flex gap-2 w-full max-w-[240px]">
                <input
                  type="text"
                  value={elementosInput}
                  onChange={(e) => setElementosInput(e.target.value)}
                  placeholder="Ej. 1, 3, 7, 9, 12, 15"
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
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
          </div>

          {/* Caja Array Ordenado (Ubicada Abajo a la Izquierda como la pizarra) */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 min-h-[160px] flex flex-col justify-between items-center text-center">
            <div className="flex flex-wrap justify-center items-center gap-2 my-auto">
              {arregloGuardado.length > 0 ? (
                arregloGuardado.map((val, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-2 bg-cyan-500/10 border border-cyan-500/40 rounded-lg text-cyan-300 font-mono text-xl font-bold"
                  >
                    {val}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 italic text-sm">
                  1 3 7 9 12 15
                </span>
              )}
            </div>
            <span className="text-sm font-bold text-slate-300 tracking-wider">
              Array Ordenado
            </span>
          </div>

        </div>

        {/* SECCIÓN DERECHA: Búsqueda (X) + Caja de Resultado */}
        <div className="flex flex-col gap-6 justify-between">
          
          {/* Elemento a Buscar (X) + Guardar + Buscar */}
          <div className="bg-[#11162b] p-6 rounded-2xl border border-cyan-500/30 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-semibold text-slate-300 whitespace-nowrap">
                Elemento a Buscar
              </label>
              
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={objetivo}
                  onChange={(e) => setObjetivo(e.target.value)}
                  placeholder="X"
                  className="w-16 bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-center text-white focus:outline-none focus:border-cyan-400 font-bold"
                />
                <button
                  onClick={handleGuardarObjetivo}
                  className="p-2.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500 hover:text-white rounded-xl transition-colors"
                  title="Guardar X"
                >
                  <Save className="w-5 h-5" />
                </button>
                <button
                  onClick={handleBuscar}
                  disabled={cargando}
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Search className="w-4 h-4" />
                  {cargando ? '...' : 'Buscar'}
                </button>
              </div>
            </div>
          </div>

          {/* Caja Grande de Resultado */}
          <div className="bg-[#11162b] p-8 rounded-2xl border border-cyan-500/30 flex-1 min-h-[180px] flex items-center justify-center text-center">
            {resultado ? (
              <div className="flex items-center gap-3 text-emerald-400 font-medium">
                <CheckCircle2 className="w-7 h-7 shrink-0" />
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
          className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          Atrás
        </button>
      </footer>
    </div>
  );
};