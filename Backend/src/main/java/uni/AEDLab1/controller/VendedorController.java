package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.VendedorDto;
import uni.AEDLab1.services.Ejercicio6;

@RestController
@RequestMapping("/api/vendedores")
public class VendedorController {
    
    private Ejercicio6 servicioVendedor = new Ejercicio6(0);
    
    @PostMapping("/vendedor")
    public ResponseEntity<VendedorDto> agregarVendedor(@RequestBody VendedorDto vendedor) {
        if (servicioVendedor.getTam() != vendedor.getTam()) {
            servicioVendedor = new Ejercicio6(vendedor.getTam());
        }
        
        servicioVendedor.agregarVendedor(vendedor);
        return new ResponseEntity<>(vendedor, HttpStatusCode.valueOf(201));
    }
    
    @PutMapping("/vendedor/{nombre}")
    public ResponseEntity<VendedorDto> modificarVentas(
        @RequestBody VendedorDto vendedor) 
    {
        servicioVendedor.modificarVentas(vendedor);
        return new ResponseEntity<>(vendedor, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/vendedor/{nombre}")
    public ResponseEntity<VendedorDto> listarVendedor(@PathVariable String nombre) {
        VendedorDto vendedorEncontrado = servicioVendedor.imprimirDatosDeUnVendedor(nombre);
        return new ResponseEntity<>(vendedorEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/vendedor")
    public ResponseEntity<VendedorDto[]> listarTodosLosVendedores() 
    {
        VendedorDto[] listaVendedores = servicioVendedor.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaVendedores, HttpStatusCode.valueOf(200));
    }
}
