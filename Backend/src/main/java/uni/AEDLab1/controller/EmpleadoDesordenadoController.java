package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.EmpleadoDesordenadoDto;
import uni.AEDLab1.services.Ejercicio3;

@RestController
@RequestMapping("/api/empleados-desordenados")
public class EmpleadoDesordenadoController {
    
    private Ejercicio3 servicioEmpleado = new Ejercicio3(0);
    
    @PostMapping("/empleado")
    public ResponseEntity<EmpleadoDesordenadoDto> agregarEmpleado(@RequestBody EmpleadoDesordenadoDto empleado) {
        if (servicioEmpleado.getTam() != empleado.getTam()) {
            servicioEmpleado = new Ejercicio3(empleado.getTam());
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
    public ResponseEntity<EmpleadoDesordenadoDto> modificarEdad(
        @RequestBody EmpleadoDesordenadoDto empleado) 
    {
        servicioEmpleado.modificarEdad(empleado);
        return new ResponseEntity<>(empleado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/empleado/{nombre}")
    public ResponseEntity<EmpleadoDesordenadoDto> listarEmpleado(@PathVariable String nombre) {
        EmpleadoDesordenadoDto empleadoEncontrado = servicioEmpleado.imprimirDatosDeUnEmpleado(nombre);
        return new ResponseEntity<>(empleadoEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/empleado")
    public ResponseEntity<EmpleadoDesordenadoDto[]> listarTodosLosEmpleados() 
    {
        EmpleadoDesordenadoDto[] listaEmpleados = servicioEmpleado.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaEmpleados, HttpStatusCode.valueOf(200));
    }

    @GetMapping("/empleado/varones")
    public ResponseEntity<EmpleadoDesordenadoDto[]> listarEmpleadosVarones() 
    {
        EmpleadoDesordenadoDto[] listaVarones = servicioEmpleado.imprimirVarones();
        return new ResponseEntity<>(listaVarones, HttpStatusCode.valueOf(200));
    }
}
