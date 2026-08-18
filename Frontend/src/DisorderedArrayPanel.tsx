import React from 'react';
import { ArrowLeft, BookOpen, Coins, User } from 'lucide-react';

interface DisorderedArrayPanelProps {
  onBack: () => void;
  onSelectExercise: (exerciseId: number) => void;
}

export const DisorderedArrayPanel: React.FC<DisorderedArrayPanelProps> = ({
  onBack,
  onSelectExercise,
}) => {
  const exercises = [
    { id: 1, title: 'Ejercicio 1', desc: 'Registro de Alumnos' },
    { id: 2, title: 'Ejercicio 2', desc: 'Registro de Clientes' },
    { id: 3, title: 'Ejercicio 3', desc: 'Registro de Empleados' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Encabezado */}
      <header className="text-center mt-4">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3">
          Arreglos Desordenados
        </h1>
        <div className="flex items-center justify-center gap-3 text-sky-400">
          <span className="h-[1px] w-12 bg-sky-500/40"></span>
          <p className="text-sm font-medium text-slate-300">
            Selecciona el ejercicio que deseas ejecutar
          </p>
          <span className="h-[1px] w-12 bg-sky-500/40"></span>
        </div>
      </header>

      {/* Lista de Ejercicios */}
      <main className="max-w-2xl mx-auto w-full flex flex-col gap-4 my-auto py-6">
        {exercises.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectExercise(item.id)}
            className="group relative flex items-center justify-between p-5 rounded-2xl bg-[#11162b] border border-sky-500/30 hover:border-sky-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:-translate-y-0.5 text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                {item.id === 1 && <BookOpen className="w-6 h-6" />}
                {item.id === 2 && <Coins className="w-6 h-6" />}
                {item.id === 3 && <User className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 mt-0.5">{item.desc}</p>
              </div>
            </div>
            <div className="w-3 h-3 rounded-full bg-sky-500/40 group-hover:bg-sky-400 group-hover:shadow-[0_0_8px_#38bdf8] transition-all" />
          </button>
        ))}
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