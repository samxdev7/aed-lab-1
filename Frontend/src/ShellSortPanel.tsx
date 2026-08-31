import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { API_KEY, fetchRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter } from './CommonComponents';

// Endpoint base para el algoritmo Shell
const path: string = `${API_KEY}/ordenamiento/shell`;

interface ShellSortPanelProps {
  onBack: () => void;
}

export const ShellSortPanel: React.FC<ShellSortPanelProps> = ({ onBack }) => {
  const { showNotification } = useNotification();

  // Estados de control (inician vacíos)
  const [arraySize, setArraySize] = useState<string>('6');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  const [rawInput, setRawInput] = useState<string>('');
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState<number[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Ejecución del algoritmo vía backend
  const handleSort = () => {
    if (!rawInput.trim()) {
      showNotification('warning', 'Entrada vacía', 'Por favor ingrese números separados por comas.');
      return;
    }

    const parsedArray = rawInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .map(Number);

    if (parsedArray.some(isNaN)) {
      showNotification('error', 'Formato inválido', 'Asegúrese de ingresar únicamente números válidos.');
      return;
    }

    const limit = Number(arraySize);
    if (parsedArray.length > limit) {
      showNotification(
        'warning',
        'Límite excedido',
        `El arreglo contiene más elementos (${parsedArray.length}) que el tamaño definido (${limit}).`
      );
      return;
    }

    setOriginalArray(parsedArray);
    setLoading(true);

    const payload = {
      tam: limit,
      elementos: parsedArray,
    };

    fetchRequest<number[]>(path, { method: 'POST', body: payload })
      .then((res) => {
        setSortedArray(res);
        showNotification(
          'success',
          'Ordenamiento completado',
          'El arreglo fue ordenado exitosamente con el método Shell.'
        );
      })
      .catch((err) => {
        console.error(err);
        showNotification('error', 'Error de Backend', err.message || 'No se pudo ordenar el arreglo.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Header */}
      <PanelHeader
        category="MÉTODOS DE ORDENACIÓN"
        title="Método Shell"
        subtitle="Shell Sort Algorithm"
        colorScheme="purple"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        {/* Tamaño del Arreglo */}
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="purple"
        />

        {/* Input y Acción */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6">
          <label className="block text-xs text-slate-400 mb-2 text-center font-medium">
            Elementos (separados por comas):
          </label>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              value={rawInput}
              onChange={(e) => setRawInput(e.target.value)}
              placeholder="Ej: 34, 12, 89, 5, 23, 78"
              className="flex-1 bg-[#0a0d18] border border-purple-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-400 transition-colors"
            />
            <button
              onClick={handleSort}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] active:scale-95 flex items-center gap-2 text-sm shrink-0"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              {loading ? 'Ordenando...' : 'Ordenar'}
            </button>
          </div>
        </div>

        {/* Visualización de Resultados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Arreglo Desordenado */}
          <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px]">
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 fill-current" /> Array Desordenado
            </h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {originalArray.length > 0 ? (
                originalArray.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-xl bg-purple-900/30 border border-purple-500/40 flex items-center justify-center font-bold text-lg text-purple-200 shadow-inner"
                  >
                    {num}
                  </div>
                ))
              ) : (
                <span className="text-xs text-slate-500">Sin elementos</span>
              )}
            </div>
          </div>

          {/* Arreglo Ordenado */}
          <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[160px]">
            <h3 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 fill-current" /> Array Ordenado
            </h3>
            {sortedArray ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {sortedArray.map((num, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 rounded-xl bg-purple-600/40 border border-purple-400 flex items-center justify-center font-bold text-lg text-white shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                  >
                    {num}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">Haga clic en "Ordenar"</p>
            )}
          </div>
        </div>
      </main>

      {/* Botón Salir / Atrás */}
      <PanelFooter onBack={onBack} label="Atrás" colorScheme="purple" />
    </div>
  );
};

export default ShellSortPanel;