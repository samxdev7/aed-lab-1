import { useState } from 'react';
import { PresentationPanel } from './PresentationPanel';

export function App() {
  const [currentPanel, setCurrentPanel] = useState<'presentation' | 'second'>('presentation');

  return (
    <div className="w-full min-h-screen bg-slate-900">
      {currentPanel === 'presentation' && (
        <PresentationPanel onNext={() => setCurrentPanel('second')} />
      )}
      {currentPanel === 'second' && (
        <div className="p-8 text-white min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold">Segundo Panel (En construcción)</h1>
        </div>
      )}
    </div>
  );
}

export default App;