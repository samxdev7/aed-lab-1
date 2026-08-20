import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { OrderedArrayPanel } from './OrderedArrayPanel';
import { DisorderedArrayPanel } from './DisorderedArrayPanel';
import { Exercise4Panel } from './Exercise4Panel';
import { Exercise5Panel } from './Exercise5Panel';
import { Exercise6Panel } from './Exercise6Panel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'presentation' | 'menu' | 'ordered' | 'unordered' | 'exercise4' | 'exercise5' | 'exercise6'
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
          onSelectUnordered={() => setCurrentScreen('unordered')}
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

      {currentScreen === 'unordered' && (
        <DisorderedArrayPanel
          onBack={() => setCurrentScreen('menu')}
          onSelectExercise={(id) => console.log(`Ejercicio Desordenado seleccionado: ${id}`)}
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