package uni.AEDLab1.controller;

<<<<<<< HEAD
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.BusquedaDto;

@RestController
@RequestMapping("/api/algoritmo")
public class AlgoritmoController {

    @PostMapping("/busqueda")
    public ResponseEntity<?> busquedaBinaria(@RequestBody BusquedaDto dto) {
        int[] arr = dto.getArreglo();
        int objetivo = dto.getObjetivo();

        if (arr == null || arr.length == 0) {
            return ResponseEntity.badRequest().body("El arreglo no puede estar vacío.");
        }

        int inicio = 0;
        int fin = arr.length - 1;
        int posicion = -1;

        // Algoritmo de Búsqueda Binaria
        while (inicio <= fin) {
            int medio = inicio + (fin - inicio) / 2;

            if (arr[medio] == objetivo) {
                posicion = medio;
                break;
            }

            if (arr[medio] < objetivo) {
                inicio = medio + 1;
            } else {
                fin = medio - 1;
            }
        }

        return ResponseEntity.ok(posicion);
    }
}
=======
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uni.AEDLab1.models.BusquedaBinariaDto;
import uni.AEDLab1.models.OrdenamientoDto;
import uni.AEDLab1.services.BusquedaBinariaServicio;
import uni.AEDLab1.services.OrdenamientoServicio;
import uni.AEDLab1.services.BusquedaBinariaServicio.ResultadoBusqueda;

/**
 * Controlador REST para gestionar los algoritmos de ordenamiento y de búsqueda binaria.
 * Expone los endpoints para interactuar con el arreglo desordenado de clientes.
 */
@RestController
@RequestMapping("/api/")
public class AlgoritmoController {
    
    // Instancia en memoria del servicio para el Laboratorio 2
    private OrdenamientoServicio servicioOrdenamiento = new OrdenamientoServicio();
    private BusquedaBinariaServicio servicioBusquedaBinaria = new BusquedaBinariaServicio();
    
    /**
     * Endpoint POST: /algoritmo/ordenamiento
     * Ordena un arreglo como entrada y el método de ordenación seleccionado, 
     * una vez ordenado se devuelve.
     */
    @PostMapping("/algoritmo/ordenamiento")
    public ResponseEntity<?> ordenarArreglo(@RequestBody OrdenamientoDto datos) {
        int[] arregloOrdenado = servicioOrdenamiento.ejecutar(datos);
        
        // Si no se ordena el arreglo correctamente o se selecciona un método inválido, retorna null
        if (arregloOrdenado == null) {
            return new ResponseEntity<>("Error: No se ordenó el arreglo con alguno de los métodos de ordenación.", HttpStatusCode.valueOf(400));
        }
        
        return new ResponseEntity<>(arregloOrdenado, HttpStatusCode.valueOf(201));
    }
    
    /**
     * Endpoint POST: /algoritmo/busqueda
     * Consume el elemento a encontrar y el arreglo, se devuelve el indice del elemento encontrado.
     */
    @PostMapping("/algoritmo/busqueda")
    public ResponseEntity<?> buscarElemento(@RequestBody BusquedaBinariaDto datos) {
        // Se específica el método de ordenación "Shell" por su rapidez (opción 6)
        OrdenamientoDto arregloOriginal = new OrdenamientoDto(datos.tam(), datos.arreglo(), 6);
        
        int[] arregloOrdenado = servicioOrdenamiento.ejecutar(arregloOriginal);
        if (arregloOrdenado == null) {
            return new ResponseEntity<>("Error: No se ordenó el arreglo con alguno de los métodos de ordenación.", HttpStatusCode.valueOf(400));
        }
        
        // Luego se crea un nuevo DTO para la ejecución de servicio de Busqueda Binaria para el 
        // arreglo ya ordenado.
        BusquedaBinariaDto busquedaArregloOrdenado = new BusquedaBinariaDto(
            datos.tam(), arregloOrdenado, datos.objetivo());
        
        int indiceElementoEncontrado = servicioBusquedaBinaria.buscarElemento(busquedaArregloOrdenado);
        
        // Si no encuentra el elemento solicitado, devuelve -1
        if (indiceElementoEncontrado == -1) {
            return new ResponseEntity<>("Error: No se encontró el elemento " + datos.objetivo() + " dentro del arreglo.", HttpStatusCode.valueOf(400));
        }
        
        ResultadoBusqueda res = new ResultadoBusqueda(arregloOrdenado, indiceElementoEncontrado);
        return new ResponseEntity<>(res, HttpStatusCode.valueOf(201));
    }
}
>>>>>>> origin/develop
