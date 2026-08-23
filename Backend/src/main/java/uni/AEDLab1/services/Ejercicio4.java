package uni.AEDLab1.services;

import uni.AEDLab1.models.EmpleadoOrdenadoDto;

/**
 * 4. Una compañía necesita almacenar en arreglos la siguiente información de cada uno
 * de sus empleados ordenados alfabéticamente por el nombre: Nombre, Dirección, Edad,
 * Sexo, Años de antigüedad. Escribir un programa que realice las siguientes operaciones:
 *      1. Listar los datos de todos los empleados
 *      2. Dar de alta a un empleado
 *      3. Dar de baja a un empleado
 *      4. Modificar los años de antigüedad de un empleado
 *      5. Listar los datos de un empleado determinado
 *      6. Salir.
 */

public class Ejercicio4 {
    private final int tam;
    private int n;
    
    private final String[] nombre;
    private final String[] direccion;
    private final int[] edad;
    private final boolean[] esMujer;
    private final int[] añosDeAntiguedad;
    
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

    private int buscarEmpleado(String empleadoNombre) {
        int i = 0;
        while (i <= n && nombre[i].compareToIgnoreCase(empleadoNombre) < 0) {
            i++;
        }
        if (i <= n && nombre[i].equalsIgnoreCase(empleadoNombre)) {
            return i; // Encontrado
        }
        return -(i + 1); // No encontrado, posición de inserción es i
    }

    public void agregarEmpleado(EmpleadoOrdenadoDto empleado) {
        if (n >= tam - 1) {
            return;
        }

        String empleadoNombre = empleado.getNombre();
        int pos = buscarEmpleado(empleadoNombre);

        if (pos >= 0) {
            // Ya registrado
            return;
        }

        int insertPos = -pos - 1;
        n++;

        for (int i = n; i >= insertPos + 1; i--) {
            nombre[i] = nombre[i-1];
            direccion[i] = direccion[i-1];
            edad[i] = edad[i-1];
            esMujer[i] = esMujer[i-1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i-1];
        }

        nombre[insertPos] = empleadoNombre;
        direccion[insertPos] = empleado.getDireccion();
        edad[insertPos] = empleado.getEdad();
        esMujer[insertPos] = empleado.getSexo();
        añosDeAntiguedad[insertPos] = empleado.getAñosDeAntiguedad();
    }

    public void eliminarEmpleado(String empleadoNombre) {
        if (n < 0) {
            return;
        }

        int pos = buscarEmpleado(empleadoNombre);

        if (pos < 0) {
            return; // No registrado
        }

        n--;
        for (int i = pos; i <= n; i++) {
            nombre[i] = nombre[i+1];
            direccion[i] = direccion[i+1];
            edad[i] = edad[i+1];
            esMujer[i] = esMujer[i+1];
            añosDeAntiguedad[i] = añosDeAntiguedad[i+1];
        }
    }

    public void modificarAniosDeAntiguedad(EmpleadoOrdenadoDto empleado) {
        int pos = buscarEmpleado(empleado.getNombre());
        if (pos < 0) {
            return; // No existe
        }
        
        añosDeAntiguedad[pos] = empleado.getAñosDeAntiguedad();
    }

    public EmpleadoOrdenadoDto listarUnEmpleadoDeterminado(String empleadoNombre) {
        int pos = buscarEmpleado(empleadoNombre);

        if (pos < 0) {
            return null;
        }

        return new EmpleadoOrdenadoDto(tam, nombre[pos], direccion[pos], edad[pos], esMujer[pos], añosDeAntiguedad[pos]);
    }

    public EmpleadoOrdenadoDto[] listarTodosLosEmpleados() {
        EmpleadoOrdenadoDto[] lista = new EmpleadoOrdenadoDto[tam];
        
        for (int i = 0; i <= n; i++) {
            lista[i] = new EmpleadoOrdenadoDto(tam, nombre[i], direccion[i], edad[i], esMujer[i], añosDeAntiguedad[i]);
        }

        return lista;
    }
}
