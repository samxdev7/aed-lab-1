import React, { useEffect, useState } from 'react';
import { UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';
import { API_KEY, fetchRequest, apiRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter, OperationSelector, FormInput } from './CommonComponents';

// URL base del backend para las operaciones del Ejercicio 4 (Empleados Ordenados)
const path: string = `${API_KEY}/empleados-ordenados/empleado`;

// Interfaz que define el DTO de Empleado Ordenado esperado por el backend
interface Empleado {
  tam: number;
  nombre: string;
  direccion: string;
  edad: number;
  esMujer: boolean;
  añosDeAntiguedad: number;
}

// Tipo unión para representar las operaciones del menú
type ActionType = 'alta' | 'baja' | 'modificar' | 'listarTodos' | 'listarUno';

interface Exercise4PanelProps {
  onBack: () => void;
}

// Función auxiliar para resetear los valores de los formularios al cambiar de operación
const resetValues = (
  setEmpName: (val: string) => void,
  setEmpAddress: (val: string) => void,
  setEmpAge: (val: string) => void,
  setEmpGender: (val: 'M' | 'F') => void,
  setEmpYears: (val: string) => void
) => {
  setEmpName('');
  setEmpAddress('');
  setEmpAge('');
  setEmpGender('M');
  setEmpYears('');
};

/**
 * Componente modular para listar empleados de forma ordenada.
 * Carga dinámicamente todos los registros o renderiza un empleado consultado.
 */
const ListEmployees = ({ allEmployees, employeeFound }: { allEmployees: boolean; employeeFound: any }) => {
  const [data, setData] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si se requiere listar todos los registros registrados
    if (allEmployees) {
      setLoading(true);
      setError(null);
      apiRequest<Empleado[]>(path, { method: "GET" })
        .then((res) => {
          setData(res || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || 'Error al obtener los empleados');
          setLoading(false);
        });
    } else {
      // Si se requiere listar un registro consultado individualmente
      if (employeeFound) {
        setData(Array.isArray(employeeFound) ? employeeFound : [employeeFound]);
      } else {
        setData([]);
      }
      setLoading(false);
      setError(null);
    }
  }, [allEmployees, employeeFound]); // Reacciona a cambios específicos en dependencias

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
            <th className="p-2.5">Nombre Completo</th>
            <th className="p-2.5">Dirección</th>
            <th className="p-2.5">Edad</th>
            <th className="p-2.5">Sexo</th>
            <th className="p-2.5 rounded-r-lg">Antigüedad</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-purple-500/10">
          {data.map((emp: Empleado, index: number) => (
            <tr key={emp.nombre + index} className="hover:bg-purple-500/5">
              <td className="p-2.5 font-mono text-purple-400">[{index + 1}]</td>
              <td className="p-2.5 font-medium text-white">{emp.nombre}</td>
              <td className="p-2.5">{emp.direccion}</td>
              <td className="p-2.5 font-mono">{emp.edad} años</td>
              <td className="p-2.5">{emp.esMujer ? 'Femenino (F)' : 'Masculino (M)'}</td>
              <td className="p-2.5 font-mono font-semibold text-purple-300">{emp.añosDeAntiguedad} años</td>
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

export const Exercise4Panel: React.FC<Exercise4PanelProps> = ({ onBack }) => {
  // Hook del sistema de notificaciones pop-up
  const { showNotification } = useNotification();

  // Estados para tamaño físico del arreglo
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  
  // Estado para la operación seleccionada del menú
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');
  
  // Estado para guardar el registro consultado individualmente
  const [employeeFound, setEmployeeFound] = useState<any>(null);

  // Estados de control para inputs del formulario
  const [empName, setEmpName] = useState('');
  const [empAddress, setEmpAddress] = useState('');
  const [empAge, setEmpAge] = useState('');
  const [empGender, setEmpGender] = useState<'M' | 'F'>('M');
  const [empYears, setEmpYears] = useState('');
  const [searchName, setSearchName] = useState('');

  // Configuración de las operaciones disponibles para el selector modular
  const actionsList = [
    { id: 'alta' as ActionType, label: 'Dar de Alta', icon: UserPlus },
    { id: 'baja' as ActionType, label: 'Dar de Baja', icon: UserMinus },
    { id: 'modificar' as ActionType, label: 'Mod. Antigüedad', icon: Edit3 },
    { id: 'listarTodos' as ActionType, label: 'Listar Todos', icon: Users },
    { id: 'listarUno' as ActionType, label: 'Listar Uno', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Componente Modular: Encabezado (Tema morado por ser arreglo ordenado) */}
      <PanelHeader
        category="Arreglos ordenados"
        title="Ejercicio 4: Registro de Empleados"
        subtitle="Registro y Ordenación Alfabética de Empleados"
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
            // Limpia campos e historial al cambiar de operación
            resetValues(setEmpName, setEmpAddress, setEmpAge, setEmpGender, setEmpYears);
            setSearchName('');
            setEmployeeFound(null);
          }}
        />

        {/* Panel dinámico */}
        <div className="bg-[#11162b] border border-purple-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* VISTA: Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-purple-400" /> Registrar Nuevo Empleado (Ordenado)
              </h3>
              <FormInput
                label="Nombre Completo:"
                value={empName}
                onChange={setEmpName}
                placeholder="Ej: Carlos Eduardo Mendoza"
                colorScheme="purple"
              />
              <FormInput
                label="Dirección:"
                value={empAddress}
                onChange={setEmpAddress}
                placeholder="Ej: Av. de la Reforma 4-50"
                colorScheme="purple"
              />
              <div className="grid grid-cols-3 gap-3">
                <FormInput
                  label="Edad:"
                  type="number"
                  min="18"
                  max="99"
                  value={empAge}
                  onChange={(val) => {
                    const num = Number(val);
                    if (num < 0) setEmpAge('0');
                    else if (num > 99) setEmpAge('99');
                    else setEmpAge(val);
                  }}
                  placeholder="Ej: 28"
                  colorScheme="purple"
                />
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Sexo:</label>
                  <select
                    value={empGender}
                    onChange={(e) => setEmpGender(e.target.value as 'M' | 'F')}
                    className="w-full bg-[#0a0d18] border border-purple-500/30 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400 h-[42px]"
                  >
                    <option value="M">Masculino (M)</option>
                    <option value="F">Femenino (F)</option>
                  </select>
                </div>
                <FormInput
                  label="Antigüedad (Años):"
                  type="number"
                  min="0"
                  value={empYears}
                  onChange={(val) => {
                    const num = Number(val);
                    if (num < 0) setEmpYears('0');
                    else setEmpYears(val);
                  }}
                  placeholder="Ej: 3"
                  colorScheme="purple"
                />
              </div>
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!empName.trim() || !empAddress.trim() || empAge === '' || empYears === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos obligatorios.');
                    return;
                  }

                  const nuevoEmpleado: Empleado = {
                    tam: Number(arraySize),
                    nombre: empName.trim(),
                    direccion: empAddress.trim(),
                    edad: Number(empAge),
                    esMujer: empGender === 'F',
                    añosDeAntiguedad: Number(empYears),
                  };

                  // Envío de POST
                  fetchRequest(path, { method: "POST", body: nuevoEmpleado })
                    .then(() => {
                      showNotification('success', 'Éxito', `El empleado ${nuevoEmpleado.nombre} ha sido agregado de forma ordenada.`);
                      resetValues(setEmpName, setEmpAddress, setEmpAge, setEmpGender, setEmpYears);
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
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Eliminar / Dar de Baja Empleado
              </h3>
              <FormInput
                label="Ingrese Nombre del Empleado:"
                value={empName}
                onChange={setEmpName}
                placeholder="Ej: Carlos Eduardo Mendoza"
                colorScheme="purple"
              />
              <button
                className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
                onClick={() => {
                  if (!empName.trim()) {
                    showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del empleado.');
                    return;
                  }

                  // Envío de DELETE
                  fetchRequest(path + `/${encodeURIComponent(empName.trim())}`, { method: "DELETE" })
                    .then(() => {
                      showNotification('success', 'Éxito', `El empleado ${empName.trim()} ha sido eliminado.`);
                      resetValues(setEmpName, setEmpAddress, setEmpAge, setEmpGender, setEmpYears);
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

          {/* VISTA: Modificar Antigüedad */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-purple-400" /> Modificar Años de Antigüedad
              </h3>
              <FormInput
                label="Nombre del Empleado:"
                value={empName}
                onChange={setEmpName}
                placeholder="Ej: Carlos Eduardo Mendoza"
                colorScheme="purple"
              />
              <FormInput
                label="Nuevos Años de Antigüedad:"
                type="number"
                min="0"
                value={empYears}
                onChange={(val) => {
                  const num = Number(val);
                  if (num < 0) setEmpYears('0');
                  else setEmpYears(val);
                }}
                placeholder="Ej: 5"
                colorScheme="purple"
              />
              <button
                className="mt-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!empName.trim() || empYears === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos.');
                    return;
                  }

                  const datos: Empleado = {
                    tam: Number(arraySize),
                    nombre: empName.trim(),
                    direccion: '',
                    edad: 0,
                    esMujer: false,
                    añosDeAntiguedad: Number(empYears),
                  };

                  // Envío de PUT
                  fetchRequest(path + `/${encodeURIComponent(empName.trim())}`, { method: "PUT", body: datos })
                    .then(() => {
                      showNotification('success', 'Éxito', `Antigüedad del empleado ${empName.trim()} actualizada.`);
                      resetValues(setEmpName, setEmpAddress, setEmpAge, setEmpGender, setEmpYears);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al modificar', err.message || 'No se pudo actualizar la antigüedad.');
                    });
                }}
              >
                Actualizar Antigüedad
              </button>
            </div>
          )}

          {/* VISTA: Listar Todos */}
          {selectedAction === 'listarTodos' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <Users className="w-5 h-5 text-purple-400" /> Lista General de Empleados
              </h3>
              <div className="overflow-x-auto">
                <ListEmployees allEmployees={true} employeeFound={null} />
              </div>
            </div>
          )}

          {/* VISTA: Listar Uno */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-purple-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-purple-400" /> Buscar Empleado Determinado
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <FormInput
                    label="Ingrese Nombre del Empleado:"
                    value={searchName}
                    onChange={setSearchName}
                    placeholder="Ingrese Nombre del Empleado"
                    colorScheme="purple"
                  />
                </div>
                <button
                  className="bg-purple-600 hover:bg-purple-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all h-[38px] flex items-center justify-center active:scale-95"
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
              <ListEmployees allEmployees={false} employeeFound={employeeFound} />
            </div>
          )}

        </div>
      </main>

      {/* Componente Modular: Botón de Salida */}
      <PanelFooter onBack={onBack} label="Salir" colorScheme="purple" />
    </div>
  );
};