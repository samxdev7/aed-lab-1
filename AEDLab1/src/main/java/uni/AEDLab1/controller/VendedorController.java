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
    public ResponseEntity<?> agregarVendedor(@RequestBody VendedorDto vendedor) {
        if (servicioVendedor.getTam() != vendedor.getTam()) {
            servicioVendedor = new Ejercicio6(vendedor.getTam());
        }
        
        boolean agregado = servicioVendedor.agregarVendedor(vendedor);
        if (!agregado) {
            return new ResponseEntity<>("No se pudo registrar al vendedor. Verifique si el arreglo está lleno o si el vendedor ya está registrado.", HttpStatusCode.valueOf(400));
        }
        return new ResponseEntity<>(vendedor, HttpStatusCode.valueOf(201));
    }
    
    @PutMapping("/vendedor/{nombre}")
    public ResponseEntity<?> modificarVentas(
        @PathVariable String nombre, @RequestBody VendedorDto vendedor) 
    {
        boolean modificado = servicioVendedor.modificarVentas(vendedor);
        if (!modificado) {
            return new ResponseEntity<>("No se encuentra registrado el vendedor '" + nombre + "' para modificar.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(vendedor, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/vendedor/{nombre}")
    public ResponseEntity<?> listarVendedor(@PathVariable String nombre) {
        VendedorDto vendedorEncontrado = servicioVendedor.imprimirDatosDeUnVendedor(nombre);
        if (vendedorEncontrado == null) {
            return new ResponseEntity<>("No se encuentra registrado el vendedor '" + nombre + "'.", HttpStatusCode.valueOf(404));
        }
        return new ResponseEntity<>(vendedorEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/vendedor")
    public ResponseEntity<VendedorDto[]> listarTodosLosVendedores() 
    {
        VendedorDto[] listaVendedores = servicioVendedor.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaVendedores, HttpStatusCode.valueOf(200));
    }
}
