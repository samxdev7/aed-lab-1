import React, { useEffect, useState } from 'react';
import { UserPlus, UserMinus, UserCheck, Users, Edit3 } from 'lucide-react';
import { API_KEY, fetchRequest, apiRequest } from './HTTPMethods';
import { useNotification } from './NotificationContext';
import { PanelHeader, ArraySizeConfig, PanelFooter, OperationSelector, FormInput } from './CommonComponents';

// URL base del backend para las operaciones del Ejercicio 2 (Clientes)
const path: string = `${API_KEY}/clientes/cliente`;

// Interfaz que modela el DTO de Cliente esperado por el backend
interface Cliente {
  tam: number;
  nombre: string;
  telefono: string;
  saldo: number;
  moroso: boolean;
}

// Tipo unión para representar las operaciones del menú
type ActionType = 'alta' | 'baja' | 'modificar' | 'listarTodos' | 'listarUno';

interface Exercise2PanelProps {
  onBack: () => void;
}

// Función auxiliar para resetear los valores de los formularios al cambiar de operación
const resetValues = (
  setClientName: (val: string) => void,
  setClientPhone: (val: string) => void,
  setClientBalance: (val: string) => void,
  setIsDefaulting: (val: boolean) => void
) => {
  setClientName('');
  setClientPhone('');
  setClientBalance('');
  setIsDefaulting(false);
};

/**
 * Componente modular para listar clientes.
 * Obtiene dinámicamente los clientes del backend o renderiza el resultado de búsqueda individual.
 */
const ListClients = ({ allClients, clientFound }: { allClients: boolean; clientFound: any }) => {
  const [data, setData] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si la pestaña actual indica consultar todos los registros
    if (allClients) {
      setLoading(true);
      setError(null);
      apiRequest<Cliente[]>(path, { method: "GET" })
        .then((res) => {
          setData(res || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError(err.message || 'Error al obtener los clientes');
          setLoading(false);
        });
    } else {
      // Si indica mostrar el cliente buscado individualmente
      if (clientFound) {
        setData(Array.isArray(clientFound) ? clientFound : [clientFound]);
      } else {
        setData([]);
      }
      setLoading(false);
      setError(null);
    }
  }, [allClients, clientFound]); // Ejecución controlada por dependencias

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
            <th className="p-2.5">Teléfono</th>
            <th className="p-2.5">Saldo</th>
            <th className="p-2.5 rounded-r-lg">¿Es Moroso?</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cyan-500/10">
          {data.map((client: Cliente, index: number) => (
            <tr key={client.nombre + index} className="hover:bg-cyan-500/5">
              <td className="p-2.5 font-mono text-cyan-400">[{index + 1}]</td>
              <td className="p-2.5 font-medium text-white">{client.nombre}</td>
              <td className="p-2.5">{client.telefono}</td>
              <td className="p-2.5 font-mono">${Number(client.saldo).toFixed(2)}</td>
              <td className={`p-2.5 font-semibold ${client.moroso ? 'text-rose-400' : 'text-emerald-400'}`}>
                {client.moroso ? 'Verdadero' : 'Falso'}
              </td>
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

export const Exercise2Panel: React.FC<Exercise2PanelProps> = ({ onBack }) => {
  // Hook del sistema de notificaciones pop-up
  const { showNotification } = useNotification();
  
  // Estados para tamaño físico del arreglo
  const [arraySize, setArraySize] = useState<string>('7');
  const [isSizeSet, setIsSizeSet] = useState<boolean>(true);
  
  // Estado para la operación seleccionada
  const [selectedAction, setSelectedAction] = useState<ActionType>('alta');
  
  // Estado para guardar el cliente encontrado por búsqueda
  const [clientFound, setClientFound] = useState<any>(null);

  // Estados de control para inputs de formulario
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientBalance, setClientBalance] = useState('');
  const [isDefaulting, setIsDefaulting] = useState<boolean>(false);
  const [searchName, setSearchName] = useState('');

  // Configuración de la lista de acciones disponibles en el selector
  const actionsList = [
    { id: 'alta' as ActionType, label: 'Dar de Alta', icon: UserPlus },
    { id: 'baja' as ActionType, label: 'Dar de Baja', icon: UserMinus },
    { id: 'modificar' as ActionType, label: 'Modificar Estado Moroso', icon: Edit3 },
    { id: 'listarUno' as ActionType, label: 'Listar Cliente Determinado', icon: UserCheck },
    { id: 'listarTodos' as ActionType, label: 'Listar Todos', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#0a0d18] text-white flex flex-col justify-between p-8 font-sans">
      {/* Componente Modular: Encabezado */}
      <PanelHeader
        category="Arreglos desordenados"
        title="Ejercicio 2: Registro de Clientes"
        subtitle="Registro y Control Financiero de Clientes"
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
            // Reinicia campos al alternar entre pestañas
            resetValues(setClientName, setClientPhone, setClientBalance, setIsDefaulting);
            setSearchName('');
            setClientFound(null);
          }}
        />

        {/* Panel dinámico */}
        <div className="bg-[#11162b] border border-cyan-500/30 rounded-2xl p-6 min-h-[220px] flex flex-col justify-center">
          
          {/* VISTA: Dar de Alta */}
          {selectedAction === 'alta' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserPlus className="w-5 h-5 text-cyan-400" /> Dar de Alta a un Cliente
              </h3>
              <FormInput
                label="Nombre Completo:"
                value={clientName}
                onChange={setClientName}
                placeholder="Ej: Roberto Carlos López"
                colorScheme="cyan"
              />
              <div className="grid grid-cols-2 gap-3">
                <FormInput
                  label="Teléfono:"
                  value={clientPhone}
                  onChange={(val) => {
                    // Sanitización de números telefónicos
                    const formatted = val.replace(/[^0-9-]/g, '');
                    setClientPhone(formatted);
                  }}
                  placeholder="Ej: 5505-0192"
                  colorScheme="cyan"
                />
                <FormInput
                  label="Saldo Inicial ($):"
                  type="number"
                  min="0"
                  step="0.01"
                  value={clientBalance}
                  onChange={setClientBalance}
                  placeholder="Ej: 1500.50"
                  colorScheme="cyan"
                />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="checkbox"
                  id="morosoCheck"
                  checked={isDefaulting}
                  onChange={(e) => setIsDefaulting(e.target.checked)}
                  className="accent-cyan-400 w-4 h-4 cursor-pointer"
                />
                <label htmlFor="morosoCheck" className="text-xs text-slate-300 cursor-pointer">
                  ¿Es Moroso? (Marcar si es Verdadero)
                </label>
              </div>
              <button
                className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!clientName.trim() || !clientPhone.trim() || clientBalance === '') {
                    showNotification('warning', 'Campos vacíos', 'Por favor, complete todos los campos obligatorios.');
                    return;
                  }
                  const nuevoCliente: Cliente = {
                    tam: Number(arraySize),
                    nombre: clientName.trim(),
                    telefono: clientPhone.trim(),
                    saldo: Number(clientBalance),
                    moroso: isDefaulting,
                  };

                  // Envío de POST
                  fetchRequest(path, { method: "POST", body: nuevoCliente })
                    .then(() => {
                      showNotification('success', 'Éxito', `El cliente ${nuevoCliente.nombre} ha sido registrado.`);
                      resetValues(setClientName, setClientPhone, setClientBalance, setIsDefaulting);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al registrar', err.message || 'No se pudo guardar el cliente.');
                    });
                }}
              >
                Guardar Cliente
              </button>
            </div>
          )}

          {/* VISTA: Modificar Estado Moroso */}
          {selectedAction === 'modificar' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Edit3 className="w-5 h-5 text-cyan-400" /> Modificar Estado Moroso
              </h3>
              <FormInput
                label="Nombre del Cliente:"
                value={clientName}
                onChange={setClientName}
                placeholder="Ej: Roberto Carlos López"
                colorScheme="cyan"
              />
              <div>
                <label className="text-xs text-slate-400 block mb-1">Nuevo Estado Moroso:</label>
                <select
                  value={isDefaulting ? "true" : "false"}
                  onChange={(e) => setIsDefaulting(e.target.value === "true")}
                  className="w-full bg-[#0a0d18] border border-cyan-500/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="false">Falso (Al corriente)</option>
                  <option value="true">Verdadero (Moroso)</option>
                </select>
              </div>
              <button
                className="mt-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-[0_0_12px_rgba(56,189,248,0.3)] active:scale-95 text-sm"
                onClick={() => {
                  if (!clientName.trim()) {
                    showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del cliente.');
                    return;
                  }
                  const datos: Cliente = {
                    tam: Number(arraySize),
                    nombre: clientName.trim(),
                    telefono: '',
                    saldo: 0,
                    moroso: isDefaulting,
                  };

                  // Envío de PUT
                  fetchRequest(path + `/${encodeURIComponent(clientName.trim())}`, { method: "PUT", body: datos })
                    .then(() => {
                      showNotification('success', 'Éxito', `Estado moroso del cliente ${clientName.trim()} actualizado.`);
                      resetValues(setClientName, setClientPhone, setClientBalance, setIsDefaulting);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al modificar', err.message || 'No se pudo actualizar el estado.');
                    });
                }}
              >
                Actualizar Estado
              </button>
            </div>
          )}

          {/* VISTA: Dar de Baja */}
          {selectedAction === 'baja' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-red-400 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserMinus className="w-5 h-5 text-red-400" /> Dar de Baja a un Cliente
              </h3>
              <FormInput
                label="Ingrese Nombre Completo del Cliente:"
                value={clientName}
                onChange={setClientName}
                placeholder="Ej: Roberto Carlos López"
                colorScheme="cyan"
              />
              <button
                className="mt-2 bg-red-600/80 hover:bg-red-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all shadow-lg active:scale-95 text-sm"
                onClick={() => {
                  if (!clientName.trim()) {
                    showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del cliente.');
                    return;
                  }
                  
                  // Envío de DELETE
                  fetchRequest(path + `/${encodeURIComponent(clientName.trim())}`, { method: "DELETE" })
                    .then(() => {
                      showNotification('success', 'Éxito', `El cliente ${clientName.trim()} ha sido dado de baja.`);
                      resetValues(setClientName, setClientPhone, setClientBalance, setIsDefaulting);
                    })
                    .catch((err: any) => {
                      showNotification('error', 'Error al eliminar', err.message || 'No se pudo eliminar al cliente.');
                    });
                }}
              >
                Dar de Baja
              </button>
            </div>
          )}

          {/* VISTA: Consultar Cliente Determinado */}
          {selectedAction === 'listarUno' && (
            <div className="flex flex-col gap-4 max-w-md mx-auto w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <UserCheck className="w-5 h-5 text-cyan-400" /> Consultar Cliente Determinado
              </h3>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <FormInput
                    label="Ingrese Nombre del Cliente:"
                    value={searchName}
                    onChange={setSearchName}
                    placeholder="Ingrese Nombre del Cliente"
                    colorScheme="cyan"
                  />
                </div>
                <button
                  className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all h-[38px] flex items-center justify-center active:scale-95"
                  onClick={() => {
                    if (!searchName.trim()) {
                      showNotification('warning', 'Campo vacío', 'Por favor, ingrese el nombre del cliente a buscar.');
                      return;
                    }
                    
                    // Envío de GET
                    apiRequest<Cliente | null>(path + `/${encodeURIComponent(searchName.trim())}`, { method: "GET" })
                      .then((res) => {
                        if (res) {
                          setClientFound(res);
                          showNotification('success', 'Búsqueda Exitosa', `Se encontró el registro de ${res.nombre}.`);
                        } else {
                          setClientFound(null);
                          showNotification('info', 'No Encontrado', `No se encontró ningún cliente.`);
                        }
                      })
                      .catch((err: any) => {
                        console.error(err);
                        setClientFound(null);
                        showNotification('error', 'Error de Búsqueda', err.message || 'Error al buscar el cliente.');
                      });
                  }}
                >
                  Buscar
                </button>
              </div>
              <ListClients allClients={false} clientFound={clientFound} />
            </div>
          )}

          {/* VISTA: Listar Todos */}
          {selectedAction === 'listarTodos' && (
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-lg font-bold text-cyan-300 flex items-center gap-2 border-b border-cyan-500/20 pb-2">
                <Users className="w-5 h-5 text-cyan-400" /> Información de Todos los Clientes
              </h3>
              <div className="overflow-x-auto">
                <ListClients allClients={true} clientFound={null} />
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Componente Modular: Botón de Salida */}
      <PanelFooter onBack={onBack} label="Salir" colorScheme="cyan" />
    </div>
  );
};