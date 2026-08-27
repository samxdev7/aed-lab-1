import React, { useEffect, useState } from 'react';
import { UserPlus, UserCheck, Edit3 } from 'lucide-react';
import { API_KEY, fetchRequest, apiRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter, OperationSelector, FormInput } from './CommonComponents';

// URL base del backend para las operaciones del Ejercicio 6 (Vendedores)
const path: string = `${API_KEY}/vendedores/vendedor`;

interface Vendedor {
  tam: number;
  nombre: string;
  totalVentas: number;
}

type ActionType = 'alta' | 'modificar' | 'listarUno';

interface Exercise6PanelProps {
  onBack: () => void;
}

const ListSellers = ({ sellerFound }: { sellerFound: any }) => {
  const [data, setData] = useState<Vendedor[]>([]);

  useEffect(() => {
    if (sellerFound) {
      setData(Array.isArray(sellerFound) ? sellerFound : [sellerFound]);
    } else {
      setData([]);
    }
  }, [sellerFound]);

  if (data && data.length > 0) {
    return (
      <table className="w-full text-left text-sm text-slate-300 mt-4">
        <thead className="text-xs uppercase bg-[#0a0d18] text-purple-400">
          <tr>
            <th className="p-2.5 rounded-l-lg">Posición</th>
            <th className="p-2.5">Nombre del Vendedor</th>
            <th className="p-2.5 rounded-r-lg">Total de Ventas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-500/10">
          {data.map((seller: Vendedor, index: number) => (
            <tr key={seller.nombre + index} className="hover:bg-purple-500/5">
              <td className="p-2.5 font-mono text-purple-400">[{index + 1}]</td>
              <td className="p-2.5 font-medium text-white">{seller.nombre}</td>
              <td className="p-2.5 font-mono">${Number(seller.totalVentas).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="text-center py-4 text-slate-400">
      No se encontraron registros para mostrar.
    </div>
  );
};

export const Exercise6Panel: React.FC<Exercise6PanelProps> = ({ onBack }) => {
  const { showNotification } = useNotification();
  
  const [arraySize, setArraySize] = useState<string>('5');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');
  
  const [sellerName, setSellerName] = useState('');
  const [totalSales, setTotalSales] = useState('');
  const [searchName, setSearchName] = useState('');
  const [sellerFound, setSellerFound] = useState<any>(null);

  const resetValues = () => {
    setSellerName('');
    setTotalSales('');
    setSearchName('');
    setSellerFound(null);
  };

  const actionsList = [
    { id: 'alta' as ActionType, label: 'Dar de Alta', icon: UserPlus },
    { id: 'modificar' as ActionType, label: 'Modificar Ventas', icon: Edit3 },
    { id: 'listarUno' as ActionType, label: 'Consultar Registro', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      <PanelHeader
        category="Arreglos ordenados"
        title="Ejercicio 6: Registro de Vendedores"
        subtitle="Registro y Control de Ventas de Vendedores"
        colorScheme="purple"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="purple"
        />

        <OperationSelector<ActionType>
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          actions={actionsList}
          colorScheme="purple"
          onActionChange={() => {
            resetValues();
          }}
        />

        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-purple-400" /> Dar de Alta a un Vendedor
              </h3>
              <FormInput
                label="Nombre del Vendedor:"
                value={sellerName}
                onChange={setSellerName}
                placeholder="Ej: Roberto Gómez"
                colorScheme="purple"
              />
              <FormInput
                label="Total de Ventas ($):"
                type="number"
                min="0"
                step="0.01"
                value={totalSales}
                onChange={setTotalSales}
                placeholder="Ej: 1250.00"
                colorScheme="purple"
              />
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!sellerName.trim() || totalSales === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos obligatorios.');
                    return;
                  }

                  const nuevoVendedor: Vendedor = {
                    tam: Number(arraySize),
                    nombre: sellerName.trim(),
                    totalVentas: Number(totalSales),
                  };

                  fetchRequest(path, { method: "POST", body: nuevoVendedor })
                    .then(() => {
                      showNotification('success', 'Éxito', `El vendedor ${nuevoVendedor.nombre} ha sido registrado.`);
                      resetValues();
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al registrar', err.message || 'No se pudo guardar el vendedor.');
                    });
                }}
              >
                Guardar Vendedor
              </button>
            </div>
          )}

          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-purple-400" /> Modificar Total de Ventas
              </h3>
              <FormInput
                label="Nombre del Vendedor:"
                value={sellerName}
                onChange={setSellerName}
                placeholder="Ej: Roberto Gómez"
                colorScheme="purple"
              />
              <FormInput
                label="Nuevo Total Ventas ($):"
                type="number"
                min="0"
                step="0.01"
                value={totalSales}
                onChange={setTotalSales}
                placeholder="Ej: 1800.00"
                colorScheme="purple"
              />
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!sellerName.trim() || totalSales === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos.');
                    return;
                  }

                  const datos: Vendedor = {
                    tam: Number(arraySize),
                    nombre: sellerName.trim(),
                    totalVentas: Number(totalSales),
                  };

                  fetchRequest(path + `/${encodeURIComponent(sellerName.trim())}`, { method: "PUT", body: datos })
                    .then(() => {
                      showNotification('success', 'Éxito', `Ventas del vendedor ${sellerName.trim()} actualizadas.`);
                      resetValues();
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al modificar', err.message || 'No se pudo actualizar el total de ventas.');
                    });
                }}
              >
                Actualizar Ventas
              </button>
            </div>
          )}

          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-purple-400" /> Consultar Vendedor Determinado
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <FormInput
                    label="Nombre del Vendedor:"
                    value={searchName}
                    onChange={setSearchName}
                    placeholder="Ingrese nombre del vendedor a buscar"
                    colorScheme="purple"
                  />
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all h-[38px] flex items-center justify-center active:scale-95"
                  onClick={() => {
                    if (!searchName.trim()) {
                      showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del vendedor a buscar.');
                      return;
                    }

                    apiRequest<Vendedor | null>(path + `/${encodeURIComponent(searchName.trim())}`, { method: "GET" })
                      .then((res) => {
                        if (res) {
                          setSellerFound(res);
                          showNotification('success', 'Búsqueda Exitosa', `Se encontró el registro del vendedor ${res.nombre}.`);
                        } else {
                          setSellerFound(null);
                          showNotification('info', 'No Encontrado', `No se encontró ningún vendedor.`);
                        }
                      })
                      .catch((err: any) => {
                        console.error(err);
                        setSellerFound(null);
                        showNotification('error', 'Error de Búsqueda', err.message || 'Error al buscar el vendedor.');
                      });
                  }}
                >
                  Buscar
                </button>
              </div>
              <ListSellers sellerFound={sellerFound} />
            </div>
          )}

        </div>
      </main>

      <PanelFooter onBack={onBack} label="Salir" colorScheme="purple" />
    </div>
  );
};