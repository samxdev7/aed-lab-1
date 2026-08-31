import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import { PanelHeader, PanelFooter } from './CommonComponents';

interface InsertionSortPanelProps {
  onBack: () => void;
}

export const InsertionSortPanel: React.FC<InsertionSortPanelProps> = ({ onBack }) => {
  // Arreglos de prueba para visualizar el estado inicial y final
  const [arrayOriginal] = useState<number[]>([34, 12, 89, 5, 23, 78]);
  const [arrayOrdenado] = useState<number[]>([5, 12, 23, 34, 78, 89]);

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <PanelHeader
        category="Métodos de Ordenación"
        title="Baraja"
        subtitle="Clasificación por inserción"
        colorScheme="purple"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        {/* Contenedor principal de visualización */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 min-h-[160px] flex flex-col justify-center gap-6">
          
          {/* Título de la sección */}
          <div className="flex items-center gap-2 border-b border-purple-500/20 pb-3">
            <Layers className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-bold text-purple-300">
              Visualización: Método Baraja (Inserción)
            </h3>
          </div>

          {/* Arreglo Desordenado / Entrada */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Arreglo Original:
            </span>
            <div className="flex flex-wrap gap-3 items-center">
              {arrayOriginal.map((val, idx) => (
                <div
                  key={`orig-${idx}`}
                  className="w-12 h-12 rounded-xl bg-[#0a0d18] border border-purple-500/30 flex items-center justify-center font-mono font-bold text-white text-base shadow-sm"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

          {/* Arreglo Ordenado / Resultado */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
              Arreglo Ordenado:
            </span>
            <div className="flex flex-wrap gap-3 items-center">
              {arrayOrdenado.map((val, idx) => (
                <div
                  key={`ord-${idx}`}
                  className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-400 flex items-center justify-center font-mono font-bold text-purple-300 text-base shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                >
                  {val}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Botón de Salida */}
      <PanelFooter onBack={onBack} label="Salir" colorScheme="purple" />
    </div>
  );
};