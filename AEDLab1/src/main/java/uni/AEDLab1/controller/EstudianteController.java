package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.EstudianteDto;
import uni.AEDLab1.services.Ejercicio1;

/**
 * Controlador REST para gestionar alumnos del Ejercicio 1.
 * Define los endpoints para las operaciones del arreglo desordenado.
 */
@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {
    
    // Instancia en memoria del servicio del Ejercicio 1
    private Ejercicio1 servicioEstudiante = new Ejercicio1(0);
    
    /**
     * Endpoint POST: Dar de alta a un estudiante.
     * Si el tamaño del arreglo difiere del enviado, se reinicializa el servicio.
     */
    @PostMapping("/estudiante")
    public ResponseEntity<?> agregarEstudiante(@RequestBody EstudianteDto estudiante) {
        // Si cambia el tamaño solicitado por la interfaz, creamos una nueva instancia del servicio
        if (servicioEstudiante.getTam() != estudiante.getTam()) {
            servicioEstudiante = new Ejercicio1(estudiante.getTam());
        }
        
        boolean agregado = servicioEstudiante.agregarAlumno(estudiante);
        if (!agregado) {
            // Retorna un error 400 Bad Request si el límite físico del arreglo fue alcanzado
            return new ResponseEntity<>("No hay espacio en el arreglo de alumnos (límite superado).", HttpStatusCode.valueOf(400));
        }
        return new ResponseEntity<>(estudiante, HttpStatusCode.valueOf(201));
    }
    
    /**
     * Endpoint DELETE: Eliminar un estudiante por nombre completo.
     */
    @DeleteMapping("/estudiante/{nombre}")
    public ResponseEntity<String> eliminarEstudiante(@PathVariable String nombre) {
        boolean eliminado = servicioEstudiante.eliminarAlumno(nombre);
        if (!eliminado) {
            // Retorna 404 Not Found si no existe el alumno en el arreglo
            return new ResponseEntity<>("No se encuentra registrado el alumno '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(nombre, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint PUT: Modificar semestres y promedio de un estudiante.
     */
    @PutMapping("/estudiante/{nombre}")
    public ResponseEntity<?> modificarNSemestresYPromedio(
        @PathVariable String nombre, @RequestBody EstudianteDto estudiante) 
    {
        boolean modificado = servicioEstudiante.modificarNSemestresYPromedio(estudiante);
        if (!modificado) {
            // Retorna 404 Not Found si el alumno a modificar no existe
            return new ResponseEntity<>("No se encuentra registrado el alumno '" + nombre + "' para modificar.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(estudiante, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Consultar los datos de un estudiante determinado por su nombre.
     */
    @GetMapping("/estudiante/{nombre}")
    public ResponseEntity<?> listarEstudiante(@PathVariable String nombre) {
        EstudianteDto estudianteEncontrado = servicioEstudiante.imprimirDatosDeUnAlumno(nombre);
        if (estudianteEncontrado == null) {
            // Retorna 404 Not Found si el alumno consultado no existe
            return new ResponseEntity<>("No se encuentra registrado el alumno '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(estudianteEncontrado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Listar todos los estudiantes.
     */
    @GetMapping("/estudiante")
    public ResponseEntity<EstudianteDto[]> listarTodosLosEstudiantes() {
        EstudianteDto[] listaEstudiantes = servicioEstudiante.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaEstudiantes, HttpStatusCode.valueOf(200));
    }
}
