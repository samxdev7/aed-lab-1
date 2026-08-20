import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { OrderedArrayPanel } from './OrderedArrayPanel';
import { DisorderedArrayPanel } from './DisorderedArrayPanel';
import { Exercise4Panel } from './Exercise4Panel';
import { Exercise5Panel } from './Exercise5Panel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    'presentation' | 'menu' | 'ordered' | 'unordered' | 'exercise4' | 'exercise5'
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
            if (id === 4) setCurrentScreen('exercise4');
            if (id === 5) setCurrentScreen('exercise5')
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
        <Exercise5Panel onBack={() => setCurrentScreen('ordered')}
        />
      )}
    </main>
  );
}