import React, { useState } from 'react';
import { API_KEY, fetchRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter } from './CommonComponents';

// Endpoint base para el algoritmo Burbuja Señal
const path: string = `${API_KEY}/ordenamiento/burbuja-senal`;

interface BubbleSortSignalPanelProps {
  onBack: () => void;
}

export const BubbleSortSignalPanel: React.FC<BubbleSortSignalPanelProps> = ({ onBack }) => {
  const { showNotification } = useNotification();

  // Estados de control para el tamaño del arreglo
  const [arraySize, setArraySize] = useState<string>('6');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);

  // Estados para manejo del input de elementos y visualizaciones
  const [inputArray, setInputArray] = useState<string>('5, 6, 7, 9, 1, 23');
  const [originalArray, setOriginalArray] = useState<number[]>([5, 6, 7, 9, 1, 23]);
  const [sortedArray, setSortedArray] = useState<number[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Convierte el string separado por comas a un array numérico
  const parseElements = (val: string): number[] => {
    return val
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '' && !isNaN(Number(item)))
      .map(Number);
  };

  // Handler al hacer clic en "Ordenar"
  const handleSort = () => {
    const parsed = parseElements(inputArray);
    const expectedSize = Number(arraySize);

    if (parsed.length === 0) {
      showNotification('warning', 'Entrada vacía', 'Por favor, ingrese al menos un número.');
      return;
    }

    if (parsed.length !== expectedSize) {
      showNotification(
        'warning',
        'Tamaño no coincide',
        `Ha ingresado ${parsed.length} elemento(s), pero el tamaño definido es ${expectedSize}.`
      );
      return;
    }

    setOriginalArray(parsed);
    setLoading(true);

    // Llamada HTTP enviando el arreglo desordenado al backend
    fetchRequest<number[]>(path, {
      method: 'POST',
      body: { array: parsed },
    })
      .then((res) => {
        setSortedArray(res);
        showNotification('success', 'Arreglo Ordenado', 'La ordenación mediante Burbuja Señal se completó con éxito.');
      })
      .catch((err: any) => {
        console.error(err);
        showNotification('error', 'Error al ordenar', err.message || 'No se pudo realizar el ordenamiento.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado en tono Violeta */}
      <PanelHeader
        category="MÉTODOS DE ORDENACIÓN"
        title="Método de Ordenación Burbuja Señal"
        subtitle="Bubble Sort with Flag Algorithm"
        colorScheme="purple"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        {/* Componente de Tamaño del Arreglo */}
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="purple"
        />

        {/* Input de Elementos + Botón Ordenar */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col gap-3">
          <label className="text-xs text-purple-300 font-medium text-center">
            Elementos (separados por comas):
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              placeholder="Ej: 5, 6, 7, 9, 1, 23"
              className="flex-1 bg-[#0a0d18] border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
            />
            <button
              onClick={handleSort}
              disabled={loading || !isSizeSet}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95 text-sm flex items-center gap-2 shrink-0"
            >
              <div className="w-3 h-3 rounded-full bg-white" />
              {loading ? 'Ordenando...' : 'Ordenar'}
            </button>
          </div>
        </div>

        {/* Paneles de Resultados (Desordenado vs Ordenado) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel Array Desordenado */}
          <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span className="text-sm font-bold text-slate-200">Array Desordenado</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {originalArray.map((val, idx) => (
                <div
                  key={idx}
                  className="w-11 h-11 bg-[#161c38] border border-purple-500/40 rounded-xl flex items-center justify-center font-bold text-purple-300 shadow-inner"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* Panel Array Ordenado */}
          <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <span className="text-sm font-bold text-slate-200">Array Ordenado</span>
            </div>

            {sortedArray ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {sortedArray.map((val, idx) => (
                  <div
                    key={idx}
                    className="w-11 h-11 bg-purple-600/20 border border-purple-400 rounded-xl flex items-center justify-center font-bold text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                  >
                    {val}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Haga clic en "Ordenar"</p>
            )}
          </div>
        </div>
      </main>

      {/* Botón de Atrás */}
      <PanelFooter onBack={onBack} label="Atrás" colorScheme="purple" />
    </div>
  );
};