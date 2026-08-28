package uni.AEDLab1.services;

import uni.AEDLab1.models.EstudianteDto;

/**
 * Servicio para el Ejercicio 1 - Registro de Alumnos.
 * Implementa la estructura física y operaciones de un arreglo desordenado.
 */
public class Ejercicio1 {
    // Atributos de control del arreglo
    private final int tam; // Tamaño máximo físico del arreglo
    private int n; // Índice del último elemento ingresado (-1 si está vacío)
    
    // Arreglos paralelos para almacenar los datos de los alumnos
    private final String[] nombre;
    private final int[] nSemestresCursados;
    private final float[] promedioTotal;
    
    /**
     * Constructor que inicializa los arreglos paralelos con el tamaño máximo definido.
     * @param tam Tamaño físico del arreglo.
     */
    public Ejercicio1(int tam) {
        this.n = -1;
        this.tam = tam;
        this.nombre = new String[tam];
        this.nSemestresCursados = new int[tam];
        this.promedioTotal = new float[tam];
    }
    
    public int getTam() {
        return this.tam;
    }

    /**
     * Agrega un nuevo alumno al final del arreglo desordenado.
     * @param estudiante DTO con los datos del alumno.
     * @return true si se agregó con éxito, false si el arreglo está lleno.
     */
    public boolean agregarAlumno(EstudianteDto estudiante) {
        // Validación de límite físico del arreglo para evitar desbordamientos
        if (n >= tam - 1) {
            return false;
        }
        
        nombre[++n] = estudiante.getNombre();
        nSemestresCursados[n] = estudiante.getNSemestresCursados();
        promedioTotal[n] = estudiante.getPromedioTotal();
        return true;
    }

    /**
     * Elimina un alumno por su nombre, manteniendo la estructura compacta.
     * En un arreglo desordenado, se recorren los elementos posteriores hacia la izquierda.
     * @param estudianteNombre Nombre completo a eliminar.
     * @return true si se encontró y eliminó, false si no existía.
     */
    public boolean eliminarAlumno(String estudianteNombre) {
        int i = 0;

        // Búsqueda secuencial para encontrar el índice del alumno
        while (i <= n && !estudianteNombre.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        // Si el índice superó el límite lógico actual 'n', el alumno no existe
        if (i > n) { 
            return false;
        }
        
        // Desplazamiento a la izquierda para compactar y no dejar huecos
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            nSemestresCursados[k] = nSemestresCursados[k+1];
            promedioTotal[k] = promedioTotal[k+1];
        }

        --n; // Decrementamos el límite lógico de elementos válidos
        return true;
    }

    /**
     * Modifica los datos de un alumno por coincidencia de nombre exacto.
     * @param estudiante DTO con los nuevos datos del alumno.
     * @return true si se encontró y actualizó, false si no se encontró.
     */
    public boolean modificarNSemestresYPromedio(EstudianteDto estudiante) {
        int i = 0;
        String objetivo = estudiante.getNombre();

        // Búsqueda secuencial
        while (i <= n && !objetivo.equalsIgnoreCase(nombre[i])) {
            i++;
        }

        if (i > n) {
            return false;
        }
        
        // Actualización de los datos correspondientes en el mismo índice
        nSemestresCursados[i] = estudiante.getNSemestresCursados();
        promedioTotal[i] = estudiante.getPromedioTotal();
        return true;
    }

    /**
     * Busca y retorna los datos de un alumno determinado.
     * @param estudianteNombre Nombre del alumno a consultar.
     * @return DTO del alumno, o null si no se encuentra.
     */
    public EstudianteDto imprimirDatosDeUnAlumno(String estudianteNombre) {
        int i = 0;
        
        while (i <= n && !estudianteNombre.equalsIgnoreCase(nombre[i])) {
            i++;
        }
        
        if (i > n) {
            return null;
        }
        
        return new EstudianteDto(tam, nombre[i], nSemestresCursados[i], promedioTotal[i]);
    }
    
    /**
     * Obtiene todos los alumnos actualmente almacenados en el arreglo lógico.
     * @return Arreglo de DTOs con la longitud exacta de alumnos ingresados.
     */
    public EstudianteDto[] imprimirTodosLosDatos() {
        EstudianteDto[] listaEstudiantes = new EstudianteDto[n+1];
        
        for (int i = 0; i <= n; i++) {
            listaEstudiantes[i] = new EstudianteDto(tam, nombre[i], nSemestresCursados[i], promedioTotal[i]);
        }
        
        return listaEstudiantes;
    }
}
