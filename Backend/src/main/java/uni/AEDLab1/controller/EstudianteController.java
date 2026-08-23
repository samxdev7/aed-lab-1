package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.EstudianteDto;
import uni.AEDLab1.services.Ejercicio1;

@RestController
@RequestMapping("/api/estudiantes")
public class EstudianteController {
    
    private Ejercicio1 servicioEstudiante = new Ejercicio1(0);
    
    @PostMapping("/estudiante")
    public ResponseEntity<EstudianteDto> agregarEstudiante(@RequestBody EstudianteDto estudiante) {
        if (servicioEstudiante.getTam() != estudiante.getTam()) {
            servicioEstudiante = new Ejercicio1(estudiante.getTam());
        }
        
        servicioEstudiante.agregarAlumno(estudiante);
        return new ResponseEntity<>(estudiante, HttpStatusCode.valueOf(201));
    }
    
    @DeleteMapping("/estudiante/{nombre}")
    public ResponseEntity<String> eliminarEstudiante(@PathVariable String nombre) {
        servicioEstudiante.eliminarAlumno(nombre);
        return new ResponseEntity<>(nombre, HttpStatusCode.valueOf(204));
    }
    
    @PutMapping("/estudiante/{nombre}")
    public ResponseEntity<EstudianteDto> modificarNSemestresYPromedio(
        @RequestBody EstudianteDto estudiante) 
    {
        servicioEstudiante.modificarNSemestresYPromedio(estudiante);
        return new ResponseEntity<>(estudiante, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/estudiante/{nombre}")
    public ResponseEntity<EstudianteDto> listarEstudiante(@PathVariable String nombre) {
        EstudianteDto estudianteEncontrado = servicioEstudiante.imprimirDatosDeUnAlumno(nombre);
        return new ResponseEntity<>(estudianteEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/estudiante")
    public ResponseEntity<EstudianteDto[]> listarTodosLosEstudiantes() 
    {
        EstudianteDto[] listaEstudiantes = servicioEstudiante.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaEstudiantes, HttpStatusCode.valueOf(200));
    }
}
