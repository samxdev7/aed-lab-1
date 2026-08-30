package uni.AEDLab1.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.AlgoritmosDto;
import uni.AEDLab1.services.BusquedaBinaria;
import uni.AEDLab1.services.Ordenamiento;

/**
 * Controlador REST para gestionar los algoritmos de ordenamiento y de búsqueda binaria.
 * Expone los endpoints para interactuar con el arreglo desordenado de clientes.
 */
@RestController
@RequestMapping("/api/")
public class AlgoritmoController {
    
    // Instancia en memoria del servicio para el Laboratorio 2
    private Ordenamiento servicioOrdenamiento = new Ordenamiento();
    private BusquedaBinaria servicioBusquedaBinaria = new BusquedaBinaria();
    
    /**
     * Endpoint POST: /algoritmo/ordenamiento
     * Ordena un arreglo como entrada y el método de ordenación seleccionado, 
     * una vez ordenado se devuelve.
     */
    @PostMapping("/algoritmo/ordenamiento")
    public ResponseEntity<?> ordenarArreglo(@RequestBody AlgoritmosDto elementos) {
        int[] arregloOrdenado = servicioOrdenamiento.ejecutar(elementos);
        
        // Si no se ordena el arreglo correctamente o se selecciona un método inválido, retorna null
        if (arregloOrdenado == null) {
            return new ResponseEntity<>("Error: No se ordenó el arreglo con alguno de los métodos de ordenación.", HttpStatusCode.valueOf(400));
        }
        
        return new ResponseEntity<>(arregloOrdenado, HttpStatusCode.valueOf(201));
    }
    
    /**
     * Endpoint GET: /algoritmo/busqueda
     * Consume el elemento a encontrar y el arreglo, se devuelve el indice del elemento encontrado.
     */
    @GetMapping("/algoritmo/busqueda")
    public ResponseEntity<?> buscarElemento(@RequestBody AlgoritmosDto elementos) {
        int[] arregloOrdenado = servicioOrdenamiento.ejecutar(elementos);
        AlgoritmosDto elementosConArregloOrdenado = new AlgoritmosDto(
            elementos.tam(), 6, arregloOrdenado, elementos.buscar());
        
        int indiceElementoEncontrado = servicioBusquedaBinaria.buscarElemento(elementosConArregloOrdenado);
        
        // Si no encuentra el elemento solicitado, devuelve -1
        if (indiceElementoEncontrado == -1) {
            return new ResponseEntity<>("Error: No se encontró el elemento " + elementos.buscar() + " dentro del arreglo.", HttpStatusCode.valueOf(400));
        }
        
        return new ResponseEntity<>(indiceElementoEncontrado, HttpStatusCode.valueOf(201));
    }
}
