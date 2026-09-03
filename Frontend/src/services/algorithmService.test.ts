// Prueba unitaria temporal para Frontend: Validación de enteros y contratos DTO
import { OrdenamientoDTO, BusquedaDTO } from './algorithmService';

// 1. Función de validación de enteros pura (igual a la utilizada en BinarySearchPanel y GenericSortingPanel)
export function validarSoloEnteros(cadenaElementos: string): { esValido: boolean; enteros: number[] } {
  if (!cadenaElementos || !cadenaElementos.trim()) {
    return { esValido: false, enteros: [] };
  }

  const items = cadenaElementos.split(',').map((item) => item.trim()).filter((item) => item !== '');
  const soloEnteros = items.every((item) => /^-?\d+$/.test(item));

  if (!soloEnteros) {
    return { esValido: false, enteros: [] };
  }

  return {
    esValido: true,
    enteros: items.map((item) => parseInt(item, 10)),
  };
}

// Executable assertion runner for standalone testing
export function ejecutarPruebasFrontend() {
  console.log('=== Iniciando Pruebas Unitarias Temporales de Frontend ===');

  // Test 1: Elementos válidos (enteros positivos y negativos)
  const test1 = validarSoloEnteros('5, 12, -3, 8');
  console.assert(test1.esValido === true, 'Test 1 Falló: Debería ser válido para enteros');
  console.assert(test1.enteros.length === 4, 'Test 1 Falló: Longitud incorrecta');

  // Test 2: Inclusión de decimales (debe rechazar)
  const test2 = validarSoloEnteros('5, 3.14, 8');
  console.assert(test2.esValido === false, 'Test 2 Falló: Debería rechazar números decimales');

  // Test 3: Inclusión de letras (debe rechazar)
  const test3 = validarSoloEnteros('5, abc, 8');
  console.assert(test3.esValido === false, 'Test 3 Falló: Debería rechazar letras');

  // Test 4: Verificación de DTOs
  const dtoOrdenamiento: OrdenamientoDTO = { tam: 3, arreglo: [9, 2, 5], metodoDeOrdenamiento: 6 };
  console.assert(dtoOrdenamiento.tam === 3 && dtoOrdenamiento.metodoDeOrdenamiento === 6, 'Test 4 Falló: DTO Ordenamiento');

  const dtoBusqueda: BusquedaDTO = { tam: 3, arreglo: [2, 5, 9], objetivo: 5 };
  console.assert(dtoBusqueda.objetivo === 5, 'Test 5 Falló: DTO Búsqueda');

  console.log('=== Todas las Pruebas Unitarias de Frontend Completadas Exitosamente ===');
}

// Auto-ejecución en entorno Node / Test runner
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'production') {
  try {
    ejecutarPruebasFrontend();
  } catch (e) {
    console.error('Error durante la ejecución de pruebas unitarias:', e);
  }
}
