package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.EmpleadoOrdenadoDto;
import uni.AEDLab1.services.Ejercicio4;

/**
 * Controlador REST para gestionar los empleados del Ejercicio 4 (Estructura ordenada alfabéticamente).
 * Expone los endpoints para interactuar con la lista de empleados.
 */
@RestController
@RequestMapping("/api/empleados-ordenados")
public class EmpleadoOrdenadoController {
    
    // Instancia en memoria del servicio para el Ejercicio 4
    private Ejercicio4 servicioEmpleado = new Ejercicio4(0);
    
    /**
     * Endpoint POST: Dar de alta a un empleado.
     * Si el tamaño del arreglo difiere del enviado, se reinicializa la estructura.
     */
    @PostMapping("/empleado")
    public ResponseEntity<?> agregarEmpleado(@RequestBody EmpleadoOrdenadoDto empleado) {
        // Si cambia el tamaño del arreglo físico, creamos una nueva instancia del servicio
        if (servicioEmpleado.getTam() != empleado.getTam()) {
            servicioEmpleado = new Ejercicio4(empleado.getTam());
        }
        
        boolean agregado = servicioEmpleado.agregarEmpleado(empleado);
        if (!agregado) {
            // Retorna 400 Bad Request si el arreglo se llenó o si el nombre ya existe
            return new ResponseEntity<>("No se pudo agregar el empleado. Verifique si el arreglo está lleno o si el empleado ya está registrado.", HttpStatusCode.valueOf(400));
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
     * Endpoint PUT: Modificar los años de antigüedad de un empleado.
     */
    @PutMapping("/empleado/{nombre}")
    public ResponseEntity<?> modificarAniosDeAntiguedad(
        @PathVariable String nombre, @RequestBody EmpleadoOrdenadoDto empleado) 
    {
        boolean modificado = servicioEmpleado.modificarAniosDeAntiguedad(empleado);
        if (!modificado) {
            // Retorna 404 Not Found si el empleado solicitado no existe
            return new ResponseEntity<>("No se encuentra registrado el empleado '" + nombre + "' para modificar.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(empleado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Consultar los datos de un empleado determinado por su nombre.
     */
    @GetMapping("/empleado/{nombre}")
    public ResponseEntity<?> listarEmpleado(@PathVariable String nombre) {
        EmpleadoOrdenadoDto empleadoEncontrado = servicioEmpleado.listarUnEmpleadoDeterminado(nombre);
        if (empleadoEncontrado == null) {
            // Retorna 404 Not Found si el empleado consultado no existe
            return new ResponseEntity<>("No se encuentra registrado el empleado '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(empleadoEncontrado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Listar todos los empleados (en orden alfabético).
     */
    @GetMapping("/empleado")
    public ResponseEntity<EmpleadoOrdenadoDto[]> listarTodosLosEmpleados() {
        EmpleadoOrdenadoDto[] listaEmpleados = servicioEmpleado.listarTodosLosEmpleados();
        return new ResponseEntity<>(listaEmpleados, HttpStatusCode.valueOf(200));
    }
}