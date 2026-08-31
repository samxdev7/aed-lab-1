import React, { useState } from 'react';
import { PanelHeader, ArraySizeConfig, PanelFooter, FormInput } from './CommonComponents';
import { useNotification } from './NotificationContext';
import { API_KEY, fetchRequest } from './HTTPMethods';
import { Zap } from 'lucide-react';

interface ShakerSortPanelProps {
  onBack: () => void;
}

const path = `${API_KEY}/ordenamiento/sacudida`;

export const ShakerSortPanel: React.FC<ShakerSortPanelProps> = ({ onBack }) => {
  const { showNotification } = useNotification();

  const [arraySize, setArraySize] = useState<string>('6');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);

  const [elementsInput, setElementsInput] = useState<string>('5, 6, 7, 9, 1, 23');
  const [originalArray, setOriginalArray] = useState<number[]>([5, 6, 7, 9, 1, 23]);
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSort = () => {
    if (!elementsInput.trim()) {
      showNotification('warning', 'Campos vacíos', 'Ingrese los elementos separados por comas.');
      return;
    }

    const numbers = elementsInput
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '')
      .map(Number);

    if (numbers.some(isNaN)) {
      showNotification('error', 'Formato inválido', 'Asegúrese de ingresar solo números separados por comas.');
      return;
    }

    const maxTam = Number(arraySize);
    if (numbers.length > maxTam) {
      showNotification('error', 'Límite superado', `Ha ingresado ${numbers.length} elementos, pero el tamaño máximo es ${maxTam}.`);
      return;
    }

    setOriginalArray(numbers);
    setLoading(true);

    fetchRequest<number[]>(path, {
      method: 'POST',
      body: {
        tam: maxTam,
        elementos: numbers,
      },
    })
      .then((res) => {
        setSortedArray(res);
        showNotification('success', 'Ordenamiento completado', 'Array ordenado con éxito mediante Sacudida.');
      })
      .catch((err) => {
        console.error(err);
        showNotification('error', 'Error en el servidor', err.message || 'No se pudo ordenar el arreglo.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      <PanelHeader
        category="Métodos de Ordenación"
        title="Método de Ordenación Sacudida"
        subtitle="Cocktail / Shaker Sort Algorithm"
        colorScheme="purple"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="purple"
        />

        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-end gap-4 shadow-lg">
          <div className="flex-1 w-full">
            <FormInput
              label="Elementos (separados por comas):"
              value={elementsInput}
              onChange={setElementsInput}
              placeholder="Ej: 5, 6, 7, 9, 1, 23"
              colorScheme="purple"
            />
          </div>
          <button
            onClick={handleSort}
            disabled={loading}
            className="w-full md:w-auto bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-2.5 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm flex items-center justify-center gap-2 h-[42px] shrink-0 disabled:opacity-50"
          >
            <Zap className="w-4 h-4 fill-current" />
            {loading ? 'Ordenando...' : 'Ordenar'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center min-h-[160px] justify-between shadow-lg">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Array Desordenado</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full my-auto">
              {originalArray.length > 0 ? (
                originalArray.map((num, idx) => (
                  <span
                    key={idx}
                    className="text-2xl font-bold font-mono text-white bg-purple-950/40 border border-purple-500/30 px-4 py-2 rounded-xl shadow-inner"
                  >
                    {num}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">Esperando datos...</span>
              )}
            </div>
          </div>

          <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 flex flex-col items-center min-h-[160px] justify-between shadow-lg">
            <h3 className="text-lg font-bold text-slate-200 mb-4">Array Ordenado</h3>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full my-auto">
              {sortedArray.length > 0 ? (
                sortedArray.map((num, idx) => (
                  <span
                    key={idx}
                    className="text-2xl font-bold font-mono text-purple-300 bg-purple-600/20 border border-purple-400/50 px-4 py-2 rounded-xl shadow-[0_0_10px_rgba(168,85,247,0.2)]"
                  >
                    {num}
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-sm">Haga clic en "Ordenar"</span>
              )}
            </div>
          </div>
        </div>
      </main>

      <PanelFooter onBack={onBack} label="Atrás" colorScheme="purple" />
    </div>
  );
};