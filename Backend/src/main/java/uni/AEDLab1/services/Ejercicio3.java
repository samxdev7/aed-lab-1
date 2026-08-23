package uni.AEDLab1.services;

import uni.AEDLab1.models.EmpleadoDesordenadoDto;

/**
 * 3. El departamento de personal de una empresa necesita almacenar en arreglos desordenados el 
 * nombre, sexo y edad de cada uno de los empleados adscritos al mismo. Escriba un programa que 
 * realice las siguientes operaciones:
 *      1. Dar de alta a un empleado.
 *      2. Dar de baja a un empleado.
 *      3. Actualizar la edad de un empleado determinado. (Modificar)
 *      4. Imprimir todos los registros de los empleados varones.
 *      5. Imprimir un registro determinado.
 *      6. Salir.
 */

public class Ejercicio3 {
    private final int tam;
    private int n;
    
    private final String[] nombre;
    private final boolean[] esMujer;
    private final int[] edad;
    
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

    public void agregarEmpleado(EmpleadoDesordenadoDto empleado) {
        if (n >= tam - 1) {
            return;
        }
        
        nombre[++n] = empleado.getNombre();
        esMujer[n] = empleado.getSexo();
        edad[n] = empleado.getEdad();
    }

    public void eliminarEmpleado(String empleadoNombre) {
        int i = 0;

        while (i <= n && !empleadoNombre.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) { 
            return;
        }
        
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            esMujer[k] = esMujer[k+1];
            edad[k] = edad[k+1];
        }

        --n;
    }

    public void modificarEdad(EmpleadoDesordenadoDto empleado) {
        int i = 0;
        String objetivo = empleado.getNombre();

        while (i <= n && !objetivo.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            return;
        }
        
        edad[i] = empleado.getEdad();
    }

    public EmpleadoDesordenadoDto imprimirDatosDeUnEmpleado(String empleadoNombre) {
        int i = 0;

        while (i <= n && !empleadoNombre.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
            return null;
        }
        
        return new EmpleadoDesordenadoDto(tam, nombre[i], esMujer[i], edad[i]);
    }
    
    public EmpleadoDesordenadoDto[] imprimirTodosLosDatos() {
        EmpleadoDesordenadoDto[] listaEmpleados = new EmpleadoDesordenadoDto[tam];

        for (int i = 0; i <= n; i++) {
            listaEmpleados[i] = new EmpleadoDesordenadoDto(tam, nombre[i], esMujer[i], edad[i]);
        }

        return listaEmpleados;
    }

    public EmpleadoDesordenadoDto[] imprimirVarones() {
        EmpleadoDesordenadoDto[] listaVarones = new EmpleadoDesordenadoDto[tam];
        int count = 0;

        for (int i = 0; i <= n; i++) {
            if (!esMujer[i]) {
                listaVarones[count++] = new EmpleadoDesordenadoDto(tam, nombre[i], esMujer[i], edad[i]);
            }
        }

        return listaVarones;
    }
}
