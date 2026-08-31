package uni.AEDLab1.services;

import uni.AEDLab1.models.EmpleadoOrdenadoDto;

/**
 * Servicio para el Ejercicio 4 - Registro de Empleados Ordenados Alfabéticamente.
 * Implementa una estructura de datos ordenada físicamente por nombre completo.
 * Mantiene el orden insertando elementos en su posición correspondiente y desplazando
 * los demás, utilizando búsqueda lineal para la inserción ordenada.
 */
public class Ejercicio4 {
    // Atributos de control del arreglo
    private final int tam; // Tamaño máximo físico del arreglo
    private int n; // Índice del último elemento insertado (-1 si está vacío)
    
    // Arreglos paralelos para los atributos de los empleados ordenados
    private final String[] nombre;
    private final String[] direccion;
    private final int[] edad;
    private final boolean[] esMujer;
    private final int[] añosDeAntiguedad;
    
    /**
     * Constructor que inicializa los arreglos paralelos con el tamaño configurado.
     * @param tam Tamaño físico máximo.
     */
    public Ejercicio4(int tam) {
        this.n = -1;
        this.tam = tam;
        
        this.nombre = new String[tam];
        this.direccion = new String[tam];
        this.edad = new int[tam];
        this.esMujer = new boolean[tam];
        this.añosDeAntiguedad = new int[tam];
    }
    
    public int getTam() {
        return this.tam;
    }

    /**
     * Realiza una búsqueda para ubicar la posición exacta del elemento.
     * Si lo encuentra, retorna su índice actual.
     * Si no lo encuentra, retorna -(posicion_de_insercion + 1) para indicar dónde debe ir ordenado.
     * @param empleadoNombre Nombre completo a buscar.
     * @return Índice si se encuentra; o -(posición_inserción + 1) si no.
     */
    private int buscarEmpleado(String empleadoNombre) {
        int i = 0;
        // Búsqueda lineal hasta encontrar la posición alfabética adecuada
        while (i <= n && nombre[i].compareToIgnoreCase(empleadoNombre) < 0) {
            i++;
        }
        // Si el elemento coincide exactamente
        if (i <= n && nombre[i].equalsIgnoreCase(empleadoNombre)) {
            return i; // Encontrado
        }
        return -(i + 1); // No encontrado, posición de inserción es i
    }

    /**
     * Agrega un nuevo empleado en su posición alfabética exacta, desplazando los elementos siguientes.
     * @param empleado DTO con los datos del empleado.
     * @return true si se agregó con éxito, false si el arreglo está lleno o si ya está registrado.
     */
    public boolean agregarEmpleado(EmpleadoOrdenadoDto empleado) {
        // Validar límite físico de almacenamiento
        if (n >= tam - 1) {
            return false;
        }

        String empleadoNombre = empleado.getNombre();
        int pos = buscarEmpleado(empleadoNombre);

        // Si pos >= 0, significa que el empleado ya se encuentra registrado (llave duplicada)
        if (pos >= 0) {
            return false;
        }

        // Obtener la posición de inserción adecuada descifrando el valor negativo retornado
        int insertPos = -pos - 1;
        n++; // Incrementamos el límite lógico

        // Desplazamiento a la derecha de los elementos para abrir el espacio de inserción
        for (int i = n; i >= insertPos + 1; i--) {
            nombre[i] = nombre[i-1];
            direccion[i] = direccion[i-1];
            edad[i] = edad[i-1];
            esMujer[i] = esMujer[i-1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i-1];
        }

        // Inserción en la posición ordenada
        nombre[insertPos] = empleadoNombre;
        direccion[insertPos] = empleado.getDireccion();
        edad[insertPos] = empleado.getEdad();
        esMujer[insertPos] = empleado.getSexo();
        añosDeAntiguedad[insertPos] = empleado.getAñosDeAntiguedad();
        return true;
    }

    /**
     * Elimina un empleado y compacta el arreglo desplazando los elementos a la izquierda.
     * @param empleadoNombre Nombre del empleado a eliminar.
     * @return true si se encontró y eliminó, false si no existía.
     */
    public boolean eliminarEmpleado(String empleadoNombre) {
        if (n < 0) {
            return false;
        }

        int pos = buscarEmpleado(empleadoNombre);

        // Si es menor que cero, el empleado no está registrado
        if (pos < 0) {
            return false;
        }

        n--;
        // Desplazamiento a la izquierda para cubrir la vacante y mantener el arreglo compacto y ordenado
        for (int i = pos; i <= n; i++) {
            nombre[i] = nombre[i+1];
            direccion[i] = direccion[i+1];
            edad[i] = edad[i+1];
            esMujer[i] = esMujer[i+1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i+1];
        }
        return true;
    }

    /**
     * Modifica los años de antigüedad de un empleado determinado.
     * @param empleado DTO con el nombre del empleado y su nueva antigüedad.
     * @return true si se actualizó, false si no se encontró.
     */
    public boolean modificarAniosDeAntiguedad(EmpleadoOrdenadoDto empleado) {
        int pos = buscarEmpleado(empleado.getNombre());
        if (pos < 0) {
            return false; // No registrado
        }
        
        añosDeAntiguedad[pos] = empleado.getAñosDeAntiguedad();
        return true;
    }

    /**
     * Busca y retorna los datos de un empleado determinado.
     * @param empleadoNombre Nombre completo del empleado.
     * @return DTO del empleado, o null si no se encuentra.
     */
    public EmpleadoOrdenadoDto listarUnEmpleadoDeterminado(String empleadoNombre) {
        int pos = buscarEmpleado(empleadoNombre);

        if (pos < 0) {
            return null;
        }

        return new EmpleadoOrdenadoDto(tam, nombre[pos], direccion[pos], edad[pos], 
            esMujer[pos], añosDeAntiguedad[pos]);
    }

    /**
     * Obtiene el listado completo de todos los empleados en orden alfabético.
     * @return Arreglo de DTOs de tamaño lógico exacto.
     */
    public EmpleadoOrdenadoDto[] listarTodosLosEmpleados() {
        EmpleadoOrdenadoDto[] lista = new EmpleadoOrdenadoDto[n+1];
        
        for (int i = 0; i <= n; i++) {
            lista[i] = new EmpleadoOrdenadoDto(tam, nombre[i], direccion[i], edad[i], 
                esMujer[i], añosDeAntiguedad[i]);
        }

        return lista;
    }
}
