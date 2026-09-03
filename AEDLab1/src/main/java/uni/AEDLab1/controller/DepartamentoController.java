package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.DepartamentoDto;
import uni.AEDLab1.services.Ejercicio5;

/**
 * Controlador REST para gestionar la renta de departamentos del Ejercicio 5.
 * Expone los endpoints para interactuar con la lista de departamentos ordenados por extensión.
 */
@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {
    
    // Instancia en memoria del servicio para el Ejercicio 5
    private Ejercicio5 servicioDepto = new Ejercicio5(0);
    
    /**
     * Endpoint POST: Dar de alta/rentar un departamento.
     * Si el tamaño físico del arreglo difiere del enviado, se reinicializa la estructura.
     */
    @PostMapping("/departamento")
    public ResponseEntity<?> agregarDepartamento(@RequestBody DepartamentoDto depto) {
        // Si cambia el tamaño del arreglo físico, creamos una nueva instancia del servicio
        if (servicioDepto.getTam() != depto.getTam()) {
            servicioDepto = new Ejercicio5(depto.getTam());
        }
        
        boolean agregado = servicioDepto.agregarDepartamento(depto);
        if (!agregado) {
            // Retorna 400 Bad Request si el límite físico fue alcanzado o si el número de depto ya existe
            return new ResponseEntity<>("No se pudo registrar la renta. Verifique si el arreglo está lleno o si el departamento ya está registrado.", HttpStatusCode.valueOf(400));
        }
        return new ResponseEntity<>(depto, HttpStatusCode.valueOf(201));
    }
    
    /**
     * Endpoint DELETE: Dar de baja/liberar un departamento por su número único.
     */
    @DeleteMapping("/departamento/{numero}")
    public ResponseEntity<String> eliminarDepartamento(@PathVariable String numero) {
        boolean eliminado = servicioDepto.eliminarDepartamento(numero);
        if (!eliminado) {
            // Retorna 404 Not Found si el departamento no se encuentra registrado
            return new ResponseEntity<>("No se encuentra registrado el departamento número '" + numero + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(numero, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint PUT: Modificar el precio de renta de un departamento por su número.
     */
    @PutMapping("/departamento/{numero}")
    public ResponseEntity<?> modificarPrecio(
        @PathVariable String numero, @RequestBody DepartamentoDto depto) 
    {
        boolean modificado = servicioDepto.modificarPrecio(depto);
        if (!modificado) {
            // Retorna 404 Not Found si el departamento no se encuentra registrado para modificar
            return new ResponseEntity<>("No se encuentra registrado el departamento número '" + numero + "' para modificar.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(depto, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Consultar los datos de un departamento determinado por su número.
     */
    @GetMapping("/departamento/{numero}")
    public ResponseEntity<?> listarDepartamento(@PathVariable String numero) {
        DepartamentoDto deptoEncontrado = servicioDepto.imprimirDatosDeUnDepartamento(numero);
        if (deptoEncontrado == null) {
            // Retorna 404 Not Found si el departamento consultado no existe
            return new ResponseEntity<>("No se encuentra registrado el departamento número '" + numero + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(deptoEncontrado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Listar todos los departamentos (en orden ascendente por extensión).
     */
    @GetMapping("/departamento")
    public ResponseEntity<DepartamentoDto[]> listarTodosLosDepartamentos() {
        DepartamentoDto[] listaDeptos = servicioDepto.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaDeptos, HttpStatusCode.valueOf(200));
    }
}
