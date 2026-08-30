package uni.AEDLab1.models;

/** Opciones para int opcion:
 *  1. Burbuja
 *  2. BurbujaConSeñal
 *  3. Baraja
 *  4. Sacudida
 *  5. Seleccion
 *  6. Shell
 *  7. Búsqueda Binaria
 */

public record AlgoritmosDto(int tam, int opcion, int[] elementos, int buscar) {}
