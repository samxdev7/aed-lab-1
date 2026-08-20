import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { OrderedArrayPanel } from './OrderedArrayPanel';
import { DisorderedArrayPanel } from './DisorderedArrayPanel';
import { Exercise1Panel } from './Exercise1Panel';
import { Exercise2Panel } from './Exercise2Panel';
import { Exercise4Panel } from './Exercise4Panel';
import { Exercise5Panel } from './Exercise5Panel';
import { Exercise6Panel } from './Exercise6Panel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'presentation' | 'menu' | 'ordered' | 'disordered' | 'exercise1' | 'exercise2' | 'exercise4' | 'exercise5' | 'exercise6'
  >('presentation');

  return (
    <main className="w-full min-h-screen">
      {currentScreen === 'presentation' && (
        <PresentationPanel onNext={() => setCurrentScreen('menu')} />
      )}

      {currentScreen === 'menu' && (
        <ArrayMenuPanel
          onBack={() => setCurrentScreen('presentation')}
          onSelectOrdered={() => setCurrentScreen('ordered')}
          onSelectUnordered={() => setCurrentScreen('disordered')}
        />
      )}

      {currentScreen === 'ordered' && (
        <OrderedArrayPanel
          onBack={() => setCurrentScreen('menu')}
          onSelectExercise={(id) => {
            if (id === 4) {
              setCurrentScreen('exercise4');
            } else if (id === 5) {
              setCurrentScreen('exercise5');
            } else if (id === 6) {
              setCurrentScreen('exercise6');
            } else {
              console.log(`Ejercicio Ordenado seleccionado: ${id}`);
            }
          }}
        />
      )}

      {currentScreen === 'disordered' && (
        <DisorderedArrayPanel
          onBack={() => setCurrentScreen('menu')}
          onSelectExercise={(id) => {
            if(id === 1){
              setCurrentScreen('exercise1');
            } else if(id === 2){
              setCurrentScreen('exercise2');
            } else {
              console.log(`Ejercicio Desordenado seleccionado: ${id}`)
            }
          }}
        />
      )}

      {currentScreen === 'exercise1' && (
        <Exercise1Panel
          onBack={() => setCurrentScreen('disordered')}
        />
      )}

            {currentScreen === 'exercise2' && (
        <Exercise2Panel
          onBack={() => setCurrentScreen('disordered')}
        />
      )}

      {currentScreen === 'exercise4' && (
        <Exercise4Panel
          onBack={() => setCurrentScreen('ordered')}
        />
      )}

      {currentScreen === 'exercise5' && (
        <Exercise5Panel
          onBack={() => setCurrentScreen('ordered')}
        />
      )}

      {currentScreen === 'exercise6' && (
        <Exercise6Panel
          onBack={() => setCurrentScreen('ordered')}
        />
      )}

    </main>
  );
}