import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { OrderedArrayPanel } from './OrderedArrayPanel';
import { DisorderedArrayPanel } from './DisorderedArrayPanel';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'presentation' | 'menu' | 'ordered' | 'unordered'>('presentation');

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
          onSelectExercise={(id) => console.log(`Ejercicio Ordenado seleccionado: ${id}`)}
        />
      )}

      {currentScreen === 'unordered' && (
        <DisorderedArrayPanel
          onBack={() => setCurrentScreen('menu')}
          onSelectExercise={(id) => console.log(`Ejercicio Desordenado seleccionado: ${id}`)}
        />
      )}
    </main>
  );
}