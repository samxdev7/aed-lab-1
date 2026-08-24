import React, { useEffect, useState } from 'react';
import { UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';
import { API_KEY, fetchRequest, apiRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter, OperationSelector, FormInput } from './CommonComponents';

// URL base del backend para las operaciones del Ejercicio 3 (Empleados Desordenados)
const path: string = `${API_KEY}/empleados-desordenados/empleado`;

// Interfaz que modela el DTO de Empleado Desordenado esperado por el backend
interface Empleado {
  tam: number;
  nombre: string;
  esMujer: boolean;
  edad: number;
}

// Tipo unión para representar las operaciones del menú de ejercicio
type ActionType = 'alta' | 'baja' | 'modificar' | 'listarVarones' | 'listarUno';

interface Exercise3PanelProps {
  onBack: () => void;
}

// Función auxiliar para resetear los valores de los formularios al cambiar de operación
const resetValues = (
  setEmployeeName: (val: string) => void,
  setEmployeeGender: (val: 'M' | 'F') => void,
  setEmployeeAge: (val: string) => void
) => {
  setEmployeeName('');
  setEmployeeGender('M');
  setEmployeeAge('');
};

/**
 * Componente modular para listar empleados.
 * Carga dinámicamente la lista de varones del backend o renderiza el resultado de la búsqueda individual.
 */
const ListEmployees = ({ listType, employeeFound }: { listType: 'varones' | 'uno'; employeeFound: any }) => {
  const [data, setData] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si la operación es listar únicamente varones
    if (listType === 'varones') {
      setLoading(true);
      setError(null);
      apiRequest<Empleado[]>(`${path}/varones`, { method: "GET" })
        .then((res) => {
          setData(res || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || 'Error al obtener los empleados varones');
          setLoading(false);
        });
    } else {
      // Si la operación es listar un registro específico
      if (employeeFound) {
        setData(Array.isArray(employeeFound) ? employeeFound : [employeeFound]);
      } else {
        setData([]);
      }
      setLoading(false);
      setError(null);
    }
  }, [listType, employeeFound]); // Reacciona a cambios en dependencias específicas

  if (loading) {
    return <div className="text-center py-4 text-cyan-400">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-rose-400 font-semibold">{error}</div>;
  }

  if (data && data.length > 0) {
    return (
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-xs uppercase bg-[#0a0d18] text-cyan-400">
          <tr>
            <th className="p-2.5 rounded-l-lg">Posición</th>
            <th className="p-2.5">Nombre Completo</th>
            <th className="p-2.5">Sexo</th>
            <th className="p-2.5 rounded-r-lg">Edad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cyan-500/10">
          {data.map((emp: Empleado, index: number) => (
            <tr key={emp.nombre + index} className="hover:bg-cyan-500/5">
              <td className="p-2.5 font-mono text-cyan-400">[{index + 1}]</td>
              <td className="p-2.5 font-medium text-white">{emp.nombre}</td>
              <td className="p-2.5">{emp.esMujer ? 'Femenino (F)' : 'Masculino (M)'}</td>
              <td className="p-2.5 font-mono">{emp.edad} años</td>
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

export const Exercise3Panel: React.FC<Exercise3PanelProps> = ({ onBack }) => {
  // Hook del sistema de notificaciones pop-up
  const { showNotification } = useNotification();
  
  // Estados para tamaño físico del arreglo
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  
  // Estado para la operación activa del menú
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');
  
  // Estado para guardar el resultado de búsqueda individual
  const [employeeFound, setEmployeeFound] = useState<any>(null);

  // Estados de control para inputs de formulario
  const [employeeName, setEmployeeName] = useState('');
  const [employeeGender, setEmployeeGender] = useState<'M' | 'F'>('M');
  const [employeeAge, setEmployeeAge] = useState('');
  const [searchName, setSearchName] = useState('');

  // Definición de las operaciones para el selector modular
  const actionsList = [
    { id: 'alta' as ActionType, label: 'Dar de Alta', icon: UserPlus },
    { id: 'baja' as ActionType, label: 'Dar de Baja', icon: UserMinus },
    { id: 'modificar' as ActionType, label: 'Actualizar Edad', icon: Edit3 },
    { id: 'listarVarones' as ActionType, label: 'Listar Varones', icon: Users },
    { id: 'listarUno' as ActionType, label: 'Listar Registro', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Componente Modular: Encabezado */}
      <PanelHeader
        category="Arreglos desordenados"
        title="Ejercicio 3: Registro de Empleados"
        subtitle="Gestión de Personal de la Empresa"
        colorScheme="cyan"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        {/* Componente Modular: Tamaño del Arreglo */}
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="cyan"
        />

        {/* Componente Modular: Selector de Operaciones */}
        <OperationSelector<ActionType>
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          actions={actionsList}
          colorScheme="cyan"
          onActionChange={() => {
            // Limpia los campos e historial al cambiar de operación
            resetValues(setEmployeeName, setEmployeeGender, setEmployeeAge);
            setSearchName('');
            setEmployeeFound(null);
          }}
        />

        {/* Panel dinámico */}
        <div className="bg-[#11162b] border border-cyan-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* VISTA: Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-cyan-400" /> Dar de Alta a un Empleado
              </h3>
              <FormInput
                label="Nombre Completo:"
                value={employeeName}
                onChange={setEmployeeName}
                placeholder="Ej: Carlos Eduardo Mendoza"
                colorScheme="cyan"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Sexo:</label>
                  <select
                    value={employeeGender}
                    onChange={(e) => setEmployeeGender(e.target.value as 'M' | 'F')}
                    className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 h-[42px]"
                  >
                    <option value="M">Masculino (M)</option>
                    <option value="F">Femenino (F)</option>
                  </select>
                </div>
                <FormInput
                  label="Edad:"
                  type="number"
                  min="18"
                  max="99"
                  value={employeeAge}
                  onChange={(val) => {
                    const numVal = Number(val);
                    if (numVal < 0) setEmployeeAge('0');
                    else if (numVal > 99) setEmployeeAge('99');
                    else setEmployeeAge(val);
                  }}
                  placeholder="Ej: 28"
                  colorScheme="cyan"
                />
              </div>
              <button
                className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!employeeName.trim() || employeeAge === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos obligatorios.');
                    return;
                  }
                  
                  const nuevoEmpleado: Empleado = {
                    tam: Number(arraySize),
                    nombre: employeeName.trim(),
                    esMujer: employeeGender === 'F',
                    edad: Number(employeeAge),
                  };

                  // Envío de POST
                  fetchRequest(path, { method: "POST", body: nuevoEmpleado })
                    .then(() => {
                      showNotification('success', 'Éxito', `El empleado ${nuevoEmpleado.nombre} ha sido registrado.`);
                      resetValues(setEmployeeName, setEmployeeGender, setEmployeeAge);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al registrar', err.message || 'No se pudo guardar el empleado.');
                    });
                }}
              >
                Guardar Empleado
              </button>
            </div>
          )}

          {/* VISTA: Dar de Baja */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Dar de Baja a un Empleado
              </h3>
              <FormInput
                label="Ingrese Nombre del Empleado:"
                value={employeeName}
                onChange={setEmployeeName}
                placeholder="Ej: Carlos Eduardo Mendoza"
                colorScheme="cyan"
              />
              <button
                className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
                onClick={() => {
                  if (!employeeName.trim()) {
                    showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del empleado.');
                    return;
                  }

                  // Envío de DELETE
                  fetchRequest(path + `/${encodeURIComponent(employeeName.trim())}`, { method: "DELETE" })
                    .then(() => {
                      showNotification('success', 'Éxito', `El empleado ${employeeName.trim()} ha sido dado de baja.`);
                      resetValues(setEmployeeName, setEmployeeGender, setEmployeeAge);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al eliminar', err.message || 'No se pudo eliminar al empleado.');
                    });
                }}
              >
                Dar de Baja
              </button>
            </div>
          )}

          {/* VISTA: Actualizar Edad */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-cyan-400" /> Actualizar Edad de un Empleado
              </h3>
              <FormInput
                label="Nombre del Empleado:"
                value={employeeName}
                onChange={setEmployeeName}
                placeholder="Ej: Carlos Eduardo Mendoza"
                colorScheme="cyan"
              />
              <FormInput
                label="Nueva Edad:"
                type="number"
                min="18"
                max="99"
                value={employeeAge}
                onChange={(val) => {
                  const numVal = Number(val);
                  if (numVal < 0) setEmployeeAge('0');
                  else if (numVal > 99) setEmployeeAge('99');
                  else setEmployeeAge(val);
                }}
                placeholder="Ej: 30"
                colorScheme="cyan"
              />
              <button
                className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!employeeName.trim() || employeeAge === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos.');
                    return;
                  }

                  const datos: Empleado = {
                    tam: Number(arraySize),
                    nombre: employeeName.trim(),
                    esMujer: false,
                    edad: Number(employeeAge),
                  };

                  // Envío de PUT
                  fetchRequest(path + `/${encodeURIComponent(employeeName.trim())}`, { method: "PUT", body: datos })
                    .then(() => {
                      showNotification('success', 'Éxito', `Edad del empleado ${employeeName.trim()} actualizada.`);
                      resetValues(setEmployeeName, setEmployeeGender, setEmployeeAge);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al modificar', err.message || 'No se pudo actualizar la edad.');
                    });
                }}
              >
                Actualizar Edad
              </button>
            </div>
          )}

          {/* VISTA: Listar Varones */}
          {selectedAction === 'listarVarones' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Users className="w-5 h-5 text-cyan-400" /> Registros de Empleados Varones
              </h3>
              <div className="overflow-x-auto">
                <ListEmployees listType="varones" employeeFound={null} />
              </div>
            </div>
          )}

          {/* VISTA: Listar Uno */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-cyan-400" /> Consultar Registro Determinado
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <FormInput
                    label="Ingrese Nombre del Empleado:"
                    value={searchName}
                    onChange={setSearchName}
                    placeholder="Ingrese Nombre del Empleado"
                    colorScheme="cyan"
                  />
                </div>
                <button
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all h-[38px] flex items-center justify-center active:scale-95"
                  onClick={() => {
                    if (!searchName.trim()) {
                      showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del empleado a buscar.');
                      return;
                    }
                    
                    // Envío de GET
                    apiRequest<Empleado | null>(path + `/${encodeURIComponent(searchName.trim())}`, { method: "GET" })
                      .then((res) => {
                        if (res) {
                          setEmployeeFound(res);
                          showNotification('success', 'Búsqueda Exitosa', `Se encontró el registro de ${res.nombre}.`);
                        } else {
                          setEmployeeFound(null);
                          showNotification('info', 'No Encontrado', `No se encontró ningún empleado.`);
                        }
                      })
                      .catch((err: any) => {
                        console.error(err);
                        setEmployeeFound(null);
                        showNotification('error', 'Error de Búsqueda', err.message || 'Error al buscar el empleado.');
                      });
                  }}
                >
                  Buscar
                </button>
              </div>
              <ListEmployees listType="uno" employeeFound={employeeFound} />
            </div>
          )}

        </div>
      </main>

      {/* Componente Modular: Botón de Salida */}
      <PanelFooter onBack={onBack} label="Salir" colorScheme="cyan" />
    </div>
  );
};