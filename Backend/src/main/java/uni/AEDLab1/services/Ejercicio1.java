package uni.AEDLab1.services;

import uni.AEDLab1.models.EstudianteDto;

/**
 * 1. En una escuela se tienen que almacenar en arreglos los siguientes datos 
 * para cada alumno: Nombre completo, Numero de semestres cursados, 
 * Calificación promedio total. Escriba un programa que, dada la información 
 * realice las siguientes operaciones:
 *      1. Dar de alta a un alumno
 *      2. Dar de baja a un alumno
 *      3. Modificar número de semestre cursados y promedio total
 *      4. Listar nombre, numero de semestre cursado y promedio de un alumno
 *      determinado
 *      5. Listar todos los registros.
 *      6. Salir
 */

public class Ejercicio1 {
    private final int tam;
    private int n;
    
    private final String[] nombre;
    private final int[] nSemestresCursados;
    private final float[] promedioTotal;
    
    public Ejercicio1(int tam) {
        this.n = -1;
        this.tam = tam;
        
        this.nombre = new String[tam];
        this.nSemestresCursados = new int[tam];
        this.promedioTotal = new float[tam];
    }
    
    public int getTam() {
        return this.tam;
    };

    public void agregarAlumno(EstudianteDto estudiante) {
        if (n >= tam - 1) {
            /* "No hay espacio" */
            return;
        }
        
        nombre[++n] = estudiante.getNombre();
        nSemestresCursados[n] = estudiante.getNSemestresCursados();
        promedioTotal[n] = estudiante.getPromedioTotal();
    }

    public void eliminarAlumno(String estudianteNombre) {
        int i = 0;

        while (i <= n && !estudianteNombre.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) { 
//            "No se encuentra un alumno llamado " + estudiante;
            return;
        }
        
        for (int k = i; k < n; k++) {
            nombre[k] = nombre[k+1];
            nSemestresCursados[k] = nSemestresCursados[k+1];
            promedioTotal[k] = promedioTotal[k+1];
        }

        --n;
    }

    public void modificarNSemestresYPromedio(EstudianteDto estudiante) {
        int i = 0;
        String objetivo = estudiante.getNombre();

        while (i <= n && !objetivo.equalsIgnoreCase(nombre[i])) i++;

        if (i > n) {
//            "No se encuentra un alumno llamado " + estudiante;
            return;
        }
        
        nSemestresCursados[i] = estudiante.getNSemestresCursados();
        promedioTotal[i] = estudiante.getPromedioTotal();
    }

    public EstudianteDto imprimirDatosDeUnAlumno(String estudianteNombre) {
        int i = 0;
        
        while (i <= n && !(estudianteNombre.compareTo(nombre[i]) < 0)) i++;
        
        if (i > n) {
//            "No se encuentra un alumno llamado " + estudiante;
            return null;
        }
        
        return new EstudianteDto(tam, estudianteNombre, nSemestresCursados[i], promedioTotal[i]);
    }
    
    public EstudianteDto[] imprimirTodosLosDatos() {
        EstudianteDto[] listaEstudiantes = new EstudianteDto[tam];
        
        for (int i = 0; i <= n; i++) {
            listaEstudiantes[i] = new EstudianteDto(tam, nombre[i], nSemestresCursados[i], 
                promedioTotal[i]);
        }
        
        return listaEstudiantes;
    }
}
