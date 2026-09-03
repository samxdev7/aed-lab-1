package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.EmpleadoDesordenadoDto;
import uni.AEDLab1.services.Ejercicio3;

/**
 * Controlador REST para gestionar los empleados del Ejercicio 3 (Estructura desordenada).
 * Expone los endpoints para interactuar con el arreglo de empleados.
 */
@RestController
@RequestMapping("/api/empleados-desordenados")
public class EmpleadoDesordenadoController {
    
    // Instancia en memoria del servicio para el Ejercicio 3
    private Ejercicio3 servicioEmpleado = new Ejercicio3(0);
    
    /**
     * Endpoint POST: Dar de alta a un empleado.
     * Si el tamaño del arreglo difiere del enviado, se reinicializa la estructura.
     */
    @PostMapping("/empleado")
    public ResponseEntity<?> agregarEmpleado(@RequestBody EmpleadoDesordenadoDto empleado) {
        // Si cambia el tamaño solicitado, creamos una nueva instancia del servicio
        if (servicioEmpleado.getTam() != empleado.getTam()) {
            servicioEmpleado = new Ejercicio3(empleado.getTam());
        }
        
        boolean agregado = servicioEmpleado.agregarEmpleado(empleado);
        if (!agregado) {
            // Retorna 400 Bad Request si el límite físico fue alcanzado
            return new ResponseEntity<>("No hay espacio en el arreglo de empleados (límite superado).", HttpStatusCode.valueOf(400));
        }
        return new ResponseEntity<>(empleado, HttpStatusCode.valueOf(201));
    }
    
    /**
     * Endpoint DELETE: Dar de baja a un empleado por su nombre completo.
     */
    @DeleteMapping("/empleado/{nombre}")
    public ResponseEntity<String> eliminarEmpleado(@PathVariable String nombre) {
        boolean eliminado = servicioEmpleado.eliminarEmpleado(nombre);
        if (!eliminado) {
            // Retorna 404 Not Found si el empleado solicitado no existe
            return new ResponseEntity<>("No se encuentra registrado el empleado '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(nombre, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint PUT: Modificar la edad de un empleado.
     */
    @PutMapping("/empleado/{nombre}")
    public ResponseEntity<?> modificarEdad(
        @PathVariable String nombre, @RequestBody EmpleadoDesordenadoDto empleado) 
    {
        boolean modificado = servicioEmpleado.modificarEdad(empleado);
        if (!modificado) {
            // Retorna 404 Not Found si el empleado no está registrado para modificar
            return new ResponseEntity<>("No se encuentra registrado el empleado '" + nombre + "' para modificar.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(empleado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Consultar los datos de un empleado determinado por su nombre.
     */
    @GetMapping("/empleado/{nombre}")
    public ResponseEntity<?> listarEmpleado(@PathVariable String nombre) {
        EmpleadoDesordenadoDto empleadoEncontrado = servicioEmpleado.imprimirDatosDeUnEmpleado(nombre);
        if (empleadoEncontrado == null) {
            // Retorna 404 Not Found si el empleado consultado no existe
            return new ResponseEntity<>("No se encuentra registrado el empleado '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(empleadoEncontrado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Listar únicamente los empleados varones.
     */
    @GetMapping("/empleado/varones")
    public ResponseEntity<EmpleadoDesordenadoDto[]> listarEmpleadosVarones() {
        EmpleadoDesordenadoDto[] listaVarones = servicioEmpleado.imprimirVarones();
        return new ResponseEntity<>(listaVarones, HttpStatusCode.valueOf(200));
    }
}
