package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.DepartamentoDto;
import uni.AEDLab1.services.Ejercicio5;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {
    
    private Ejercicio5 servicioDepto = new Ejercicio5(0);
    
    @PostMapping("/departamento")
    public ResponseEntity<DepartamentoDto> agregarDepartamento(@RequestBody DepartamentoDto depto) {
        if (servicioDepto.getTam() != depto.getTam()) {
            servicioDepto = new Ejercicio5(depto.getTam());
        }
        
        servicioDepto.agregarDepartamento(depto);
        return new ResponseEntity<>(depto, HttpStatusCode.valueOf(201));
    }
    
    @DeleteMapping("/departamento/{numero}")
    public ResponseEntity<String> eliminarDepartamento(@PathVariable String numero) {
        servicioDepto.eliminarDepartamento(numero);
        return new ResponseEntity<>(numero, HttpStatusCode.valueOf(204));
    }
    
    @PutMapping("/departamento/{numero}")
    public ResponseEntity<DepartamentoDto> modificarPrecio(
        @RequestBody DepartamentoDto depto) 
    {
        servicioDepto.modificarPrecio(depto);
        return new ResponseEntity<>(depto, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/departamento/{numero}")
    public ResponseEntity<DepartamentoDto> listarDepartamento(@PathVariable String numero) {
        DepartamentoDto deptoEncontrado = servicioDepto.imprimirDatosDeUnDepartamento(numero);
        return new ResponseEntity<>(deptoEncontrado, HttpStatusCode.valueOf(200));
    }
    
    @GetMapping("/departamento")
    public ResponseEntity<DepartamentoDto[]> listarTodosLosDepartamentos() 
    {
        DepartamentoDto[] listaDeptos = servicioDepto.imprimirTodosLosDatos();
        return new ResponseEntity<>(listaDeptos, HttpStatusCode.valueOf(200));
    }
}
