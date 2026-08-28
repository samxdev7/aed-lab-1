import React, { useEffect, useState } from 'react';
import { Home, Trash2, Edit3, ListFilter, Search } from 'lucide-react';
import { API_KEY, fetchRequest, apiRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter, OperationSelector, FormInput } from './CommonComponents';

// URL base del backend para las operaciones del Ejercicio 5 (Departamentos)
const path: string = `${API_KEY}/departamentos/departamento`;

// Interfaz que define el DTO de Departamento esperado por el backend
interface Departamento {
  tam: number;
  ubicacion: string;
  extension: number;
  precio: number;
  numero: string;
  inquilino: string;
}

// Tipo unión para representar las operaciones del menú
type ActionType = 'alta' | 'baja' | 'modificar' | 'listarTodos' | 'listarUno';

interface Exercise5PanelProps {
  onBack: () => void;
}

// Función auxiliar para resetear los valores de los formularios al cambiar de operación
const resetValues = (
  setDeptNum: (val: string) => void,
  setRentPrice: (val: string) => void,
  setTenantName: (val: string) => void,
  setDeptAddress: (val: string) => void,
  setDeptExt: (val: string) => void
) => {
  setDeptNum('');
  setRentPrice('');
  setTenantName('');
  setDeptAddress('');
  setDeptExt('');
};

/**
 * Componente modular para listar departamentos.
 * Carga dinámicamente todos los registros del backend u obtiene el resultado de búsqueda individual.
 */
const ListDepartments = ({ allDepartments, departmentFound }: { allDepartments: boolean; departmentFound: any }) => {
  const [data, setData] = useState<Departamento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si la operación es listar todos los departamentos
    if (allDepartments) {
      setLoading(true);
      setError(null);
      apiRequest<Departamento[]>(path, { method: "GET" })
        .then((res) => {
          setData(res || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || 'Error al obtener los departamentos');
          setLoading(false);
        });
    } else {
      // Si la operación es listar un departamento buscado individualmente
      if (departmentFound) {
        setData(Array.isArray(departmentFound) ? departmentFound : [departmentFound]);
      } else {
        setData([]);
      }
      setLoading(false);
      setError(null);
    }
  }, [allDepartments, departmentFound]); // Controlado por dependencias del listado

  if (loading) {
    return <div className="text-center py-4 text-purple-400">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-rose-400 font-semibold">{error}</div>;
  }

  if (data && data.length > 0) {
    return (
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-xs uppercase bg-[#0a0d18] text-purple-400">
          <tr>
            <th className="p-2.5 rounded-l-lg">Posición</th>
            <th className="p-2.5">Nº Depto</th>
            <th className="p-2.5">Inquilino</th>
            <th className="p-2.5">Precio Renta</th>
            <th className="p-2.5">Extensión</th>
            <th className="p-2.5 rounded-r-lg">Ubicación</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-500/10">
          {data.map((dept: Departamento, index: number) => (
            <tr key={dept.numero + index} className="hover:bg-purple-500/5">
              <td className="p-2.5 font-mono text-purple-400">[{index + 1}]</td>
              <td className="p-2.5 font-medium text-white">{dept.numero}</td>
              <td className="p-2.5">{dept.inquilino}</td>
              <td className="p-2.5 font-mono">${Number(dept.precio).toFixed(2)}</td>
              <td className="p-2.5 font-mono">{Number(dept.extension).toFixed(1)} m²</td>
              <td className="p-2.5 text-slate-400">{dept.ubicacion}</td>
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

export const Exercise5Panel: React.FC<Exercise5PanelProps> = ({ onBack }) => {
  // Hook del sistema de notificaciones pop-up
  const { showNotification } = useNotification();

  // Estados para tamaño físico del arreglo
  const [arraySize, setArraySize] = useState<string>('10');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  
  // Estado para la operación seleccionada del menú
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');
  
  // Estado para guardar el departamento encontrado por búsqueda
  const [departmentFound, setDepartmentFound] = useState<any>(null);

  // Estados de control para inputs del formulario
  const [deptNum, setDeptNum] = useState('');
  const [rentPrice, setRentPrice] = useState('');
  const [tenantName, setTenantName] = useState('');
  const [deptAddress, setDeptAddress] = useState('');
  const [deptExt, setDeptExt] = useState('');
  const [searchNum, setSearchNum] = useState('');

  // Configuración de las operaciones disponibles para el selector modular
  const actionsList = [
    { id: 'alta' as ActionType, label: 'Dar de Alta', icon: Home },
    { id: 'baja' as ActionType, label: 'Dar de Baja', icon: Trash2 },
    { id: 'modificar' as ActionType, label: 'Mod. Precio', icon: Edit3 },
    { id: 'listarTodos' as ActionType, label: 'Listar Todos', icon: ListFilter },
    { id: 'listarUno' as ActionType, label: 'Listar Uno', icon: Search },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Componente Modular: Encabezado (Tema morado por ser arreglo ordenado) */}
      <PanelHeader
        category="Arreglos ordenados"
        title="Ejercicio 5: Departamentos"
        subtitle="Renta y Ordenación de Departamentos por Extensión"
        colorScheme="purple"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        {/* Componente Modular: Tamaño del Arreglo */}
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="purple"
        />

        {/* Componente Modular: Selector de Operaciones */}
        <OperationSelector<ActionType>
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          actions={actionsList}
          colorScheme="purple"
          onActionChange={() => {
            // Limpia campos al cambiar de operación
            resetValues(setDeptNum, setRentPrice, setTenantName, setDeptAddress, setDeptExt);
            setSearchNum('');
            setDepartmentFound(null);
          }}
        />

        {/* Panel dinámico */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* VISTA: Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Home className="w-5 h-5 text-purple-400" /> Rentar / Dar de Alta Departamento
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Número de Depto:"
                  value={deptNum}
                  onChange={setDeptNum}
                  placeholder="Ej: 101"
                  colorScheme="purple"
                />
                <FormInput
                  label="Extensión (m²):"
                  type="number"
                  min="1"
                  step="0.1"
                  value={deptExt}
                  onChange={setDeptExt}
                  placeholder="Ej: 75.5"
                  colorScheme="purple"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Nombre del Inquilino:"
                  value={tenantName}
                  onChange={setTenantName}
                  placeholder="Ej: Juan Pérez"
                  colorScheme="purple"
                />
                <FormInput
                  label="Precio Renta ($):"
                  type="number"
                  min="0"
                  step="0.01"
                  value={rentPrice}
                  onChange={setRentPrice}
                  placeholder="Ej: 450.00"
                  colorScheme="purple"
                />
              </div>
              <FormInput
                label="Ubicación / Dirección:"
                value={deptAddress}
                onChange={setDeptAddress}
                placeholder="Ej: Edificio A, Apto 101, Zona 10"
                colorScheme="purple"
              />
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!deptNum.trim() || !deptExt.trim() || !tenantName.trim() || !rentPrice.trim() || !deptAddress.trim()) {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos obligatorios.');
                    return;
                  }

                  const nuevoDepto: Departamento = {
                    tam: Number(arraySize),
                    numero: deptNum.trim(),
                    extension: Number(deptExt),
                    inquilino: tenantName.trim(),
                    precio: Number(rentPrice),
                    ubicacion: deptAddress.trim(),
                  };

                  // Envío de POST
                  fetchRequest(path, { method: "POST", body: nuevoDepto })
                    .then(() => {
                      showNotification('success', 'Éxito', `Departamento ${nuevoDepto.numero} ha sido rentado y guardado en orden.`);
                      resetValues(setDeptNum, setRentPrice, setTenantName, setDeptAddress, setDeptExt);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al registrar', err.message || 'No se pudo registrar la renta.');
                    });
                }}
              >
                Guardar Departamento
              </button>
            </div>
          )}

          {/* VISTA: Dar de Baja */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Trash2 className="w-5 h-5 text-red-400" /> Liberar / Dar de Baja Departamento
              </h3>
              <FormInput
                label="Ingrese Número de Depto:"
                value={deptNum}
                onChange={setDeptNum}
                placeholder="Ej: 101"
                colorScheme="purple"
              />
              <button
                className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
                onClick={() => {
                  if (!deptNum.trim()) {
                    showNotification('warning', 'Campo vacío', 'Por favor, ingrese el número de departamento.');
                    return;
                  }

                  // Envío de DELETE
                  fetchRequest(path + `/${encodeURIComponent(deptNum.trim())}`, { method: "DELETE" })
                    .then(() => {
                      showNotification('success', 'Éxito', `El departamento ${deptNum.trim()} ha sido liberado.`);
                      resetValues(setDeptNum, setRentPrice, setTenantName, setDeptAddress, setDeptExt);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al liberar', err.message || 'No se pudo liberar el departamento.');
                    });
                }}
              >
                Liberar Departamento
              </button>
            </div>
          )}

          {/* VISTA: Modificar Precio */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-purple-400" /> Modificar Precio de Renta
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Número de Depto:"
                  value={deptNum}
                  onChange={setDeptNum}
                  placeholder="Ej: 101"
                  colorScheme="purple"
                />
                <FormInput
                  label="Nuevo Precio ($):"
                  type="number"
                  min="0"
                  step="0.01"
                  value={rentPrice}
                  onChange={setRentPrice}
                  placeholder="Ej: 500.00"
                  colorScheme="purple"
                />
              </div>
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!deptNum.trim() || rentPrice === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos.');
                    return;
                  }

                  const datos: Departamento = {
                    tam: Number(arraySize),
                    numero: deptNum.trim(),
                    precio: Number(rentPrice),
                    extension: 0,
                    inquilino: '',
                    ubicacion: '',
                  };

                  // Envío de PUT
                  fetchRequest(path + `/${encodeURIComponent(deptNum.trim())}`, { method: "PUT", body: datos })
                    .then(() => {
                      showNotification('success', 'Éxito', `Precio del departamento ${deptNum.trim()} actualizado.`);
                      resetValues(setDeptNum, setRentPrice, setTenantName, setDeptAddress, setDeptExt);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al modificar', err.message || 'No se pudo actualizar el precio.');
                    });
                }}
              >
                Actualizar Precio
              </button>
            </div>
          )}

          {/* VISTA: Listar Todos */}
          {selectedAction === 'listarTodos' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <ListFilter className="w-5 h-5 text-purple-400" /> Lista General de Departamentos (Por Extensión)
              </h3>
              <div className="overflow-x-auto">
                <ListDepartments allDepartments={true} departmentFound={null} />
              </div>
            </div>
          )}

          {/* VISTA: Listar Uno */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Search className="w-5 h-5 text-purple-400" /> Buscar Departamento Determinado
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <FormInput
                    label="Ingrese Nº Depto:"
                    value={searchNum}
                    onChange={setSearchNum}
                    placeholder="Ingrese Nº Depto (Ej: 101)"
                    colorScheme="purple"
                  />
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all h-[38px] flex items-center justify-center active:scale-95"
                  onClick={() => {
                    if (!searchNum.trim()) {
                      showNotification('warning', 'Campo vacío', 'Por favor, ingrese el número de departamento a buscar.');
                      return;
                    }

                    // Envío de GET
                    apiRequest<Departamento | null>(path + `/${encodeURIComponent(searchNum.trim())}`, { method: "GET" })
                      .then((res) => {
                        if (res) {
                          setDepartmentFound(res);
                          showNotification('success', 'Búsqueda Exitosa', `Se encontró el departamento ${res.numero}.`);
                        } else {
                          setDepartmentFound(null);
                          showNotification('info', 'No Encontrado', `No se encontró ningún departamento.`);
                        }
                      })
                      .catch((err: any) => {
                        console.error(err);
                        setDepartmentFound(null);
                        showNotification('error', 'Error de Búsqueda', err.message || 'Error al buscar el departamento.');
                      });
                  }}
                >
                  Buscar
                </button>
              </div>
              <ListDepartments allDepartments={false} departmentFound={departmentFound} />
            </div>
          )}

        </div>
      </main>

      {/* Componente Modular: Botón de Salida */}
      <PanelFooter onBack={onBack} label="Salir" colorScheme="purple" />
    </div>
  );
};