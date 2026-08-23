package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.ClienteDto;
import uni.AEDLab1.services.Ejercicio2;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {
    
    private Ejercicio2 servicioCliente = new Ejercicio2(0);
    
    @PostMapping("/cliente")
    public ResponseEntity<ClienteDto> agregarCliente(@RequestBody ClienteDto cliente) {
        if (servicioCliente.getTam() != cliente.getTam()) {
            servicioCliente = new Ejercicio2(cliente.getTam());
        }
        
        servicioCliente.agregarCliente(cliente);
        return new ResponseEntity<>(cliente, HttpStatusCode.valueOf(201));
    }
    
    @DeleteMapping("/cliente/{nombre}")
    public ResponseEntity<String> eliminarCliente(@PathVariable String nombre) {
        servicioCliente.eliminarCliente(nombre);
        return new ResponseEntity<>(nombre, HttpStatusCode.valueOf(204));
    }
    
    @PutMapping("/cliente/{nombre}")
    public ResponseEntity<ClienteDto> modificarEstadoMoroso(
        @RequestBody ClienteDto cliente) 
    {
        servicioCliente.modificarEstadoMoroso(cliente);
        return new ResponseEntity<>(cliente, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/cliente/{nombre}")
    public ResponseEntity<ClienteDto> listarCliente(@PathVariable String nombre) {
        ClienteDto clienteEncontrado = servicioCliente.imprimirDatosDeUnCliente(nombre);
        return new ResponseEntity<>(clienteEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/cliente")
    public ResponseEntity<ClienteDto[]> listarTodosLosClientes() 
    {
        ClienteDto[] listaClientes = servicioCliente.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaClientes, HttpStatusCode.valueOf(200));
    }
}
