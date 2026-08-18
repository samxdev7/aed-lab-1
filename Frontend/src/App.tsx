import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';

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
          onSelectOrdered={() => alert('Próximamente: Panel Arreglos Ordenados')}
          onSelectUnordered={() => alert('Próximamente: Panel Arreglos Desordenados')}
        />
      )}
    </main>
  );
}