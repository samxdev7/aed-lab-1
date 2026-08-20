import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { OrderedArrayPanel } from './OrderedArrayPanel';
import { DisorderedArrayPanel } from './DisorderedArrayPanel';
import { Exercise4Panel } from './Exercise4Panel';
import { Exercise1Panel } from './Exercise1Panel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'presentation' | 'menu' | 'ordered' | 'disordered' | 'exercise4' | 'exercise1'
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
            } else {
              console.log(`Ejercicio Desordenado seleccionado: ${id}`)
            }
          }}
        />
      )}

      {currentScreen === 'exercise4' && (
        <Exercise4Panel
          onBack={() => setCurrentScreen('ordered')}
        />
      )}

      {currentScreen === 'exercise1' && (
        <Exercise1Panel
          onBack={() => setCurrentScreen('disordered')}
        />
      )}
    </main>
  );
}