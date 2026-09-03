import React, { useEffect, useState } from 'react';
import { UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';
import { API_KEY, fetchRequest, apiRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter, OperationSelector, FormInput } from './CommonComponents';

// URL base del backend para las operaciones del Ejercicio 1 (Alumnos)
const path: string = `${API_KEY}/estudiantes/estudiante`;

// Interfaz que modela el DTO del Estudiante esperado por el backend
interface Estudiante {
  tam: number;
  nombre: string;
  nSemestresCursados: number;
  promedioTotal: number;
}

// Tipo unión para representar las operaciones del menú de ejercicio
type ActionType = 'alta' | 'baja' | 'modificar' | 'listarTodos' | 'listarUno';

interface Exercise1PanelProps {
  onBack: () => void;
}

// Función auxiliar para resetear los valores de los formularios al cambiar de operación
const resetValues = (
  setStudentName: (val: string) => void,
  setStudentSemesters: (val: string) => void,
  setStudentAverage: (val: string) => void
) => {
  setStudentName('');
  setStudentSemesters('');
  setStudentAverage('');
};

/**
 * Componente interno para renderizar las filas de estudiantes en la tabla de resultados.
 */
const StudentRow = ({ students }: { students: Estudiante[] }) => {
  if (!Array.isArray(students)) return null;

  return (
    <tbody className="divide-y divide-cyan-500/10">
      {students.map((student: Estudiante, index: number) => (
        <tr key={student.nombre + index} className="hover:bg-cyan-500/5">
          <td className="p-2.5 font-mono text-cyan-400">[{index + 1}]</td>
          <td className="p-2.5 font-medium text-white">{student.nombre}</td>
          <td className="p-2.5">{student.nSemestresCursados}</td>
          <td className="p-2.5">
            {typeof student.promedioTotal === 'number' 
              ? student.promedioTotal.toFixed(2) 
              : student.promedioTotal}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

/**
 * Componente modular para listar estudiantes.
 * Soluciona la violación de hooks y los renders infinitos al reaccionar estrictamente
 * a cambios en sus propiedades mediante el hook useEffect.
 */
const ListStudents = ({ allStudents, studentFound }: { allStudents: boolean; studentFound: any }) => {
  const [data, setData] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si la operación es listar todos, hacemos una consulta GET al servidor
    if (allStudents) {
      setLoading(true);
      setError(null);
      apiRequest<Estudiante[]>(path, { method: "GET" })
        .then((res) => {
          setData(res || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || 'Error al obtener los alumnos');
          setLoading(false);
        });
    } else {
      // Si la operación es listar un estudiante determinado, usamos el resultado de la búsqueda
      if (studentFound) {
        setData(Array.isArray(studentFound) ? studentFound : [studentFound]);
      } else {
        setData([]);
      }
      setLoading(false);
      setError(null);
    }
  }, [allStudents, studentFound]); // Se ejecuta solo cuando cambian estos parámetros

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
            <th className="p-2.5">Semestres Cursados</th>
            <th className="p-2.5 rounded-r-lg">Promedio Total</th>
          </tr>
        </thead>
        <StudentRow students={data} />
      </table>
    );
  }

  return (
    <div className="text-center py-4 text-slate-400">
      No se encontraron registros para mostrar.
    </div>
  );
};

export const Exercise1Panel: React.FC<Exercise1PanelProps> = ({ onBack }) => {
  // Hook de notificaciones flotantes (Pop Ups)
  const { showNotification } = useNotification();
  
  // Estados para tamaño físico del arreglo
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  
  // Estado para la pestaña de operación activa
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');
  
  // Estado para el estudiante encontrado en la búsqueda individual
  const [studentFound, setStudentFound] = useState<any>(null);

  // Estados de control para campos de entrada de formularios
  const [studentName, setStudentName] = useState('');
  const [studentSemesters, setStudentSemesters] = useState('');
  const [studentAverage, setStudentAverage] = useState('');
  const [searchName, setSearchName] = useState('');

  // Definición de las operaciones disponibles en el selector
  const actionsList = [
    { id: 'alta' as ActionType, label: 'Dar de Alta', icon: UserPlus },
    { id: 'baja' as ActionType, label: 'Dar de Baja', icon: UserMinus },
    { id: 'modificar' as ActionType, label: 'Mod. Semestres y Promedio', icon: Edit3 },
    { id: 'listarUno' as ActionType, label: 'Listar Alumno Determinado', icon: UserCheck },
    { id: 'listarTodos' as ActionType, label: 'Listar Todos', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Componente Modular: Encabezado */}
      <PanelHeader
        category="Arreglos desordenados"
        title="Ejercicio 1: Registro de Alumnos"
        subtitle="Registro y Control de Alumnos de Escuela"
        colorScheme="cyan"
      />

      <main className="max-w-4xl mx-auto w-full flex flex-col gap-6 my-auto py-4">
        {/* Componente Modular: Configuración del tamaño físico de la estructura */}
        <ArraySizeConfig
          arraySize={arraySize}
          setArraySize={setArraySize}
          isSizeSet={isSizeSet}
          setIsSizeSet={setIsSizeSet}
          colorScheme="cyan"
        />

        {/* Componente Modular: Selector de operaciones (con tipado genérico explícito) */}
        <OperationSelector<ActionType>
          selectedAction={selectedAction}
          setSelectedAction={setSelectedAction}
          actions={actionsList}
          colorScheme="cyan"
          onActionChange={() => {
            // Limpia los campos e historial al cambiar de operación
            resetValues(setStudentName, setStudentSemesters, setStudentAverage);
            setSearchName('');
            setStudentFound(null);
          }}
        />

        {/* Contenedor del panel dinámico de la operación seleccionada */}
        <div className="bg-[#11162b] border border-cyan-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* VISTA: Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-cyan-400" /> Dar de Alta a un Alumno
              </h3>
              <FormInput
                label="Nombre Completo:"
                value={studentName}
                onChange={setStudentName}
                placeholder="Ej: Ana María Gómez"
                colorScheme="cyan"
              />
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Semestres Cursados:"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={studentSemesters}
                  onChange={(val) => {
                    const numVal = Number(val);
                    if (numVal < 0) setStudentSemesters('0');
                    else if (numVal > 100) setStudentSemesters('100');
                    else setStudentSemesters(val);
                  }}
                  placeholder="Ej: 4"
                  colorScheme="cyan"
                />
                <FormInput
                  label="Calificación Promedio Total:"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={studentAverage}
                  onChange={(val) => {
                    const numVal = Number(val);
                    if (numVal < 0) setStudentAverage('0');
                    else if (numVal > 100) setStudentAverage('100');
                    else setStudentAverage(val);
                  }}
                  placeholder="Ej: 100"
                  colorScheme="cyan"
                />
              </div>
              <button
                className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!studentName.trim() || studentSemesters === '' || studentAverage === '') {
                    showNotification('warning', 'Datos incompletos', 'Por favor, complete todos los campos.');
                    return;
                  }
                  const estudiante: Estudiante = {
                    tam: Number(arraySize),
                    nombre: studentName.trim(),
                    nSemestresCursados: Number(studentSemesters),
                    promedioTotal: Number(studentAverage),
                  };

                  // Solicitud POST: maneja el éxito/error con notificaciones pop-up
                  fetchRequest(path, { method: "POST", body: estudiante })
                    .then(() => {
                      showNotification('success', 'Éxito', `El alumno ${estudiante.nombre} ha sido registrado.`);
                      resetValues(setStudentName, setStudentSemesters, setStudentAverage);
                    })
                    .catch((err: any) => {
                      // Muestra el mensaje detallado enviado desde el backend (ej: arreglo lleno)
                      showNotification('error', 'Error al registrar', err.message || 'No se pudo guardar el alumno.');
                    });
                }}
              >
                Guardar Alumno
              </button>
            </div>
          )}

          {/* VISTA: Dar de Baja */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Dar de Baja a un Alumno
              </h3>
              <FormInput
                label="Ingrese Nombre Completo del Alumno:"
                value={studentName}
                onChange={setStudentName}
                placeholder="Ej: Ana María Gómez"
                colorScheme="cyan"
              />
              <button
                className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
                onClick={() => {
                  if (!studentName.trim()) {
                    showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del alumno.');
                    return;
                  }
                  // Solicitud DELETE: ahora el backend devuelve 404 si el alumno no existe, mostrando error exacto
                  fetchRequest(path + `/${encodeURIComponent(studentName.trim())}`, { method: "DELETE" })
                    .then(() => {
                      showNotification('success', 'Éxito', `El alumno ${studentName.trim()} ha sido dado de baja.`);
                      resetValues(setStudentName, setStudentSemesters, setStudentAverage);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al eliminar', err.message || 'No se pudo eliminar al alumno.');
                    });
                }}
              >
                Dar de Baja
              </button>
            </div>
          )}

          {/* VISTA: Modificar Semestres y Promedio */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-cyan-400" /> Modificar Semestres y Promedio
              </h3>
              <FormInput
                label="Ingrese Nombre Completo del Alumno:"
                value={studentName}
                onChange={setStudentName}
                placeholder="Ej: Ana María Gómez"
                colorScheme="cyan"
              />
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Nuevos Semestres:"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={studentSemesters}
                  onChange={(val) => {
                    const numVal = Number(val);
                    if (numVal < 0) setStudentSemesters('0');
                    else if (numVal > 100) setStudentSemesters('100');
                    else setStudentSemesters(val);
                  }}
                  placeholder="Ej: 5"
                  colorScheme="cyan"
                />
                <FormInput
                  label="Nuevo Promedio:"
                  type="number"
                  min="0"
                  max="100"
                  step="1"
                  value={studentAverage}
                  onChange={(val) => {
                    const numVal = Number(val);
                    if (numVal < 0) setStudentAverage('0');
                    else if (numVal > 100) setStudentAverage('100');
                    else setStudentAverage(val);
                  }}
                  placeholder="Ej: 100"
                  colorScheme="cyan"
                />
              </div>
              <button
                className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!studentName.trim() || studentSemesters === '' || studentAverage === '') {
                    showNotification('warning', 'Datos incompletos', 'Por favor, complete todos los campos.');
                    return;
                  }
                  const estudiante: Estudiante = {
                    tam: Number(arraySize),
                    nombre: studentName.trim(),
                    nSemestresCursados: Number(studentSemesters),
                    promedioTotal: Number(studentAverage),
                  };

                  // Solicitud PUT: el backend retorna 404 si el alumno no existe
                  fetchRequest(path + `/${encodeURIComponent(studentName.trim())}`, { method: "PUT", body: estudiante })
                    .then(() => {
                      showNotification('success', 'Éxito', `Datos del alumno ${estudiante.nombre} modificados.`);
                      resetValues(setStudentName, setStudentSemesters, setStudentAverage);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al modificar', err.message || 'No se pudieron modificar los datos.');
                    });
                }}
              >
                Actualizar Datos
              </button>
            </div>
          )}

          {/* VISTA: Consultar Determinado */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-cyan-400" /> Consultar Alumno Determinado
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <FormInput
                    label="Ingrese Nombre del Alumno:"
                    value={searchName}
                    onChange={setSearchName}
                    placeholder="Ingrese Nombre del Alumno"
                    colorScheme="cyan"
                  />
                </div>
                <button
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all h-[38px] flex items-center justify-center active:scale-95"
                  onClick={() => {
                    if (!searchName.trim()) {
                      showNotification('warning', 'Campo vacío', 'Por favor ingrese el nombre a buscar.');
                      return;
                    }
                    // Solicitud GET individual: retorna el estudiante o 404
                    apiRequest<Estudiante | null>(path + `/${encodeURIComponent(searchName.trim())}`, { method: "GET" })
                      .then((res) => {
                        if (res) {
                          setStudentFound(res);
                          showNotification('success', 'Búsqueda Exitosa', `Se encontró a ${res.nombre}.`);
                        } else {
                          setStudentFound(null);
                          showNotification('info', 'No Encontrado', `No se encontró ningún alumno.`);
                        }
                      })
                      .catch((err: any) => {
                        console.error(err);
                        setStudentFound(null);
                        showNotification('error', 'Error de Búsqueda', err.message || 'Error al buscar el alumno.');
                      });
                  }}
                >
                  Buscar
                </button>
              </div>
              <ListStudents allStudents={false} studentFound={studentFound} />
            </div>
          )}

          {/* VISTA: Listar Todos */}
          {selectedAction === 'listarTodos' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Users className="w-5 h-5 text-cyan-400" /> Todos los Registros
              </h3>
              <div className="overflow-x-auto">
                <ListStudents allStudents={true} studentFound={null} />
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Componente Modular: Botón de salida */}
      <PanelFooter onBack={onBack} label="Salir" colorScheme="cyan" />
    </div>
  );
};