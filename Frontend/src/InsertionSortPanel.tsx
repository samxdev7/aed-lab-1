import React from 'react';
import { Layers } from 'lucide-react';
import { API_KEY } from './HTTPMethods';
import { GenericSortingPanel } from './GenericSortingPanel';

interface InsertionSortPanelProps {
  onBack: () => void;
}

export const InsertionSortPanel: React.FC<InsertionSortPanelProps> = ({ onBack }) => {
  return (
    <GenericSortingPanel
      onBack={onBack}
      endpointPath={`${API_KEY}/ordenamiento/insercion`}
      categoryTitle="MÉTODOS DE ORDENACIÓN"
      methodTitle="Método Baraja"
      methodSubtitle="Insertion Sort Algorithm"
      successMessage="El arreglo fue ordenado exitosamente con el método Baraja (Inserción)."
      icon={Layers}
      colorScheme="purple"
    />
  );
};

export default InsertionSortPanel;