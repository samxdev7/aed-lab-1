import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';
import { ArrayMenuPanel } from './ArrayMenuPanel';
import { SortingMethodsPanel } from './SortingMethodsPanel';
import { BinarySearchPanel } from './BinarySearchPanel';
import { ShakerSortPanel } from './ShakerSortPanel';
import { BubbleSortPanel } from './BubbleSortPanel';
import { Exercise3Panel } from './Exercise3Panel';
import { Exercise4Panel } from './Exercise4Panel';
import { Exercise5Panel } from './Exercise5Panel';
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
    | 'exercise2'
    | 'exercise3'
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

        {currentScreen === 'exercise3' && (
          <Exercise3Panel
            onBack={() => setCurrentScreen('binarySearch')}
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
    </NotificationProvider>
  );
}