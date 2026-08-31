import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { SortingMethodsPanel } from './SortingMethodsPanel';
import { BinarySearchPanel } from './BinarySearchPanel';
import { ShakerSortPanel } from './ShakerSortPanel';
import { BubbleSortPanel } from './BubbleSortPanel';
import { BubbleSortSignalPanel } from './BubbleSortSignalPanel';
import { InsertionSortPanel } from './InsertionSortPanel';
import { SelectionSortPanel } from './SelectionSortPanel';
import { Exercise6Panel } from './Exercise6Panel';
import { NotificationProvider } from './NotificationContext';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<
    | 'presentation'
    | 'menu'
    | 'ordered'
    | 'binarySearch'
    | 'sacudida'
    | 'burbuja'
    | 'burbujaSenal'
    | 'baraja'
    | 'seleccion' // <--- 1. Agregado aquí
    | 'exercise2'
    | 'exercise4'
    | 'exercise5'
    | 'exercise6'
  >('presentation');

  return (
    <NotificationProvider>
      <main className="w-full min-h-screen">
        {currentScreen === 'presentation' && (
          <PresentationPanel onNext={() => setCurrentScreen('menu')} />
        )}

        {currentScreen === 'menu' && (
          <ArrayMenuPanel
            onBack={() => setCurrentScreen('presentation')}
            onSelectOrdered={() => setCurrentScreen('ordered')}
            onSelectUnordered={() => setCurrentScreen('binarySearch')}
          />
        )}

        {currentScreen === 'ordered' && (
          <SortingMethodsPanel
            onBack={() => setCurrentScreen('menu')}
            onSelectAlgorithm={(algorithmId: string) => {
              if (algorithmId === 'sacudida') {
                setCurrentScreen('sacudida');
              } else if (algorithmId === 'burbuja') {
                setCurrentScreen('burbuja');
              } else if (algorithmId === 'burbujaSenal' || algorithmId === 'burbuja-senal') {
                setCurrentScreen('burbujaSenal');
              } else if (
                algorithmId === 'baraja' ||
                algorithmId === 'insercion' ||
                algorithmId === 'baraja-insercion'
              ) {
                setCurrentScreen('baraja');
              } else if (algorithmId === 'seleccion' || algorithmId === 'selection') { // <--- 2. Agregado aquí
                setCurrentScreen('seleccion');
              }
            }}
          />
        )}

        {currentScreen === 'sacudida' && (
          <ShakerSortPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {currentScreen === 'burbuja' && (
          <BubbleSortPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {currentScreen === 'burbujaSenal' && (
          <BubbleSortSignalPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {currentScreen === 'baraja' && (
          <InsertionSortPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {/* 3. Renderizado del panel de Selección */}
        {currentScreen === 'seleccion' && (
          <SelectionSortPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {currentScreen === 'binarySearch' && (
          <BinarySearchPanel
            onBack={() => setCurrentScreen('menu')}
          />
        )}

        {currentScreen === 'exercise2' && (
          <BubbleSortPanel
            onBack={() => setCurrentScreen('binarySearch')}
          />
        )}

        {currentScreen === 'exercise4' && (
          <InsertionSortPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {currentScreen === 'exercise5' && (
          <SelectionSortPanel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}

        {currentScreen === 'exercise6' && (
          <Exercise6Panel
            onBack={() => setCurrentScreen('ordered')}
          />
        )}
      </main>
    </NotificationProvider>
  );
}