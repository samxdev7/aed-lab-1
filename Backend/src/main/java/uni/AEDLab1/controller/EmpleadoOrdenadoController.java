package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.EmpleadoOrdenadoDto;
import uni.AEDLab1.services.Ejercicio4;

@RestController
@RequestMapping("/api/empleados-ordenados")
public class EmpleadoOrdenadoController {
    
    private Ejercicio4 servicioEmpleado = new Ejercicio4(0);
    
    @PostMapping("/empleado")
    public ResponseEntity<EmpleadoOrdenadoDto> agregarEmpleado(@RequestBody EmpleadoOrdenadoDto empleado) {
        if (servicioEmpleado.getTam() != empleado.getTam()) {
            servicioEmpleado = new Ejercicio4(empleado.getTam());
        }
        
        servicioEmpleado.agregarEmpleado(empleado);
        return new ResponseEntity<>(empleado, HttpStatusCode.valueOf(201));
    }
    
    @DeleteMapping("/empleado/{nombre}")
    public ResponseEntity<String> eliminarEmpleado(@PathVariable String nombre) {
        servicioEmpleado.eliminarEmpleado(nombre);
        return new ResponseEntity<>(nombre, HttpStatusCode.valueOf(204));
    }
    
    @PutMapping("/empleado/{nombre}")
    public ResponseEntity<EmpleadoOrdenadoDto> modificarAniosDeAntiguedad(
        @RequestBody EmpleadoOrdenadoDto empleado) 
    {
        servicioEmpleado.modificarAniosDeAntiguedad(empleado);
        return new ResponseEntity<>(empleado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/empleado/{nombre}")
    public ResponseEntity<EmpleadoOrdenadoDto> listarEmpleado(@PathVariable String nombre) {
        EmpleadoOrdenadoDto empleadoEncontrado = servicioEmpleado.listarUnEmpleadoDeterminado(nombre);
        return new ResponseEntity<>(empleadoEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/empleado")
    public ResponseEntity<EmpleadoOrdenadoDto[]> listarTodosLosEmpleados() 
    {
        EmpleadoOrdenadoDto[] listaEmpleados = servicioEmpleado.listarTodosLosEmpleados();
        return new ResponseEntity<>(listaEmpleados, HttpStatusCode.valueOf(200));
    }
}
