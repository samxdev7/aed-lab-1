package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.ClienteDto;
import uni.AEDLab1.services.Ejercicio2;

/**
 * Controlador REST para gestionar los clientes del Ejercicio 2.
 * Expone los endpoints para interactuar con el arreglo desordenado de clientes.
 */
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    
    // Instancia en memoria del servicio para el Ejercicio 2
    private Ejercicio2 servicioCliente = new Ejercicio2(0);
    
    /**
     * Endpoint POST: Dar de alta a un cliente.
     * Si el tamaño físico del arreglo difiere del enviado, se reinicializa la estructura.
     */
    @PostMapping("/cliente")
    public ResponseEntity<?> agregarCliente(@RequestBody ClienteDto cliente) {
        // Reinicialización del servicio si cambia el tamaño físico del arreglo
        if (servicioCliente.getTam() != cliente.getTam()) {
            servicioCliente = new Ejercicio2(cliente.getTam());
        }
        
        boolean agregado = servicioCliente.agregarCliente(cliente);
        if (!agregado) {
            // Retorna 400 Bad Request si el arreglo se encuentra lleno
            return new ResponseEntity<>("No hay espacio en el arreglo de clientes (límite superado).", HttpStatusCode.valueOf(400));
        }
        return new ResponseEntity<>(cliente, HttpStatusCode.valueOf(201));
    }
    
    /**
     * Endpoint DELETE: Dar de baja a un cliente por su nombre completo.
     */
    @DeleteMapping("/cliente/{nombre}")
    public ResponseEntity<String> eliminarCliente(@PathVariable String nombre) {
        boolean eliminado = servicioCliente.eliminarCliente(nombre);
        if (!eliminado) {
            // Retorna 404 Not Found si el cliente solicitado no existe
            return new ResponseEntity<>("No se encuentra registrado el cliente '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(nombre, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint PUT: Modificar el estado moroso de un cliente.
     */
    @PutMapping("/cliente/{nombre}")
    public ResponseEntity<?> modificarEstadoMoroso(
        @PathVariable String nombre, @RequestBody ClienteDto cliente) 
    {
        boolean modificado = servicioCliente.modificarEstadoMoroso(cliente);
        if (!modificado) {
            // Retorna 404 Not Found si el cliente no se encuentra registrado para modificar
            return new ResponseEntity<>("No se encuentra registrado el cliente '" + nombre + "' para modificar.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(cliente, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Consultar los datos de un cliente determinado por su nombre.
     */
    @GetMapping("/cliente/{nombre}")
    public ResponseEntity<?> listarCliente(@PathVariable String nombre) {
        ClienteDto clienteEncontrado = servicioCliente.imprimirDatosDeUnCliente(nombre);
        if (clienteEncontrado == null) {
            // Retorna 404 Not Found si el cliente solicitado no existe
            return new ResponseEntity<>("No se encuentra registrado el cliente '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(clienteEncontrado, HttpStatusCode.valueOf(200));
    }
    
    /**
     * Endpoint GET: Listar la información de todos los clientes.
     */
    @GetMapping("/cliente")
    public ResponseEntity<ClienteDto[]> listarTodosLosClientes() {
        ClienteDto[] listaClientes = servicioCliente.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaClientes, HttpStatusCode.valueOf(200));
    }
}
