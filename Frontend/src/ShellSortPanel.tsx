import React from 'react';
import { Sparkles } from 'lucide-react';
import { API_KEY } from './HTTPMethods';
import { GenericSortingPanel } from './GenericSortingPanel';

interface ShellSortPanelProps {
  onBack: () => void;
}

export const ShellSortPanel: React.FC<ShellSortPanelProps> = ({ onBack }) => {
  return (
    <GenericSortingPanel
      onBack={onBack}
      endpointPath={`${API_KEY}/ordenamiento/shell`}
      categoryTitle="MÉTODOS DE ORDENACIÓN"
      methodTitle="Método Shell"
      methodSubtitle="Shell Sort Algorithm"
      successMessage="El arreglo fue ordenado exitosamente con el método Shell."
      icon={Sparkles}
      colorScheme="purple"
    />
  );
};

export default ShellSortPanel;