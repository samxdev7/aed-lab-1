package uni.AEDLab1.services;

import uni.AEDLab1.models.EmpleadoDesordenadoDto;

/**
 * Servicio para el Ejercicio 3 - Registro de Empleados Desordenados.
 * Maneja el registro de empleados (nombre, sexo/esMujer, edad) utilizando
 * arreglos paralelos con comportamiento desordenado.
 */
public class Ejercicio3 {
    // Atributos de control del arreglo
    private final int tam; // Tamaño máximo físico del arreglo
    private int n; // Índice del último elemento insertado (-1 si está vacío)
    
    // Arreglos paralelos para los atributos de los empleados
    private final String[] nombre;
    private final boolean[] esMujer;
    private final int[] edad;
    
    /**
     * Constructor que inicializa los arreglos paralelos con el tamaño definido.
     * @param tam Tamaño físico máximo.
     */
    public Ejercicio3(int tam) {
        this.n = -1;
        this.tam = tam;
        
        this.nombre = new String[tam];
        this.esMujer = new boolean[tam];
        this.edad = new int[tam];
    }
    
    public int getTam() {
        return this.tam;
    }

    /**
     * Agrega un nuevo empleado al final del arreglo desordenado.
     * @param empleado DTO del empleado a ingresar.
     * @return true si se agregó con éxito, false si el arreglo está lleno.
     */
    public boolean agregarEmpleado(EmpleadoDesordenadoDto empleado) {
        // Validación de límite físico del arreglo
        if (n >= tam - 1) {
            return false;
        }
        
        nombre[++n] = empleado.getNombre();
        esMujer[n] = empleado.getSexo();
        edad[n] = empleado.getEdad();
        return true;
    }

    /**
     * Elimina un empleado por su nombre, compactando los elementos posteriores.
     * @param empleadoNombre Nombre del empleado a eliminar.
     * @return true si se encontró y eliminó, false si no existía.
     */
    public boolean eliminarEmpleado(String empleadoNombre) {
        int i = 0;

        // Búsqueda secuencial
        while (i <= n && !empleadoNombre.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        // Si se supera el límite lógico actual 'n', no existe
        if (i > n) { 
            return false;
        }
        
        // Desplazamiento a la izquierda para mantener el arreglo compacto
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            esMujer[k] = esMujer[k+1];
            edad[k] = edad[k+1];
        }

        --n; // Decrementamos el límite lógico
        return true;
    }

    /**
     * Modifica la edad de un empleado determinado.
     * @param empleado DTO con el nombre del empleado y su nueva edad.
     * @return true si se actualizó, false si no se encontró.
     */
    public boolean modificarEdad(EmpleadoDesordenadoDto empleado) {
        int i = 0;
        String objetivo = empleado.getNombre();

        // Búsqueda secuencial
        while (i <= n && !objetivo.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        if (i > n) {
            return false;
        }
        
        edad[i] = empleado.getEdad();
        return true;
    }

    /**
     * Busca y retorna los datos de un empleado determinado por su nombre.
     * @param empleadoNombre Nombre del empleado a buscar.
     * @return DTO del empleado, o null si no se encuentra.
     */
    public EmpleadoDesordenadoDto imprimirDatosDeUnEmpleado(String empleadoNombre) {
        int i = 0;

        while (i <= n && !empleadoNombre.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        if (i > n) {
            return null;
        }
        
        return new EmpleadoDesordenadoDto(tam, nombre[i], esMujer[i], edad[i]);
    }
    
    /**
     * Obtiene todos los empleados registrados.
     * Retorna un arreglo del tamaño lógico exacto para evitar elementos nulos al serializar a JSON.
     * @return Arreglo de DTOs.
     */
    public EmpleadoDesordenadoDto[] imprimirTodosLosDatos() {
        EmpleadoDesordenadoDto[] listaEmpleados = new EmpleadoDesordenadoDto[n+1];

        for (int i = 0; i <= n; i++) {
            listaEmpleados[i] = new EmpleadoDesordenadoDto(tam, nombre[i], esMujer[i], edad[i]);
        }

        return listaEmpleados;
    }

    /**
     * Obtiene únicamente los empleados registrados de sexo masculino (varones).
     * Retorna un arreglo del tamaño lógico exacto sin valores nulos.
     * @return Arreglo de DTOs de varones.
     */
    public EmpleadoDesordenadoDto[] imprimirVarones() {
        int count = 0;
        // Primer paso: Contar cuántos varones hay para dimensionar el arreglo exacto
        for (int i = 0; i <= n; i++) {
            if (!esMujer[i]) {
                count++;
            }
        }

        EmpleadoDesordenadoDto[] listaVarones = new EmpleadoDesordenadoDto[count];
        int idx = 0;
        // Segundo paso: Rellenar el arreglo filtrado
        for (int i = 0; i <= n; i++) {
            if (!esMujer[i]) {
                listaVarones[idx++] = new EmpleadoDesordenadoDto(tam, nombre[i], esMujer[i], edad[i]);
            }
        }

        return listaVarones;
    }
}
